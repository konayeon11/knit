import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { theme } from '../../../shared/theme';
import { AppButton, AppText, Card, EmptyState, ScreenContainer, TextField } from '../../../shared/components';
import { useCounterStore } from '../store/useCounterStore';

export function CounterScreen() {
  const counters = useCounterStore((state) => state.counters);
  const createCounter = useCounterStore((state) => state.createCounter);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);
  const removeCounter = useCounterStore((state) => state.removeCounter);

  const [title, setTitle] = useState('');

  function handleCreate() {
    createCounter({ title: title.trim() || '새 카운터' });
    setTitle('');
  }

  return (
    <ScreenContainer>
      <AppText variant="title">카운터</AppText>
      <AppText variant="body" color={theme.colors.textMuted}>
        본판/소매 등 파트별로 여러 개를 동시에 운영할 수 있어요.
      </AppText>

      <Card style={styles.createCard}>
        <TextField label="새 카운터 이름" value={title} onChangeText={setTitle} placeholder="예: 본판" />
        <AppButton onPress={handleCreate}>+ 새 카운터 만들기</AppButton>
      </Card>

      {counters.length === 0 ? (
        <EmptyState title="아직 카운터가 없어요" description="위에서 새 카운터를 만들어보세요." />
      ) : (
        <FlatList
          data={counters}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Card>
              <AppText variant="subtitle">{item.title}</AppText>
              <AppText variant="display" center>
                {item.value}
                {item.max ? ` / ${item.max}` : ''}
              </AppText>
              <View style={styles.controls}>
                <AppButton size="lg" variant="danger" onPress={() => decrement(item.id)}>
                  − 1
                </AppButton>
                <AppButton size="lg" onPress={() => increment(item.id)}>
                  + 1
                </AppButton>
              </View>
              <View style={styles.controls}>
                <AppButton variant="outline" onPress={() => reset(item.id)}>
                  리셋
                </AppButton>
                <AppButton variant="outline" onPress={() => removeCounter(item.id)}>
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
  controls: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
});
