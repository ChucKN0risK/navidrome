<template>
  <Stack :space-unit="4" :tag="'main'" class="p-album">
    <AlbumDetails v-if="album" :album="album" />
    <ul v-if="album" class="o-song-list u-list-reset">
      <Song v-for="song in album.song" :key="song.id" :song="song" :show-track-number="true" />
    </ul>
  </Stack>
</template>

<script setup lang="ts">
import { useAlbumStore } from '@/stores/album';
import Stack from '@/components/01-atoms/Stack/Stack.vue';
import AlbumDetails from '@/components/02-molecules/AlbumDetails/AlbumDetails.vue';
import Song from '@/components/02-molecules/Song/Song.vue';
import { storeToRefs } from 'pinia';

const props = defineProps<{
  albumId: string;
}>();

const { fetchAlbum } = useAlbumStore();
fetchAlbum(props.albumId);
const { getAlbum } = storeToRefs(useAlbumStore());
const album = getAlbum;
</script>

<style>
  .p-artists__title + * {
    margin-top: var(--base-space-3);
  }

  .o-song-list__song {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: transparent;
    border: none;
    color: var(--white);
    padding-top: var(--base-space-2);
    padding-bottom: var(--base-space-2);
    gap: var(--base-space-2);
  }

  .o-song__duration {
    margin-left: auto;
  }
</style>
