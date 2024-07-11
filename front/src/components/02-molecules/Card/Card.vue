<template>
  <article
    :class="[
      'm-card',
      `m-card--${look}`,
      { 'm-card--action': !!action && !hasCta },
      { 'm-card--link': !!link },
      { 'm-card--has-cta': hasCta },
      { 'm-card--disabled': !cardEnabled },
    ]"
    :style="{ '--aspect-ratio': getAspectRatio() }"
  >
    <component
      :is="getWrapperComponent().tag"
      class="m-card__content"
      v-on="getWrapperComponent().action ? getWrapperComponent().action : {}"
    >
      <slot name="header" class="m-card__header" />
      <component
        :is="link && cardType === 'full' ? SpLink : 'div'"
        :path="link ? link : null"
        :class="[
          {
            'u-margin-top:auto': !hasCta,
            'm-card__link': link,
          },
        ]"
      >
        <Stack :space-unit="2">
          <slot name="title">
            <Text
              :text="title"
              :type="'subtitle'"
              :color="look === 'dashed' ? 'text-low-emphasis' : 'text-high-emphasis'"
              class="u-limit-text"
            />
          </slot>
          <slot name="subtitle">
            <Text
              v-if="subtitle"
              :text="subtitle"
              type="body-s"
              color="text-low-emphasis"
              class="m-card__subtitle"
            />
          </slot>
        </Stack>
      </component>
      <SpButton
        v-if="cardType === 'cta'"
        :disabled="!action"
        :text="ctaText"
        :look="ctaLook"
        :full-width="true"
        class="m-card__action"
        @click="$event => action!($event)"
      />
      <a
        v-if="externalLink && cardType === 'ctaExternalLink'"
        :href="externalLink"
        class="m-card__action m-button m-button--full-width m-button--medium u-align-self:center"
        :class="[
          ctaLook ? `m-button--${ctaLook}` : '',
          {
            'm-card__action--external-link': externalLink && cardType === 'ctaExternalLink',
            'm-button--secondary': !ctaLook,
          },
        ]"
        target="_blank"
        rel="noreferrer"
      >
        <Stack :space-unit="2" :axis="'x'">
          <Text
            :type="'body-m'"
            :color="ctaLook === 'primary' ? 'text-on-colored-bg' : 'text-high-emphasis'"
            :text="ctaText ?? 'Send feedback'"
          />
          <Vector
            :glyph="'external-link'"
            :color="ctaLook === 'primary' ? 'icon-on-colored-bg' : 'icon-default'"
          />
        </Stack>
      </a>
    </component>
  </article>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';

import { TrackingValue } from '@/types/productMarketFit.types';
import { Look } from '@/types/button.types';

import Text from '@/components/01-atoms/Text/Text.vue';
import Stack from '@/components/01-atoms/Stack/Stack.vue';
// import SpLink from '@/components/01-atoms/SpLink/SpLink.vue';
import Vector from '@/components/01-atoms/Vector/Vector.vue';
import SpButton from '@/components/02-molecules/SpButton/SpButton.vue';

type CardProps = {
  cardEnabled?: boolean;
  title?: string;
  subtitle?: string;
  link?: RouteLocationRaw;
  action?: ((payload: MouseEvent) => void) | null;
  cardType?: 'full' | 'cta' | 'ctaExternalLink';
  externalLink?: string;
  hasCta?: boolean;
  ctaText?: string;
  ctaLook?: Look;
  tracking?: TrackingValue;
  look?: 'base' | 'dashed';
};

const props = withDefaults(defineProps<CardProps>(), {
  cardEnabled: true,
  title: '',
  subtitle: '',
  link: '',
  action: null,
  cardType: 'full',
  externalLink: '',
  hasCta: false,
  ctaText: '',
  ctaLook: 'primary',
  tracking: undefined,
  look: 'base',
});

const getWrapperComponent = () => {
  if (props.action && props.link) {
    throw new Error('A card must have an action either set as an action or a link.');
  }
  if (props.action && !props.hasCta) {
    return {
      tag: 'button',
      action: {
        click: (event: MouseEvent) => props.action!(event),
      },
    };
  }
  return { tag: 'div' };
};

const getAspectRatio = () => {
  return props.link || props.look === 'dashed' ? '1.44' : '1.14';
};
</script>

<style lang="scss">
  @import './Card.scss';
</style>