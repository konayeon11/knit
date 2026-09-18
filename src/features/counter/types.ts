export interface Counter {
  id: string;
  title: string;
  value: number;
  max?: number;
  chartId?: string;
  createdAt: number;
  updatedAt: number;
}
