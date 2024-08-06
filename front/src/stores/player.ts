import { defineStore } from 'pinia';
import { type NowPlayingEntry, type PlayQueue } from 'subsonic-api';
import { api } from '@/main';

export type RootState = {
  nowPlaying?: string | null;
  currentSong?: NowPlayingEntry | null;
  songId?: string | null;
  playQueue?: NowPlayingEntry | null;
};

export const usePlayerStore = defineStore('playerStore', {
  state: () => ({
    nowPlaying: null,
    currentSong: null,
    songId: null,
    playQueue: null,
  } as RootState),
  getters: {
    getNowPlayingUrl(state) {
      return state.nowPlaying;
    },
    getCurrentSong(state) {
      return state.currentSong;
    },
    getPlayQueue(state) {
      return state.playQueue;
    }
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
    async setPlayQueue(songId: string) {
      try {
        await api.savePlayQueue({ id: songId, position: 2 });
        const playQueue = await api.getPlayQueue();
        console.log(playQueue)
        // this.playQueue = playQueue;
      } catch (error) {
        alert(error)
        console.log(error)
      }
    }
  },
})
