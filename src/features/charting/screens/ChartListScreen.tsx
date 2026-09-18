import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { theme } from '../../../shared/theme';
import { AppButton, AppText, Card, EmptyState, ScreenContainer, TextField } from '../../../shared/components';
import type { MainTabScreenProps } from '../../../navigation/navigation.types';
import { useChartsStore } from '../store/useChartsStore';

const DEFAULT_ROWS = 20;
const DEFAULT_COLS = 20;

export function ChartListScreen({ navigation }: MainTabScreenProps<'ChartList'>) {
  const charts = useChartsStore((state) => state.charts);
  const createChart = useChartsStore((state) => state.createChart);
  const deleteChart = useChartsStore((state) => state.deleteChart);

  const [title, setTitle] = useState('');

  function handleCreate() {
    const chartTitle = title.trim() || '이름 없는 연습 도안';
    const id = createChart(chartTitle, DEFAULT_ROWS, DEFAULT_COLS);
    setTitle('');
    navigation.navigate('ChartEditor', { chartId: id });
  }

  return (
    <ScreenContainer>
      <AppText variant="title">도안 작성 연습</AppText>
      <AppText variant="body" color={theme.colors.textMuted}>
        새 연습 도안을 만들고 격자에 기호를 찍어보세요.
      </AppText>

      <Card style={styles.createCard}>
        <TextField label="새 연습 도안 이름" value={title} onChangeText={setTitle} placeholder="예: 스와치 연습" />
        <AppButton onPress={handleCreate}>+ 새 연습 도안 만들기</AppButton>
      </Card>

      {charts.length === 0 ? (
        <EmptyState title="아직 연습 도안이 없어요" description="위에서 새 연습 도안을 만들어 시작해보세요." />
      ) : (
        <FlatList
          data={charts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Card onPress={() => navigation.navigate('ChartEditor', { chartId: item.id })}>
              <AppText variant="subtitle">{item.title}</AppText>
              <AppText variant="caption">
                {item.rows}단 × {item.cols}코
              </AppText>
              <View style={styles.cardActions}>
                <AppButton variant="outline" onPress={() => deleteChart(item.id)}>
                  삭제
                </AppButton>
              </View>
            </Card>
          )}
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  createCard: {
    gap: theme.spacing.sm,
  },
  list: {
    gap: theme.spacing.sm,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
