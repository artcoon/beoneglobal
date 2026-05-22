# 홈페이지 이미지 인입 규칙

향후 이미지 드롭 시 **아래만 따른다.** (질문 없이 적용.)

> **`docs/IMAGE_PATHS.md`**가 생기면 이 문서와 **상호 링크**하고, 단일 출처는 그쪽을 우선한다. *(현재 파일 없음 — 경로는 이 문서에 정의.)*

## 보존·금지

- **`public/assets/`** 아래에 사용자가 넣어 둔 홈페이지용 이미지 배치는, 사용자가 **명시적으로 삭제를 요청하기 전까지 삭제하지 않는다.**
- **IR/PPT 등에서보낸 `Screenshot_*` 슬라이드**는 사용자가 **명시적으로 요청하지 않는 한** 히어로·에디토리얼 등 **메인 비주얼에 쓰지 않는다.** (동기화 스크립트도 이 패턴을 제외한다.)

## 드롭 위치 (`public/` 기준)

| 용도 | 디렉터리 |
|------|-----------|
| 히어로·갤러리·와이드 등 에디토리얼 | `public/assets/editorial/` |
| 글로비 캐릭터 프레임 | `public/assets/brand/globi-frames/` |
| 누비 캐릭터 프레임 | `public/assets/brand/nubi-frames/` |
| 제품 썸네일 | `public/assets/products/` |
| 로고·락업·브랜드 보조 PNG 등 | `public/assets/brand/` (예: `logo-nav.png`, `logo-lockup.png`, 선택 `hero-guideline-mockup.png`) |
| 협업·글로벌 `#global` 배경(고정 CSS 경로) | `public/images/` (`global-section-bg.png`) |

실제 URL은 `src/data/siteContent.ts`의 `site.brand`, `site.editorial`, 제품·캐릭터 블록 경로와 **반드시 일치**시킨다. (`#global` 배경만 예외: `App.css`의 `/images/global-section-bg.png`.)

## 새 파일이 왔을 때 워크플로

1. Cursor 세션 **`assets/`** → 위 표의 `public/assets/…`로 **복사**한다.
2. **`src/data/siteContent.ts`**에서 `site.editorial`, 캐릭터 `image` / `frames`, 제품 `image` 등 **경로·개수 키**를 갱신한다.
3. **`scripts/sync_editorial_from_cursor_assets.py`**  
   - 스크립트는 **제외 규칙**(Screenshot, 작은 design-element 등)을 따르지만, 실행 시 **`public/assets/editorial/*.png` 기존 파일을 전부 지운 뒤** 다시 쓴다.  
   - 따라서 **사용자 제공 배치를 유지**해야 하면 sync 대신 **수동 복사**만 하고, “에디토리얼 전부 재동기화”를 사용자가 명시할 때만 sync를 돌린다.
4. **`npm run build`**로 검증한다.
5. 개발 서버가 떠 있으면 워크스페이스 규칙에 따라 **`docs/design-preview-fullpage.png`**를 최신 전체 페이지 캡처로 갱신한다.

## 히어로·에디토리얼 슬롯

- **여러 장면(로테이션·보조 비주얼)**을 쓸 때는 `site.editorial` 키를 기준으로 연결한다. 구현 시점 기준 예: `overviewAside`, (선택) `overviewAsideSecondary`, `philosophyHeroBand`(`#philosophy` 상단 풀폭 밴드), `philosophyWide`(에셋 풀 동기화용; 홈 밴드는 `philosophyHeroBand`), 갤러리 `premium-NN`(`galleryPremiumStart`·`galleryCount`) … (히어로 풀블리드 사진 슬롯은 현재 없음.) **`#global`** 배경은 `public/images/global-section-bg.png` — `siteContent`가 아닌 `App.css` 고정 경로.
- **추가 히어로급 슬롯**이 코드에 생기면 **같은 파일의 `editorial` 객체**를 먼저 읽고 그 키에 맞춘다.

## 캐릭터 프레임

- **`frames` 배열이 2장 이상**이면 UI는 **크로스페이드** 전환을 쓴다.
- **1장뿐**이면 **브리드(breathe)** 느낌의 단일 루프다.
- 파일명은 **`01.png`**, `02.png`, … 순으로 맞춘다. (`globi-frames/`, `nubi-frames/`)

## Cursor `assets/` 드롭 — A / B / C 시리즈 (2026-05-21)

소스: `~/.cursor/projects/Users-martin-Projects-Beone-global-web/assets/` 의 `________A*.png`, `________B*.png`, `________C*.png` (파일명 끝 UUID는 생략).

| 소스 | `public/` 경로 | 비고 |
|------|------------------|------|
| A1 … A4 | `public/assets/brand/globi-frames/01.png` … `04.png` | |
| *(A5)* | *(없음)* | 드롭 폴더에 `________A5` 파일 없음 → `05.png` 생략 |
| A6 … A9 | `public/assets/brand/globi-frames/06.png` … `09.png` | |
| B1 … B6 | `public/assets/brand/nubi-frames/01.png` … `06.png` | |
| C1 … C6 | `public/assets/brand/nubi-frames/07.png` … `12.png` | 비주얼 감사: C는 꽃·핑크 포인트 등 기존 누비 시트(`nubi-frames/01.png`) 쪽에 맞춰 **누비 확장**으로 배치 (원안은 globi `10`–`15`였으나 `siteContent`·경로는 누비로 통일) |
