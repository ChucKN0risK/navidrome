<template>
  <ul class="base-list u-list-reset">
    <li v-for="album in albums" :key="album.id">
      <RouterLink :to="{
        name: 'album',
        params: {
          albumId: album.id,
          artistId: album.artistId
        }
      }">
        <AlbumCover
          :cover-url="albumCover[album.id]"
          :size="'small'"
        />
        <Text :text="album.name" :type="'body-m'" class="u-text-truncate" />
      </RouterLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useAlbumStore } from '@/stores/album';
  import { type AlbumID3 } from 'subsonic-api';
  import Text from '@/components/01-atoms/Text/Text.vue';
  import AlbumCover from '@/components/01-atoms/AlbumCover/AlbumCover.vue';

  const props = withDefaults(
    defineProps<{
      albums: Array<Pick<AlbumID3, 'id' | 'name' | 'artistId'>>;
    }>(),
    {
      albums: undefined,
    },
  );

  const { getAlbumCover } = useAlbumStore();
  const albumCover = ref<Record<string, string>>({});
  const fetchAlbumCover = async (albumId: string) => {
    const cover = await getAlbumCover(albumId);
    albumCover.value[albumId] = cover;
  };

  props.albums.forEach(album => fetchAlbumCover(album.id));
</script>