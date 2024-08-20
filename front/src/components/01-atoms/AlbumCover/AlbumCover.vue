<template>
  <div :class="['a-album-cover', `a-album-cover--${size}`]">
    <img
      alt=""
      loading="lazy"
      :src="coverUrl"
      :width="imageSize.width"
      :height="imageSize.height"
    >
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    coverUrl: string;
    size: 'small' | 'medium' | 'large' | 'full';
  }>(),
  {
    coverUrl: '',
    size: 'medium',
  },
);

const imageSize = computed(() => {
  let imageSize: string | number = 40;
  
  if (props.size === 'medium') imageSize = 80;
  if (props.size === 'large') imageSize = 160;
  if (props.size === 'full') imageSize = '100%';

  return {
    width: imageSize,
    height: imageSize,
  }
});
</script>

<style lang="scss">
  @import './AlbumCover.scss';
</style>