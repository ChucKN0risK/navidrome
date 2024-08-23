<template>
  <Drawer />
  <Player />
  <MainNav />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Drawer from '@/components/03-organisms/Drawer/Drawer.vue';
import Player from '@/components/03-organisms/Player/Player.vue';
import MainNav from '@/components/03-organisms/MainNav/MainNav.vue';
</script>

<style lang="scss">
  @import '@/assets/styles/style.scss';
</style>
