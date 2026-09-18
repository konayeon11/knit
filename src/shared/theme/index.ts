import { colors } from './colors';
import { fontSize, fontWeight, lineHeight } from './typography';
import { minTouchTarget, radius, spacing } from './spacing';

export const theme = {
  colors,
  fontSize,
  fontWeight,
  lineHeight,
  spacing,
  radius,
  minTouchTarget,
} as const;

export type Theme = typeof theme;

export * from './colors';
export * from './typography';
export * from './spacing';
