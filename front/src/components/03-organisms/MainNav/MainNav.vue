<template>
  <nav class="o-main-nav">
    <SearchBar class="o-main-nav__searchbar" />
    <Text
      :text="'Library'"
      :type="'subtitle'"
      class="o-main-nav__library-title base-title"
    />
    <RouterLink to="/" class="o-main-nav__artists">
      <Vector :glyph="'avatar'" />
      <Text :text="'Artists'" :type="'body-m'"/>
    </RouterLink>
    <RouterLink to="/playlists" class="o-main-nav__playlist-link">
      <Vector :glyph="'playlists'" />
      <Text :text="'Playlists'" :type="'body-m'"/>
    </RouterLink>
    <RouterLink to="/search" class="o-main-nav__search-link">
      <Vector :glyph="'magnifying-glass'" />
      <Text :text="'Search'" :type="'body-m'"/>
    </RouterLink>
    <Text
      :text="'Playlists'"
      :type="'subtitle'"
      class="o-main-nav__playlists-title base-title"
    />
    <ul class="base-list u-list-style:none">
      <li v-for="playlist in getPlaylists" :key="playlist.id">
        <RouterLink
          :to="{
            name: 'playlist',
            params: {
              id: playlist.id
            }
          }"
        >
          <Vector :glyph="'playlists'" />
          <Text :text="playlist.name" :type="'body-m'" color="text-high-emphasis"/>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { computed } from "vue";
  import { usePlaylistsStore } from "@/stores/playlists";
  import Text from '@/components/01-atoms/Text/Text.vue';
  import Vector from '@/components/01-atoms/Vector/Vector.vue';
  import SearchBar from '@/components/02-molecules/SearchBar/SearchBar.vue';

  const playlistsStore = usePlaylistsStore();
  const { fetchPlaylists } = usePlaylistsStore();
  fetchPlaylists();
  const getPlaylists = computed(() => {
    return playlistsStore.getPlaylists;
  });
</script>

<style lang="scss">
  @import './MainNav.scss';
</style>