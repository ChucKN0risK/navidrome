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
        console.log('now playing', stream.url)
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
    async registerCurrentSong(songId: string) {
      try {
        const scrobble = await api.scrobble({ id: songId, submission: false, time: 40 });
        console.log('scrobble song', scrobble)
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
    async setCurrentSong() {
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
