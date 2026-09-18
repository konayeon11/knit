export type SymbolId = 'empty' | 'knit' | 'purl' | 'yarnOver' | 'k2tog' | 'ssk';

export interface StitchSymbolDef {
  id: SymbolId;
  glyph: string;
  name: string;
  description: string;
}

export const STITCH_SYMBOLS: Record<SymbolId, StitchSymbolDef> = {
  empty: {
    id: 'empty',
    glyph: '',
    name: '빈칸',
    description: '기호 없음 (이 칸은 뜨지 않음)',
  },
  knit: {
    id: 'knit',
    glyph: '│',
    name: '겉뜨기',
    description: '겉면을 볼 때 겉뜨기. 안면에서 뜰 때는 안뜨기로 뜹니다.',
  },
  purl: {
    id: 'purl',
    glyph: '━',
    name: '안뜨기',
    description: '겉면을 볼 때 안뜨기. 안면에서 뜰 때는 겉뜨기로 뜹니다.',
  },
  yarnOver: {
    id: 'yarnOver',
    glyph: '○',
    name: '바늘비우기 (증코)',
    description: '바늘에 실을 한 번 감아 1코를 늘립니다.',
  },
  k2tog: {
    id: 'k2tog',
    glyph: '╱',
    name: '오른코 모아뜨기 (감코)',
    description: '2코를 오른쪽으로 기울여 1코로 모아 뜹니다.',
  },
  ssk: {
    id: 'ssk',
    glyph: '╲',
    name: '왼코 모아뜨기 (감코)',
    description: '2코를 왼쪽으로 기울여 1코로 모아 뜹니다.',
  },
};

export const SYMBOL_ORDER: SymbolId[] = ['empty', 'knit', 'purl', 'yarnOver', 'k2tog', 'ssk'];
