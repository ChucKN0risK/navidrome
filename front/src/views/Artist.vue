<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useArtistStore } from '@/stores/artist';
import SpText from '@/components/01-atoms/SpText/SpText.vue';
import SpVector from '@/components/01-atoms/SpVector/SpVector.vue';

import { storeToRefs } from 'pinia'

const props = defineProps<{
  id: string;
}>();

// const artistStore = useArtistStore();
// artistStore.fetchArtist(props.id);
// const artist = computed(() => {
//   console.log('in compoennt', artistStore.getArtist)
//   return artistStore.getArtist;
// });

const { getArtist } = storeToRefs(useArtistStore())
const { fetchArtist } = useArtistStore();
fetchArtist(props.id);
const artist = getArtist;
// const artist = computed(() => {
//   return getArtist;
// });
</script>

<template>
  <main class="p-artists">
    <aside>
      <SpText v-if="artist" :text="artist.name" :type="'subtitle'" :tag="'h1'" class="p-artists__title" />
      <ul v-if="artist" class="c-artists-list u-list-reset">
        <li v-for="album in artist.album" :key="album.id">
          <RouterLink :to="{
            name: 'album',
            params: {
              albumId: album.id,
              artistId: artist.id
            }
          }">
            <img :src="album.coverArt" alt="">
            <SpText :text="album.name" :type="'body-m'"/>
            <SpVector :glyph="'arrow-right'" />
          </RouterLink>
          <!-- <SpText :text="album.name" :type="'body-m'"/> -->
        </li>
      </ul>
    </aside>
  </main>
</template>

<style>
  .p-artists__title + * {
    margin-top: var(--base-space-3);
  }

  .c-artists-list {
    a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: var(--base-space-2);
      padding-bottom: var(--base-space-2);
      border-radius: var(--border-radius);
    }
  }
</style>
