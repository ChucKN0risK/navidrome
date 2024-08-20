<template>
  <div :class="['m-player-progress', { 'is-interactive': interactive }]">
    <div v-show="interactive" class="m-player-progress__time">
      <Text :type="'body-xs'" :text="getPlayedDuration" />
      <Text :type="'body-xs'" :text="getSongDuration" />
    </div>
    <label for="seekbar" class="u-visually-hidden">Seekbar</label>
    <input
      id="seekbar"
      ref="seekBar"
      value="0"
      min="0"
      max="100"
      type="range"
      step="1"
      @change="emitSeekValue"
      @input="updateSeekStyle"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, type Ref, watch, computed } from 'vue';
  import { secondsToHHMMSS } from '@/utils/timeConverter.utils';
  import Text from '@/components/01-atoms/Text/Text.vue';

  const seekBar: Ref<HTMLInputElement | null> = ref(null);
  
  const props = withDefaults(
    defineProps<{
      trackDuration: number;
      trackProgress: number;
      interactive?: boolean;
    }>(),
    {
      trackDuration: 0,
      trackProgress: 0,
      interactive: true,
    },
  );

  watch(() => props.trackProgress, (progress) => {
    if (!seekBar.value) return;
    const trackProgress = `${Math.floor((progress / props.trackDuration) * 100)}`;
    document.documentElement.style.setProperty('--player-progress-bar-value', `${trackProgress}%`);
    seekBar.value.value = trackProgress;
  });

  const getPlayedDuration = computed(() => `${secondsToHHMMSS(props.trackProgress)}`);
  const getSongDuration = computed(() => `${secondsToHHMMSS(props.trackDuration)}`);

  const emit = defineEmits<{
    (emitName: 'update', seekValue: number): void;
  }>();

  const emitSeekValue = () => {
    if (!seekBar.value) {
      return;
    }
    emit('update', Number(seekBar.value.value));
  };

  const updateSeekStyle = () => {
    if (!seekBar.value) {
      return;
    }
    document.documentElement.style.setProperty('--player-progress-bar-value', `${seekBar.value.value}%`);
  };
</script>

<style lang="scss">
  @import './PlayerProgress.scss';
</style>