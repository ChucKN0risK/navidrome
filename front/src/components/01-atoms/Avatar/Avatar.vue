<template>
  <component
    :is="tag"
    :class="[
      'a-avatar',
      look ? `a-avatar--${look}` : false,
      !image && color ? `a-avatar--${color}` : false,
      size ? `a-avatar--${size}` : false,
      hasShadow ? 'has-shadow' : 'has-simple-border',
      isInList ? 'is-in-list' : false,
    ]"
    :style="!image && color ? `background-color: var(--${color});` : false"
  >
    <sp-text
      v-if="!image && !icon && text"
      :text="text"
      :color="'text-on-colored-bg'"
      class="u-text-transform:uppercase"
    />
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
import SpText from '@/components/01-atoms/SpText/SpText.vue';

const props = withDefaults(
  defineProps<{
    tag?: string;
    look?: string;
    color?: string;
    size?: 'small' | 'big' | 'huge' | null;
    hasShadow?: boolean;
    isInList?: boolean;
    image?: string | null;
    icon?: {
      glyph: string;
      width: number;
      height: number;
    } | null;
    text?: string;
  }>(),
  {
    tag: 'div',
    look: '',
    color: 'icon-info',
    size: null,
    hasShadow: false,
    isInList: false,
    image: null,
    icon: null,
    text: '',
  },
);
</script>

<style lang="scss">
@import './Avatar.scss';
</style>
