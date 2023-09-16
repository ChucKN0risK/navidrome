<template>
  <div class="o-player">
    <audio controls :src="url" type="audio/mpeg" ref="player" @timeupdate="updateProgress" />
    <button @click.prevent="play">
      <SpVector :glyph="isPlaying ? 'pause' : 'play'" :width="30" :height="30" />
    </button>
    <div v-if="song" class="o-player__info">
      <SpText :type="'body-m'" :text="song.title" />
      <SpText :type="'body-s'" :text="song.artist" />
    </div>
    <div class="o-player__progress">
      <progress value="45" min="0" max="100" ref="progressBar" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePlayerStore } from '@/stores/player';
import SpText from '@/components/01-atoms/SpText/SpText.vue';
import Stack from '@/components/01-atoms/Stack/Stack.vue';
import SpVector from '@/components/01-atoms/SpVector/SpVector.vue';
// import { secondsToHHMMSS } from '@/utils/timeConverter.utils';
import { storeToRefs } from 'pinia';

const props = defineProps<{
  songId: string;
}>();

const { loadSong, registerCurrentSong, setCurrentSong } = usePlayerStore();
const { getNowPlayingUrl } = storeToRefs(usePlayerStore())
const { getCurrentSong } = storeToRefs(usePlayerStore())
loadSong(props.songId);
registerCurrentSong(props.songId).then(() => {
  setCurrentSong();
})
const url = getNowPlayingUrl;
const song = getCurrentSong;
const player = ref(null as HTMLAudioElement);
const progressBar = ref(null as HTMLProgressElement);
const isPlaying = ref(false);

onMounted(() => {
  console.log('mounted', player.value)
})

const updateProgress = () => {
  progressBar.value.value = Math.floor(player.value.currentTime * 100 / player.value.duration);
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