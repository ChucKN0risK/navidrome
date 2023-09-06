<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useArtistStore } from "@/stores/artists";
import SpText from '@/components/01-atoms/SpText/SpText.vue';
import SpVector from '@/components/01-atoms/SpVector/SpVector.vue';
const store = useArtistStore();
onMounted(() => {
  store.fetchArtists();
});
const getArtists = computed(() => {
  return store.getArtists;
});
</script>

<template>
  <main class="p-artists">
    <aside>
      <SpText :text="'Artists'" :type="'subtitle'" :tag="'h1'" class="p-artists__title" />
      <ul class="c-artists-list u-list-reset">
        <li v-for="artist in getArtists" :key="artist.id">
          <a :href="artist.id">
            <span>{{ artist.name }}</span>
            <sp-vector :glyph="'arrow-right'" />
          </a>
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
