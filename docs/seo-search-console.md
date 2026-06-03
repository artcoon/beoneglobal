# 검색엔진 등록·SEO 메모

이 저장소에는 **기술적 SEO**(메타, 구조화 데이터, `robots.txt`, `sitemap.xml`, 보안 헤더)를 넣어 두었습니다.

## 순위에 대해 (중요)

**검색 순위·상위 노출은 보장할 수 없습니다.** 구글·네이버는 수백 가지 신호(콘텐츠 품질, 링크, 사용자 반응, 경쟁 상황 등)로 순위를 정합니다. 메타 태그와 키워드만으로 “무조건 1페이지”가 되는 것은 아닙니다. 다만 **크롤·이해·공유 미리보기**에는 아래 설정이 도움이 됩니다.

## 1) 구글 서치 콘솔

1. [Google Search Console](https://search.google.com/search-console) 접속 → 속성 추가 → URL 접두어 `https://beone.you/` (또는 도메인 속성).
2. **HTML 태그** 방식으로 소유 확인 코드를 받습니다.
3. **현재 저장소**: `index.html`의 `<meta name="google-site-verification" content="…" />`에 값이 들어 있습니다. 코드를 바꾼 뒤 **빌드·배포**하면 구글이 크롤링할 때 확인됩니다.
4. (대안) 빌드 시에만 넣고 싶다면 `.env.production` 또는 Amplify 환경 변수에 `VITE_GOOGLE_SITE_VERIFICATION`을 두면 `main.tsx`의 주입 로직이 동작합니다. `index.html`에 이미 고정값이 있으면 **중복 메타는 피하세요** — 한 곳만 쓰면 됩니다.
5. 배포가 반영된 뒤 콘솔에서 **“확인”**을 누릅니다.
6. **사이트맵 제출**: `https://beone.you/sitemap.xml`

## 2) 네이버 서치어드바이저

1. [네이버 서치어드바이저](https://searchadvisor.naver.com/) → 사이트 등록 → `https://beone.you/`
2. **HTML 태그** 확인 코드를 받습니다.
3. **현재 저장소**: `index.html`의 `<meta name="naver-site-verification" content="…" />`에 값이 들어 있습니다. **빌드·배포** 후 서치어드바이저에서 확인하세요.
4. (대안) `VITE_NAVER_SITE_VERIFICATION` 환경 변수 + `main.tsx` 주입만 쓸 경우, `index.html`과 **중복되지 않게** 한쪽만 사용하세요.
5. **사이트맵 제출**: `https://beone.you/sitemap.xml`

## 3) 코드에서 손볼 곳

| 파일 | 역할 |
|------|------|
| `src/seo/seoConfig.ts` | 제목·설명·키워드·OG 이미지 경로 등 **한곳에서** 수정 |
| `index.html` | 동일 문구를 **첫 응답 HTML**에 넣음(크롤러용). `seoConfig` 변경 시 여기 메타도 맞춰 갱신 |
| `src/seo/structuredData.ts` | JSON-LD(Organization, WebSite) — `siteContent`와 연동 |
| `public/robots.txt`, `public/sitemap.xml` | 크롤 허용·사이트맵 URL |

## 네이버 서치어드바이저 글자 수

- **페이지 제목·OG 제목**: **40자 이내** (유니코드 기준). `src/seo/seoConfig.ts`의 `title`과 `index.html`의 `<title>`·`og:title`·`twitter:title`을 함께 맞춥니다.
- **설명·OG 설명**: **80자 이내**. `description`과 `meta description`·`og:description`·`twitter:description`을 함께 맞춥니다.
- `robots.txt`는 **맨 위 주석 없이** 단순 규칙만 두는 편이 안전합니다. 네이버 크롤러(`Yeti`)용 `User-agent: Yeti` 블록을 포함할 수 있습니다.

## 4) `meta keywords`와 “해시태그”

- **구글**은 오래전부터 `meta keywords`를 **순위에 거의 사용하지 않습니다.**
- SNS의 `#해시태그`와 HTML 메타는 별개입니다. 본 사이트는 **공식 랜딩** 성격이라, 과도한 해시태그 삽입은 오히려 가독성을 해칠 수 있어 **메타·구조화 데이터·본문 품질**로 정리했습니다.
- **키워드 선점**은 같은 단어를 반복해서 넣는 방식이 아니라, **명확한 제목·설명·실제 콘텐츠·외부 신뢰 링크**가 맞습니다.

## 5) `beone.you` + `www.beone.you` 둘 다 쓰는 경우

- **사용자 접속**: Amplify에서 루트·`www` 둘 다 같은 앱으로 연결해 두는 것이 일반적입니다.
- **검색 신호 정리**: `canonical`·`og:url`·JSON-LD의 기본 URL은 **`https://beone.you/` 한 곳**으로 두고, **`public/sitemap.xml`** 에는 `https://beone.you/` 와 `https://www.beone.you/` 를 **둘 다** 넣어 두었습니다(발견용).
- **서치 콘솔·서치어드바이저**: 필요하면 **URL 접두어 속성을 두 개** 등록합니다(`https://beone.you/` 와 `https://www.beone.you/`).
- **중복 완화(선택·권장)**: 한쪽으로만 검색 신호를 모으려면 Amplify **도메인 리디렉션**(예: `www` → 루트 또는 그 반대)을 켜고, 그때는 **사이트맵·canonical을 그 한 주소**에만 맞추는 편이 안전합니다.

## 6) Amplify 환경 변수

빌드 시 `VITE_*`가 번들에 들어가야 하므로, Amplify 콘솔 **Environment variables**에 위 두 변수를 넣고 **재배포**하세요.
