<template>
  <div class="m-player-controls">
    <button @click.stop="$emit('play-previous')">
      <Vector :glyph="'double-arrow-left'" :width="30" :height="30" />
    </button>
    <button @click.stop="$emit('toggle-play-state')">
      <Vector :glyph="isPlaying ? 'pause' : 'play'" :width="30" :height="30" />
    </button>
    <button @click.stop="$emit('play-next')">
      <Vector :glyph="'double-arrow-right'" :width="30" :height="30" />
    </button>
  </div>
</template>

<script setup lang="ts">
  import Vector from '@/components/01-atoms/Vector/Vector.vue';
  
  const props = withDefaults(defineProps<{
    isPlaying: boolean,
  }>(), { isPlaying: false });
</script>

<style lang="scss">
  @import './PlayerControls.scss';
</style>