<template>
  <main class="p-artists">
    <aside>
      <Text v-if="artist" :text="artist.name" :type="'subtitle'" :tag="'h1'" class="base-title" />
      <AlbumsList v-if="artist" :albums="artist.album" />
    </aside>
  </main>
</template>

<script setup lang="ts">
import { useArtistStore } from '@/stores/artist';
import { storeToRefs } from 'pinia';
import Text from '@/components/01-atoms/Text/Text.vue';
import AlbumsList from '@/components/03-organisms/AlbumsList/AlbumsList.vue';

const props = defineProps<{
  id: string;
}>();

const { getArtist } = storeToRefs(useArtistStore());
const { fetchArtist } = useArtistStore();
fetchArtist(props.id);
const artist = getArtist;
</script>
