<template>
  <div :class="['a-album-cover', `a-album-cover--${size}`]">
    <img :src="coverUrl" alt="" :width="imageSize.width" :height="imageSize.height">
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    coverUrl: string;
    size: 'small' | 'medium' | 'large';
  }>(),
  {
    coverUrl: '',
    size: 'medium',
  },
);

const imageSize = computed(() => {
  let imageSize = 40;
  
  if (props.size === 'medium') imageSize = 80;
  if (props.size === 'large') imageSize = 160;

  return {
    width: imageSize,
    height: imageSize,
  }
});
</script>

<style lang="scss">
  @import './AlbumCover.scss';
</style>