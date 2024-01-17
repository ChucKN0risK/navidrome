<template>
  <div :class="['a-album-cover', `a-album-cover--${size}`]">
    <img :src="coverUrl" alt="">
  </div>
</template>

<script setup lang="ts">
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

</script>

<style lang="scss">
@import './AlbumCover.scss';
</style>