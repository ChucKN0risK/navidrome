<template>
  <component
    :is="tag"
    :class="[
      'a-stack',
      axis === 'y' ? 'a-stack--vertical' : 'a-stack--horizontal',
      {
        'a-stack--full-width': isFullWidth && true,
      },
    ]"
    :style="style"
    >
      <slot />
  </component>
</template>

<script setup lang="ts">
import { type StyleValue } from 'vue';

const props = withDefaults(
  defineProps<{
    tag?: string;
    spaceUnit?: number;
    axis?: 'x' | 'y';
    isFullWidth?: boolean;
  }>(),
  {
    tag: 'div',
    spaceUnit: 1,
    axis: 'y',
    isFullWidth: false,
  },
);

const style: StyleValue = {
  '--space': `var(--base-space-${props.spaceUnit})`,
};
</script>

<style lang="scss">
  @import './Stack.scss';
</style>
