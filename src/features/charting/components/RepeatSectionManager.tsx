import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '../../../shared/theme';
import { AppButton, AppText, Card, TextField } from '../../../shared/components';
import { useCounterStore } from '../../counter/store/useCounterStore';
import { useChartsStore } from '../store/useChartsStore';
import { RepeatSection } from '../types';

type Props = {
  chartId: string;
  chartTitle: string;
  sections: RepeatSection[];
  onOpenCounters: () => void;
};

export function RepeatSectionManager({ chartId, chartTitle, sections, onOpenCounters }: Props) {
  const addRepeatSection = useChartsStore((state) => state.addRepeatSection);
  const removeRepeatSection = useChartsStore((state) => state.removeRepeatSection);
  const createCounter = useCounterStore((state) => state.createCounter);

  const [label, setLabel] = useState('');
  const [startRow, setStartRow] = useState('');
  const [endRow, setEndRow] = useState('');
  const [repeatCount, setRepeatCount] = useState('');

  const canAdd = label.trim() && Number(startRow) > 0 && Number(endRow) >= Number(startRow) && Number(repeatCount) > 0;

  function handleAdd() {
    const counterId = createCounter({
      title: `${chartTitle} - ${label.trim()}`,
      max: Number(repeatCount),
      chartId,
    });
    addRepeatSection(chartId, {
      label: label.trim(),
      startRow: Number(startRow),
      endRow: Number(endRow),
      repeatCount: Number(repeatCount),
      counterId,
    });
    setLabel('');
    setStartRow('');
    setEndRow('');
    setRepeatCount('');
  }

  return (
    <Card style={styles.container}>
      <AppText variant="subtitle">반복 구간 → 카운터 연동</AppText>

      {sections.length === 0 ? (
        <AppText variant="caption">아직 지정한 반복 구간이 없어요.</AppText>
      ) : (
        <View style={styles.list}>
          {sections.map((section) => (
            <View key={section.id} style={styles.sectionRow}>
              <AppText variant="body">
                {section.label} ({section.startRow}~{section.endRow}단 × {section.repeatCount}회)
              </AppText>
              <AppButton size="md" variant="outline" onPress={() => removeRepeatSection(chartId, section.id)}>
                삭제
              </AppButton>
            </View>
          ))}
          <AppButton variant="secondary" onPress={onOpenCounters}>
            연동 카운터 보기
          </AppButton>
        </View>
      )}

      <View style={styles.form}>
        <TextField label="구간 이름" value={label} onChangeText={setLabel} placeholder="예: 무늬 반복" />
        <TextField label="시작 단" keyboardType="number-pad" value={startRow} onChangeText={setStartRow} />
        <TextField label="끝 단" keyboardType="number-pad" value={endRow} onChangeText={setEndRow} />
        <TextField label="반복 횟수" keyboardType="number-pad" value={repeatCount} onChangeText={setRepeatCount} />
        <AppButton onPress={handleAdd} disabled={!canAdd}>
          반복 구간 추가 + 카운터 만들기
        </AppButton>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.md,
  },
  list: {
    gap: theme.spacing.sm,
  },
  sectionRow: {
    gap: theme.spacing.xs,
  },
  form: {
    gap: theme.spacing.sm,
  },
});
