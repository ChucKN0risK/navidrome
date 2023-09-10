<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useAlbumStore } from '@/stores/album';
import SpText from '@/components/01-atoms/SpText/SpText.vue';
import SpVector from '@/components/01-atoms/SpVector/SpVector.vue';

import { storeToRefs } from 'pinia'

const props = defineProps<{
  albumId: string;
}>();

const { fetchAlbum } = useAlbumStore();
fetchAlbum(props.albumId);
const { getAlbum } = storeToRefs(useAlbumStore())
const album = getAlbum;
</script>

<template>
  <main class="p-albums">
    <aside>
      <SpText v-if="album" :text="album.name" :type="'subtitle'" :tag="'h1'" class="p-artists__title" />
      <ul v-if="album" class="u-list-reset">
        <li v-for="song in album.song" :key="song.id">
          <!-- <RouterLink :to="{
            name: 'album',
            params: {
              id: album.id
            }
          }">
            <SpText :text="album.name" :type="'body-m'"/>
            <SpVector :glyph="'arrow-right'" />
          </RouterLink> -->
          <SpText :text="song.title" :type="'body-m'"/>
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
