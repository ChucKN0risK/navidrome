import { defineStore } from 'pinia';
import { type NowPlayingEntry } from 'subsonic-api';
import { api } from '@/main';

export type RootState = {
  nowPlaying?: string | null;
  currentSong?: NowPlayingEntry | null;
  songId?: string | null;
};

export const usePlayerStore = defineStore('playerStore', {
  state: () => ({
    nowPlaying: null,
    currentSong: null,
    songId: null,
  } as RootState),
  getters: {
    getNowPlayingUrl(state) {
      return state.nowPlaying;
    },
    getCurrentSong(state) {
      return state.currentSong;
    },
  },
  actions: {
    setSongId(songId: string) {
      this.songId = songId;
    },
    async loadSong(songId: string) {
      this.nowPlaying = null;
      try {
        const stream = await api.stream({ id: songId });
        this.nowPlaying = stream.url;
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
    async registerCurrentSong(songId: string) {
      try {
        // @ts-ignore
        await api.scrobble({ id: songId, submission: false });
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
    async setCurrentSong() {
      try {
        const currentSong = await api.getNowPlaying();
        this.currentSong = currentSong?.nowPlaying?.entry?.[0];
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
  },
})
