import { api } from '@/main';

/** @name getCoverArtUrl */
/** @description Convert seconds from a number to formatted string */
/** @param {String} id */
/** @param {Number} size */
/** @return {String} The cover art URL */
export const getCoverArtUrl = async (id: string, size: number = 300) => {
  const result = await api.getCoverArt({ id, size });
  const covertArt: string = result.url;
  return covertArt;
}