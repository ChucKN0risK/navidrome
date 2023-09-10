<template>
  <component
    :is="tag"
    :class="[
      'a-avatar',
      look ? `a-avatar--${look}` : false,
      !image && color ? `a-avatar--${color}` : false,
      size ? `a-avatar--${size}` : false,
    ]"
    :style="!image && color ? `background-color: var(--${color});` : false"
  >
    <sp-vector
      v-if="!image && icon"
      :glyph="icon.glyph"
      :width="icon.width"
      :height="icon.height"
      class="a-avatar__icon"
    />
    <div v-if="image" :style="`background-image: url(${image});`" class="a-avatar__img" />
  </component>
</template>

<script setup lang="ts">
import SpVector from '@/components/01-atoms/SpVector/SpVector.vue';

const props = withDefaults(
  defineProps<{
    tag?: string;
    look?: string;
    color?: string;
    size?: 'small' | 'big' | 'huge' | null;
    image?: string | null;
    icon?: {
      glyph: string;
      width: number;
      height: number;
    } | null;
  }>(),
  {
    tag: 'div',
    look: '',
    color: 'gray-11',
    size: null,
    image: null,
    icon: null,
  },
);
</script>

<style lang="scss">
@import './Avatar.scss';
</style>
