import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jsonStorage } from '../../../shared/storage/asyncStorage';
import { generateId } from '../../../shared/utils/id';
import { SymbolId } from '../symbols';
import { Chart, RepeatSection } from '../types';

function createEmptyGrid(rows: number, cols: number): SymbolId[][] {
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => 'empty' as SymbolId));
}

interface ChartsState {
  charts: Chart[];
  createChart: (title: string, rows: number, cols: number) => string;
  deleteChart: (id: string) => void;
  renameChart: (id: string, title: string) => void;
  setCell: (chartId: string, row: number, col: number, symbol: SymbolId) => void;
  addRepeatSection: (chartId: string, section: Omit<RepeatSection, 'id'>) => string;
  removeRepeatSection: (chartId: string, sectionId: string) => void;
  getChart: (id: string) => Chart | undefined;
}

export const useChartsStore = create<ChartsState>()(
  persist(
    (set, get) => ({
      charts: [],

      createChart: (title, rows, cols) => {
        const id = generateId();
        const now = Date.now();
        const chart: Chart = {
          id,
          title,
          rows,
          cols,
          cells: createEmptyGrid(rows, cols),
          repeatSections: [],
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ charts: [chart, ...state.charts] }));
        return id;
      },

      deleteChart: (id) => {
        set((state) => ({ charts: state.charts.filter((chart) => chart.id !== id) }));
      },

      renameChart: (id, title) => {
        set((state) => ({
          charts: state.charts.map((chart) =>
            chart.id === id ? { ...chart, title, updatedAt: Date.now() } : chart
          ),
        }));
      },

      setCell: (chartId, row, col, symbol) => {
        set((state) => ({
          charts: state.charts.map((chart) => {
            if (chart.id !== chartId) return chart;
            const cells = chart.cells.map((r, rIndex) =>
              rIndex === row ? r.map((c, cIndex) => (cIndex === col ? symbol : c)) : r
            );
            return { ...chart, cells, updatedAt: Date.now() };
          }),
        }));
      },

      addRepeatSection: (chartId, section) => {
        const id = generateId();
        set((state) => ({
          charts: state.charts.map((chart) =>
            chart.id === chartId
              ? {
                  ...chart,
                  repeatSections: [...chart.repeatSections, { ...section, id }],
                  updatedAt: Date.now(),
                }
              : chart
          ),
        }));
        return id;
      },

      removeRepeatSection: (chartId, sectionId) => {
        set((state) => ({
          charts: state.charts.map((chart) =>
            chart.id === chartId
              ? {
                  ...chart,
                  repeatSections: chart.repeatSections.filter((s) => s.id !== sectionId),
                  updatedAt: Date.now(),
                }
              : chart
          ),
        }));
      },

      getChart: (id) => get().charts.find((chart) => chart.id === id),
    }),
    {
      name: 'knit-charts-storage',
      storage: jsonStorage(),
    }
  )
);
