export interface YarnWeightCategory {
  category: number;
  name: string;
  koreanName: string;
  recommendedNeedleMm: string;
}

// CYC(Craft Yarn Council) 국제 실 굵기 분류 기준 참고용 표
export const YARN_WEIGHTS: YarnWeightCategory[] = [
  { category: 0, name: 'Lace', koreanName: '레이스', recommendedNeedleMm: '1.5–2.25' },
  { category: 1, name: 'Super Fine', koreanName: '소크/페어링', recommendedNeedleMm: '2.25–3.25' },
  { category: 2, name: 'Fine', koreanName: '스포츠', recommendedNeedleMm: '3.25–3.75' },
  { category: 3, name: 'Light', koreanName: 'DK/라이트', recommendedNeedleMm: '3.75–4.5' },
  { category: 4, name: 'Medium', koreanName: '월드/아란', recommendedNeedleMm: '4.5–5.5' },
  { category: 5, name: 'Bulky', koreanName: '벌키', recommendedNeedleMm: '5.5–8.0' },
  { category: 6, name: 'Super Bulky', koreanName: '슈퍼벌키', recommendedNeedleMm: '8.0–12.75' },
  { category: 7, name: 'Jumbo', koreanName: '점보', recommendedNeedleMm: '12.75 이상' },
];
