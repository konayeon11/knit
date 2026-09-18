import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { theme } from '../../../shared/theme';
import { AppText } from '../../../shared/components';
import { STITCH_SYMBOLS, SymbolId } from '../symbols';
import { RepeatSection } from '../types';

type Props = {
  cells: SymbolId[][];
  cellSize: number;
  onCellPress: (row: number, col: number) => void;
  repeatSections?: RepeatSection[];
};

function isRowInAnySection(rowNumber: number, sections: RepeatSection[]): boolean {
  return sections.some((section) => rowNumber >= section.startRow && rowNumber <= section.endRow);
}

export function GridCanvas({ cells, cellSize, onCellPress, repeatSections = [] }: Props) {
  const rows = cells.length;
  const rowIndexesTopToBottom = Array.from({ length: rows }, (_, i) => rows - 1 - i);

  return (
    <ScrollView horizontal>
      <ScrollView>
        <View>
          {rowIndexesTopToBottom.map((rowIndex) => {
            const rowNumber = rowIndex + 1;
            const highlighted = isRowInAnySection(rowNumber, repeatSections);
            return (
              <View key={rowIndex} style={styles.row}>
                <View style={[styles.rowLabel, { height: cellSize }]}>
                  <AppText variant="caption">{rowNumber}</AppText>
                </View>
                {cells[rowIndex].map((symbol, colIndex) => (
                  <Pressable
                    key={colIndex}
                    onPress={() => onCellPress(rowIndex, colIndex)}
                    style={[
                      styles.cell,
                      {
                        width: cellSize,
                        height: cellSize,
                        backgroundColor: highlighted ? '#F3E9D8' : theme.colors.surface,
                      },
                    ]}
                  >
                    <AppText style={{ fontSize: Math.max(12, cellSize * 0.5) }}>
                      {STITCH_SYMBOLS[symbol].glyph}
                    </AppText>
                  </Pressable>
                ))}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  rowLabel: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cell: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
