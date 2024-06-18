<template>
  <main class="p-playlists">
    <aside>
      <SpText :text="'Playlists'" :type="'subtitle'" :tag="'h1'" class="base-title" />
      <ul class="u-list-reset">
        <li v-for="playlist in getPlaylists" :key="playlist.id">
          <RouterLink
            :to="{
              name: 'playlist',
              params: {
                id: playlist.id
              }
            }"
            class="base-list-item"
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