<template>
<ul class="o-song-list base-list u-list-reset">
  <li v-for="song in songs" :key="song.id">
    <Song
      :song="song"
      :show-artist="showArtist"
      :show-cover="showCover"
      :cover-url="coverUrl"
      @set-playing-song="setCurrentTrack"
    />
    <button
      class="o-song__options"
      @click.once="openItemOptions(song.id)"
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
</template>

<script setup lang="ts">
import { type SongWithCover } from '@/types/subsonic.types';
import { type Child } from 'subsonic-api';
import { usePlayerStore } from '@/stores/player';
import { useDrawerStore } from '@/stores/drawer';
import Vector from '@/components/01-atoms/Vector/Vector.vue';
import Song from '@/components/02-molecules/Song/Song.vue';

const props = withDefaults(
  defineProps<{
    songs: Child[] | SongWithCover[] | null;
    coverUrl?: string;
    showCover?: boolean;
    showArtist?: boolean;
  }>(),
  {
    showCover: true,
    showArtist: true,
  },
);

const { setSongId } = usePlayerStore();
const setCurrentTrack = (songId: string) => {
  console.log(props.songs)
  setSongId(songId);
};

const { setItem, setDrawerOpenState } = useDrawerStore();
const openItemOptions = (songId: string) => {
  setDrawerOpenState(true);
  setItem(songId);
};
</script>

<style lang="scss">
@import './SongList.scss';
</style>