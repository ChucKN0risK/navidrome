<template>
  <div class="m-player-track-info">
    <Text :type="'body-m'" :text="title" />
    <Text :type="'body-xs'" :text="artist" :color="'gray-9'" />
  </div>
</template>

<script setup lang="ts">
  import Text from '@/components/01-atoms/Text/Text.vue';
  
  const props = withDefaults(
    defineProps<{
      title: string;
      artist: string;
    }>(),
    {
      title: undefined,
      artist: undefined
    },
  );
</script>

<style lang="scss">
  @import './PlayerTrackInfo.scss';
</style>