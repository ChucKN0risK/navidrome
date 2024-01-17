<template>
  <Stack :space-unit="4" :tag="'main'" class="p-album">
    <AlbumDetails v-if="album" :album="album" />
    <ul v-if="album" class="o-song-list base-list u-list-reset">
      <li v-for="song in album.song" :key="song.id">
        <Song :song="song" :show-artist="false" />
        <VDropdown
          :distance="6"
          class="o-song__options"
        >
          <!-- This will be the popover reference (for the events and position) -->
          <button>
            <SpVector
              :glyph="'dots-horizontal'" :color="'white'" :width="20" :height="20"
            />
          </button>

          <!-- This will be the content of the popover -->
          <template #popper>
            <ul class="u-list-reset">
              <li v-for="option in getSongOptions(song.id)" :key="option.name">
                <button @click.prevent="option.action">{{ option.name }}</button>
              </li>
            </ul>
          </template>
        </VDropdown>
      </li>
    </ul>
  </Stack>
</template>

<script setup lang="ts">
import { useAlbumStore } from '@/stores/album';
import Stack from '@/components/01-atoms/Stack/Stack.vue';
import SpVector from '@/components/01-atoms/SpVector/SpVector.vue';
import AlbumDetails from '@/components/02-molecules/AlbumDetails/AlbumDetails.vue';
import Song from '@/components/02-molecules/Song/Song.vue';
import { storeToRefs } from 'pinia';
import { api } from '@/main';

const props = defineProps<{
  albumId: string;
}>();

const { fetchAlbum } = useAlbumStore();
fetchAlbum(props.albumId);
const { getAlbum } = storeToRefs(useAlbumStore());
const album = getAlbum;

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
      icon: 'download',
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

<style>
  .p-artists__title + * {
    margin-top: var(--base-space-3);
  }
</style>
