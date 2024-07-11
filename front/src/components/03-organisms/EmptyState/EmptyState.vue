<template>
  <Stack class="o-empty-state" :space-unit="4">
    <div class="o-empty-state__icon">
      <Vector :glyph="icon" />
    </div>
    <Text :text="text" />
  </Stack>
</template>

<script setup lang="ts">
  import Stack from '@/components/01-atoms/Stack/Stack.vue';
  import Text from '@/components/01-atoms/Text/Text.vue';
  import Vector from '@/components/01-atoms/Vector/Vector.vue';

  const props = withDefaults(
    defineProps<{
      icon: string | Function;
      text: string;
    }>(),
    {
      icon: undefined,
      text: undefined,
    },
  );
</script>

<style lang="scss">
  @import './EmptyState.scss';
</style>