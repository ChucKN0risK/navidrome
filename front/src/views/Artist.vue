<template>
  <main class="p-artists">
    <aside>
      <Text v-if="artist" :text="artist.name" :type="'subtitle'" :tag="'h1'" class="base-title" />
      <ul v-if="artist" class="base-list c-albums-list u-list-reset">
        <li v-for="album in artist.album" :key="album.id">
          <RouterLink :to="{
            name: 'album',
            params: {
              albumId: album.id,
              artistId: artist.id
            }
          }">
            <AlbumCover
              :cover-url="albumCover[album.id]"
              :size="'small'"
              class="o-player__play__cover"
            />
            <Text :text="album.name" :type="'body-m'" class="u-text-truncate" />
          </RouterLink>
        </li>
      </ul>
    </aside>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useArtistStore } from '@/stores/artist';
import { useAlbumStore } from '@/stores/album';
import Text from '@/components/01-atoms/Text/Text.vue';
import AlbumCover from '@/components/01-atoms/AlbumCover/AlbumCover.vue';
import { storeToRefs } from 'pinia'

const props = defineProps<{
  id: string;
}>();

const { getArtist } = storeToRefs(useArtistStore());
const { fetchArtist } = useArtistStore();
const { getAlbumCover } = useAlbumStore();
fetchArtist(props.id).then(() => {
  artist.value.album.forEach(album => fetchAlbumCover(album.id));
});
const artist = getArtist;
const albumCover = ref<Record<string, string>>({});
const fetchAlbumCover = async (albumId: string) => {
  const cover = await getAlbumCover(albumId);
  albumCover.value[albumId] = cover;
};
</script>

<style>
  /* .p-artists__title + * {
    margin-top: var(--base-space-3);
  } */

  .c-albums-list {
    a {
      display: flex;
      align-items: center;
      gap: var(--base-space-2);
    }
  }
</style>
