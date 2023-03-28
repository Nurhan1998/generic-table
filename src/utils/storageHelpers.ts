import { EStorageKeys } from 'configuration/types/storageKeys';

export function getStorageData<T>(key: EStorageKeys | string): T | undefined {
  if (typeof localStorage === 'undefined') return;
  if (localStorage.getItem(key) === null) return;
  try {
    return JSON.parse(localStorage.getItem(key) || '{}') as T;
  } catch (err) {
    return;
  }
}

export function setStorage(key: EStorageKeys | string, data: unknown): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
}

export const clearStorageData = (): void => {
  if (typeof localStorage === 'undefined') return;
  localStorage.clear();
};

export function removeStorageItem(key: EStorageKeys | string): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem(key);
}

export function setSessionStorage(key: EStorageKeys | string, data: unknown): void {
  if (typeof sessionStorage === 'undefined') return;
  sessionStorage.setItem(key, JSON.stringify(data));
}

export function getSessionStorageData<T>(key: EStorageKeys | string): T | undefined {
  if (typeof sessionStorage === 'undefined') return;
  try {
    return JSON.parse(sessionStorage.getItem(key) || '{}') as T;
  } catch (err) {
    console.error(err);
  }
}

export function removeSessionStorageItem(key: EStorageKeys | string): void {
  if (typeof sessionStorage === 'undefined') return;
  sessionStorage.removeItem(key);
}
