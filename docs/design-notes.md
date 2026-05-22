# Design notes — static imagery

## 에디토리얼·럭셔리 목업 (`public/assets/editorial/`)

- **소스**: `~/.cursor/projects/Users-martin-Projects-Beone-global-web/assets/` 에서만 동기화합니다. 스크립트: `python3 scripts/sync_editorial_from_cursor_assets.py`
- **포함**: `Beone_Global_Brand_Guideline_Final_20260225_Page_*.png` 전부(페이지 번호 순), 파일 크기 **≥ 100 000 bytes** 인 `design-element-*.png` 만(대형 목업).
- **제외**: `Screenshot_*`, 100 000 bytes 미만의 작은 `design-element-*`(칩·아이콘), IR/PPT 슬라이드 스크린샷.
- **파일 명명**:
  - **`premium-01.png` … `premium-{N}.png`**: 풀 순서는 **큰 design-element(크기 내림차순)** → **Beone 가이드라인 페이지(페이지 번호 오름차순)**. 스크립트가 쓰는 `N`과 `galleryCount`+`galleryPremiumStart` 조합이 맞아야 합니다(앞 슬라이드 제외 시 `galleryPremiumStart: 8` 등으로 조정).
  - **시맨틱 복사본**(같은 풀에서 복사): `hero.png`, `overview-aside.png`, `philosophy-wide.png`, `philosophy-hero-band.png`(경영철학 상단 풀폭 밴드; 동기화 시 `philosophy-wide`와 동일 소스에서 복사 가능), `global-cta.png`(스크립트가 풀에서 채움) — 개요·철학 등에 사용. 개요 우측 패널의 **둘째 레이어**(`overviewAsideSecondary`)는 선택 사항이며, 제품 다이어그램을 쓰지 않으려면 `siteContent`에서 생략합니다. **`#global`** 협업·글로벌 섹션 배경 사진은 **`public/images/global-section-bg.png`**(CSS 고정 경로; 없으면 `#021a18` 폴백)로 넣는다.
  - **히어로**: 배경은 **그라데이션 + `.hero__mesh`(CSS 그라데이션)** 만 사용한다. (과거: 풀블리드 에디토리얼 2장 크로스페이드 + 가이드라인 목업 레이어 — 제거됨.)
- **가로 갤러리**: 개요와 경영철학 사이 `EditorialGalleryStrip` — `site.editorial.galleryPremiumStart`부터 `galleryCount`개의 `premium-NN`만 노출.
- **#technology**: 배너 이미지 없음 — `.technology-accent` 만 유지.

## 브랜드·제품

- **로고·락업**: `public/assets/brand/logo-nav.png`, `logo-lockup.png`.
- **가이드라인 목업 PNG**(선택 자산): `public/assets/brand/hero-guideline-mockup.png` — 동기화 시 Beone **Page_58** 우선으로 갱신 가능. 현재 홈 히어로 배경에는 **연결되지 않음**(CSS만).
- **제품 컷**: `public/assets/products/goods-*` — K비원몰 대표 이미지와 매칭.
- **캐릭터**: PNG는 `globi-frames`·`nubi-frames`에 두되, 카드별 노출 순서는 **`siteContent.ts`의 `frames` 배열**이 결정합니다(폴더명과 카드가 1:1이 아닐 수 있음). **크로스페이드**는 해당 캐릭터 `frames`에 경로를 나열하면 됩니다. 추가 프레임이 없으면 단일 PNG + `App.tsx` 의 breathe 애니메이션만 적용됩니다.

## LCP 프리로드

히어로 배경 사진을 쓰지 않으므로 **히어로용 이미지 preload는 없음**. (로고 락업 등은 컴포넌트에서 일반 로드.)
