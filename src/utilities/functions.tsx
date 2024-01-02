export const later = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
export function getFromLocalStorage(name: string) {
  const value = localStorage.getItem(name);
  if (!value) return null;
  return JSON.parse(value);
}
