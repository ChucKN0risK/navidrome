import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { type ArtistWithAlbumsID3 } from 'subsonic-api';
import { api } from '@/main';

export type RootState = {
  artists: Array<Pick<ArtistWithAlbumsID3, 'id' | 'name' | 'album'>>;
};

export const useArtistsStore = defineStore('artistsStore', {
  state: () => ({
    artists: []
  } as RootState),
  getters: {
    getArtists(state) {
      return state.artists.slice(0, 10);
    },
    getArtistById: (state) => {
      return (artistId: string) => state.artists.find((artist) => artist.id === artistId)
    },
  },
  actions: {
    async fetchArtists() {
      try {
        const data = await api.getArtists();
        const artists: RootState['artists'] = [];
        data.artists.index?.map((artistChunck) => {
          artistChunck?.artist?.map((artist) => {
            artists.push(artist);
          });
        });
        this.artists = artists;
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
  },
})
