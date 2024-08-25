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
      :src="safeUrl"
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
      <div class="o-player__full__tabs">
        <button @click.stop="showPlayer" :class="{ 'is-active': currentSongIsShown }">
          <Text :type="'body-m'" :text="'Now Playing'" />
        </button>
        <button @click.stop="showQueue" :class="{ 'is-active': !currentSongIsShown }">
          <Text :type="'body-m'" :text="'Queue'" />
        </button>
      </div>
      <div class="o-player__full__scroller" ref="tabsScroller">
        <div class="o-player__full__current-song" ref="currentSongEl">
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
        </div>
        <div class="o-player__full__queue" ref="queueEl">
          <Text :type="'body-m'" :text="'Up next'" />
          <SongList :songs="getPlayQueue ?? []" />
        </div>
      </div>
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
import { storeToRefs } from 'pinia';
import { saveLastPlayedSong, getLastPlayedSong } from '@/utils/localstorage.utils';
import { getCoverArtUrl } from '@/utils/subsonic.utils';
import Vector from '@/components/01-atoms/Vector/Vector.vue';
import Text from '@/components/01-atoms/Text/Text.vue';
import AlbumCover from '@/components/01-atoms/AlbumCover/AlbumCover.vue';
import PlayerTrackInfo from '@/components/02-molecules/PlayerTrackInfo/PlayerTrackInfo.vue';
import PlayerProgress from '@/components/02-molecules/PlayerProgress/PlayerProgress.vue';
import PlayerControls from '@/components/02-molecules/PlayerControls/PlayerControls.vue';
import SongList from '@/components/03-organisms/SongList/SongList.vue';

const { loadSong, registerCurrentSong, setCurrentSong, setPlayQueue } = usePlayerStore();
const { getNowPlayingUrl, getCurrentSong, songId, getPlayQueue } = storeToRefs(usePlayerStore());
const el = ref({} as HTMLDivElement);
const safeUrl = computed(() => getNowPlayingUrl.value ?? undefined);
const song = getCurrentSong;
const savedSong = getLastPlayedSong();
const savedSongId = computed(() => savedSong ? JSON.parse(savedSong).id : songId);
const savedSongTitle = computed(() => savedSong ? JSON.parse(savedSong).title : song.value?.title);
const savedSongArtist = computed(() => savedSong ? JSON.parse(savedSong).artist : song.value?.artist);
const savedSongCover = computed(() => savedSong ? JSON.parse(savedSong).coverUrl : songCover.value);
const player: Ref<HTMLAudioElement | null> = ref(null);
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
  document.addEventListener('click', documentClick);
  loadSavedSong();
});

// Load song once the songId changes in the store:
// - when last played track is found in localStorage
// - when user clicks on a song in a list
watch(() => songId?.value, async (newSongId) => {
  console.log('songId ref changed, do something!')
  if (newSongId) {
    await loadSong(newSongId);
    await registerCurrentSong(newSongId);
    await setCurrentSong();
    
    // can play parfois à false alors que le track a chargé.
    // Je sais pas trop pourquoi.
    // console.log(`can play: ${canPlay.value}`)
    await fetchSongCover(song.value!.coverArt!);
    await setPlayQueue();
    
    if (song.value?.id && song.value?.artist && song.value?.title) {
      saveLastPlayedSong({
        id: song.value?.id,
        artist: song.value?.artist,
        title: song.value?.title
      });
    }
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

const songCover = ref('');
const fetchSongCover = async (coverArt: string) => {
  const cover = await getCoverArtUrl(coverArt);
  if (cover) songCover.value = cover;
  if (song.value?.artist && song.value?.title) {
    saveLastPlayedSong({
      id: song.value?.id,
      artist: song.value?.artist,
      title: song.value?.title,
      coverUrl: songCover.value
    });
  }
  return songCover;
};

watch(getPlayQueue, () => {
  console.log('play queue chaged')
})

const getSongTitle = computed(() => song.value ? song.value?.title : savedSongTitle.value ?? '');
const getSongArtist = computed(() => song.value ? song.value?.artist : savedSongArtist.value ?? '');
const getSongAlbumCover = computed(() => songCover.value !== '' ? songCover.value : savedSongCover.value ?? '');

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
  playerEllapsedTime.value = Math.round(player.value.currentTime);
};

const updateTrackPlayingPosition = (value: number) => {
  if (!player.value || !value) {
    return;
  }
  player.value.currentTime = (value * player.value.duration) / 100;
};

const playNext = () => {
  console.log('play next');
};

const playPrevious = () => {
  console.log('play previous');
};

const toggleSmallViewportPlayer = () => {
  return showSmallViewportPlayer.value = !showSmallViewportPlayer.value;
};

const observer = ref();
const tabsScroller: Ref<HTMLDivElement | null> = ref(null);
const currentSongEl: Ref<HTMLDivElement | null> = ref(null);
const queueEl: Ref<HTMLDivElement | null> = ref(null);
const currentSongIsShown = ref(true);

const createTabsScroller = () => {
  let options = {
    root: tabsScroller.value,
    rootMargin: '0px',
    // if 75% of the current song is
    // not intersecting we consider it hidden
    threshold: 0.25,
  };

  let callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry) => {
      return entry.isIntersecting ? currentSongIsShown.value = true : currentSongIsShown.value = false;
    });
  };
  observer.value = new IntersectionObserver(callback, options);
  observer.value.observe(currentSongEl.value);
};

onMounted(() => {
  createTabsScroller();
});

const showPlayer = (): void => {
  currentSongEl.value?.scrollIntoView();
};

const showQueue = (): void => {
  queueEl.value?.scrollIntoView();
};

const documentClick = (e: MouseEvent) => {
  const playerPlayButton = document.getElementById('playerPlayBtn');
  const playerPlayButtonClicked = e.target === playerPlayButton || playerPlayButton?.contains(e.target as Node);
  const shouldOpen =
    !playerPlayButtonClicked
    && savedSong !== ''
    && (
      el.value === e.target ||
      el.value.contains(e.target as Node)
    );

  if (shouldOpen) {
    toggleSmallViewportPlayer();
  }
};

onUnmounted(() => {
  document.removeEventListener('click', documentClick);
  observer.value.disconnect();
});
</script>

<style lang="scss">
  @import './Player.scss';
</style>