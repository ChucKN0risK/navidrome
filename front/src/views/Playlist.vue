<template>
  <main class="p-playlist">
    <aside>
      <Text
        v-if="playlist"
        :text="playlist.name"
        :type="'subtitle'"
        :tag="'h1'"
        class="base-title"
      />
      <Text v-if="playlist && playlist.entry" :type="'body-s'">
        {{ playlist.entry.length }} track(s)
      </Text>
      <ul v-if="playlist" class="p-playlist__list base-list u-list-reset">
        <li
          v-for="song in playlist.entry"
          :key="song.id"
        >
          <Song
            :song="song"
            :album-cover="albumCover[song.albumId]"
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
    </aside>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePlaylistStore } from '@/stores/playlist';
import { useAlbumStore } from '@/stores/album';
import { useDrawerStore } from '@/stores/drawer';
import Text from '@/components/01-atoms/Text/Text.vue';
import Vector from '@/components/01-atoms/Vector/Vector.vue';
import Song from '@/components/02-molecules/Song/Song.vue';
import { storeToRefs } from 'pinia';
import { api } from '@/main';

const props = defineProps<{
  id: string;
}>();

const { fetchPlaylist } = usePlaylistStore();
fetchPlaylist(props.id).then(() => {
  // console.log('PL', playlist.value);
  playlist.value.entry.forEach(entry => fetchAlbumCover(entry.albumId));
});
const { getPlaylist } = storeToRefs(usePlaylistStore());
const playlist = getPlaylist;
const { getAlbumCover } = useAlbumStore();
const albumCover = ref<Record<string, string>>({});
const fetchAlbumCover = async (albumId: string) => {
  const cover = await getAlbumCover(albumId);
  albumCover.value[albumId] = cover;
};

const { setItem, setDrawerOpenState } = useDrawerStore();
const openItemOptions = (songId: string) => {
  setDrawerOpenState(true);
  setItem(songId);
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