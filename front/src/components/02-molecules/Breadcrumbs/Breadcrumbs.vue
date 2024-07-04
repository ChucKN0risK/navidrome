<template>
  <nav class="m-breadcrumbs" aria-label="breadcrumb">
    <ol>
      <li v-for="(element, index) in elements" :key="index">
        <sp-link
          v-if="index !== elements.length - 1 && element.path"
          :path="element.path"
          :tracking-value="element.trackingValue"
          class="m-breadcrumbs__link"
        >
          <text
            :text="element.text"
            :class="element.croppable ? 'm-breadcrumbs__croppable-text' : ''"
          />
        </sp-link>
        <text
          v-else
          :text="element.text"
          :color="'text-low-emphasis'"
          :class="[
            'm-breadcrumbs__text',
            {
              'm-breadcrumbs__croppable-text': element.croppable,
            },
          ]"
        />
      </li>
    </ol>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { BreadcrumbsElementsType } from '@/types/breadcrumbs.types';
import SpLink from '@/components/01-atoms/SpLink/SpLink.vue';
import Text from '@/components/01-atoms/Text/Text.vue';

export default defineComponent({
  name: 'Breadcrumbs',
  props: {
    elements: {
      type: Array as PropType<BreadcrumbsElementsType>,
      required: true,
    },
  },
  components: {
    SpLink,
    Text,
  },
});
</script>

<style lang="scss">
@import './Breadcrumbs.scss';
</style>
