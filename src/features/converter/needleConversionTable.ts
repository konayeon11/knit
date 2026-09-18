export interface NeedleSize {
  mm: number;
  us: string | null;
  uk: string | null;
  jp: string | null;
}

// 국제적으로 통용되는 대바늘 굵기 환산표 (일부 사이즈는 대응 표기가 없어 null)
export const NEEDLE_SIZES: NeedleSize[] = [
  { mm: 2.0, us: '0', uk: '14', jp: '0' },
  { mm: 2.25, us: '1', uk: '13', jp: '1' },
  { mm: 2.75, us: '2', uk: '12', jp: '2' },
  { mm: 3.0, us: null, uk: '11', jp: '3' },
  { mm: 3.25, us: '3', uk: '10', jp: '4' },
  { mm: 3.5, us: '4', uk: null, jp: '5' },
  { mm: 3.75, us: '5', uk: '9', jp: '6' },
  { mm: 4.0, us: '6', uk: '8', jp: '7' },
  { mm: 4.5, us: '7', uk: '7', jp: '8' },
  { mm: 5.0, us: '8', uk: '6', jp: '10' },
  { mm: 5.5, us: '9', uk: '5', jp: '11' },
  { mm: 6.0, us: '10', uk: '4', jp: '13' },
  { mm: 6.5, us: '10.5', uk: '3', jp: '15' },
  { mm: 7.0, us: null, uk: '2', jp: null },
  { mm: 8.0, us: '11', uk: '0', jp: null },
  { mm: 9.0, us: '13', uk: '00', jp: null },
  { mm: 10.0, us: '15', uk: '000', jp: null },
];

export type NeedleSystem = 'mm' | 'us' | 'uk' | 'jp';

export const NEEDLE_SYSTEM_LABEL: Record<NeedleSystem, string> = {
  mm: 'mm',
  us: 'US',
  uk: 'UK/영국',
  jp: 'JP/일본',
};
