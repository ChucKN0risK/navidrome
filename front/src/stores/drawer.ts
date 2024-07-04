import { defineStore } from 'pinia';
// import { type NowPlayingEntry } from 'subsonic-api';
// import { api } from '@/main';

export type RootState = {
  isOpened: boolean;
  itemId?: string | null;
};

export const useDrawerStore = defineStore('drawerStore', {
  state: () => ({
    isOpened: false,
    itemId: null,
  } as RootState),
  getters: {
    getDrawerOpenState(state) {
      return state.isOpened;
    },
    getItemId(state) {
      return state.itemId;
    },
  },
  actions: {
    setDrawerOpenState(state: boolean) {
      this.isOpened = state;
    },
    setItem(itemId: string) {
      this.itemId = itemId;
    },
    removeItem() {
      this.itemId = null;
    }
  },
})
