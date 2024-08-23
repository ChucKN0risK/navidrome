<template>
  <Stack :space-unit="4" :tag="'main'" class="base-layout">
    <AlbumDetails v-if="album" :album="album" />
    <SongList
      v-if="album"
      :songs="songs"
      :show-artist="false"
      :cover-url="album.largeImageUrl"
    />
  </Stack>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAlbumStore } from '@/stores/album';
import { storeToRefs } from 'pinia';
import Stack from '@/components/01-atoms/Stack/Stack.vue';
import AlbumDetails from '@/components/02-molecules/AlbumDetails/AlbumDetails.vue';
import SongsList from '@/components/03-organisms/SongsList/SongsList.vue';

const props = defineProps<{
  albumId: string;
}>();

const { fetchAlbum } = useAlbumStore();
fetchAlbum(props.albumId);
const { getAlbum } = storeToRefs(useAlbumStore());
const album = getAlbum;
const songs = computed(() => album.value?.song ?? []);
</script>

<style>
  .p-artists__title + * {
    margin-top: var(--base-space-3);
  }
</style>