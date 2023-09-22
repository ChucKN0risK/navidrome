<template>
  <main class="p-artists">
    <aside>
      <SpText v-if="artist" :text="artist.name" :type="'subtitle'" :tag="'h1'" class="p-artists__title" />
      <ul v-if="artist" class="c-artists-list u-list-reset">
        <li v-for="album in artist.album" :key="album.id">
          <RouterLink :to="{
            name: 'album',
            params: {
              albumId: album.id,
              artistId: artist.id
            }
          }">
            <AlbumCover
              :cover-url="fetchAlbumCover(album.id)"
              :size="'small'"
              class="o-player__play__cover"
            />
            <SpText :text="album.name" :type="'body-m'"/>
          </RouterLink>
        </li>
      </ul>
    </aside>
  </main>
</template>

<script setup lang="ts">
import { useArtistStore } from '@/stores/artist';
import { useAlbumStore } from '@/stores/album';
import SpText from '@/components/01-atoms/SpText/SpText.vue';
import AlbumCover from '@/components/01-atoms/AlbumCover/AlbumCover.vue';
import { storeToRefs } from 'pinia'

const props = defineProps<{
  id: string;
}>();

const { getArtist } = storeToRefs(useArtistStore());
const { fetchArtist } = useArtistStore();
const { getAlbumCover } = useAlbumStore();
fetchArtist(props.id);
const artist = getArtist;
const fetchAlbumCover = async (albumId: string) => {
  const cover = await getAlbumCover(albumId);
  console.log(cover);
  return cover;
};
</script>

<style>
  .p-artists__title + * {
    margin-top: var(--base-space-3);
  }

  .c-artists-list {
    a {
      display: flex;
      align-items: center;
      padding-top: var(--base-space-2);
      padding-bottom: var(--base-space-2);
      border-radius: var(--border-radius-small);
    }
  }
</style>
