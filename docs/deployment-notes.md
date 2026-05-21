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

## 이후 선택 사항

- Amplify에서 **커스텀 도메인** 연결
- 클라이언트 사이드 라우팅을 도입하면 **SPA 리라이트(404 → index)** 규칙이 필요할 수 있습니다.
