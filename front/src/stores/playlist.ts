import { defineStore } from 'pinia';
import { type PlaylistWithSongs } from 'subsonic-api';
import { api } from '@/main';

export type RootState = {
  playlist?: PlaylistWithSongs | null;
};

export const usePlaylistStore = defineStore('playlistStore', {
  state: () => ({
    playlist: null,
  } as RootState),
  getters: {
    getPlaylist(state) {
      return state.playlist;
    },
  },
  actions: {
    async fetchPlaylist(playlistId: string) {
      this.playlist = null;
      try {
        console.log('coucou')
        const data = await api.getPlaylist({ id: playlistId });
        this.playlist = data.playlist;
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
  },
})
