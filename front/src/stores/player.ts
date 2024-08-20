import { defineStore } from 'pinia';
import { useAlbumStore } from '@/stores/album';
import { type NowPlayingEntry, type Child } from 'subsonic-api';
import { api } from '@/main';

export type RootState = {
  nowPlaying?: string | null;
  currentSong?: NowPlayingEntry | null;
  songId?: string | null;
  playQueue?: Child[] | null;
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
    async setPlayQueue() {
      try {
        // 1. Récupérer toutes les chansons suivantes
        // dans la liste dans laquelle la chanson
        // jouée est actuellement
        const trackParentId = this.currentSong?.parent;
        await useAlbumStore().fetchAlbum(trackParentId!);
        const parentSongs = useAlbumStore().getAlbum?.song;
        const currentSongIndex = parentSongs?.findIndex((el: Child) => el.id === this.currentSong?.id);
        const nextSongs = parentSongs?.filter((_, index) => index >= currentSongIndex!);
        this.playQueue = nextSongs;
      } catch (error) {
        alert(error)
        console.log(error)
      }
    }
  },
})
