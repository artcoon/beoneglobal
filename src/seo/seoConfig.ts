/**
 * 검색·SNS 메타의 단일 출처입니다.
 * index.html 의 메타 문구와 맞출 때는 이 파일을 기준으로 복사해 동기화하세요.
 */

export const SEO = {
  /** 표준(canonical·og:url·JSON-LD 기본) — 루트 도메인 */
  origin: 'https://beone.you',
  /** 동일 사이트 www 호스트 — 사이트맵·문서에 병기 */
  originWWW: 'https://www.beone.you',
  /**
   * 검색·OG·트위터 카드 제목 — 네이버 서치어드바이저 권장 **40자 이내**
   * (유니코드 기준 길이; `node -e "console.log([...'…'].length)"` 로 확인)
   */
  title: '비원글로벌 | BEONE GLOBAL',
  /**
   * 메타 설명 — 네이버 권장 **80자 이내**. 구글은 더 긴 설명도 허용하나 여기서 통일.
   */
  description:
    '비원글로벌(BEONE GLOBAL) 공식. k.BEONE·기능성 패치·바이오힐링·OEM·ODM·약국·하나로마트 유통.',
  /** meta keywords — 구글은 순위에 거의 사용하지 않으나, 네이버 등 일부 크롤러 참고용으로 과도하지 않게 정리 */
  keywords: [
    '비원글로벌',
    'BEONE GLOBAL',
    '비원',
    'k.BEONE',
    'K비원',
    '바이오힐링패치',
    '바이오힐링',
    '기능성패치',
    '부착형패치',
    '피부패치',
    '산화질소패치',
    'NO패치',
    'TPE GEL',
    '무용제접착',
    '희토류',
    'OEM',
    'ODM',
    '화장품GMP',
    'ISO22716',
    '글로벌헬스케어',
    '약국유통',
    '하나로마트',
    '부천',
    '비원글로벌주식회사',
    'Beone',
    '케이비원',
  ].join(', '),
  ogImagePath: '/assets/brand/Beone_Global_Web_Logo_01.png',
  ogImageAlt: 'BEONE GLOBAL 비원글로벌 공식 로고',
  themeColor: '#0d1f1c',
  twitterSite: '@BEONEGLOBAL',
} as const

export function absoluteUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  return `${SEO.origin}${p}`
}

/** 사이트맵 등에 넣는 공개 URL(루트 + www) */
export function publicSiteOrigins(): readonly [string, string] {
  return [SEO.origin, SEO.originWWW] as const
}
