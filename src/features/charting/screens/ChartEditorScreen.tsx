import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '../../../shared/theme';
import { AppButton, AppText, ScreenContainer } from '../../../shared/components';
import type { RootStackScreenProps } from '../../../navigation/navigation.types';
import { GridCanvas } from '../components/GridCanvas';
import { IncreaseDecreaseCalculator } from '../components/IncreaseDecreaseCalculator';
import { RepeatSectionManager } from '../components/RepeatSectionManager';
import { SymbolPalette } from '../components/SymbolPalette';
import { TextConversionPanel } from '../components/TextConversionPanel';
import { useChartsStore } from '../store/useChartsStore';
import { SymbolId } from '../symbols';

const MIN_CELL_SIZE = 24;
const MAX_CELL_SIZE = 56;
const ZOOM_STEP = 8;

type CellEdit = { row: number; col: number; prevSymbol: SymbolId };

export function ChartEditorScreen({ route, navigation }: RootStackScreenProps<'ChartEditor'>) {
  const { chartId } = route.params;
  const chart = useChartsStore((state) => state.charts.find((c) => c.id === chartId));
  const setCell = useChartsStore((state) => state.setCell);

  const [selectedSymbol, setSelectedSymbol] = useState<SymbolId>('knit');
  const [cellSize, setCellSize] = useState(36);
  const [showText, setShowText] = useState(false);
  const [undoStack, setUndoStack] = useState<CellEdit[]>([]);

  if (!chart) {
    return (
      <ScreenContainer>
        <AppText variant="subtitle">삭제된 연습 도안이에요.</AppText>
        <AppButton onPress={() => navigation.goBack()}>목록으로 돌아가기</AppButton>
      </ScreenContainer>
    );
  }

  function handleCellPress(row: number, col: number) {
    if (!chart) return;
    const prevSymbol = chart.cells[row][col];
    if (prevSymbol === selectedSymbol) return;
    setUndoStack((stack) => [...stack, { row, col, prevSymbol }]);
    setCell(chart.id, row, col, selectedSymbol);
  }

  function handleUndo() {
    if (!chart) return;
    const last = undoStack[undoStack.length - 1];
    if (!last) return;
    setCell(chart.id, last.row, last.col, last.prevSymbol);
    setUndoStack((stack) => stack.slice(0, -1));
  }

  return (
    <ScreenContainer scroll>
      <AppText variant="title">{chart.title}</AppText>

      <View style={styles.toolbar}>
        <AppButton
          variant="outline"
          onPress={() => setCellSize((size) => Math.max(MIN_CELL_SIZE, size - ZOOM_STEP))}
        >
          − 축소
        </AppButton>
        <AppButton
          variant="outline"
          onPress={() => setCellSize((size) => Math.min(MAX_CELL_SIZE, size + ZOOM_STEP))}
        >
          + 확대
        </AppButton>
        <AppButton variant="outline" disabled={undoStack.length === 0} onPress={handleUndo}>
          실행 취소
        </AppButton>
      </View>

      <SymbolPalette selected={selectedSymbol} onSelect={setSelectedSymbol} />

      <GridCanvas
        cells={chart.cells}
        cellSize={cellSize}
        onCellPress={handleCellPress}
        repeatSections={chart.repeatSections}
      />

      <AppButton variant="secondary" onPress={() => setShowText((v) => !v)}>
        {showText ? '문장식 숨기기' : '문장식으로 보기'}
      </AppButton>
      {showText ? <TextConversionPanel cells={chart.cells} /> : null}

      <IncreaseDecreaseCalculator />

      <RepeatSectionManager
        chartId={chart.id}
        chartTitle={chart.title}
        sections={chart.repeatSections}
        onOpenCounters={() => navigation.navigate('MainTabs', { screen: 'Counter' })}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
});
