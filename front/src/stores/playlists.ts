import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { type Playlist } from 'subsonic-api';
import { api } from '@/main';

export type RootState = {
  playlists: Array<Pick<Playlist, 'id' | 'name'>>;
};

export const usePlaylistsStore = defineStore('playlistsStore', {
  state: () => ({
    playlists: []
  } as RootState),
  getters: {
    getPlaylists(state) {
      return state.playlists.slice(0, 10);
    },
    getPlaylistById: (state) => {
      return (playlistId: string) => state.playlists.find((playlist) => playlist.id === playlistId)
    },
  },
  actions: {
    async fetchPlaylists() {
      try {
        const data = await api.getPlaylists();
        const playlists: RootState['playlists'] = [];
        data.playlists.playlist?.map((playlist) => {
          playlists.push(playlist);
        });
        this.playlists = playlists;
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
  },
})
