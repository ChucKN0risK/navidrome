<template>
  <main class="p-playlist">
    <aside>
      <SpText
        v-if="playlist"
        :text="playlist.name"
        :type="'subtitle'"
        :tag="'h1'"
        class="base-title"
      />
      <SpText v-if="playlist && playlist.entry" :type="'body-s'">
        {{ playlist.entry.length }} track(s)
      </SpText>
      <ul v-if="playlist" class="p-playlist__list base-list u-list-reset">
        <li
          v-for="song in playlist.entry"
          :key="song.id"
        >
          <Song
            :song="song"
            :album-cover="albumCover[song.albumId]"
          />
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
    </aside>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePlaylistStore } from '@/stores/playlist';
import { useAlbumStore } from '@/stores/album';
import SpText from '@/components/01-atoms/SpText/SpText.vue';
import SpVector from '@/components/01-atoms/SpVector/SpVector.vue';
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
  .p-playlist__list {    
    li {
      display: flex;
      align-items: center;
    }
  }
</style>
