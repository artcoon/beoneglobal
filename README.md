# 비원글로벌 (BEONE GLOBAL) 웹사이트

주 자료 폴더: **`/Users/martin/Desktop/BEONE GLOBAL`** (제품 교육 HTML, 브랜딩, 회사 서류 등).

이전에 `~/Downloads`에 있던 문서도 일부 참고했습니다. **Vite + React + TypeScript** 단일 페이지입니다.

## 보안

`BEONE GLOBAL/01. 계약서 및 내부 문서/비원정보.rtf` 등에는 **비밀번호·관리자 계정**이 들어 있습니다. Git에 올리거나 웹 카피에 붙여 넣지 마세요. 공개 사이트에는 공식 URL·사업자등록번호처럼 **원래 대외 공개되는 정보**만 넣는 것을 권장합니다.

## 기획 · 디자인 요약 (v2)

- **IA**: 히어로 → 신뢰 지표 스트립 → 소개 → 비전 → 기술(번호 카드) → 제품 → 브랜드 IP → 글로벌(다크 밴드) → 공식몰 → 연락처 → 푸터.
- **비주얼**: 스포츠엔패치 마이크로사이트 계열 네이비·블루·오렌지, 프리텐다드 CDN, 히어로 그라데이션·노이즈·이미지 프레임.
- **UX**: 스크롤 시 헤더 고정 강조, `IntersectionObserver` 섹션 리빌(`prefers-reduced-motion` 시 비활성), 1080px 이하 햄버거 드로어·`Escape` 닫기·본문 바로가기.

## 실행

```bash
cd /Users/martin/Projects/biwon-global-web
npm install   # 이미 했다면 생략
npm run dev
```

브라우저에서 표시된 로컬 URL을 열면 됩니다.

## 문구·이미지 수정

- **카피·섹션 구성**: [`src/data/siteContent.ts`](src/data/siteContent.ts)
- **레이아웃·스타일**: [`src/App.tsx`](src/App.tsx), [`src/App.css`](src/App.css), [`src/index.css`](src/index.css)
- **정적 이미지**: [`public/assets/`](public/assets/) (브랜드 PNG 등 + 제품은 [`public/assets/products/`](public/assets/products/)에 `goods-{상품코드}`로 K비원몰 대표 컷과 1:1 매칭)

## 반드시 확인할 것

- **연락처·사업자 정보**: `siteContent.ts`의 `contact`는 플레이스홀더입니다. 공개 전 실제 이메일·전화·주소로 바꾸세요.
- **건강·효능 표현**: 자료에 나온 기술·협업 설명을 요약했을 뿐, **의료기기·건강기능식품 등 규제**에 맞는 표현인지 법무·담당 부서 검토가 필요합니다.

## 빌드

```bash
npm run build
```

결과물은 `dist/`에 생성됩니다.
