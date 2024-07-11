<template>
  <stack v-if="!showEmptyState" :space-unit="4">
    <stack
      v-if="showArtists"
      :space-unit="2"
    >
      <Text
        :type="'subtitle'"
        :text="'Artists'"
      />
      <ArtistsList :artists="getSearchResults.artist" />
    </stack>
    <stack
      v-if="showAlbums"
      :space-unit="2"
    >
      <Text
        :type="'subtitle'"
        :text="'Albums'"
      />
      <AlbumsList :albums="getSearchResults.album" />
    </stack>
    <stack
      v-if="showSongs"
      :space-unit="2"
    >
      <Text
        :type="'subtitle'"
        :text="'Songs'"
      />
      <ul>
        <li
          v-for="song in getSearchResults.song"
          :key="song.id"
        >
          {{ song.title }}
        </li>
      </ul>
    </stack>
  </stack>
  <EmptyState
    v-if="showEmptyState"
    :icon="'magnifying-glass'"
    :text="'Hey maaaan, are you sure man?'"
  />
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useSearchStore } from '@/stores/search';
  import Stack from '@/components/01-atoms/Stack/Stack.vue';
  import Text from '@/components/01-atoms/Text/Text.vue';
  import EmptyState from '@/components/03-organisms/EmptyState/EmptyState.vue';
  import ArtistsList from '@/components/03-organisms/ArtistsList/ArtistsList.vue';
  import AlbumsList from '@/components/03-organisms/AlbumsList/AlbumsList.vue';

  const { getSearchResults, getSearchQuery } = storeToRefs(useSearchStore());
  const showArtists = computed(() => getSearchQuery.value !== '' && getSearchResults.value.artist && getSearchResults.value.artist?.length !== 0);
  const showAlbums = computed(() => getSearchQuery.value !== '' && getSearchResults.value.album && getSearchResults.value.album?.length !== 0);
  const showSongs = computed(() => getSearchQuery.value !== '' && getSearchResults.value.song && getSearchResults.value.song?.length !== 0);
  const showEmptyState = computed(() => getSearchQuery.value !== '' && !showArtists.value && !showAlbums.value && !showSongs.value)
</script>