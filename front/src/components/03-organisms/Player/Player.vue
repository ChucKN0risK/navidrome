<template>
  <div v-if="song" class="o-player">
    <audio controls :src="url" type="audio/mpeg" ref="player" @canplaythrough="setPlayerLoadingState" @timeupdate="updateProgress" />
    <div class="o-player__play">
      <AlbumCover
        v-if="album"
        :cover-url="album.largeImageUrl"
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
      <progress value="0" min="0" max="100" ref="progressBar" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { usePlayerStore } from '@/stores/player';
import { useAlbumStore } from '@/stores/album';
import SpText from '@/components/01-atoms/SpText/SpText.vue';
import Stack from '@/components/01-atoms/Stack/Stack.vue';
import SpVector from '@/components/01-atoms/SpVector/SpVector.vue';
import AlbumCover from '@/components/01-atoms/AlbumCover/AlbumCover.vue';
// import { secondsToHHMMSS } from '@/utils/timeConverter.utils';
import { storeToRefs } from 'pinia';

// const props = defineProps<{
//   songId: string;
// }>();

const { loadSong, registerCurrentSong, setCurrentSong } = usePlayerStore();
const { getNowPlayingUrl, getCurrentSong, songId } = storeToRefs(usePlayerStore());
const { getAlbum } = storeToRefs(useAlbumStore());
const url = getNowPlayingUrl;
const song = getCurrentSong;
const player = ref(null as HTMLAudioElement);
const progressBar = ref(null as HTMLProgressElement);
const isPlaying = ref(false);
const canPlay = ref(false);
const album = getAlbum;
console.log(album);


// usePlayerStore().$subscribe((mutation, state) => {
//   console.log(mutation)
//   console.log(state)
  
// })

watch(songId, () => {
  console.log('songId ref changed, do something!')
  loadSong(songId.value);
  registerCurrentSong(songId.value).then(() => {
    setCurrentSong();
  });
})

onMounted(() => {
  // console.log('mounted', album)
})

const setPlayerLoadingState = () => {
  canPlay.value = true;
  play();
};

const updateProgress = () => {
  if (player.value.duration) {
    progressBar.value.value = Math.floor((player.value.currentTime / player.value.duration) * 100);
  }
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