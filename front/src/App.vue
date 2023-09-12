<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import SpText from '@/components/01-atoms/SpText/SpText.vue';
import SpVector from '@/components/01-atoms/SpVector/SpVector.vue';
import Player from '@/components/03-organisms/Player/Player.vue';
</script>

<template>
  
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->
  <Player :song-id="'a1ad9997185abd50caee13ab725de838'" />
  <nav class="c-main-nav">
    <SpText :text="'Library'" :type="'subtitle'" class="c-main-nav__title"/>
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

  <RouterView />

</template>

<style lang="scss">
  @import '@/assets/styles/style.scss';
</style>
