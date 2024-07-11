<template>
  <main class="base-layout p-search">
    <SearchBar/>
    <SearchResults />
  </main>
</template>

<script setup lang="ts">
  import SearchBar from '@/components/02-molecules/SearchBar/SearchBar.vue';
  import SearchResults from '@/components/03-organisms/SearchResults/SearchResults.vue';
</script>