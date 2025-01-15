import { Day } from "@prisma/client";

export function secondsToTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");

  return `${hours}:${minutes}`;
}

export function timeToSeconds(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 3600 + minutes * 60;
}

export function currentTime(): number {
  const now = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
    hour: "2-digit",
    minute: "2-digit",
  });
  return timeToSeconds(now.replace(" AM", "").replace(" PM", ""));
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

export function currentDay(): { day: Day; weekend: boolean } {
  const today = new Date(new Date().toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
  }));
  const day = today.getDay();

  if (day === 6 || day === 0) {
    return { day: Day.MONDAY, weekend: true };
  }

  return { day: Object.values(Day)[day - 1] as Day, weekend: false };
}
