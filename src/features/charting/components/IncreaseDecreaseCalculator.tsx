import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '../../../shared/theme';
import { AppText, Card, TextField } from '../../../shared/components';
import { calcIncreaseDecrease } from '../increaseDecrease';

export function IncreaseDecreaseCalculator() {
  const [startStitches, setStartStitches] = useState('');
  const [targetStitches, setTargetStitches] = useState('');
  const [rowsAvailable, setRowsAvailable] = useState('');

  const result = useMemo(() => {
    const start = Number(startStitches);
    const target = Number(targetStitches);
    const rows = Number(rowsAvailable);
    if (!start || !target || !rows) return null;
    return calcIncreaseDecrease(start, target, rows);
  }, [startStitches, targetStitches, rowsAvailable]);

  return (
    <Card style={styles.container}>
      <AppText variant="subtitle">증코/감코 계산기</AppText>
      <TextField
        label="시작 코수"
        keyboardType="number-pad"
        value={startStitches}
        onChangeText={setStartStitches}
        placeholder="예: 60"
      />
      <TextField
        label="목표 코수"
        keyboardType="number-pad"
        value={targetStitches}
        onChangeText={setTargetStitches}
        placeholder="예: 80"
      />
      <TextField
        label="적용 단수"
        keyboardType="number-pad"
        value={rowsAvailable}
        onChangeText={setRowsAvailable}
        placeholder="예: 20"
      />

      {result ? (
        <View style={styles.result}>
          {result.type === 'none' ? (
            <AppText variant="body">변화 없음</AppText>
          ) : (
            <>
              <AppText variant="body" bold>
                {result.changeCount}코 {result.type === 'increase' ? '증코' : '감코'}
              </AppText>
              <AppText variant="body">{result.rows.map((row) => `${row}단`).join(', ')}에서 1코씩</AppText>
            </>
          )}
        </View>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm,
  },
  result: {
    marginTop: theme.spacing.xs,
    gap: theme.spacing.xs,
  },
});
