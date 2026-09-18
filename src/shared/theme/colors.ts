// 시니어 친화 고대비 팔레트 — 배경/텍스트 대비를 크게 두고, 상태색은 명확히 구분되는 톤으로 선정
export const colors = {
  background: '#FAF7F2',
  surface: '#FFFFFF',
  border: '#DCD3C4',

  text: '#241F14',
  textMuted: '#5B5340',
  textOnPrimary: '#FFFFFF',

  primary: '#8A5A2B',
  primaryPressed: '#6E4620',
  secondary: '#3E6B5C',
  secondaryPressed: '#2F5347',

  danger: '#B3402A',
  dangerPressed: '#8F3220',
  success: '#3E6B5C',
  warning: '#B3812A',

  disabled: '#C9C1B0',
} as const;

export type ColorToken = keyof typeof colors;
