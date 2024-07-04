<template>
  <div
    :style="style"
    :class="[
      'a-vector',
      {
        'a-vector--full-width': fullWidth,
      },
    ]"
  >
    <svg aria-hidden="true">
      <use :xlink:href="symbolId" fill="currentColor" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    glyph: string | Function;
    width?: number;
    height?: number;
    color?: string;
    filter?: string;
    fullWidth?: boolean;
  }>(),
  {
    width: undefined,
    height: undefined,
    color: undefined,
    filter: undefined,
    fullWidth: false,
  },
);

const style = computed(() => ({
  '--icon-width': props.width ? `${props.width}px` : 'var(--base-space-4)',
  '--icon-height': props.height ? `${props.height}px` : 'var(--base-space-4)',
  color: `var(--${props.color})`,
  filter: props.filter ? `${props.filter}` : '',
}));

const fileName = computed(() => (typeof props.glyph === 'string' ? props.glyph : props.glyph()));

const symbolId = computed(() => `#icon-${fileName.value}`);
</script>

<style lang="scss">
@import './Vector.scss';
</style>
