export function secondsToTime(seconds: number): string {
  return (
    Math.floor(seconds / 3600) +
    ":" +
    Math.floor((seconds / 3600 - Math.floor(seconds / 3600)) * 60)
  );
}

export function dueDate(dueDate: Date): string {
  const seconds = (dueDate.getTime() - Date.now()) / 1000;

  if (seconds < 3600) {
    return Math.round(seconds / 60) + " Menit";
  } else if (seconds < 86400) {
    return Math.round(seconds / 3600) + " Jam";
  }
  return Math.round(seconds / 86400) + " Hari";
}
