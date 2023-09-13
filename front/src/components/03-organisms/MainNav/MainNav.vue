<template>
  <nav class="o-main-nav">
    <SpText :text="'Library'" :type="'subtitle'" class="o-main-nav__title"/>
    <RouterLink to="/">
      <sp-vector :glyph="'artists'" />
      <SpText :text="'Artists'" :type="'body-m'"/>
    </RouterLink>
    <RouterLink to="/albums">
      <sp-vector :glyph="'albums'" />
      <SpText :text="'Albums'" :type="'body-m'"/>
    </RouterLink>
    <RouterLink to="/playlists">
      <sp-vector :glyph="'playlists'" />
      <SpText :text="'Playlists'" :type="'body-m'"/>
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import SpText from '@/components/01-atoms/SpText/SpText.vue';
import SpVector from '@/components/01-atoms/SpVector/SpVector.vue';
</script>

<style lang="scss">
@import './MainNav.scss';
</style>