<template>
  <div class="o-player">
    <audio controls :src="url" type="audio/mpeg" />
    <!-- <SpText :type="'body-s'" :text="song.title"/>
    <SpText :type="'body-s'" :text="song.artist"/> -->
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/stores/player';
import SpText from '@/components/01-atoms/SpText/SpText.vue';
import Stack from '@/components/01-atoms/Stack/Stack.vue';
import { secondsToHHMMSS } from '@/utils/timeConverter.utils';
import { storeToRefs } from 'pinia';

const props = defineProps<{
  songId: string;
}>();

const { play, registerCurrentSong, setCurrentSong } = usePlayerStore();
play(props.songId);
registerCurrentSong(props.songId);
setTimeout(() => {
  setCurrentSong();
}, 2000)
const { getNowPlayingUrl } = storeToRefs(usePlayerStore())
const { getCurrentSong } = storeToRefs(usePlayerStore())
const url = getNowPlayingUrl;
const song = getCurrentSong;
console.log('current song in Player', song)
</script>

<style lang="scss">
@import './Player.scss';
</style>