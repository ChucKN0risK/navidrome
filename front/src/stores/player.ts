import { defineStore } from 'pinia';
import { type NowPlaying } from 'subsonic-api';
import { api } from '@/main';

export type RootState = {
  nowPlaying?: string | null;
  currentSong?: NowPlaying | null;
};

export const usePlayerStore = defineStore('playerStore', {
  state: () => ({
    nowPlaying: null,
    currentSong: null,
  } as RootState),
  getters: {
    getNowPlayingUrl(state) {
      return state.nowPlaying;
    },
    getCurrentSong(state) {
      console.log('get', state.currentSong)
      return state.currentSong;
    },
  },
  actions: {
    async play(songId: string) {
      this.nowPlaying = null;
      try {
        const stream = await api.stream({ id: songId });
        this.nowPlaying = stream.url;
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
    async setCurrentSong() {
      this.currentSong = null;
      try {
        const currentSong = await api.getNowPlaying();
        console.log('set', currentSong)
        this.currentSong = currentSong.nowPlaying;
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
  },
})
