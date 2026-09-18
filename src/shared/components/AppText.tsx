import { PropsWithChildren } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { theme } from '../theme';

type Variant = 'display' | 'title' | 'subtitle' | 'bodyLarge' | 'body' | 'caption';

type Props = PropsWithChildren<{
  variant?: Variant;
  color?: string;
  bold?: boolean;
  center?: boolean;
  style?: TextStyle;
  numberOfLines?: number;
}>;

export function AppText({
  children,
  variant = 'body',
  color,
  bold = false,
  center = false,
  style,
  numberOfLines,
}: Props) {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        styles[variant],
        color ? { color } : null,
        bold ? { fontWeight: theme.fontWeight.bold } : null,
        center ? { textAlign: 'center' } : null,
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  display: {
    fontSize: theme.fontSize.display,
    lineHeight: theme.lineHeight.display,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  title: {
    fontSize: theme.fontSize.title,
    lineHeight: theme.lineHeight.title,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: theme.fontSize.subtitle,
    lineHeight: theme.lineHeight.subtitle,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
  bodyLarge: {
    fontSize: theme.fontSize.bodyLarge,
    lineHeight: theme.lineHeight.bodyLarge,
    color: theme.colors.text,
  },
  body: {
    fontSize: theme.fontSize.body,
    lineHeight: theme.lineHeight.body,
    color: theme.colors.text,
  },
  caption: {
    fontSize: theme.fontSize.caption,
    lineHeight: theme.lineHeight.caption,
    color: theme.colors.textMuted,
  },
});
