import { STITCH_SYMBOLS, SymbolId } from './symbols';

// 연속된 동일 기호를 묶어 "겉뜨기 5, 안뜨기 3" 형태 문장으로 변환 (빈칸은 건너뜀)
export function rowToText(row: SymbolId[]): string {
  const runs: { symbol: SymbolId; count: number }[] = [];

  for (const symbol of row) {
    if (symbol === 'empty') continue;
    const last = runs[runs.length - 1];
    if (last && last.symbol === symbol) {
      last.count += 1;
    } else {
      runs.push({ symbol, count: 1 });
    }
  }

  if (runs.length === 0) return '(기호 없음)';

  return runs.map((run) => `${STITCH_SYMBOLS[run.symbol].name} ${run.count}`).join(', ');
}

// 도안 아래에서 위로 읽는 전통 방식대로 마지막 단부터 1단씩 문장을 생성
export function chartToText(cells: SymbolId[][]): { rowNumber: number; text: string }[] {
  const rows = cells.length;
  const lines: { rowNumber: number; text: string }[] = [];
  for (let rowIndex = rows - 1; rowIndex >= 0; rowIndex -= 1) {
    lines.push({ rowNumber: rowIndex + 1, text: rowToText(cells[rowIndex]) });
  }
  return lines;
}
