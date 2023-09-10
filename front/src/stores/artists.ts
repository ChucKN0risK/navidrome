import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { SubsonicAPI } from 'subsonic-api';
import { type ArtistWithAlbumsID3 } from 'subsonic-api';

const api = new SubsonicAPI({
  url: 'http://localhost:4533',
  type: 'navidrome', // or 'generic' or 'subsonic'
});

await api.login({
  username: 'admin',
  password: 'lucho',
});

export type RootState = {
  artists: Array<ArtistWithAlbumsID3>;
};

export const useArtistsStore = defineStore('artistStore', {
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
