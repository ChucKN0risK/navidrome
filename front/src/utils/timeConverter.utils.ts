/** @name secondsToHHMMSS */
/** @description Convert seconds from a number to formatted string */
/** @param {Number} totalSeconds */
/** @return {String} */
export const secondsToHHMMSS = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
  const seconds = totalSeconds - (hours * 3600) - (minutes * 60);
  
  let formattedHours = `${hours}`;
  let formattedMin = `${minutes}`;
  let formattedSec = `${seconds}`;
  // Padding the values to ensure they are two digits
  if (hours < 10) { formattedHours = `0${hours}`; }
  if (minutes < 10) { formattedMin = `0${minutes}`; }
  if (seconds < 10) { formattedSec = `0${seconds}`; }

  return hours < 1 ?
    `${formattedMin}:${formattedSec}` :
    `${formattedHours}:${formattedMin}:${formattedSec}`;
}