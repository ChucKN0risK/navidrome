<template>
  <picture>
    <!-- @TODO: Add back webp when really used (with cli) -->
    <!-- <source :srcset="sources.webp" type="image/webp" /> -->
    <source :srcset="sources[imgFormat]" :type="`image/${imgFormat}`" />
    <img :src="sources[imgFormat]" :alt="imgAlt" />
  </picture>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useColorTheme } from '@/piniaStores/colorTheme';

import type { AcceptedImgFormat } from './SpImg.types';

const props = withDefaults(
  defineProps<{
    imgSrc: string;
    imgAlt?: string;
    isSourceExternal?: boolean;
    imgFormat?: AcceptedImgFormat;
  }>(),
  {
    imgAlt: '',
    isSourceExternal: false,
    imgFormat: 'jpg',
  },
);

const themeStore = useColorTheme();

const matchIsModule = (module: unknown): module is { default: string } => {
  return (
    !!module &&
    typeof module === 'object' &&
    'default' in module &&
    typeof (module as { default: unknown }).default === 'string'
  );
};

const getSource = (src: string, format: AcceptedImgFormat, theme: 'dark' | 'light') => {
  if (props.isSourceExternal) {
    return `${props.imgSrc}.${format}`;
  }

  const path = `/src/assets/bitmaps/${src}-${theme}.${format}`;
  const modules = import.meta.glob('/src/assets/bitmaps/**/*.(png|jpg)', { eager: true });

  const mod = modules[path];

  return matchIsModule(mod) ? mod.default : '';
};

const formats: Array<AcceptedImgFormat> = [props.imgFormat];

const sources = computed(() => {
  return formats.reduce((acc, format) => {
    acc[format] = getSource(props.imgSrc, format, themeStore.currentColorScheme);
    return acc;
  }, {} as Record<AcceptedImgFormat, string>);
});
</script>
