import { TUserInfo } from "../types/Types";

export const later = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function getFromLocalStorage(name: string) {
  const value = localStorage.getItem(name);
  if (!value) return null;
  return JSON.parse(value);
}
export function compare<T>(a: T, b: T): number {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}
export function upgradeAge<T extends TUserInfo>(player: T): T {
  if (typeof player.birthday === "number") return player;
  const age1 = new Date().getTime();
  const age2 = Date.parse(player.birthday);
  const newAge = Math.floor((age1 - age2) / (1000 * 60 * 60 * 24 * 30 * 12));
  const newPlayer = { ...player, birthday: newAge };
  return newPlayer;
}

export const checkUserEmail = (email: string) => {
  const doubleDots = email.match(/[.]{2,}/g);
  const startWithDot = email.match(/^[.]/);
  const nameAbuse = email.match(/^abuse[@]/);
  const namePostmaster = email.match(/^postmaster[@]/);
  const correctLength = email.match(/^.{1,30}[@]\w{2,9}[.]\w{2,9}$/);
  const specialSymbols = email.match(/[&=+<>,_'-\s]/g);
  if (doubleDots) return true;
  else if (startWithDot) return true;
  else if (nameAbuse) return true;
  else if (namePostmaster) return true;
  else if (!correctLength) return true;
  else if (specialSymbols) return true;
  else return false;
};
