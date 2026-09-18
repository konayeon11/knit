import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { theme } from '../../../shared/theme';
import { AppText, Card, ScreenContainer } from '../../../shared/components';
import { NEEDLE_SIZES, NEEDLE_SYSTEM_LABEL, NeedleSize, NeedleSystem } from '../needleConversionTable';
import { YARN_WEIGHTS } from '../yarnWeightTable';

const SYSTEMS: NeedleSystem[] = ['mm', 'us', 'uk', 'jp'];

function valueFor(size: NeedleSize, system: NeedleSystem): string | null {
  if (system === 'mm') return `${size.mm}`;
  return size[system];
}

export function NeedleYarnConverterScreen() {
  const [system, setSystem] = useState<NeedleSystem>('mm');
  const [selectedMm, setSelectedMm] = useState<number | null>(null);

  const chipValues = NEEDLE_SIZES.filter((size) => valueFor(size, system) !== null);
  const selectedSize = NEEDLE_SIZES.find((size) => size.mm === selectedMm) ?? null;

  return (
    <ScreenContainer scroll>
      <AppText variant="title">바늘/실 굵기 변환기</AppText>

      <Card style={styles.card}>
        <AppText variant="subtitle">대바늘 굵기 변환</AppText>
        <AppText variant="caption">기준 표기를 고른 뒤, 값을 눌러보세요.</AppText>

        <View style={styles.systemRow}>
          {SYSTEMS.map((s) => (
            <Pressable
              key={s}
              onPress={() => setSystem(s)}
              style={[styles.systemChip, system === s ? styles.systemChipSelected : null]}
            >
              <AppText variant="body" bold={system === s}>
                {NEEDLE_SYSTEM_LABEL[s]}
              </AppText>
            </Pressable>
          ))}
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.valueRow}>
          {chipValues.map((size) => (
            <Pressable
              key={size.mm}
              onPress={() => setSelectedMm(size.mm)}
              style={[styles.valueChip, selectedMm === size.mm ? styles.valueChipSelected : null]}
            >
              <AppText variant="bodyLarge" bold>
                {valueFor(size, system)}
              </AppText>
            </Pressable>
          ))}
        </ScrollView>

        {selectedSize ? (
          <Card style={styles.resultCard}>
            <AppText variant="body">mm: {selectedSize.mm}</AppText>
            <AppText variant="body">US: {selectedSize.us ?? '해당 없음'}</AppText>
            <AppText variant="body">UK/영국: {selectedSize.uk ?? '해당 없음'}</AppText>
            <AppText variant="body">JP/일본: {selectedSize.jp ?? '해당 없음'}</AppText>
          </Card>
        ) : null}
      </Card>

      <Card style={styles.card}>
        <AppText variant="subtitle">실 굵기 참고표</AppText>
        <AppText variant="caption">국제 실 굵기 분류 기준 참고용 표예요.</AppText>
        <View style={styles.yarnTable}>
          {YARN_WEIGHTS.map((yarn) => (
            <View key={yarn.category} style={styles.yarnRow}>
              <AppText variant="body" bold>
                {yarn.category} · {yarn.koreanName}
              </AppText>
              <AppText variant="caption">추천 바늘 {yarn.recommendedNeedleMm}mm</AppText>
            </View>
          ))}
        </View>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: theme.spacing.sm,
  },
  systemRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  systemChip: {
    minHeight: theme.minTouchTarget,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.md,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  systemChipSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: '#F3E9D8',
  },
  valueRow: {
    gap: theme.spacing.sm,
  },
  valueChip: {
    minWidth: 64,
    minHeight: theme.minTouchTarget,
    borderRadius: theme.radius.md,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.sm,
  },
  valueChipSelected: {
    borderColor: theme.colors.secondary,
    backgroundColor: '#E3EDE9',
  },
  resultCard: {
    gap: theme.spacing.xs,
    backgroundColor: theme.colors.background,
  },
  yarnTable: {
    gap: theme.spacing.sm,
  },
  yarnRow: {
    gap: 2,
  },
});
