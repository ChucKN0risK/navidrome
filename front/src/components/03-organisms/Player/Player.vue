<template>
  <div v-if="song" class="o-player">
    <audio
      ref="player"
      controls
      type="audio/mpeg"
      :src="url"
      @canplaythrough="setPlayerLoadingState"
      @timeupdate="updateProgress"
    />
    <div class="o-player__play">
      <AlbumCover
        v-if="albumCover"
        :cover-url="albumCover"
        :size="'small'"
        class="o-player__play__cover"
      />
      <button @click.prevent="play">
        <SpVector :glyph="isPlaying ? 'pause' : 'play'" :width="30" :height="30" />
      </button>
    </div>
    <div v-if="song" class="o-player__info">
      <SpText :type="'body-m'" :text="song.title" />
      <SpText :type="'body-s'" :text="song.artist" />
    </div>
    <div class="o-player__progress">
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
import { ref, watch } from 'vue';
import { usePlayerStore } from '@/stores/player';
import { useAlbumStore } from '@/stores/album';
import SpText from '@/components/01-atoms/SpText/SpText.vue';
import SpVector from '@/components/01-atoms/SpVector/SpVector.vue';
import AlbumCover from '@/components/01-atoms/AlbumCover/AlbumCover.vue';
// import { secondsToHHMMSS } from '@/utils/timeConverter.utils';
import { storeToRefs } from 'pinia';

// const props = defineProps<{
//   songId: string;
// }>();

const { loadSong, registerCurrentSong, setCurrentSong } = usePlayerStore();
const { getNowPlayingUrl, getCurrentSong, songId } = storeToRefs(usePlayerStore());
const url = getNowPlayingUrl;
const song = getCurrentSong;
const player = ref(null as HTMLAudioElement);
const seekBar = ref(null as HTMLInputElement);
const isPlaying = ref(false);
const canPlay = ref(false);
watch(songId, () => {
  console.log('songId ref changed, do something!')
  loadSong(songId.value);
  registerCurrentSong(songId.value).then(() => {
    setCurrentSong().then(() => {
      fetchAlbumCover(song.value.albumId);
    });
  });
})

const { getAlbumCover } = useAlbumStore();
const albumCover = ref('');
const fetchAlbumCover = async (albumId: string) => {
  albumCover.value = await getAlbumCover(albumId);
  return albumCover;
};

const setPlayerLoadingState = () => {
  canPlay.value = true;
  play();
};

const updateProgress = () => {
  const trackProgress = `${Math.floor((player.value.currentTime / player.value.duration) * 100)}`;
  seekBar.value.value = trackProgress;
  document.documentElement.style.setProperty('--progress-bar-value', `${trackProgress}%`);
};

const updateSeekValue = () => {
  player.value.currentTime = (Number(seekBar.value.value) * player.value.duration) / 100;
  play();
};

const updateSeekStyle = () => {
  document.documentElement.style.setProperty('--progress-bar-value', `${seekBar.value.value}%`);
};

const play = () => {
  if (player.value.paused || player.value.ended) {
    isPlaying.value = true;
    return player.value.play();
  } else {
    isPlaying.value = false;
    return player.value.pause();
  }
};
</script>

<style lang="scss">
@import './Player.scss';
</style>