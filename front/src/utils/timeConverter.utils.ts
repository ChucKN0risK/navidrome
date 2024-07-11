/**
 * @name secondsToHHMMSS
 * @description Convert seconds from a number to formatted string
 * @param {Number} totalSeconds
 * @return {String}
 */
export const secondsToHHMMSS = (totalSeconds: number) => {
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
  let seconds = totalSeconds - (hours * 3600) - (minutes * 60);

  // Padding the values to ensure they are two digits
  if (hours < 10) { hours = '0' + hours; }
  if (minutes < 10) { minutes = '0' + minutes; }
  if (seconds < 10) { seconds = '0' + seconds; }

  return hours < 1 ?
    `${minutes}:${seconds}` :
    `${hours}:${minutes}:${seconds}`;
}
