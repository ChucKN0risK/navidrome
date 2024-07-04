<template>
  <nav class="o-main-nav">
    <Text :text="'Library'" :type="'subtitle'" class="o-main-nav__title"/>
    <RouterLink to="/">
      <vector :glyph="'artists'" />
      <Text :text="'Artists'" :type="'body-m'"/>
    </RouterLink>
    <RouterLink to="/playlists">
      <vector :glyph="'playlists'" />
      <Text :text="'Playlists'" :type="'body-m'"/>
    </RouterLink>
    <button>
      <vector :glyph="'search'" />
      <Text :text="'Search'" :type="'body-m'"/>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Text from '@/components/01-atoms/Text/Text.vue';
import Vector from '@/components/01-atoms/Vector/Vector.vue';
</script>

<style lang="scss">
@import './MainNav.scss';
</style>