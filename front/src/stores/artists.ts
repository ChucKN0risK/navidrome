import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { SubsonicAPI } from 'subsonic-api';

const api = new SubsonicAPI({
  url: 'http://localhost:4533',
  type: 'navidrome', // or 'generic' or 'subsonic'
});

await api.login({
  username: 'admin',
  password: 'lucho',
});

export interface Artist {
  id: string;
  name: string;
}

export type RootState = {
  artists: Artist[];
};

export const useArtistStore = defineStore('artistStore', {
  state: () => ({
    artists: [],
  } as RootState),
  getters: {
    getArtists(state) {
      return state.artists;
    }
  },
  actions: {
    async fetchArtists() {
      try {
        const data = await api.getArtists();
        const artists = [] as Artist[];
        data.artists.index?.map((artistChunck) => {
          artistChunck?.artist?.map((el) => {
            const artist = {
              id: el.id,
              name: el.name,
            }
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
