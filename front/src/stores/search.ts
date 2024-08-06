import { defineStore } from 'pinia';
import { type SearchResult2 } from 'subsonic-api';
import { api } from '@/main';

export type RootState = {
  searchQuery: string;
  searchResults: SearchResult2;
  searchHistory: string[];
};

export const useSearchStore = defineStore('searchStore', {
  state: () => ({
    searchQuery: '',
    searchResults: [],
    searchHistory: [],
  } as RootState),
  getters: {
    getSearchQuery(state) {
      return state.searchQuery;
    },
    getSearchResults(state) {
      return state.searchResults;
    },
    getSearchHistory(state) {
      return state.searchHistory;
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
    },
    saveSearchQuery(query: string) {
      const numberOfSavedQuery = 10;
      this.searchHistory.unshift(query);
      if (this.searchHistory.length >= numberOfSavedQuery) {
        this.searchHistory.pop();
      }
      return this.searchHistory = [...new Set(this.searchHistory)];
    }
  },
})
