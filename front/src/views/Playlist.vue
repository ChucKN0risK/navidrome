<template>
  <main class="p-artists">
    <aside>
      <SpText v-if="playlist" :text="playlist.name" :type="'subtitle'" :tag="'h1'" class="p-artists__title" />
      <ul v-if="playlist" class="c-albums-list u-list-reset">
        <Song v-for="song in playlist.entry" :key="song.id" :song="song" :show-track-number="false" :show-album-cover="true" />
      </ul>
    </aside>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePlaylistStore } from '@/stores/playlist';
import SpText from '@/components/01-atoms/SpText/SpText.vue';
import Song from '@/components/02-molecules/Song/Song.vue';
import { storeToRefs } from 'pinia'

const props = defineProps<{
  id: string;
}>();

const { fetchPlaylist } = usePlaylistStore();
fetchPlaylist(props.id);
const { getPlaylist } = storeToRefs(usePlaylistStore());
const playlist = getPlaylist;
console.log(playlist)
// const albumCover = ref<Record<string, string>>({});
// const fetchAlbumCover = async (albumId: string) => {
//   const cover = await getAlbumCover(albumId);
//   albumCover.value[albumId] = cover;
// };
</script>

<style>
  .p-artists__title + * {
    margin-top: var(--base-space-3);
  }

  .c-albums-list {
    a {
      display: flex;
      align-items: center;
      padding-top: var(--base-space-2);
      padding-bottom: var(--base-space-2);
      border-radius: var(--border-radius-small);
      gap: var(--base-space-2);
    }
  }
</style>
