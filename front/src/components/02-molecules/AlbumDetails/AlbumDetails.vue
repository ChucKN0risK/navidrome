<template>
  <div class="m-album-details-container">
    <div class="m-album-details">
      <AlbumCover
        :cover-url="album.largeImageUrl"
        :size="'large'"
        class="m-album-details__cover"
      />
      <Stack :space-unit="1">
        <SpText :text="album.artist" :type="'section'" class="m-album-details__artist" />
        <SpText :text="album.name" :type="'title-1'" class="m-album-details__name" />
        <SpText :type="'body-s'" class="m-album-details__year">
          {{ album.year ? album.year : 'Date unknown' }} • {{ secondsToHHMMSS(album.duration) }}
        </SpText>
      </Stack>
    </div>
  </div>
</template>

<script setup lang="ts">
import SpText from '@/components/01-atoms/SpText/SpText.vue';
import Stack from '@/components/01-atoms/Stack/Stack.vue';
import AlbumCover from '@/components/01-atoms/AlbumCover/AlbumCover.vue';
import { type AlbumWithSongsID3, type AlbumInfo } from 'subsonic-api';
import { secondsToHHMMSS } from '@/utils/timeConverter.utils';

const props = defineProps<{
  album: AlbumWithSongsID3 & Pick<AlbumInfo, 'largeImageUrl'>;
}>();
</script>

<style lang="scss">
@import './AlbumDetails.scss';
</style>