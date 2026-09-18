import { StyleSheet, View } from 'react-native';
import { theme } from '../theme';
import { AppText } from './AppText';

type Props = {
  title: string;
  description?: string;
};

export function EmptyState({ title, description }: Props) {
  return (
    <View style={styles.container}>
      <AppText variant="subtitle" center>
        {title}
      </AppText>
      {description ? (
        <AppText variant="body" color={theme.colors.textMuted} center>
          {description}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xxl,
    gap: theme.spacing.sm,
  },
});
