import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jsonStorage } from '../../../shared/storage/asyncStorage';
import { generateId } from '../../../shared/utils/id';
import { Counter } from '../types';

interface CounterState {
  counters: Counter[];
  createCounter: (input: { title: string; max?: number; chartId?: string }) => string;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  reset: (id: string) => void;
  removeCounter: (id: string) => void;
  renameCounter: (id: string, title: string) => void;
}

export const useCounterStore = create<CounterState>()(
  persist(
    (set) => ({
      counters: [],

      createCounter: ({ title, max, chartId }) => {
        const id = generateId();
        const now = Date.now();
        const counter: Counter = {
          id,
          title,
          value: 0,
          max,
          chartId,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ counters: [counter, ...state.counters] }));
        return id;
      },

      increment: (id) => {
        set((state) => ({
          counters: state.counters.map((counter) =>
            counter.id === id
              ? { ...counter, value: counter.value + 1, updatedAt: Date.now() }
              : counter
          ),
        }));
      },

      decrement: (id) => {
        set((state) => ({
          counters: state.counters.map((counter) =>
            counter.id === id
              ? { ...counter, value: Math.max(0, counter.value - 1), updatedAt: Date.now() }
              : counter
          ),
        }));
      },

      reset: (id) => {
        set((state) => ({
          counters: state.counters.map((counter) =>
            counter.id === id ? { ...counter, value: 0, updatedAt: Date.now() } : counter
          ),
        }));
      },

      removeCounter: (id) => {
        set((state) => ({ counters: state.counters.filter((counter) => counter.id !== id) }));
      },

      renameCounter: (id, title) => {
        set((state) => ({
          counters: state.counters.map((counter) =>
            counter.id === id ? { ...counter, title, updatedAt: Date.now() } : counter
          ),
        }));
      },
    }),
    {
      name: 'knit-counters-storage',
      storage: jsonStorage(),
    }
  )
);
