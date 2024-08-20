<template>
  <div
    :class="[
      'o-player',
      { 'show-small-viewport-player': showSmallViewportPlayer }
    ]"
  >
    <audio
      ref="player"
      controls
      type="audio/mpeg"
      :src="url"
      @canplaythrough="setPlayerLoadingState"
      @timeupdate="updateProgress"
    />
    <div v-if="savedSong" class="o-player__preview" ref="el">
      <div class="o-player__preview__cover-wrapper">
        <AlbumCover
          :cover-url="getSongAlbumCover"
          :size="'small'"
        />
        <button @click.stop="play" id="playerPlayBtn">
          <Vector :glyph="isPlaying ? 'pause' : 'play'" :width="30" :height="30" />
        </button>
      </div>
      <PlayerTrackInfo
        class="o-player__preview__info"
        :title="getSongTitle"
        :artist="getSongArtist"
      />
      <PlayerProgress
        class="o-player__preview__progress"
        :track-duration="song?.duration"
        :track-progress="playerEllapsedTime"
        :interactive="false"
        @update="updateTrackPlayingPosition"
      />
    </div>
    <div class="o-player__full">
      <button
        class="o-player__full__toggle-btn"
        @click.stop="toggleSmallViewportPlayer"
      >
        <Vector :glyph="'caret-down'" :width="30" :height="30" />
      </button>
      <div class="player__full__tabs">
        <button @click.stop="showPlayer">Now Playing</button>
        <button @click.stop="showQueue">Queue</button>
      </div>
      <AlbumCover
        class="o-player__full__cover"
        :cover-url="getSongAlbumCover"
        :size="'full'"
      />
      <PlayerTrackInfo
        class="o-player__full-height__info"
        :title="getSongTitle"
        :artist="getSongArtist"
      />
      <PlayerControls
        class="o-player__full__controls"
        :is-playing="isPlaying"
        @toggle-play-state="play"
        @play-previous="playPrevious"
        @play-next="playNext"
      />
      <PlayerProgress
        :track-duration="song?.duration"
        :track-progress="playerEllapsedTime"
        @update="updateTrackPlayingPosition"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, watch, computed, onMounted, onUnmounted } from 'vue';
import { usePlayerStore } from '@/stores/player';
import { useAlbumStore } from '@/stores/album';
import Vector from '@/components/01-atoms/Vector/Vector.vue';
import AlbumCover from '@/components/01-atoms/AlbumCover/AlbumCover.vue';
import PlayerTrackInfo from '@/components/02-molecules/PlayerTrackInfo/PlayerTrackInfo.vue';
import PlayerProgress from '@/components/02-molecules/PlayerProgress/PlayerProgress.vue';
import PlayerControls from '@/components/02-molecules/PlayerControls/PlayerControls.vue';
import { storeToRefs } from 'pinia';
import { saveLastPlayedSong, getLastPlayedSong } from '@/utils/localstorage.utils';

const { loadSong, registerCurrentSong, setCurrentSong, setPlayQueue } = usePlayerStore();
const { getNowPlayingUrl, getCurrentSong, songId } = storeToRefs(usePlayerStore());
const el = ref({} as HTMLDivElement);
const url = getNowPlayingUrl;
const song = getCurrentSong;
const savedSong = getLastPlayedSong();
const savedSongId = computed(() => savedSong ? JSON.parse(savedSong).id : songId);
const savedSongTitle = computed(() => savedSong ? JSON.parse(savedSong).title : song.value?.title);
const savedSongArtist = computed(() => savedSong ? JSON.parse(savedSong).artist : song.value?.artist);
const savedAlbumCover = computed(() => savedSong ? JSON.parse(savedSong).albumCover : albumCover.value);
const player: Ref<HTMLAudioElement | null> = ref(null);
// const seekBar: Ref<HTMLInputElement | null> = ref(null);
const isPlaying = ref(false);
const showSmallViewportPlayer = ref(false);
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
  if (savedSongId.value !== songId?.value) {
    play();
  }
};

const updateProgress = () => {
  if (!player.value) {
    return;
  }
  // const trackProgress = `${Math.floor((player.value.currentTime / player.value.duration) * 100)}`;
  // document.documentElement.style.setProperty('--player-progress-bar-value', `${trackProgress}%`);
  playerEllapsedTime.value = Math.round(player.value.currentTime);
};

const updateTrackPlayingPosition = (value: number) => {
  console.log(value)
  if (!player.value || !value) {
    return;
  }
  player.value.currentTime = (value * player.value.duration) / 100;
  play();
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

const toggleSmallViewportPlayer = () => {
  return showSmallViewportPlayer.value = !showSmallViewportPlayer.value;
};

const showPlayer = () => {
  console.log('show player')
};

const showQueue = () => {
  console.log('show queue')
};

const documentClick = (e: MouseEvent) => {
  const playerPlayButton = document.getElementById('playerPlayBtn');
  const playerPlayButtonClicked = e.target === playerPlayButton || playerPlayButton?.contains(e.target);
  const shouldOpen =
    !playerPlayButtonClicked && (
    el.value === e.target ||
    el.value.contains(e.target as Node)
  );

  if (shouldOpen) {
    toggleSmallViewportPlayer();
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