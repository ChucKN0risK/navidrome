import { defineStore } from 'pinia';
import { type SearchResult2 } from 'subsonic-api';
import { api } from '@/main';

export type RootState = {
  searchQuery: string;
  searchResults: SearchResult2;
};

export const useSearchStore = defineStore('searchStore', {
  state: () => ({
    searchQuery: '',
    searchResults: [],
  } as RootState),
  getters: {
    getSearchQuery(state) {
      return state.searchQuery;
    },
    getSearchResults(state) {
      return state.searchResults;
    },
  },
  actions: {
    setSearchQuery(query: string) {
      this.searchQuery = query;
    },
    async search(query: string) {
      // this.nowPlaying = null;
      try {
        const results = await api.search2({ query });
        if (JSON.stringify(results.searchResult2) === '{}') {
          this.searchResults = [];
        } else {
          this.searchResults = results.searchResult2;
        }
      } catch (error) {
        alert(error)
        console.log(error)
      }
    }
  },
})
