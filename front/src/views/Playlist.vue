<template>
  <Stack
    :tag="'main'"
    :space-unit="4"
    class="p-playlist base-layout"
  >
    <Stack :space-unit="1">
      <Text
        v-if="playlist"
        :text="playlist.name"
        :type="'subtitle'"
        :tag="'h1'"
        class="base-title"
      />
      <Text v-if="playlist && playlist.entry" :type="'body-s'">
        {{ playlist.songCount }} track(s) • {{ secondsToHHMMSS(playlist.duration) }}
      </Text>
    </Stack>
    <SongList
      v-if="playlist"
      :songs="songs"
    />
  </Stack>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePlaylistStore } from '@/stores/playlist';
import { usePlayerStore } from '@/stores/player';
import { useDrawerStore } from '@/stores/drawer';
import { storeToRefs } from 'pinia';
import { secondsToHHMMSS } from '@/utils/timeConverter.utils';
import Text from '@/components/01-atoms/Text/Text.vue';
import Stack from '@/components/01-atoms/Stack/Stack.vue';
import SongList from '@/components/03-organisms/SongList/SongList.vue';

const props = defineProps<{
  id: string;
}>();

const { fetchPlaylist } = usePlaylistStore();
fetchPlaylist(props.id);
const { getPlaylist } = storeToRefs(usePlaylistStore());
const playlist = getPlaylist;
const songs = computed(() => playlist.value?.entry ?? []);

const { setItem, setDrawerOpenState } = useDrawerStore();
const openItemOptions = (songId: string) => {
  setDrawerOpenState(true);
  setItem(songId);
};

const { setSongId } = usePlayerStore();
const setCurrentTrack = (songId: string) => {
  setSongId(songId);
};
</script>

<style>
  .p-playlist__list {    
    li {
      display: flex;
      align-items: center;
    }
  }
</style>