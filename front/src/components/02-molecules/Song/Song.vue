<template>
  <button class="m-song" @click.prevent="setCurrentTrack(song.id)">
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
      <span class="m-song__info__duration">{{ secondsToHHMMSS(song.duration) }}</span>
    </div>
  </button>
</template>

<script setup lang="ts">
import { secondsToHHMMSS } from '@/utils/timeConverter.utils';
import { type Child } from 'subsonic-api';
import { usePlayerStore } from '@/stores/player';
import AlbumCover from '@/components/01-atoms/AlbumCover/AlbumCover.vue';

const props = withDefaults(
  defineProps<{
    song: Child;
    showTrackNumber?: boolean;
    showArtist?: boolean;
    albumCover?: string | undefined;
  }>(),
  {
    showTrackNumber: false,
    showArtist: true
  }
);

const { setSongId } = usePlayerStore();
const setCurrentTrack = (songId: string) => {
  setSongId(songId);
};
</script>

<style lang="scss">
  @import './Song.scss';
</style>
