// 일반 모바일 앱보다 한 단계 큰 기준치 — 시니어 사용자 가독성 우선
export const fontSize = {
  caption: 15,
  body: 18,
  bodyLarge: 20,
  subtitle: 22,
  title: 26,
  display: 32,
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  bold: '700',
} as const;

export const lineHeight = {
  caption: 20,
  body: 26,
  bodyLarge: 28,
  subtitle: 30,
  title: 34,
  display: 40,
} as const;

export type FontSizeToken = keyof typeof fontSize;
