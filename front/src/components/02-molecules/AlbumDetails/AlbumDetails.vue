<template>
  <div class="m-album-details-container">
    <div class="m-album-details">
      <AlbumCover
        :cover-url="album.largeImageUrl"
        :size="'large'"
        class="m-album-details__cover"
      />
      <Stack :space-unit="1">
        <Text :text="album.artist" :type="'section'" class="m-album-details__artist" />
        <Text :text="album.name" :type="'title-1'" class="m-album-details__name" />
        <Text :type="'body-s'" class="m-album-details__year">
          {{ album.year ? album.year : 'Date unknown' }} • {{ secondsToHHMMSS(album.duration) }}
        </Text>
      </Stack>
    </div>
  </div>
</template>

<script setup lang="ts">
import Text from '@/components/01-atoms/Text/Text.vue';
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