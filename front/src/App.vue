<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
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
  <nav class="c-main-nav">
    <RouterLink to="/">Artists</RouterLink>
    <RouterLink to="/albums">Albums</RouterLink>
    <RouterLink to="/playlists">Playlists</RouterLink>
  </nav>

  <RouterView />

</template>

<style lang="scss">
  @import '@/assets/styles/style.scss';
</style>
