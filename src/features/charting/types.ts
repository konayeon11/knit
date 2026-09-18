import { SymbolId } from './symbols';

export interface RepeatSection {
  id: string;
  label: string;
  startRow: number;
  endRow: number;
  repeatCount: number;
  counterId?: string;
}

export interface Chart {
  id: string;
  title: string;
  rows: number;
  cols: number;
  cells: SymbolId[][];
  repeatSections: RepeatSection[];
  createdAt: number;
  updatedAt: number;
}
