<script setup lang="ts">
import { computed } from "vue";
import { useArtistsStore } from "@/stores/artists";
import SpText from '@/components/01-atoms/SpText/SpText.vue';
import Avatar from '@/components/01-atoms/Avatar/Avatar.vue';
const artistsStore = useArtistsStore();
artistsStore.fetchArtists();
const getArtists = computed(() => {
  return artistsStore.getArtists;
});
</script>

<template>
  <main class="p-artists">
    <aside>
      <SpText :text="'Artists'" :type="'subtitle'" :tag="'h1'" class="p-artists__title" />
      <ul class="c-artists-list u-list-reset">
        <li v-for="artist in getArtists" :key="artist.id">
          <RouterLink
            :to="{
              name: 'artist',
              params: {
                id: artist.id
              }
            }"
            class="m-artist"
          >
            <Avatar
              :icon="{
                glyph: 'artists',
                width: 20,
                height: 20,
              }"
              size="small"
            />
            <SpText :text="artist.name" :type="'body-m'"/>
          </RouterLink>
        </li>
      </ul>
    </aside>
  </main>
</template>

<style>
  .p-artists__title + * {
    margin-top: var(--base-space-3);
  }

  .m-artist {
    display: flex;
    align-items: center;
    padding-top: var(--base-space-2);
    padding-bottom: var(--base-space-2);
    border-radius: var(--border-radius);

    & > * + * {
      margin-left: var(--base-space-2);
    }
  }
</style>
