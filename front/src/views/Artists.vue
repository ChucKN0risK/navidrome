<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useArtistStore } from "@/stores/artists";
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
      <ul>
        <li v-for="artist in getArtists" :key="artist.id">
          <a :href="artist.id">{{ artist.name }}</a>
        </li>
      </ul>
    </aside>
  </main>
</template>

<style>

</style>
