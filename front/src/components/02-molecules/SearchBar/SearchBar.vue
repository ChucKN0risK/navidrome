<template>
  <div class="m-input m-searchbar">
    <Vector :glyph="'magnifying-glass'" />
    <input
      type="search"
      name="searchbar"
      id="search"
      placeholder="Search"
      autofocus="true"
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { useSearchStore } from '@/stores/search';
import Vector from '@/components/01-atoms/Vector/Vector.vue';
const { setSearchQuery, search, saveSearchQuery } = useSearchStore();

const handleChange = async (e: Event) => {
  const { value } = e.target as HTMLSelectElement;
  const finalValue = value.trim();
  if (finalValue.length !== 0) {
    setSearchQuery(finalValue);
    search(finalValue);
    saveSearchQuery(finalValue);
  }
  if (finalValue.length === 0) {
    setSearchQuery('');
  }
};
</script>

<style lang="scss">
  @import './SearchBar.scss';
</style>