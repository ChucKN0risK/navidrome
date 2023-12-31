import { defineStore } from 'pinia';
import { type ArtistWithAlbumsID3 } from 'subsonic-api';
import { api } from '@/main';

export type RootState = {
  artist?: ArtistWithAlbumsID3 | null;
};

export const useArtistStore = defineStore('artistStore', {
  state: () => ({
    artist: null,
  } as RootState),
  getters: {
    getArtist(state) {
      return state.artist;
    },
  },
  actions: {
    async fetchArtist(artistId: string) {
      this.artist = null;
      try {
        const data = await api.getArtist({ id: artistId });
        this.artist = data.artist;
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
  },
})
