<template>
  <button
    :class="[
      'm-button',
      `m-button--${look}`,
      size ? `m-button--${size}` : false,
      { 'm-button--squared': squared },
      { 'm-button--full-width': fullWidth },
      { 'u-pointer-events:none': isLoading },
      { 'm-button--content-centered': contentCentered },
      { 'm-button--without-background': withoutBackground },
    ]"
    :disabled="disabled"
    :type="type"
  >
    <slot v-if="!isLoading" name="icon">
      <Vector
        v-if="icon && !iconCircled && !iconOnRight"
        :glyph="icon"
        :color="iconColor"
        class="m-button__icon"
      />
      <Vector-wrapper
        v-if="icon && iconCircled && !iconOnRight"
        :size="20"
        :glyph-size="12"
        :glyph="icon"
        class="m-button__icon"
      />
    </slot>
    <span v-if="!squared && !isLoading" class="m-button__text">
      <slot v-if="!text" />
      <span v-else>{{ text }}</span>
    </span>
    <slot name="tooltip" />
    <slot v-if="isLoading || iconOnRight" name="icon-right">
      <Vector
        :glyph="isLoading ? 'loader' : icon ? icon : ''"
        :color="
          look === 'primary' || look === 'destructive' ? 'icon-on-colored-bg' : 'icon-default'
        "
        :class="['m-button__icon', { 'is-rotating': isLoading }]"
      />
    </slot>
  </button>
</template>

<script setup lang="ts">
import Vector from '@/components/01-atoms/Vector/Vector.vue';
import VectorWrapper from '@/components/02-molecules/VectorWrapper/VectorWrapper.vue';
import { Look, Size } from '@/types/button.types';

const props = withDefaults(
  defineProps<{
    look?: Look;
    text?: string;
    size?: Size;
    squared?: boolean;
    fullWidth?: boolean;
    disabled?: boolean;
    contentCentered?: boolean;
    icon?: string;
    type?: 'button' | 'submit' | 'reset';
    isLoading?: boolean;
    withoutBackground?: boolean;
    iconColor?: string;
    iconOnRight?: boolean;
    iconCircled?: boolean;
  }>(),
  {
    look: 'primary',
    size: 'medium',
    squared: false,
    fullWidth: false,
    disabled: false,
    contentCentered: false,
    type: 'button',
    isLoading: false,
    withoutBackground: false,
    iconColor: 'icon-default',
    iconOnRight: false,
    iconCircled: false,
  },
);
</script>

<style lang="scss">
  @import './SpButton.scss';
</style>