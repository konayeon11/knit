// 지정한 단수(totalRows) 안에서 changeCount번의 증감코를 최대한 균등하게 배치할 단(1-based)을 계산
export function distributeChanges(totalRows: number, changeCount: number): number[] {
  if (changeCount <= 0 || totalRows <= 0) return [];

  const rows = new Set<number>();
  for (let i = 1; i <= changeCount; i += 1) {
    const row = Math.round((i * totalRows) / (changeCount + 1));
    rows.add(Math.min(totalRows, Math.max(1, row)));
  }

  return Array.from(rows).sort((a, b) => a - b);
}

export interface IncreaseDecreaseResult {
  type: 'increase' | 'decrease' | 'none';
  changeCount: number;
  rows: number[];
}

export function calcIncreaseDecrease(
  startStitches: number,
  targetStitches: number,
  rowsAvailable: number
): IncreaseDecreaseResult {
  const diff = targetStitches - startStitches;
  if (diff === 0 || rowsAvailable <= 0) {
    return { type: 'none', changeCount: 0, rows: [] };
  }

  const changeCount = Math.abs(diff);
  const rows = distributeChanges(rowsAvailable, changeCount);

  return {
    type: diff > 0 ? 'increase' : 'decrease',
    changeCount,
    rows,
  };
}
