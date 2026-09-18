import { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../theme';
import { AppText } from './AppText';

type Variant = 'primary' | 'secondary' | 'danger' | 'outline';
type Size = 'md' | 'lg';

type Props = PropsWithChildren<{
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  style?: ViewStyle;
}>;

const backgroundByVariant: Record<Variant, string> = {
  primary: theme.colors.primary,
  secondary: theme.colors.secondary,
  danger: theme.colors.danger,
  outline: 'transparent',
};

const pressedBackgroundByVariant: Record<Variant, string> = {
  primary: theme.colors.primaryPressed,
  secondary: theme.colors.secondaryPressed,
  danger: theme.colors.dangerPressed,
  outline: theme.colors.background,
};

const textColorByVariant: Record<Variant, string> = {
  primary: theme.colors.textOnPrimary,
  secondary: theme.colors.textOnPrimary,
  danger: theme.colors.textOnPrimary,
  outline: theme.colors.primary,
};

export function AppButton({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  style,
}: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        size === 'lg' ? styles.lg : styles.md,
        variant === 'outline' ? styles.outlineBorder : null,
        {
          backgroundColor: disabled
            ? theme.colors.disabled
            : pressed
              ? pressedBackgroundByVariant[variant]
              : backgroundByVariant[variant],
        },
        style,
      ]}
    >
      <AppText
        variant={size === 'lg' ? 'bodyLarge' : 'body'}
        bold
        color={disabled ? theme.colors.textMuted : textColorByVariant[variant]}
      >
        {children}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: theme.minTouchTarget,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  md: {
    minHeight: theme.minTouchTarget,
  },
  lg: {
    minHeight: theme.minTouchTarget + 8,
  },
  outlineBorder: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
});
