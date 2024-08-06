<template>
  <div class="o-player" ref="el">
    <audio
      ref="player"
      controls
      type="audio/mpeg"
      :src="url"
      @canplaythrough="setPlayerLoadingState"
      @timeupdate="updateProgress"
    />
    <div class="o-player__controls">
      <button @click.prevent="playPrevious">
        <Vector :glyph="'double-arrow-left'" :width="30" :height="30" />
      </button>
      <button @click.prevent="play">
        <Vector :glyph="isPlaying ? 'pause' : 'play'" :width="30" :height="30" />
      </button>
      <button @click.prevent="playNext">
        <Vector :glyph="'double-arrow-right'" :width="30" :height="30" />
      </button>
    </div>
    <div class="o-player__cover-wrapper">
      <AlbumCover
        :cover-url="getSongAlbumCover"
        :size="'small'"
      />
      <button @click.prevent="play" id="playerPlayBtn">
        <Vector :glyph="isPlaying ? 'pause' : 'play'" :width="30" :height="30" />
      </button>
    </div>
    <div v-if="savedSong" class="o-player__info">
      <Text :type="'body-m'" :text="getSongTitle" />
      <Text :type="'body-xs'" :text="getSongArtist" :color="'gray-9'" />
    </div>
    <div class="o-player__progress">
      <div class="o-player__time">
        <Text :type="'body-xs'" :text="getPlayedDuration" />
        <Text :type="'body-xs'" :text="getSongDuration" />
      </div>
      <label for="seekbar" class="u-visually-hidden">Seekbar</label>
      <input
        id="seekbar"
        ref="seekBar"
        value="0"
        min="0"
        max="100"
        type="range"
        step="1"
        @change="updateSeekValue"
        @input="updateSeekStyle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, watch, computed, onMounted, onUnmounted } from 'vue';
import { usePlayerStore } from '@/stores/player';
import { useAlbumStore } from '@/stores/album';
import Text from '@/components/01-atoms/Text/Text.vue';
import Vector from '@/components/01-atoms/Vector/Vector.vue';
import AlbumCover from '@/components/01-atoms/AlbumCover/AlbumCover.vue';
import { secondsToHHMMSS } from '@/utils/timeConverter.utils';
import { storeToRefs } from 'pinia';
import { saveLastPlayedSong, getLastPlayedSong } from '@/utils/localstorage.utils';

const { loadSong, registerCurrentSong, setCurrentSong, setPlayQueue } = usePlayerStore();
const { getNowPlayingUrl, getCurrentSong, songId } = storeToRefs(usePlayerStore());
const el = ref({} as HTMLDivElement);
const url = getNowPlayingUrl;
const song = getCurrentSong;
const savedSong = getLastPlayedSong();
const savedSongId = computed(() => savedSong ? JSON.parse(savedSong).id : '');
const savedSongTitle = computed(() => savedSong ? JSON.parse(savedSong).title : '');
const savedSongArtist = computed(() => savedSong ? JSON.parse(savedSong).artist : '');
const savedAlbumCover = computed(() => savedSong ? JSON.parse(savedSong).albumCover : '');
const player: Ref<HTMLAudioElement | null> = ref(null);
const seekBar: Ref<HTMLInputElement | null> = ref(null);
const isPlaying = ref(false);
const canPlay = ref(false);
const playerEllapsedTime = ref(0);

// When player starts, we trigger the loading
// of the last played track if saved in localStorage
const loadSavedSong = () => {
  if (savedSongId.value !== '' && !songId?.value) {
    const { setSongId } = usePlayerStore();
    setSongId(savedSongId.value);
  }
};

onMounted(() => {
  loadSavedSong();
});

// Load song once the songId changes in the store:
// - when last played track is found in localStorage
// - when user clicks on a song in a list
watch(songId, () => {
  console.log('songId ref changed, do something!')
  if (songId?.value) {
    loadSong(songId.value);
    registerCurrentSong(songId.value).then(() => {
      setCurrentSong().then(() => {
        // can play parfois à false alors que le track a chargé.
        // Je sais pas trop pourquoi.
        // console.log(`can play: ${canPlay.value}`)
        fetchAlbumCover(song.value!.albumId!);
        if (song.value?.id && song.value?.artist && song.value?.title) {
          saveLastPlayedSong({
            id: song.value?.id,
            artist: song.value?.artist,
            title: song.value?.title
          });
        }
      });
    });
  }
});

const play = () => {
  if (!player.value) {
    return;
  }
  if (player.value.paused || player.value.ended) {
    isPlaying.value = true;
    return player.value!.play();
  } else {
    isPlaying.value = false;
    return player.value.pause();
  }
};

const getPlayedDuration = computed(() => song.value ? `${secondsToHHMMSS(playerEllapsedTime.value)}` : '');
const getSongDuration = computed(() => song.value && song.value.duration ? `${secondsToHHMMSS(song.value.duration)}` : '');

const { getAlbumCover } = useAlbumStore();
const albumCover = ref('');
const fetchAlbumCover = async (albumId: string) => {
  const cover = await getAlbumCover(albumId);
  if (cover) albumCover.value = cover;
  if (song.value?.artist && song.value?.title) {
    saveLastPlayedSong({
      id: song.value?.id,
      artist: song.value?.artist,
      title: song.value?.title,
      albumCover: albumCover.value
    });
  }
  return albumCover;
};

const getSongTitle = computed(() => song.value ? song.value?.title : savedSongTitle.value);
const getSongArtist = computed(() => song.value ? song.value?.artist : savedSongArtist.value);
const getSongAlbumCover = computed(() => albumCover.value !== '' ? albumCover.value : savedAlbumCover.value);

const setPlayerLoadingState = () => {
  canPlay.value = true;
  if (savedSongId.value !== songId.value) {
    play();
  }
};

const updateProgress = () => {
  if (!player.value || !seekBar.value) {
    return;
  }
  const trackProgress = `${Math.floor((player.value.currentTime / player.value.duration) * 100)}`;
  playerEllapsedTime.value = Math.round(player.value.currentTime);
  seekBar.value.value = trackProgress;
  document.documentElement.style.setProperty('--progress-bar-value', `${trackProgress}%`);
};

const updateSeekValue = () => {
  if (!player.value || !seekBar.value) {
    return;
  }
  player.value.currentTime = (Number(seekBar.value.value) * player.value.duration) / 100;
  play();
};

const updateSeekStyle = () => {
  if (!seekBar.value) {
    return;
  }
  document.documentElement.style.setProperty('--progress-bar-value', `${seekBar.value.value}%`);
};

const playNext = () => {
  if (song.value) {
    setPlayQueue(song.value?.id);
  }
};

const playPrevious = () => {
  if (song.value) {
    setPlayQueue(song.value?.id);
  }
};

const documentClick = (e: MouseEvent) => {
  const playerPLayButton = document.getElementById('playerPlayBtn');
  const playerPlayButtonClicked = e.target === playerPLayButton || playerPLayButton?.contains(e.target);
  const shouldOpen =
    !playerPlayButtonClicked && (
    el.value === e.target ||
    el.value.contains(e.target as Node)
  );

  if (shouldOpen) {
    console.log('open')
  }
};

document.addEventListener('click', documentClick);

onUnmounted(() => {
  document.removeEventListener('click', documentClick);
});
</script>

<style lang="scss">
  @import './Player.scss';
</style>