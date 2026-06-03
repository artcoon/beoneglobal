/**
 * 검색·SNS 메타의 단일 출처입니다.
 * index.html 의 메타 문구와 맞출 때는 이 파일을 기준으로 복사해 동기화하세요.
 */

export const SEO = {
  origin: 'https://beone.you',
  /** 검색 결과 제목(약 55자 내외 권장) */
  title:
    '비원글로벌 BEONE GLOBAL | k.BEONE·바이오힐링 기능성패치·OEM·ODM',
  /** 메타 설명(약 150~160자). 키워드 나열이 아니라 자연스러운 문장 유지 */
  description:
    '비원글로벌(BEONE GLOBAL) 공식 — k.BEONE·바이오힐링패치 등 피부 부착형 기능성 패치, 산화질소(NO) 축 제품, TPE GEL 특허 점착, 25년 제조·약국·하나로마트 등 유통망, OEM·ODM. 글로벌 헬스케어 브랜드.',
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
