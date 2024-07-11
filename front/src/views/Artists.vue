<template>
  <main class="p-artists">
    <aside>
      <Text :text="'Artists'" :type="'subtitle'" :tag="'h1'" class="base-title" />
      <ArtistsList :artists="getArtists" />
    </aside>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useArtistsStore } from '@/stores/artists';
import Text from '@/components/01-atoms/Text/Text.vue';
import ArtistsList from '@/components/03-organisms/ArtistsList/ArtistsList.vue';

const artistsStore = useArtistsStore();
const { fetchArtists } = useArtistsStore();
fetchArtists();
const getArtists = computed(() => {
  return artistsStore.getArtists;
});
</script>