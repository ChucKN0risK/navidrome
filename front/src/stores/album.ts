import { defineStore } from 'pinia';
import { type AlbumWithSongsID3, type AlbumInfo } from 'subsonic-api';
import { api } from '@/main';

export type RootState = {
  album?: AlbumWithSongsID3 & Pick<AlbumInfo, 'largeImageUrl'> | null;
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
        const albumData = await api.getAlbum({ id: albumId });
        const albumInfo = await api.getAlbumInfo({ id: albumId });
        const album = {
          ...albumData.album,
          largeImageUrl: albumInfo.albumInfo.largeImageUrl
        };
        this.album = album;
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
    async getAlbumCover(albumId: string) {
      try {
        const data = await api.getAlbumInfo({ id: albumId });
        const cover = data.albumInfo.largeImageUrl;
        return cover;
      } catch (error) {
        alert(error)
        console.log(error)
      }
    }
  },
})
