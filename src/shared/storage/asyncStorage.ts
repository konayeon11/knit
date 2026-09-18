import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, type StateStorage } from 'zustand/middleware';

// zustand persist 미들웨어가 요구하는 StateStorage 어댑터
export const zustandStorage: StateStorage = AsyncStorage;
export const jsonStorage = () => createJSONStorage(() => zustandStorage);

// zustand 스토어와 무관하게 값을 읽고 쓸 때 쓰는 범용 헬퍼
export async function getStoredValue<T>(key: string, fallback: T): Promise<T> {
  const raw = await AsyncStorage.getItem(key);
  if (raw == null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function setStoredValue<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function removeStoredValue(key: string): Promise<void> {
  await AsyncStorage.removeItem(key);
}
