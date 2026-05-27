/**
 * 공개 자료·내부 교육 문구를 바탕으로 한 카피입니다.
 * 연혁·등기·인허가 등 사실 관계는 공시·확정 자료와 대조해 유지·갱신하세요.
 */

export const site = {
  nameKo: '비원글로벌',
  nameEn: 'BEONE GLOBAL',

  /** 2025 BEONE GLOBAL 브랜드 가이드라인 — 공식 락업·웹용 로고 */
  brand: {
    sloganEn: 'Co-Creating Value as One',
    logoNav: '/assets/brand/logo-nav.png',
    logoLockup: '/assets/brand/logo-lockup.png',
  },

  /**
   * 럭셔리 목업·가이드라인 페이지 PNG — `public/assets/editorial/` (동기화: `scripts/sync_editorial_from_cursor_assets.py`).
   * `premium-01`…`premium-{N}` 풀(동기화 스크립트가 연번호로 기록)에서 가로 갤러리는 `galleryPremiumStart`부터 `galleryCount`개만 노출합니다(예: 01–07 생략 시 08–28).
   * 히어로 `hero__grid` 배경 슬라이드는 `public/assets/hero-grid/` — `heroGridBackgrounds`에 `/assets/hero-grid/...` 경로로 나열합니다.
   */
  editorial: {
    /** Brand guideline «sign» panel (Page 69 export); drop replacements in `public/assets/editorial/overview-aside-user.png`. */
    overviewAside: '/assets/editorial/overview-aside-user.png',
    philosophyWide: '/assets/editorial/philosophy-wide.png',
    /** Replace `public/assets/editorial/philosophy-hero-band.png` with the user-uploaded wide hero for `#philosophy` `.philosophy-hero-band` (full band width, `cover`). */
    philosophyHeroBand: '/assets/editorial/philosophy-hero-band.png',
    /** `#main` 히어로 `hero__grid` 배경 크로스페이드 — 가이드라인 페이지 순(60→74). */
    heroGridBackgrounds: [
      '/assets/hero-grid/hero-grid-01.png',
      '/assets/hero-grid/hero-grid-02.png',
      '/assets/hero-grid/hero-grid-03.png',
      '/assets/hero-grid/hero-grid-04.png',
      '/assets/hero-grid/hero-grid-05.png',
      '/assets/hero-grid/hero-grid-06.png',
      '/assets/hero-grid/hero-grid-07.png',
      '/assets/hero-grid/hero-grid-08.png',
    ],
    /** 가로 갤러리에 올릴 `premium-NN` 시작 번호(앞번호 슬라이드·제품 목업 제외 시 올림) */
    galleryPremiumStart: 8,
    /** 갤러리에 실제로 보이는 슬라이 개수 — `galleryPremiumStart`부터 연속 파일이 있어야 함 */
    galleryCount: 21,
  },

  /** 스킵 링크·내비·히어로 CTA 등 App 전역 라벨 */
  ui: {
    skipToContent: '본문 바로가기',
    navMainAria: '주요 메뉴',
    navMobileAria: '모바일 메뉴',
    menuOpen: '메뉴 열기',
    menuClose: '메뉴 닫기',
    drawerSnsLabel: 'SNS',
    socialNavAria: '공식 SNS',
    socialLinkSoon: '링크는 추후 연결 예정입니다.',
    socialNewTab: '새 탭',
    overviewAsideVisualAria: '개요 옆 열 — 파란 톤의 추상 에디토리얼 그래픽',
    overviewFigureCaption: '개요 섹션 추상 에디토리얼 패널',
    editorialGalleryAria: '브랜드 가이드라인·디자인 목업 가로 갤러리',
    productShopLink: 'K비원몰 상품 보기',
    contactMapListAria: '외부 지도에서 이 주소 열기',
    youtubeOpenPrefix: 'YouTube에서 열기: ',
  } as const,

  heroActions: [
    { href: '#overview', label: '개요 보기', variant: 'primary' as const },
    { href: '#products', label: '제품 라인', variant: 'ghost' as const },
    { href: '#channels', label: '공식 온라인몰', variant: 'ghost' as const },
    { href: '#contact', label: '연락처', variant: 'ghost' as const },
  ] as const,

  tagline:
    '25년 넘는 제조·유통 경험과 오프라인 약 15,000곳의 약국·하나로마트 등 유통망을 기반으로, 피부 부착형 기능성 패치를 중심에 k.BEONE·바이오힐링패치와 OEM·ODM을 함께 다룹니다.',

  /** 히어로 슬로건(영문)과 맞물리는 한 줄 — 비전·공동가치창출 */
  heroVisionEcho:
    '협력과 융합으로 이해관계자와 연결되고, 지속가능하고 사람 중심의 글로벌 브랜드를 지향합니다.',

  heroLead:
    '2001년 설립 (주)비원은 희토류 기반 천연 소재와, 의료·화장품에 쓰이는 무용제 TPE GEL 열감응 특허 점착제로 패치를 만듭니다. 글로벌 사업은 비원글로벌(BEONE GLOBAL)에서 단계적으로 전개하며, 품목별 성분·표시는 항상 공식 판매 채널 안내를 따릅니다.',

  nav: [
    { href: '#overview', label: '개요' },
    { href: '#philosophy', label: '경영철학' },
    { href: '#history', label: '연혁' },
    { href: '#technology', label: '기술' },
    { href: '#products', label: '제품' },
    { href: '#brand', label: '브랜드' },
    { href: '#channels', label: '공식몰' },
    { href: '#contact', label: '연락처' },
  ] as const,

  trustStrip: [
    { value: '2001', label: '설립' },
    { value: '25+', label: '연구·제조 역사' },
    { value: '~15K', label: '약국·하나로마트 등' },
    { value: 'NO', label: '산화질소(NO) 패치 축' },
  ] as const,

  sectionEyebrow: {
    overview: 'OVERVIEW',
    philosophy: 'PHILOSOPHY',
    businessElements: 'FRAMEWORK',
    history: 'HISTORY',
    technology: 'TECHNOLOGY',
    products: 'PRODUCTS',
    brand: 'BRAND IP',
    partnership: 'GLOBAL',
    channels: 'OFFICIAL',
    contact: 'CONTACT',
  } as const,

  legal: {
    companyName: '비원글로벌 주식회사',
    /** 사업자등록번호 — 푸터·히어로 등 대외 표기의 단일 출처 */
    bizReg: '483-88-03234',
    bizRegWords: '사업자등록번호',
  },

  overview: {
    title: '개요',
    slogan:
      '온·오프라인 유통과 패치 전문 제조 역량으로, 파트너와 고객 곁에서 기능성 패치 시장을 함께 열어갑니다.',
    statusTitle: '회사 현황',
    statusLabels: {
      general: '일반현황',
      business: '주요사업',
      organization: '회사조직',
      rnd: '연구개발',
    } as const,
    /** `#overview` `.overview-status` 행 순서·`dt` 앞 아이콘 키 — 라벨·본문은 `statusLabels`·`status`와 `key`로 연결 */
    statusRows: [
      { key: 'general', icon: 'general' },
      { key: 'business', icon: 'business' },
      { key: 'organization', icon: 'org' },
      { key: 'rnd', icon: 'rnd' },
    ] as const,
    status: {
      general:
        '(주)비원글로벌. 창업자·회장 최민우. 설립 2025년 4월 15일. 업종 도소매·생활용품. (사업자등록번호는 본 페이지 법적 표기와 동일합니다.)',
      business: '기능성·공산품·화장품·일반의약품·의료기기 패치',
      organization:
        '경영지원(인사·회계), R&D(패치융합연구소), 생산·구매·자재, 해외사업부, 제1·제2공장',
      rnd:
        '터마린 등 광물 기반 파동에너지 융합 기술의 연구·제품화와 의료·화장품·생활용품 패치를 다룹니다. 대외 크리덴셜 자료에는 연구 거점의 영문 표기 «PATCH\u00A0CONVERGENCE\u00A0LABORATORY»가 함께 제시되어 있습니다.',
    },
    paragraphs: [
      '25년 넘는 현장 경험과 오프라인 약 15,000곳의 약국·하나로마트 등 유통망을 바탕으로, 피부 부착형 기능성 패치 제조 역량을 쌓아 왔습니다.',
      '(주)비원은 2001년 설립 이후 희토류 기반 천연 소재와, 의료·화장품에 쓰이는 무용제 TPE GEL 열감응 특허 점착제로 패치를 제조합니다.',
      '자사 브랜드 k.BEONE과 바이오힐링패치를 운영하고, 국내외 OEM·ODM을 병행합니다. 글로벌 전개는 비원글로벌(BEONE GLOBAL)에서 단계적으로 이어집니다.',
      '제조는 경기도 김포시 양촌읍 황금산단4로 34, 판매·유통은 경기도 부천시 원미구 상일로 82(상동) 301호에서 운영합니다. 세부 연락처·지도는 하단 연락처와 같습니다.',
    ],
  },

  philosophy: {
    title: '경영철학',
    manifesto: {
      lineEn: 'One Body, One Mind',
      lineKo: '하나의 몸, 하나의 마음',
      /** 영문 슬로건은 히어로 `brand.sloganEn`에만 노출 */
      sub: '비전 · 공동가치창출 : 협력과 융합으로 완성하는 공동 가치',
    },
    /**
     * `#philosophy` `.philosophy-mission` 카드 배경(가이드라인 에디토리얼, `cover`).
     * 생략 시 카드는 CSS 기본 표면(그라데이션)만 사용합니다.
     */
    missionBackground: '/assets/editorial/philosophy-mission-bg.png',
    /** 슬라이드·웹 공통 미션 — 줄 단위(모바일 줄바꿈), 강조는 App에서 `span.mission-em`으로 분리 */
    mission: {
      title: '미션',
      titleEn: 'MISSION',
      lines: [
        '비원글로벌은 사랑과 긍휼의 정신으로, 세상과 이웃을 돌보고, 연합의 힘으로 모두가 하나되며,',
        '건강과 생명을 위한 창조적 해결책을 이어갑니다.',
      ] as const,
      emphasis: [
        { phrase: '사랑과 긍휼', tone: 'gold' },
        { phrase: '연합', tone: 'teal' },
        { phrase: '창조적 해결책', tone: 'gold' },
      ] as const,
    },
    visionTitle: '비전',
    visionStatement:
      '협력과 융합으로 가치를 만들고, 이해관계자와 연결되며 차이를 존중한 채 한 방향으로 나아갑니다. 함께하는 일은 단순 협업을 넘어 상호 시너지로 새로운 가치를 여는 일이며, «하나로»는 같은 방향과 공동체성을 말합니다. 지속가능하고 사람 중심의 글로벌 브랜드 정체성을 지향합니다.',
    visionItems: [
      {
        title: '고객 건강 증진',
        body: '제품과 서비스 전 과정에서 사용자의 웰빙을 최우선으로 둡니다.',
      },
      {
        title: '지속 가능한 성장',
        body: 'R&D·품질·채널에 균형 있게 투자해 장기 신뢰를 쌓습니다.',
      },
      {
        title: '상생 파트너십',
        body: '협력사·독립 사업자·고객과의 함께 성장을 경영의 축으로 삼습니다.',
      },
      {
        title: '최고 수준의 품질',
        body: '원료 선정부터 생산·유통까지 일관된 기준으로 품질을 관리합니다.',
      },
    ],
    valuesTitle: '핵심가치',
    coreValues: [
      { title: '고객 중심', body: '현장의 목소리를 제품 개선 루프에 담습니다.' },
      { title: '상호 협력', body: '내부 팀과 외부 생태계의 투명한 협업을 지향합니다.' },
      { title: '지속 혁신', body: '패치·소재·UX에서 실험과 검증을 반복합니다.' },
      { title: '사회적 책임', body: '안전·환경·윤리를 의사결정에 포함합니다.' },
      { title: '품질·안전', body: '규제와 자체 기준을 함께 충족하는 품질 체계를 운영합니다.' },
      { title: '글로벌 마인드', body: '현지 규제와 문화에 맞춘 현지화를 추구합니다.' },
      { title: '도전 정신', body: '새로운 시장과 기술 영역을 과감히 탐색합니다.' },
      { title: '정직·신뢰', body: '대외 커뮤니케이션은 검증 가능한 사실에 기반합니다.' },
    ],
    brandValuesFour: ['사랑', '긍휼', '연합', '창조'] as const,
  },

  /** IR 슬라이드 「핵심 역량」 생명 시스템 비유 — 기업 철학·설명용 틀(의료 효능 주장 아님) */
  businessElements: {
    title: '여섯가지 생명시스템 엘리먼트',
    lead: '경영·사업을 생명 활동에 비유한 IR 슬라이드의 여섯 요소를, 조직·사업 맥락으로 읽기 쉽게 옮긴 설명용 프레임워크입니다.',
    footnote:
      '슬라이드의 「생명 내 역할」은 비유이며, 제품 표시·효능·적응증과는 별개입니다.',
    items: [
      {
        nameKo: '혈',
        hanja: '血',
        icon: 'blood' as const,
        form: '물질',
        function: '순환·운반',
        role: '자산·공급이 흐르는 물리적 기반',
      },
      {
        nameKo: '에너지',
        hanja: '活力',
        icon: 'energy' as const,
        form: '힘',
        function: '작용·반응',
        role: '실행과 대응을 움직이는 동력',
      },
      {
        nameKo: '파동',
        hanja: '波動',
        icon: 'wave' as const,
        form: '전달 방식',
        function: '에너지·정보 이동',
        role: '시장·조직에 닿는 신호와 경로',
      },
      {
        nameKo: '공기',
        hanja: '空氣',
        icon: 'air' as const,
        form: '외부 자원',
        function: '산소 등 투입',
        role: '환경·파트너로부터 받는 투입',
      },
      {
        nameKo: '기',
        hanja: '氣',
        icon: 'qi' as const,
        form: '조율 에너지(비유)',
        function: '기능 조절',
        role: '문화·리더십으로 균형을 맞춤',
      },
      {
        nameKo: '생명',
        hanja: '生命',
        icon: 'life' as const,
        form: '통합 개념',
        function: '유지·성장',
        role: '비전·브랜드로 묶이는 전체',
      },
    ],
  },

  history: {
    title: '연혁',
    milestones: [
      {
        year: '2001',
        items: [
          '(주)비원 설립(보도자료 기사 최종).',
          '2001년 3월 스티커(패치) 연구소 운영을 시작으로 20년 넘게 이어온 점착·패치 연구·제조 역량을 축적(동 자료).',
          '경기 김포시 양촌읍 황금산단 일대에 제조 거점 운영(동 자료).',
          '천연 미네랄·희토류 베이스와 무용제 TPE GEL(열 감응형 특허 점착제) 등을 활용한 바이오힐링(Bio Healing Patch) 패치 제조·공급으로 발전(보도자료 기사 최종·사이트 개요와 정합).',
        ],
      },
      {
        year: 'R&D · 제품',
        items: [
          '용제형 점착에서 무용제 열가소성 수지 기반 3세대 제품으로의 전환, 허브를 적용한 4세대 일부 라인 판매 등 피부 친화·통증 케어 방향의 고도화(IR자료 제1장 요지).',
          '전북 완주 「휴먼에노스」에서 개발·공급되는 산화질소(NO) 대사체를 패치에 독점 공급받아 생산, 전북대학교 의과대학 연계 SCI급 논문 발표 추진(IR자료).',
          '폴리우레탄(PU) 점착제: 60℃ 이하 저온 생산 가능, 비타민·활력 패치 등 고기능 제품 설계 여지 — IR자료에 2025년 2월경 PU 적용 패치 출시 예정으로 기재.',
          'PU·NO 결합 상처·욕창 케어 의료기기 방향, SCI 논문·식약처 추진·미국 카이저 의료재단 등 병원 처방 채널 진출 계획 언급(IR자료).',
        ],
      },
      {
        year: '2024–2025',
        items: [
          '내부 「보도자료 준비」 초안에 비원글로벌(K-BEONE) 설립연도 2024·사업영역(천연 미네랄 패치, 글로벌 웰니스 플랫폼)이 정리되어 있음 — 법인·등기 일자는 별도 확인.',
          '2025년 6월 24일 대한민국 부천: 글로벌 비전 선포식, 천연미네랄 바이오힐링 패치 5종 정식 출시 보도 라인, 슬로건「Co-Creating Value as One」, K-Mission Patch·미라클패치 Pro 등 확장 언급(보도자료 준비).',
          '의료기기 등록 준비, 국내외 특허 출원·CE 인증 진행, 백화점·글로벌 플랫폼 입점 및 2026년까지 북미·유럽·동남아 유통 확대 계획이 동 초안에 포함.',
          'K비원몰·네이버 스마트스토어 등 공식 온라인 채널 운영(사이트 기존 안내·비원정보 일반 링크 수준과 정합).',
        ],
      },
      {
        year: '영업·파트너십',
        items: [
          'OEM·온라인 병행: 하이리빙(웨이브업), 휴엘(요술손패치), 삼육재단(세천사 패치·자체 생산 공급), 코리아라인(폐쇄몰), 밤스팩토리(통증연구소/쿠팡), 미국 수출(모션 EQ Patch) 등 협력·매출 가정이 IR자료 표에 기재.',
          '수출·유통: 신생활/중국 원단 공급 협의, 베트남 벌크, 태국 군부 공급 협의, NS 홈쇼핑 외 홈쇼핑 다수사 연계 등이 IR자료에 예정·협의 단계로 정리.',
        ],
      },
      {
        year: '향후 계획',
        items: [
          '멤버 교육 공지용 RTF에 2026년 하반기 급 혈자리 기반 패치 공동 발굴 일정이 언급된 바 있음 — 확정 일정은 사내 공지 재확인.',
        ],
      },
    ] as const,
  },

  technology: {
    title: '핵심 기술',
    items: [
      {
        title: '1차 — 약용 허브',
        icon: 'herb' as const,
        body:
          '20종을 넘는 허브 추출물을 쓰는 약용 허브가 첫 번째 축입니다. WHO·약전·연구기관 등에서 다루는 맥락은 회사 자료 수준으로만 짚으며, 대표 허브는 진정·항산화 등 범주로만 안내합니다. 파이토 액션·유기농·자체 첨가물 설계와 품목별 조합 예시는 표시·광고 규정을 고려해 웹에서는 생략합니다.',
      },
      {
        title: '2차 — 원적외선(FIR)',
        icon: 'fir' as const,
        body:
          '약 5–20㎛ 파장대의 원적외선을 ‘성장의 빛’으로 소개하는 자료 흐름을, 피하 침투·순환·온열 반응 등에 관한 중립적 과학 서술 수준으로만 옮깁니다. 근적외선은 상대적으로 얕은 층, 원적외선은 더 깊은 복사열에 가깝다는 대비를 한 줄로 두고, 자료 속 여섯 작용·달걀 실험은 짧은 라벨·‘침투·전달 비유’ 한 문장 수준으로만 다룹니다.',
      },
      {
        title: '3차 — 희토나이트 · 토르마린',
        icon: 'crystal' as const,
        body:
          '복합 광물과 원적외선 방출·세포 주파수 공진(resonance) 등 회사·IR 자료의 설명 톤을 짧게 따릅니다. 구체 %·단시간 통증 완화처럼 강한 효능 수치는 웹에서는 완화하며, 상세 주장은 특허·개발 자료와 공식 판매 채널 안내를 기준으로 합니다.',
      },
      {
        title: '4차 — 파동에너지 증폭',
        icon: 'pulse' as const,
        body:
          'BEONE 챔버 등 구조와 장시간(예: 24시간) 축에서 광물 파동을 융합한다는 소개를 요약하면, 원적외선 방출을 증폭·보강한다는 제품 개발 서술로 이어집니다. 세부 스펙·체감은 공식 자료를 따릅니다.',
      },
      {
        title: '5차 — 산화질소(NO) 패치',
        icon: 'noMolecule' as const,
        body:
          'NO 전달과 혈관 이완 메커니즘은 교육·소개용 언어로만 개괄합니다. “세계 최초” 등 절대 표현과 과도한 의료 효능 문구는 지양하며, 한·미 특허 등 개발·특허 자료에 기초한 설명임을 밝힙니다.',
      },
    ],
  },

  /** Beone Certification Report(2026-02-09), Credential(2025-11-05), B2B PDF 등에서 인용 가능한 문구만 */
  credentials: {
    title: '인증·특허·시험',
    intro:
      '교육·소개·B2B 자료 및 제3자 분석 보고서에 근거합니다. 효능·질병 관련 표현은 공식 판매 채널의 표시·고지·허가 범위를 우선하시고, 아래는 인증·시험·특허 식별 정보의 요약입니다.',
    bullets: [
      'ISO 9001·14001·22716(화장품 GMP)·13485(의료기기 품질경영) 등 품질·환경·화장품·의료기기 측면의 인증 체계가 Beone Certification Report에 정리되어 있습니다.',
      '한국화학융합시험연구원(KATRI) 시험: 8대 중금속 시험 보고서 SBQD23-00000188(시료명 kBEONE 관련 표기), KS K 0693:2016에 따른 미생물(항균) 시험 보고서 KATRM230807-0621 구간이 동 보고서에 인용되어 있습니다.',
      '피부 자극: P&K 피부임상연구센터 시험 보고서 PNK-23719-I37R(24시간 밀폐·1시간/24시간 부착 후 관찰 등)에서 Primary Irritation Index 0.00, 자극 등급 «무자극(non-irritating)»으로 기재된 결과가 인용되어 있습니다.',
      '특허(동 보고서 Patent Portfolio): 대한민국 등록 제10-1860726호·미국 US 10,213,396 B2. 미국 특허의 영문 명칭은 보고서 표기 그대로 «Patch to enhance locally fat metabolism, using thermoplastic elastomer gel composition including capsaicin»입니다.',
      '대외 크리덴셜(2025-11-05)에는 핵심 역량 슬라이드에 «PATCH\u00A0CONVERGENCE\u00A0LABORATORY» 명칭이 제시되어 있습니다.',
      'B2B 상품 소개서에는 GMP·ISO·INCI·(일부 품목) FDA 시설 등록 등의 표기와, 위와 동일한 KR·US 특허 번호가 제품별로 반복 인용되어 있습니다.',
    ],
  },

  brandIp: {
    title: '브랜드 IP',
    intro:
      '캐릭터 글로비(Globi, 남성 아기)·누비(Nubi, 여성 아기)는 비전과 기술 신뢰를 정서적으로 전하는 브랜드 자산입니다.',
    /** 슬라이드 「2. Vision & Mission」 요지 — 거북이를 브랜드 이미지로 쓰는 이유 (#brand) */
    symbolStory: {
      title: '비전·미션과 거북이 심볼',
      paragraphs: [
        '거북이는 수명이 매우 길다는 보편적 인식에 맞춰, 경영진이 바뀌어도 이어지는 장기 비전을 상징합니다.',
        '심볼이 담는 철학은 느림·지혜·방향성·연결성 — 일회성보다 오래가는 신뢰와 파트너십을 의미합니다.',
        '땅·바다·하늘을 넘나드는 이미지로 비원글로벌의 확장 비전과 미션을 은유합니다.',
        '날개 달린 거북이는 비전의 방향성과 상승을 시각화하며, 아래 영문 태그라인과 자연스럽게 이어 읽힙니다.',
      ],
    },
    /**
     * TV CF 클립 — 제목·URL은 @BEONEGLOBAL 채널 영상 목록(yt-dlp)과 대조해 검증했습니다.
     * (첫~다섯 번째 「TV광고」 근육관절엔패치 심의완료 시리즈)
     */
    tvAds: {
      eyebrow: 'ON AIR',
      title: 'TV 광고',
      statusLine:
        '근육관절엔패치 TV CF 시리즈(심의완료)입니다. 선택 시 YouTube에서 전체 영상이 새 탭으로 열립니다.',
      channelUrl: 'https://www.youtube.com/@BEONEGLOBAL',
      channelLinkLabel: '@BEONEGLOBAL 채널 전체 보기',
      videos: [
        {
          label: 'TV광고 1 — 「장군멍군」 근육관절엔패치(심의완료)',
          url: 'https://www.youtube.com/watch?v=jt9lJ51aQ6Q',
        },
        {
          label: 'TV광고 2 — 「골프허리업」 근육관절엔패치(심의완료)',
          url: 'https://www.youtube.com/watch?v=yKCIdKpc9Bg',
        },
        {
          label: 'TV광고 3 — 「등산연륜」 근육관절엔패치(심의완료)',
          url: 'https://www.youtube.com/watch?v=wDpiPEjLEzQ',
        },
        {
          label: 'TV광고 4 — 「낚시기다림」 근육관절엔패치(심의완료)',
          url: 'https://www.youtube.com/watch?v=QYPv9wIRBMk',
        },
        {
          label: 'TV광고 5 — 「찜질시간」 근육관절엔패치(심의완료)',
          url: 'https://www.youtube.com/watch?v=xVdQdACk_j0',
        },
      ],
    },
    /**
     * @BEONEGLOBAL 채널 `/videos` 페이지 `ytInitialData` 기준(2026-05-21 스크랩).
     * 제목·썸네일상 글로비/누비 캐릭터 애니메이션으로 명확한 4편:
     * - YnNXNdVIzIo — BeoneGlobal AD Globi 1st
     * - QtDj9x7SFLg — BeoneGlobal AD Nubi 1st
     * - sF0cyWAFNAM — BeoneGlobal Globi & Nubi Chorus A#
     * - aGgD7kH6540 — BeoneGlobal Globi & Nubi Chorus B#
     * (같은 채널의 «Beone 붙여봐, feel the groove» 등은 제품 댄스 MV에 가깝게 분류해 제외.)
     */
    globiNubiAnimations: {
      eyebrow: 'MOTION',
      title: '글로비 & 누비 애니메이션',
      lead:
        '@BEONEGLOBAL 채널의 캐릭터 모션 영상입니다. 썸네일을 누르면 YouTube(새 탭)에서 시청할 수 있습니다. 임베드 자동재생은 사용하지 않습니다.',
      channelUrl: 'https://www.youtube.com/@BEONEGLOBAL',
      channelLinkLabel: '@BEONEGLOBAL 채널에서 더 보기',
      videos: [
        {
          videoId: 'YnNXNdVIzIo',
          titleKo: '글로비 1차 애니메이션 광고',
          label: '글로비 AD',
        },
        {
          videoId: 'QtDj9x7SFLg',
          titleKo: '누비 1차 애니메이션 광고',
          label: '누비 AD',
        },
        {
          videoId: 'sF0cyWAFNAM',
          titleKo: '글로비 & 누비 코러스 A',
          label: '코러스 A',
        },
        {
          videoId: 'aGgD7kH6540',
          titleKo: '글로비 & 누비 코러스 B',
          label: '코러스 B',
        },
      ],
    },
    characters: [
      {
        name: 'Globi · 글로비',
        role: '하늘과 연결 — 혁신과 확장',
        desc: '날개 달린 거북이 심볼에서 이어지는 글로벌 지향을 상징합니다. 브랜드 가이드 기준 남성 아기(보이) 캐릭터입니다.',
        /** teal·흰날개 글로비만; 일부 프레임은 `nubi-frames` 폴더에 있어도 경로만 맞추면 됨 */
        image: '/assets/brand/globi-frames/01.png',
        frames: [
          '/assets/brand/globi-frames/01.png',
          '/assets/brand/globi-frames/03.png',
          '/assets/brand/globi-frames/06.png',
          '/assets/brand/globi-frames/09.png',
          '/assets/brand/nubi-frames/01.png',
          '/assets/brand/nubi-frames/02.png',
          '/assets/brand/nubi-frames/03.png',
          '/assets/brand/nubi-frames/04.png',
          '/assets/brand/nubi-frames/06.png',
        ],
        imageAlt:
          'BEONE GLOBAL 브랜드 캐릭터 글로비(Globi) — 날개 달린 거북이를 모티프로 한 남성 아기 일러스트',
      },
      {
        name: 'Nubi · 누비',
        role: '대지와 뿌리 — 숙련과 신뢰',
        desc: '25년 넘는 제조 역량과 희토류 광물이 주는 견고한 신뢰를 상징합니다. 브랜드 가이드 기준 여성 아기(걸) 캐릭터입니다.',
        /** 핑크 악센트(핑크 날개·꽃·덤벨/매트 등) 누비만; 일부는 `globi-frames` 파일 경로 */
        image: '/assets/brand/globi-frames/02.png',
        frames: [
          '/assets/brand/globi-frames/02.png',
          '/assets/brand/globi-frames/04.png',
          '/assets/brand/globi-frames/07.png',
          '/assets/brand/globi-frames/08.png',
          '/assets/brand/nubi-frames/05.png',
          '/assets/brand/nubi-frames/07.png',
          '/assets/brand/nubi-frames/08.png',
          '/assets/brand/nubi-frames/09.png',
          '/assets/brand/nubi-frames/10.png',
          '/assets/brand/nubi-frames/11.png',
          '/assets/brand/nubi-frames/12.png',
        ],
        imageAlt:
          'BEONE GLOBAL 브랜드 캐릭터 누비(Nubi) — 대지와 뿌리를 상징하는 여성 아기 일러스트',
      },
    ],
    palette:
      'BEONE GLOBAL 코퍼레트 컬러는 다크 틸·청록 톤(2025 브랜드 가이드라인)입니다. 제품 패키지·채널별 서브 컬러는 해당 라인 가이드를 따릅니다.',
  },

  products: {
    title: '바이오힐링 패치 라인',
    listUrl: 'https://www.kbeone.co.kr/goods/goods_list.php?cateCd=004',
    listLabel: 'K비원몰 비원 전용관 전체 보기',
    outro:
      '정렬·가격·프로모션·상품 번호는 수시로 바뀔 수 있습니다. goodsNo가 붙은 링크는 몰 URL과의 대응을 유지하기 위한 것이며, 구매·표시 확인은 항상 공식몰의 최신 상품 페이지로 해 주세요.',
    featured: [
      {
        name: '미라클패치',
        goodsNo: '1000000011',
        image: '/assets/products/goods-1000000011.png',
        shopHref: 'https://www.kbeone.co.kr/goods/goods_view.php?goodsNo=1000000011',
        blurb:
          'B2B 자료 기준 올라운더형 화장품 패치(산화질소·멘톨·아로마·한방·미네랄 등 복합 설계). 질병 치료 표현 없이 피부 컨디셔닝 목적임을 자료가 명시합니다.',
      },
      {
        name: '스포츠엔패치',
        goodsNo: '1000000025',
        image: '/assets/products/goods-1000000025.png',
        imageWidth: 1024,
        imageHeight: 716,
        shopHref: 'https://www.kbeone.co.kr/goods/goods_view.php?goodsNo=1000000025',
        blurb:
          'B2B 자료상 2026 리뉴얼 라인 — 운동 전후 활력·쿨링·NO·카페인 등을 조합한 스포츠 지향 화장품 패치로 소개됩니다. 몰 상품명은 다를 수 있으니 링크·표시는 공식몰을 확인하세요.',
      },
      {
        name: '근육관절패치 (쿨링)',
        image: '/assets/products/goods-1000000021.png',
        shopHref:
          'https://www.kbeone.co.kr/goods/goods_list.php?cateCd=004&from=beone-site#muscle-joint-cool',
        blurb:
          '관절 굴곡부 밀착·멘톨 쿨링·MSM·한방 등 관절·근육 부위 컨디셔닝용 화장품 패치로 B2B 자료에 정리되어 있습니다. 전용 goodsNo는 ZIP·몰에서 확인되지 않아 목록 허브 링크만 둡니다.',
      },
      {
        name: '근육관절핫패치',
        goodsNo: '1000000021',
        image: '/assets/products/goods-1000000021.jpg',
        shopHref: 'https://www.kbeone.co.kr/goods/goods_view.php?goodsNo=1000000021',
        blurb:
          '온열 컨디셔닝(HOT) 전용 라인으로, 이중 온열·비타민·허브 등 복합 설계가 B2B 자료에 기술되어 있습니다. 열감은 성분 특성에 따른 체감이며, 의학적 효능은 표방하지 않습니다.',
      },
      {
        name: '슬림핫패치',
        goodsNo: '1000000023',
        image: '/assets/products/goods-1000000023.png',
        shopHref: 'https://www.kbeone.co.kr/goods/goods_view.php?goodsNo=1000000023',
        blurb:
          '바디라인 부위 온열 컨디셔닝을 지향하는 화장품 패치로, B2B 자료에서 특허·이중 온열·카페인 등 설계 방향이 설명됩니다. 체중·지방 관련 의학적 효능은 표방하지 않습니다.',
      },
      {
        name: '굿나잇패치',
        goodsNo: '1000000019',
        image: '/assets/products/goods-1000000019.jpg',
        shopHref: 'https://www.kbeone.co.kr/goods/goods_view.php?goodsNo=1000000019',
        blurb:
          '야간·수면 시간대 착용을 전제로 멘톨·카페인 ZERO, 아이브라이트·페퍼민트 마일드 쿨링 등이 교육용 자료에 정리된 화장품 패치입니다.',
      },
      {
        name: '다기억패치',
        goodsNo: '1000000018',
        image: '/assets/products/goods-1000000018.jpg',
        shopHref: 'https://www.kbeone.co.kr/goods/goods_view.php?goodsNo=1000000018',
        blurb:
          '빌베리·안토시아닌·NO·쿨링 등을 조합한 플래그십 라인으로 B2B·교육 자료에 소개됩니다. 치매·인지 질환 치료 표현은 자료에서 배제합니다.',
      },
      {
        name: '쏘팔메토패치',
        goodsNo: '1000000012',
        image: '/assets/products/goods-1000000012.jpg',
        shopHref: 'https://www.kbeone.co.kr/goods/goods_view.php?goodsNo=1000000012',
        blurb:
          '쏘팔메토·네틀오일 등 허브 웰니스 컨디셔닝을 지향하는 화장품 패치로 B2B 자료에 정리되어 있습니다. 질병 치료·건강기능식품 표현은 표방하지 않습니다.',
      },
      {
        name: '에너이자패치',
        goodsNo: '1000000013',
        image: '/assets/products/goods-1000000013.jpg',
        shopHref: 'https://www.kbeone.co.kr/goods/goods_view.php?goodsNo=1000000013',
        blurb:
          '훼뉴그릭(호로파)·넷틀(쐐기풀)·NO·멘톨 등 활력 허브 컨디셔닝을 지향하는 화장품 패치로 B2B 자료에 기술되어 있습니다.',
      },
    ],
    moreCategories: [] as const,
  },

  partnership: {
    title: '협업 · 글로벌',
    bullets: [
      'OEM·ODM: 패치·착용형 웰니스 품목의 규격·브랜드·물량에 맞춘 제조·포장을 논의합니다. 견적·샘플·일정은 제품군마다 다르니, 하단 연락처로 메일 제목에 «OEM·ODM 문의»를 적어 보내 주시면 담당에서 회신 드립니다.',
      '해외 파트너십: 북미·유럽·동남아 등 신규 시장에서 유통·브랜드·플랫폼을 함께 열 협력사를 찾습니다. 현지 법인·대리·수출입 조건은 국가·채널별 단계 협의를 원칙으로 합니다.',
      '상세 스펙·가격·MOQ·계약 구조는 상호 NDA 하에 개별 협의하며, 도입 전 공식몰·인허가 표시를 기준으로 합니다.',
    ],
  },

  officialChannels: {
    title: '공식 온라인',
    intro: '구매·회원·고객 지원은 아래 공식 채널을 이용해 주세요.',
    links: [
      {
        label: 'K비원몰',
        href: 'https://www.kbeone.co.kr/',
        visualSrc: '/icons/channel-official-mall.svg',
      },
      {
        label: '네이버 스마트스토어 (kbeone)',
        href: 'https://smartstore.naver.com/kbeone',
        visualSrc: '/icons/channel-smartstore.svg',
      },
    ],
  },

  contact: {
    title: '오시는 길 · 연락처',
    /** 외부 지도 검색 — `hrefPrefix` + URL-encoded `office.address` */
    externalMapLinks: [
      {
        id: 'kakao',
        label: '카카오맵에서 보기',
        hrefPrefix: 'https://map.kakao.com/link/search/',
      },
      {
        id: 'naver',
        label: '네이버 지도에서 보기',
        hrefPrefix: 'https://map.naver.com/v5/search/',
      },
      {
        id: 'tmap',
        label: 'T-map에서 보기',
        /** www.tmap.co.kr 경로는 301 → tmapmobility.com; 검색어는 인코딩된 전체 주소를 전달 */
        hrefPrefix: 'https://www.tmapmobility.com/?searchKeyword=',
      },
    ] as const,
    offices: [
      {
        heading: '[판매유통] 주식회사 비원글로벌',
        /** 통신판매·공식몰 푸터와 동일한 도로명 주소 */
        address: '경기도 부천시 원미구 상일로 82(상동) 301호',
        telDisplay: 'TEL. 82-(0)32-322-0315',
        telHref: 'tel:+82323220315',
      },
      {
        heading: '[제조사] 주식회사 비원',
        address: '경기도 김포시 양촌읍 황금산단4로 34',
        telDisplay: 'TEL. 82-(0)31-984-6065',
        telHref: 'tel:+82319846065',
        faxDisplay: 'FAX. 82-(0)31-984-6068',
      },
    ],
  },

  /** SNS — 미연결 채널은 href 가 '#' 입니다. */
  socialChannels: [
    { label: 'Instagram', abbr: 'IG', href: 'https://www.instagram.com/beone_global/' },
    { label: 'YouTube', abbr: 'YT', href: 'https://www.youtube.com/@BEONEGLOBAL' },
    { label: 'TikTok', abbr: 'TT', href: 'https://www.tiktok.com/@beoneglobal' },
    { label: 'Facebook', abbr: 'FB', href: '#' },
    { label: '네이버 블로그', abbr: 'Blog', href: '#' },
  ] as const,

  footer: {
    /** K비원몰 푸터 등 공개 채널 기준 — 등기부상 대표와 다를 수 있으니 필요 시 정정 */
    companyLine: '[판매유통] 주식회사 비원글로벌 | 대표이사 : 최민우',
    addressLine: '주소 : 경기도 부천시 원미구 상일로 82(상동) 301호',
    /** 푸터 한 줄 — 히어로는 `legal.bizRegWords` 사용 */
    bizRegPrefix: '사업자번호 :',
    bizRegCheckLabel: '사업자정보확인',
    /** 공정거래위원회 사업자정보 링크 — 필요 시 실제 조회 URL 로 교체 */
    bizRegCheckHref: '#',
    mailOrder: '통신판매업신고 : 2025-부천원미-1191',
    mainTelLabel: '대표번호',
    mainTelDisplay: '032-322-0315',
    mainTelHref: 'tel:+82323220315',
    faxLine: '',
    privacyOfficer: '개인정보관리책임자 : 최명은',
    legalLinks: [
      { label: '이용약관', href: '#' },
      { label: '개인정보처리방침', href: '#' },
      { label: '이용안내', href: '#' },
    ] as const,
    email: 'CFO@kbeone.com',
    copyrightLine: `© ${new Date().getFullYear()} BEONE CO., LTD. All rights reserved.`,
    paymentBadges: [
      { label: 'INIPAY', href: '#' },
      { label: 'ESCROW INIPAY', href: '#' },
    ] as const,
    /** 기밀·저작권 고지 (한국어 3문단) */
    fineprints: [
      '본 사이트의 텍스트·이미지·디자인·레이아웃 등은 (주)비원글로벌 및 권리자에 귀속되며, 기밀 또는 제한된 목적으로만 제공될 수 있습니다. 지정된 범위를 넘는 열람·전달을 금합니다.',
      '비원글로벌(BEONE GLOBAL)의 사전 서면 승인 없이 복제·배포·2차 저작·상업적 이용을 금합니다. 인용이 필요하면 담당 부서로 문의해 주세요.',
      `© ${new Date().getFullYear()} BEONE CO., LTD. / (주)비원·비원글로벌. 모든 권리를 보유합니다.`,
    ],
  },

} as const
