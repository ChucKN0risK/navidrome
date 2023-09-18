<template>
  <Stack :space-unit="4" :tag="'main'" class="p-album">
    <AlbumDetails v-if="album" :album="album" />
    <ul v-if="album" class="o-song-list u-list-reset">
      <li v-for="song in album.song" :key="song.id">
        <button class="o-song-list__song" @click.prevent="setCurrentTrack(song.id)">
          <SpText :text="song.track" :type="'body-m'" />
          <SpText :text="song.title" :type="'body-m'" />
          <SpText :text="secondsToHHMMSS(song.duration)" :type="'body-m'" class="o-song__duration" />
        </button>
      </li>
    </ul>
  </Stack>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useAlbumStore } from '@/stores/album';
import { usePlayerStore } from '@/stores/player';
import { secondsToHHMMSS } from '@/utils/timeConverter.utils';
import SpText from '@/components/01-atoms/SpText/SpText.vue';
import Stack from '@/components/01-atoms/Stack/Stack.vue';
import AlbumDetails from '@/components/02-molecules/AlbumDetails/AlbumDetails.vue';

import { storeToRefs } from 'pinia'

const props = defineProps<{
  albumId: string;
}>();

const { fetchAlbum } = useAlbumStore();
fetchAlbum(props.albumId);
const { getAlbum } = storeToRefs(useAlbumStore())
const album = getAlbum;

const { setSongId } = usePlayerStore();
const setCurrentTrack = (songId: string) => {
  setSongId(songId);
};
</script>

<style>
  .p-artists__title + * {
    margin-top: var(--base-space-3);
  }

  .o-song-list__song {
    display: flex;
    align-items: center;
    width: 100%;
    padding-top: var(--base-space-2);
    padding-bottom: var(--base-space-2);
    gap: var(--base-space-2);
  }

  .o-song__duration {
    margin-left: auto;
  }
</style>
