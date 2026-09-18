import { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { theme } from '../theme';

type Props = PropsWithChildren<{
  onPress?: () => void;
  style?: ViewStyle;
}>;

export function Card({ children, onPress, style }: Props) {
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.card, pressed ? styles.pressed : null, style]}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  pressed: {
    backgroundColor: theme.colors.background,
  },
});
