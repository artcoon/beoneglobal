# 배포 메모 (Amplify)

프로젝트 소유자용 요약입니다.

## 저장소·브랜치

- **GitHub**: https://github.com/artcoon/beoneglobal
- **브랜치**: `main`
- **배포**: 콘솔에서 Amplify 연결 후, `main`에 푸시하면 **AWS Amplify**(리전 **ap-northeast-2**, 서울)에서 자동 빌드·배포됩니다.

## Amplify 기본 URL

- 사용 예시 패턴: `https://main.di3e7mvcbtq9u.amplifyapp.com/`
- Amplify 앱을 다시 만들면 **App ID가 달라질 수 있어** 위 URL의 중간 부분은 변경될 수 있습니다.

## 빌드 설정

- 루트 **`amplify.yml`** 기준
- **preBuild**: `npm ci`
- **build**: `npm run build`
- **아티팩트**: `dist` 디렉터리

## 보안·운영

- AWS·GitHub **비밀번호·토큰은 채팅 등에 공유하지 마세요.**
- GitHub의 Amplify 앱 연동은 **리전별**로 동작합니다. 앱이 어느 리전에 붙어 있는지 확인하세요.

## 커스텀 도메인: **beone.you** (Porkbun → Amplify)

도메인은 **Porkbun**에서 관리하고, 사이트는 **AWS Amplify**에 올린 뒤 DNS만 Amplify가 안내하는 값으로 맞추면 됩니다. SSL(HTTPS)은 Amplify가 인증서를 발급해 연결합니다(Porkbun 화면의 “SSL”은 Amplify 연결 전이면 “Nothing Yet”일 수 있음).

### 1) Amplify에 도메인 등록

1. [AWS Amplify 콘솔](https://console.aws.amazon.com/amplify/) → 해당 앱 → **Hosting** → **Custom domains**(또는 도메인 관리).
2. **Add domain** → `beone.you` 입력.
3. 서브도메인 구성 예:
   - 루트 **`beone.you`** 만 쓰거나,
   - **`www.beone.you`** 까지 쓰려면 둘 다 추가한 뒤 한쪽으로 리다이렉트(Amplify에서 권장 조합 선택).
4. 화면에 나오는 **DNS 레코드 목록**을 그대로 복사합니다. 여기 적힌 **호스트 이름·값·유형(CNAME / ALIAS 등)** 만 Porkbun에 넣으면 됩니다. 앱·리전마다 값이 달라 채팅에 고정값을 적어 둘 수는 없습니다.

### 2) Porkbun DNS에 레코드 추가

1. Porkbun → **beone.you** → **DNS Records** (또는 Details → DNS).
2. Amplify가 준 레코드를 **추가**합니다. 보통은 다음 두 종류가 섞입니다.
   - **인증서 검증용** `CNAME` (예: `_xxxx.beone.you` → `_xxxx.acm-validations.aws.` 등) — SSL 발급에 필요.
   - **실제 트래픽용**: 서브도메인이면 `CNAME` (예: `www` → `xxxx.cloudfront.net` 등). **루트(apex)** 는 Porkbun에서 **ALIAS** 레코드로 CloudFront 호스트를 가리키라고 안내되는 경우가 많습니다. Amplify 콘솔에 표시된 유형·대상을 따르세요.
3. Nameserver는 지금처럼 **Porkbun 기본 NS**를 쓰는 경우가 많습니다. NS를 Route 53 등으로 바꾸지 않았다면, **Porkbun DNS에만** 위 레코드를 넣으면 됩니다.
4. DNS 전파는 수 분~수 시간 걸릴 수 있습니다. Amplify 도메인 상태가 **Available** 이 될 때까지 기다립니다.

### 3) 배포·코드와 맞추기

- 이 저장소는 공식 URL을 **`https://beone.you`** 로 두었습니다(`index.html`의 canonical·Open Graph, `siteContent`의 `publicSiteUrl`).
- **`main`에 푸시**해 Amplify 빌드가 성공하면, 도메인 연결 완료 후 같은 빌드가 **beone.you** 로 서빙됩니다.

### 4) 나중에 React Router 등 경로 라우팅을 넣을 때

- `/foo` 같은 경로를 쓰게 되면 Amplify **Rewrites and redirects**에 SPA용 **200 rewrite**(`/*` → `/index.html`)를 추가해야 합니다. 현재 사이트는 앵커(`#overview` 등)만 쓰므로 필수는 아닙니다.

## 이후 선택 사항

- Amplify에서 **커스텀 도메인** 연결(위 **beone.you** 절차).
- 클라이언트 사이드 **경로** 라우팅을 도입하면 **SPA 리라이트(404 → index)** 규칙이 필요할 수 있습니다.
