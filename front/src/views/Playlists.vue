<script setup lang="ts">
import { computed } from "vue";
import { usePlaylistsStore } from "@/stores/playlists";
import SpText from '@/components/01-atoms/SpText/SpText.vue';
import Avatar from '@/components/01-atoms/Avatar/Avatar.vue';

const playlistsStore = usePlaylistsStore();
const { fetchPlaylists } = usePlaylistsStore();
fetchPlaylists();
const getPlaylists = computed(() => {
  return playlistsStore.getPlaylists;
});
</script>

<template>
  <main class="p-artists">
    <aside>
      <SpText :text="'Playlists'" :type="'subtitle'" :tag="'h1'" class="p-artists__title" />
      <ul class="c-artists-list u-list-reset">
        <li v-for="playlist in getPlaylists" :key="playlist.id">
          <RouterLink
            :to="{
              name: 'playlist',
              params: {
                id: playlist.id
              }
            }"
            class="m-artist"
          >
            <Avatar
              :icon="{
                glyph: 'playlists',
                width: 20,
                height: 20,
              }"
              size="small"
            />
            <SpText :text="playlist.name" :type="'body-m'"/>
          </RouterLink>
        </li>
      </ul>
    </aside>
  </main>
</template>