import { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { theme } from '../../../shared/theme';
import { AppButton, AppText, Card, ScreenContainer, TextField } from '../../../shared/components';
import { useGaugeStore } from '../store/useGaugeStore';

export function GaugeCalculatorScreen() {
  const lastGauge = useGaugeStore((state) => state.lastGauge);
  const saveGauge = useGaugeStore((state) => state.saveGauge);

  const [swatchStitches, setSwatchStitches] = useState('');
  const [swatchRows, setSwatchRows] = useState('');
  const [swatchWidthCm, setSwatchWidthCm] = useState('10');
  const [swatchHeightCm, setSwatchHeightCm] = useState('10');

  const result = useMemo(() => {
    const stitches = Number(swatchStitches);
    const rows = Number(swatchRows);
    const widthCm = Number(swatchWidthCm);
    const heightCm = Number(swatchHeightCm);
    if (!stitches || !rows || !widthCm || !heightCm) return null;
    return {
      stitchesPer10cm: (stitches / widthCm) * 10,
      rowsPer10cm: (rows / heightCm) * 10,
    };
  }, [swatchStitches, swatchRows, swatchWidthCm, swatchHeightCm]);

  function handleSave() {
    if (!result) return;
    saveGauge({
      swatchStitches: Number(swatchStitches),
      swatchRows: Number(swatchRows),
      swatchWidthCm: Number(swatchWidthCm),
      swatchHeightCm: Number(swatchHeightCm),
      stitchesPer10cm: result.stitchesPer10cm,
      rowsPer10cm: result.rowsPer10cm,
      updatedAt: Date.now(),
    });
  }

  return (
    <ScreenContainer scroll>
      <AppText variant="title">게이지 계산기</AppText>
      <AppText variant="body" color={theme.colors.textMuted}>
        스와치의 코수·단수와 실제 크기를 입력하면 10cm당 코수·단수로 환산해요.
      </AppText>

      <Card style={styles.card}>
        <TextField label="스와치 코수" keyboardType="number-pad" value={swatchStitches} onChangeText={setSwatchStitches} placeholder="예: 22" />
        <TextField label="스와치 단수" keyboardType="number-pad" value={swatchRows} onChangeText={setSwatchRows} placeholder="예: 30" />
        <TextField label="스와치 가로 (cm)" keyboardType="numeric" value={swatchWidthCm} onChangeText={setSwatchWidthCm} />
        <TextField label="스와치 세로 (cm)" keyboardType="numeric" value={swatchHeightCm} onChangeText={setSwatchHeightCm} />

        {result ? (
          <Card style={styles.resultCard}>
            <AppText variant="bodyLarge" bold>
              10cm당 {result.stitchesPer10cm.toFixed(1)}코 × {result.rowsPer10cm.toFixed(1)}단
            </AppText>
            <AppButton onPress={handleSave}>이 게이지 저장하기</AppButton>
          </Card>
        ) : null}
      </Card>

      {lastGauge ? (
        <Card>
          <AppText variant="subtitle">최근 저장한 게이지</AppText>
          <AppText variant="body">
            10cm당 {lastGauge.stitchesPer10cm.toFixed(1)}코 × {lastGauge.rowsPer10cm.toFixed(1)}단
          </AppText>
        </Card>
      ) : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: theme.spacing.sm,
  },
  resultCard: {
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.background,
  },
});
