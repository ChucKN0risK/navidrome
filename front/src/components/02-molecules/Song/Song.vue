<template>
  <button class="m-song" @click.prevent="setPlayingSong">
    <AlbumCover
      v-if="albumCover"
      class="m-song__cover"
      :cover-url="albumCover"
      :size="'small'"
    />
    <div class="m-song__info">
      <span v-if="showTrackNumber">{{ song.track }}</span>
      <span class="m-song__info__title">{{ song.title }}</span>
      <span v-if="showArtist" class="m-song__info__artist">{{ song.artist }}</span>
      <span class="m-song__info__duration">{{ songDuration }}</span>
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { secondsToHHMMSS } from '@/utils/timeConverter.utils';
import { type Child } from 'subsonic-api';
import AlbumCover from '@/components/01-atoms/AlbumCover/AlbumCover.vue';

const props = withDefaults(
  defineProps<{
    song: Child;
    showTrackNumber?: boolean;
    showArtist?: boolean;
    albumCover?: string;
  }>(),
  {
    showTrackNumber: false,
    showArtist: true
  }
);

const songDuration = computed(() => {
  return props.song.duration ? secondsToHHMMSS(props.song.duration) : false;
})

const emit = defineEmits<{
  (emitName: 'set-playing-song', songId: string): void;
}>();

const setPlayingSong = () => {
  emit('set-playing-song', props.song.id);
};
</script>

<style lang="scss">
  @import './Song.scss';
</style>
