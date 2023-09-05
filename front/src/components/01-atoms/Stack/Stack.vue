<template>
  <component :is="tag">
    <div
      :class="[
        'a-stack',
        axis === 'y' ? 'a-stack--vertical' : 'a-stack--horizontal',
        {
          'a-stack--full-width': isFullWidth && true,
          'a-stack--align-items': alignItems !== null,
          'a-stack--justify-content': justifyContent !== null,
        },
      ]"
      :style="style"
    >
      <slot />
    </div>
  </component>
</template>

<script setup lang="ts">
import { StyleValue } from 'vue';

const props = withDefaults(
  defineProps<{
    tag?: string;
    spaceUnit?: number;
    axis?: 'x' | 'y';
    isFullWidth?: boolean;
    alignItems?:
      | 'normal'
      | 'stretch'
      | 'center'
      | 'start'
      | 'end'
      | 'flex-start'
      | 'flex-end'
      | 'baseline'
      | 'first baseline'
      | 'last baseline'
      | 'safe center'
      | 'unsafe center';
    justifyContent?:
      | 'center'
      | 'start'
      | 'end'
      | 'flex-start'
      | 'flex-end'
      | 'left'
      | 'right'
      | 'normal'
      | 'space-between'
      | 'space-around'
      | 'space-evenly'
      | 'stretch';
  }>(),
  {
    tag: 'div',
    spaceUnit: 1,
    axis: 'y',
    isFullWidth: false,
    alignItems: undefined,
    justifyContent: undefined,
  },
);

const style: StyleValue = {
  '--space': `var(--base-space-${props.spaceUnit})`,
  '--align-items': props.alignItems ?? undefined,
  '--justify-content': props.justifyContent ?? undefined,
};
</script>

<style lang="scss">
@import './Stack.scss';
</style>
