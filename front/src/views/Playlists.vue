<template>
  <main class="p-playlists">
    <aside>
      <Text :text="'Playlists'" :type="'subtitle'" :tag="'h1'" class="base-title" />
      <ul class="base-list u-list-reset">
        <li v-for="playlist in getPlaylists" :key="playlist.id">
          <RouterLink
            :to="{
              name: 'playlist',
              params: {
                id: playlist.id
              }
            }"
          >
            <Avatar
              :icon="{
                glyph: 'playlists',
                width: 20,
                height: 20,
                color: 'icon-on-colored-bg'
              }"
              size="small"
            />
            <Text :text="playlist.name" :type="'body-m'" color="text-high-emphasis"/>
          </RouterLink>
        </li>
      </ul>
    </aside>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { usePlaylistsStore } from "@/stores/playlists";
import Text from '@/components/01-atoms/Text/Text.vue';
import Avatar from '@/components/01-atoms/Avatar/Avatar.vue';

const playlistsStore = usePlaylistsStore();
const { fetchPlaylists } = usePlaylistsStore();
fetchPlaylists();
const getPlaylists = computed(() => {
  return playlistsStore.getPlaylists;
});
</script>