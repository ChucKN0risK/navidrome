<template>
  <main class="base-layout p-search">
    <SearchBar/>
    <SearchHistory />
    <SearchResults />
  </main>
</template>

<script setup lang="ts">
  import SearchBar from '@/components/02-molecules/SearchBar/SearchBar.vue';
  import SearchHistory from '@/components/03-organisms/SearchHistory/SearchHistory.vue';
  import SearchResults from '@/components/03-organisms/SearchResults/SearchResults.vue';
</script>