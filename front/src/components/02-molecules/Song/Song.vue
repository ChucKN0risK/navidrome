<template>
  <button class="m-song" @click.prevent="setPlayingSong">
    <AlbumCover
      v-if="showCover"
      class="m-song__cover"
      :cover-url="cover"
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
import { ref, computed, onMounted } from 'vue';
import { getCoverArtUrl } from '@/utils/subsonic.utils';
import { secondsToHHMMSS } from '@/utils/timeConverter.utils';
import { type SongWithCover } from '@/types/subsonic.types';
import AlbumCover from '@/components/01-atoms/AlbumCover/AlbumCover.vue';

const props = withDefaults(
  defineProps<{
    song: SongWithCover;
    showTrackNumber?: boolean;
    showArtist?: boolean;
    showCover?: boolean;
  }>(),
  {
    showTrackNumber: false,
    showArtist: true,
    showCover: true,
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

const cover = ref('');
const getCoverUrl = async () => {
  const coverUrl = await getCoverArtUrl(props.song.coverArt!);
  cover.value = coverUrl;
}

onMounted(() => {
  getCoverUrl();
})
</script>

<style lang="scss">
  @import './Song.scss';
</style>
