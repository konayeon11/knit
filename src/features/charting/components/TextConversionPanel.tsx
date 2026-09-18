import { StyleSheet, View } from 'react-native';
import { theme } from '../../../shared/theme';
import { AppText } from '../../../shared/components';
import { SymbolId } from '../symbols';
import { chartToText } from '../textConversion';

type Props = {
  cells: SymbolId[][];
};

export function TextConversionPanel({ cells }: Props) {
  const lines = chartToText(cells);

  return (
    <View style={styles.container}>
      {lines.map((line) => (
        <AppText key={line.rowNumber} variant="body">
          {line.rowNumber}단: {line.text}
        </AppText>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.xs,
  },
});
