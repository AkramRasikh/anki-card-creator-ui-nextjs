export const secondsToMinutes = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const toSeconds = Math.floor(seconds % 60);
  return `${minutes}:${toSeconds < 10 ? '0' + toSeconds : toSeconds}`;
};
