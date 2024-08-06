interface SavedSong {
  id: string;
  title: string;
  artist: string;
  albumCover?: string;
}

export const saveLastPlayedSong = (song: SavedSong): void => {
  window.localStorage.setItem('lastSong', JSON.stringify(song));
};

export const getLastPlayedSong = (): string => {
  return window.localStorage.getItem('lastSong') || '';
};

// export const removeCurrentSong = (): void => {
//   window.localStorage.removeItem('currentSong');
// };