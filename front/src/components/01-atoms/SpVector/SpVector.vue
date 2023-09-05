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
  width: props.width ? `${props.width}px` : '',
  height: props.height ? `${props.height}px` : '',
  color: `var(--${props.color || 'icon-default'})`,
  filter: props.filter ? `${props.filter}` : '',
}));

const fileName = computed(() => (typeof props.glyph === 'string' ? props.glyph : props.glyph()));

const symbolId = computed(() => `#icon-${fileName.value}`);
</script>

<style lang="scss">
@import './SpVector.scss';
</style>
