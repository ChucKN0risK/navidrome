<template>
  <li class="m-song">
    <div v-if="showAlbumCover" class="m-song__cover">
      <AlbumCover
        v-if="album"
        :cover-url="album.largeImageUrl"
        :size="'small'"
      />
    </div>
    <button class="m-song__info" @click.prevent="setCurrentTrack(song.id)">
      <span v-if="showTrackNumber">{{ song.track }}</span>
      <span class="m-song__info__title">{{  song.title }}</span>
      <span>{{ song.artist }}</span>
      <span class="m-song__duration">{{ secondsToHHMMSS(song.duration) }}</span>
    </button>
    <VDropdown
      :distance="6"
    >
      <!-- This will be the popover reference (for the events and position) -->
      <button>
        <SpVector
          :glyph="'dots-vertical'" :color="'white'"
        />
      </button>

      <!-- This will be the content of the popover -->
      <template #popper>
        <button @click.prevent="download">Download</button>
      </template>
    </VDropdown>
  </li>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { secondsToHHMMSS } from '@/utils/timeConverter.utils';
import { type Child } from 'subsonic-api';
import { usePlayerStore } from '@/stores/player';
import { useAlbumStore } from '@/stores/album';
import SpVector from '@/components/01-atoms/SpVector/SpVector.vue';
import AlbumCover from '@/components/01-atoms/AlbumCover/AlbumCover.vue';
import { api } from '@/main';

const props = defineProps<{
  song: Child;
  showTrackNumber?: Boolean;
  showAlbumCover?: Boolean;
}>();

const { fetchAlbum } = useAlbumStore();
if (props.showAlbumCover) {
  fetchAlbum(props.song.albumId);
}
const { getAlbum } = storeToRefs(useAlbumStore())
const album = getAlbum;

const { setSongId } = usePlayerStore();
const setCurrentTrack = (songId: string) => {
  setSongId(songId);
};

const download = async () => {
  try {
    console.log('dl')
    await api.download({ id: props.song.id, format: 'raw', maxBitRate: 0 })
  } catch (error) {
    alert(error)
    console.log(error)
  }
};
</script>

<style lang="scss">
@import './Song.scss';
</style>
