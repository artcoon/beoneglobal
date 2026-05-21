# 이미지·에셋 넣는 위치 (IMAGE_PATHS)

웹앱은 `public/` 아래 정적 파일만 브라우저에 그대로 노출됩니다. **원본 PNG·JPG·WebP는 항상 `public/assets/...`에 두고**, `src/data/siteContent.ts` 등에서 `/assets/...` 경로로 참조합니다.

## 파일을 넣을 폴더 (정확 경로)

| 용도 | 폴더 (저장소 루트 기준) | 비고 |
|------|-------------------------|------|
| 히어로·개요·철학 등 **에디토리얼 컷** | `public/assets/editorial/` | 예: `hero.png`, `hero-vision-2025.png`, `overview-aside.png`, `premium-01.png` … |
| **Globi** 캐릭터 누끼(프레임) | `public/assets/brand/globi-frames/` | `01.png`, `02.png` … 숫자 순. `siteContent`의 `frames` 배열과 맞출 것 |
| **Nubi** 캐릭터 누끼(프레임) | `public/assets/brand/nubi-frames/` | 동일 |
| **내비·락업·브랜드 보조 PNG** | `public/assets/brand/` | `logo-nav.png`, `logo-lockup.png` 등 (선택: `hero-guideline-mockup.png` — 현재 히어로 미사용) |
| **제품 썸네일** | `public/assets/products/` | `goods-*.jpg` / `.png` — 상품 번호와 파일명 규칙 유지 권장 |
| 파비콘·아이콘 스프라이트 | `public/` 루트 | `favicon.svg`, `icons.svg` |

> **Cursor 세션 에셋** (`~/.cursor/projects/.../assets/`)에만 있는 파일은 빌드에 포함되지 않습니다. 반드시 위 `public/assets/...`로 복사한 뒤 `siteContent`를 갱신하세요. 대량 동기화에는 `scripts/sync_editorial_from_cursor_assets.py`를 참고하면 됩니다.

## 지워도 되는 것 vs 지우면 안 되는 것

### 비교적 안전하게 정리 가능

- `docs/design-preview-*.png` 같은 **미리보기 스크린샷**이 여러 장 쌓였을 때(예: **5종 이상** 중복·구버전) — Git에 올리지 않았거나 로컬 비교용만이면 과거본 삭제 가능
- 빌드/도구가 만든 **임시 빈 폴더** (예: `node_modules/.vite-temp`가 비어 있는 경우)
- 에디터가 남긴 **`public` 내부의 `.DS_Store`** (macOS 메타데이터)

### 삭제하지 말 것

- **`public/assets/` 안의 사용자·브랜드 PNG/JPG/WebP** — 사이트가 직접 링크하는 실제 자산입니다. (`premium-*.png` 등 가이드라인 갤러리용 파일 포함)
- **`src/`**, **`package.json`**, CI·린트 설정 등 앱 코드

### 에이전트·자동화 작업 시 주의

- `premium-*.png` 등 **사용자가 넣은 에디토리얼**은 파일 형식이 PNG가 맞는 한 **삭제 대상이 아님**
- 빈 디렉터리·중복 스크립트만 정리할 때는, **동작이 겹치지 않는지** `scripts/` README·주석을 확인한 뒤 진행

## 관련 코드

- 경로·갤러리 개수: `src/data/siteContent.ts` (`editorial`, `brandIp.characters`, `products`)
- 히어로 배경: `src/App.tsx` (`section.hero` → `.hero__layers` + `.hero__mesh`) + `src/App.css`
