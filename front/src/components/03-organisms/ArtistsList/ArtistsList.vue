<template>
  <ul class="base-list u-list-reset">
    <li v-for="artist in artists" :key="artist.id">
      <RouterLink
        :to="{
          name: 'artist',
          params: {
            id: artist.id
          }
        }"
      >
        <Avatar
          :icon="{
            glyph: 'avatar',
            width: 20,
            height: 20,
          }"
          :size="'small'"
        />
        <Text :text="artist.name" :type="'body-m'" class="u-text-truncate" />
      </RouterLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { type ArtistWithAlbumsID3 } from 'subsonic-api';
  import Text from '@/components/01-atoms/Text/Text.vue';
  import Avatar from '@/components/01-atoms/Avatar/Avatar.vue';

  const props = withDefaults(
    defineProps<{
      artists: Array<Pick<ArtistWithAlbumsID3, 'id' | 'name'>>;
    }>(),
    {
      artists: undefined,
    },
  );
</script>