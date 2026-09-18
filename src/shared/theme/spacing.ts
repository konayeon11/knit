export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
} as const;

// iOS HIG 최소 44pt보다 넉넉하게 잡은 시니어 친화 최소 터치 영역
export const minTouchTarget = 56;

export type SpacingToken = keyof typeof spacing;
