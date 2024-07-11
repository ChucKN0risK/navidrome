<template>
  <div class="m-input m-searchbar">
    <Vector :glyph="'magnifying-glass'" />
    <input
      type="search"
      name="searchbar"
      id="search"
      placeholder="Search"
      autofocus="true"
      @input="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { useSearchStore } from '@/stores/search';
import Vector from '@/components/01-atoms/Vector/Vector.vue';
const { setSearchQuery, search } = useSearchStore();

const handleChange = async (e: Event) => {
  const { value } = e.target as HTMLSelectElement;
  if (value.trim().length !== 0) {
    setSearchQuery(value.trim());
    search(value.trim());
  }
  if (value.trim().length === 0) {
    console.log('nada')
    setSearchQuery('');
  }
};
</script>

<style lang="scss">
  @import './SearchBar.scss';
</style>