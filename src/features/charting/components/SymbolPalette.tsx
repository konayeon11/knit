import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { theme } from '../../../shared/theme';
import { AppText, Card } from '../../../shared/components';
import { STITCH_SYMBOLS, SYMBOL_ORDER, SymbolId } from '../symbols';

type Props = {
  selected: SymbolId;
  onSelect: (symbol: SymbolId) => void;
};

export function SymbolPalette({ selected, onSelect }: Props) {
  const selectedDef = STITCH_SYMBOLS[selected];

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {SYMBOL_ORDER.map((symbolId) => {
          const def = STITCH_SYMBOLS[symbolId];
          const isSelected = symbolId === selected;
          return (
            <Pressable
              key={symbolId}
              onPress={() => onSelect(symbolId)}
              style={[styles.chip, isSelected ? styles.chipSelected : null]}
            >
              <AppText variant="subtitle">{def.glyph || '·'}</AppText>
              <AppText variant="caption" numberOfLines={1}>
                {def.name}
              </AppText>
            </Pressable>
          );
        })}
      </ScrollView>

      <Card style={styles.description}>
        <AppText variant="body" bold>
          {selectedDef.glyph || '·'} {selectedDef.name}
        </AppText>
        <AppText variant="caption">{selectedDef.description}</AppText>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm,
  },
  row: {
    gap: theme.spacing.sm,
  },
  chip: {
    minWidth: 72,
    minHeight: theme.minTouchTarget,
    borderRadius: theme.radius.md,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    gap: 2,
  },
  chipSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: '#F3E9D8',
  },
  description: {
    padding: theme.spacing.sm,
  },
});
