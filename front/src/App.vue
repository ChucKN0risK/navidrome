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
  <nav>
    <RouterLink to="/">Artists</RouterLink>
  </nav>

  <RouterView />

</template>

<style scoped>
nav {
  display: flex;
  height: 100%;
  max-height: 100%;
  padding: 2rem;
  width: 15rem;
}
</style>
