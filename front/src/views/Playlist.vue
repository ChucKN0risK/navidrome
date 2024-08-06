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
        {{ playlist.entry.length }} track(s) • {{ secondsToHHMMSS(playlist.duration) }}
      </Text>
    </Stack>
    <ul v-if="playlist" class="p-playlist__list base-list u-list-reset">
      <li
        v-for="song in playlist.entry"
        :key="song.id"
      >
        <Song
          :song="song"
          :album-cover="getSongAlbumCover(song)"
          @set-playing-song="setCurrentTrack"
        />
        <button
          class="o-song__options"
          @click.prevent="openItemOptions(song.id)"
        >
          <Vector
            :glyph="'dots-vertical'"
            :color="'gray-10'"
            :width="20"
            :height="20"
          />
        </button>
      </li>
    </ul>
  </Stack>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePlaylistStore } from '@/stores/playlist';
import { useAlbumStore } from '@/stores/album';
import { usePlayerStore } from '@/stores/player';
import { useDrawerStore } from '@/stores/drawer';
import { storeToRefs } from 'pinia';
import { type Child } from 'subsonic-api';
import { secondsToHHMMSS } from '@/utils/timeConverter.utils';
import Text from '@/components/01-atoms/Text/Text.vue';
import Stack from '@/components/01-atoms/Stack/Stack.vue';
import Vector from '@/components/01-atoms/Vector/Vector.vue';
import Song from '@/components/02-molecules/Song/Song.vue';

const props = defineProps<{
  id: string;
}>();

const { getPlaylist } = storeToRefs(usePlaylistStore());
const playlist = getPlaylist;

const { fetchPlaylist } = usePlaylistStore();
fetchPlaylist(props.id).then(() => {
  if (playlist.value && playlist.value.entry) {
    playlist.value.entry.forEach(entry => entry.albumId ? fetchAlbumCover(entry.albumId) : false);
  }
});

const { getAlbumCover } = useAlbumStore();
const albumCovers = ref<Record<string, string>>({});
const fetchAlbumCover = async (albumId: string) => {
  const cover = await getAlbumCover(albumId); // url
  return cover ? albumCovers.value[albumId] = cover : false;
};

const { setItem, setDrawerOpenState } = useDrawerStore();
const openItemOptions = (songId: string) => {
  setDrawerOpenState(true);
  setItem(songId);
};

const { setSongId } = usePlayerStore();
const setCurrentTrack = (songId: string) => {
  setSongId(songId);
};

const getSongAlbumCover = (song: Child) => {
  return song.albumId ? albumCovers.value[song.albumId] : '';
}
</script>

<style>
  .p-playlist__list {    
    li {
      display: flex;
      align-items: center;
    }
  }
</style>