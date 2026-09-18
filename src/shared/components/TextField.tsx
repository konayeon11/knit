import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { theme } from '../theme';
import { AppText } from './AppText';

type Props = TextInputProps & {
  label: string;
};

export function TextField({ label, style, ...inputProps }: Props) {
  return (
    <View style={styles.container}>
      <AppText variant="body" color={theme.colors.textMuted}>
        {label}
      </AppText>
      <TextInput
        placeholderTextColor={theme.colors.textMuted}
        style={[styles.input, style]}
        {...inputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.xs,
  },
  input: {
    minHeight: theme.minTouchTarget,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.fontSize.bodyLarge,
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
  },
});
