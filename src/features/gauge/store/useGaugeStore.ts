import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jsonStorage } from '../../../shared/storage/asyncStorage';
import { GaugeRecord } from '../types';

interface GaugeState {
  lastGauge: GaugeRecord | null;
  saveGauge: (record: GaugeRecord) => void;
}

export const useGaugeStore = create<GaugeState>()(
  persist(
    (set) => ({
      lastGauge: null,
      saveGauge: (record) => set({ lastGauge: record }),
    }),
    {
      name: 'knit-gauge-storage',
      storage: jsonStorage(),
    }
  )
);
