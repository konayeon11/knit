# 도안 연습장 (Knit Chart Practice)

시니어를 위한 뜨개 **도안 작성 연습** 앱. 격자에 표준 기호를 찍어 도안을 그려보고, 문장식으로 확인하고,
증코/감코를 계산하는 것이 핵심 기능이며 카운터·게이지 계산기·바늘/실 변환기는 이를 보조하는 부가 도구입니다.

> 원래 MVP 범위 문서는 `docs/뜨개앱_MVP범위.md` 참고. 이 앱은 그중 도안 보관함(PDF/이미지 뷰어)과
> 기본 프로젝트 관리를 제외하고, Phase 2의 "도안 작성" 기능을 메인으로 재구성한 버전입니다.

## 핵심 기능
- **도안 작성 연습** (`src/features/charting`): 격자 캔버스, 표준 기호 팔레트(+뜻풀이 툴팁), 문자식 ↔
  차트식 자동 변환, 증코/감코 계산기, 반복구간 지정
- **카운터** (`src/features/counter`): 단수/코수 카운터, 반복구간 카운터, 자동 저장
- **게이지 계산기** (`src/features/gauge`): 스와치 코수/단수 → 10cm당 환산
- **바늘/실 굵기 변환기** (`src/features/converter`): mm / US / UK / JP 상호 변환

## 기술 스택
- Expo (managed) + React Native + TypeScript
- React Navigation (bottom-tabs + native-stack)
- Zustand + AsyncStorage (로컬 우선 저장, 서버 없음)

## 폴더 구조
```
src/
  navigation/   # 네비게이션 (RootNavigator, MainTabNavigator)
  features/
    charting/   # 핵심: 도안 작성 연습
    counter/    # 부가: 카운터
    gauge/      # 부가: 게이지 계산기
    converter/  # 부가: 바늘/실 굵기 변환기
  shared/
    theme/      # 시니어 친화 디자인 토큰 (큰 글씨, 고대비, 넓은 터치영역)
    components/ # 공용 UI 컴포넌트
    storage/    # AsyncStorage 래퍼 + zustand persist adapter
docs/           # MVP 범위 원본 문서
```

## 실행
```bash
npm install
npx expo start
```

## 빌드/배포 (EAS, 무료 티어)
```bash
npm install -g eas-cli
eas login
eas build --profile preview --platform android   # APK 테스트 빌드
eas build --profile production --platform all     # 스토어 제출용
```
`app.json`의 `ios.bundleIdentifier` / `android.package`는 placeholder(`com.konayeon11.knitchartpractice`)이므로
실제 배포 전 필요 시 변경하세요.

## 다음 단계
- 도안 작성 캔버스에 실제 표준 기호(JIS 계열) 아이콘 세트 적용
- 반복구간 지정 시 카운터 자동 생성 연동 고도화
- Phase 3: 사진/PDF 인식 초안 제안 등 AI 보조 기능
