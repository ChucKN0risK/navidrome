<template>
  <component
    :is="tag"
    v-if="text"
    ref="elementWithContent"
    :class="['a-text', type ? `a-text--${type}` : false, { 'u-user-select:text': isSelectable }]"
    :style="{
      color: color && !inheritParentColor ? `var(--${color})` : false,
      maxWidth,
    }"
    v-html="text"
  />
  <component
    :is="tag"
    v-else
    ref="elementWithSlot"
    :class="['a-text', type ? `a-text--${type}` : false, { 'u-user-select:text': isSelectable }]"
    :style="{
      color: color && !inheritParentColor ? `var(--${color})` : false,
      maxWidth,
    }"
  >
    <slot>
      {{ text }}
    </slot>
  </component>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { TextStyle } from '@/types/text.types';

const props = withDefaults(
  defineProps<{
    tag?: string;
    type?: TextStyle;
    color?: string;
    inheritParentColor?: boolean;
    text?: string | number;
    isSelectable?: boolean;
    maxWidth?: string;
  }>(),
  {
    tag: 'p',
    type: 'body-m',
    color: 'text-high-emphasis',
    inheritParentColor: false,
    text: '',
    isSelectable: false,
    maxWidth: 'auto',
  },
);
const emit = defineEmits(['mounted-content']);

const elementWithContent = ref({} as HTMLElement);
const elementWithSlot = ref({} as HTMLElement);

onMounted(() => {
  // Check if exist
  if (elementWithContent.value.scrollWidth) {
    emit('mounted-content', elementWithContent.value);
  }

  // Check if exist
  if (elementWithSlot.value.scrollWidth) {
    emit('mounted-content', elementWithSlot.value);
  }
});
</script>

<style lang="scss">
@import './SpText.scss';
</style>
