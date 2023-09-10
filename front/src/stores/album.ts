import { defineStore } from 'pinia';
import { type AlbumWithSongsID3 } from 'subsonic-api';
import { api } from '@/main';

export type RootState = {
  album?: AlbumWithSongsID3 | null;
};

export const useAlbumStore = defineStore('albumStore', {
  state: () => ({
    album: null,
  } as RootState),
  getters: {
    getAlbum(state) {
      return state.album;
    },
  },
  actions: {
    async fetchAlbum(albumId: string) {
      this.album = null;
      try {
        const data = await api.getAlbum({ id: albumId });
        const data2 = await api.getAlbumInfo({ id: albumId });
        console.log(data2)
        // const artist = {
        //   id: data.artist.id,
        //   name: data.artist.name,
        //   albums: data.artist.album,
        //   albumCount: data.artist.albumCount
        // };
        this.album = data.album;
        console.log('in store', this.album)
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
  },
})
