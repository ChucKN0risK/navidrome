<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useArtistStore } from "@/stores/artists";
import SpText from '@/components/01-atoms/SpText/SpText.vue';
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
      <SpText :text="'Artists'" :type="'text-title-1'" />
      <ul class="c-artists-list u-list-reset">
        <li v-for="artist in getArtists" :key="artist.id">
          <a :href="artist.id">{{ artist.name }}</a>
        </li>
      </ul>
    </aside>
  </main>
</template>

<style>
  .c-artists-list {
    a {
      display: flex;
      padding: 1rem;
    }
  }

  .u-list-reset {
    list-style: none;
    padding-inline-start: 0;
  }
</style>
