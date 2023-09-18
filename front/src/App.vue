<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import SpText from '@/components/01-atoms/SpText/SpText.vue';
import SpVector from '@/components/01-atoms/SpVector/SpVector.vue';
import Player from '@/components/03-organisms/Player/Player.vue';
import MainNav from '@/components/03-organisms/MainNav/MainNav.vue';
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
  <Player />
  <MainNav />
  <RouterView />

</template>

<style lang="scss">
  @import '@/assets/styles/style.scss';
</style>
