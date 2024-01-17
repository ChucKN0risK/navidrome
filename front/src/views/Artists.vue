<template>
  <main class="p-artists">
    <aside>
      <SpText :text="'Artists'" :type="'subtitle'" :tag="'h1'" class="base-title" />
      <ul class="u-list-reset">
        <li v-for="artist in getArtists" :key="artist.id">
          <RouterLink
            :to="{
              name: 'artist',
              params: {
                id: artist.id
              }
            }"
            class="base-list-item"
          >
            <Avatar
              :icon="{
                glyph: 'artists',
                width: 20,
                height: 20,
              }"
              size="small"
            />
            <SpText :text="artist.name" :type="'body-m'" class="u-text-truncate" />
          </RouterLink>
        </li>
      </ul>
    </aside>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useArtistsStore } from "@/stores/artists";
import SpText from '@/components/01-atoms/SpText/SpText.vue';
import Avatar from '@/components/01-atoms/Avatar/Avatar.vue';

const artistsStore = useArtistsStore();
const { fetchArtists } = useArtistsStore();
fetchArtists();
const getArtists = computed(() => {
  return artistsStore.getArtists;
});
</script>