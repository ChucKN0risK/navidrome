<template>
  <div :class="['o-drawer-wrapper', isOpened ? 'is-open' : 'u-pointer-events:none']">
    <ul
      ref="drawer"
      class="u-list-reset o-drawer"
      :tabindex="isOpened ? 0 : -1"
      @keydown.esc.exact="closeDrawer"
    >
      <li v-for="option in getSongOptions(item)" :key="option.name">
        <Vector :glyph="option.icon" />
        <button @click.prevent="option.action">
          <Text :text="option.name" />
        </button>
      </li>
    </ul>
    <div v-if="isOpened" class="overlay" @click.stop="closeDrawer"></div>
  </div>
</template>

<script setup lang="ts">
  import { watchEffect, ref, } from 'vue';
  import { disablePageScroll, enablePageScroll } from '@/utils/document.utils';
  import { useDrawerStore } from '@/stores/drawer';
  import { storeToRefs } from 'pinia';
  import Vector from '@/components/01-atoms/Vector/Vector.vue';
  import Text from '@/components/01-atoms/Text/Text.vue';

  const { getItemId, getDrawerOpenState } = storeToRefs(useDrawerStore());
  const { removeItem, setDrawerOpenState } = useDrawerStore();

  const item = getItemId;
  const isOpened = getDrawerOpenState;
  const drawer = ref<HTMLElement | null>(null);

  watchEffect(() => {
    if (isOpened.value) {
      disablePageScroll();
      // TODO: find better way to handle this
      // so we don't have to use setTimeout
      setTimeout(() => {
        drawer.value?.focus();
      }, 300)
    } else {
      enablePageScroll();
    }
  });

  const closeDrawer = () => {
    removeItem();
    setDrawerOpenState(false);
  }

  const download = async (songId: string) => {
    try {
      console.log('dl')
      await api.download({ id: songId, format: 'raw'})
    } catch (error) {
      alert(error)
      console.log(error)
    }
  };

  const playNext = (songId: string) => {
    console.log(`Play next ${songId}`);
  };

  const playLater = (songId: string) => {
    console.log(`Play Later ${songId}`);
  };

  const getSongOptions = (songId: string) => {
    return [
      {
        name: 'Download',
        icon: 'download',
        action: () => download(songId)
      },
      {
        name: 'Play next',
        icon: 'add-to-queue',
        action: () => playNext(songId)
      },
      {
        name: 'Play later',
        icon: 'download',
        action: () => playLater(songId)
      },
    ];
  };
</script>

<style lang="scss">
  @import './Drawer.scss';
</style>