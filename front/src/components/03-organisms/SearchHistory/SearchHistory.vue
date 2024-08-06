<template>
  <ul v-if="showSearchHistory" class="u-list-reset o-search-history">
    <li
      v-for="query in getSearchHistory"
      :key="query.id"
    >
      <Stack :space-unit="2" :tag="'button'" :axis="'x'">
        <Vector :glyph="'clock'" />
        <Text :text="query" />
      </Stack>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useSearchStore } from '@/stores/search';
  import Stack from '@/components/01-atoms/Stack/Stack.vue';
  import Text from '@/components/01-atoms/Text/Text.vue';
  import Vector from '@/components/01-atoms/Vector/Vector.vue';

  const { getSearchHistory } = storeToRefs(useSearchStore());
  const showSearchHistory = computed(() => getSearchHistory.value.length !== 0);
</script>

<style lang="scss">
@import './SearchHistory.scss';
</style>