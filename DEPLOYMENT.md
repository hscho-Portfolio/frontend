# Frontend 배포 가이드

이 프론트엔드는 Vercel에 배포합니다. 백엔드 API 주소는 빌드 시점의 `VITE_BACKEND_URL`로 결정됩니다.

## Vercel 설정

| 항목 | 값 |
|---|---|
| Root Directory | `frontend` |
| Install Command | `npm install` |
| Build Command | `npm run build` |

## 환경변수

Vercel Project > Settings > Environment Variables에 등록합니다.

```env
VITE_BACKEND_URL=https://api.your-domain.com
```

이 값이 없으면 기본값 `http://localhost:8080`이 사용될 수 있으므로 운영 배포 전에 반드시 등록하고 redeploy하세요.

## 로컬 검증

```powershell
npm install
npm run build
```

개발 서버:

```powershell
npm run dev -- --host 127.0.0.1 --port 5173
```

## 배포

Vercel Git 연동을 사용하면 `main` 브랜치 push 시 자동 배포됩니다.

```bash
git push origin main
```

CLI 직접 배포가 필요할 때:

```powershell
npm run build
npx vercel --prod
```

## 배포 후 확인

```text
https://your-portfolio.vercel.app
https://your-portfolio.vercel.app/admin/login
```

확인할 것:

- 공개 프로젝트 목록이 백엔드에서 로드되는지
- 관리자 로그인 페이지에서 API 호출이 성공하는지
- 이미지 URL이 S3 또는 CloudFront 주소로 표시되는지
- 브라우저 개발자 도구에서 API가 `localhost:8080`으로 나가지 않는지

## 자주 나는 문제

### API가 localhost로 호출됨

`VITE_BACKEND_URL` 등록 후 Vercel Production Redeploy를 실행합니다.

### CORS 에러

백엔드 ECS 환경변수 `CORS_ORIGINS`에 Vercel origin을 넣어야 합니다.

```env
CORS_ORIGINS=https://your-portfolio.vercel.app,https://your-domain.com
```

### 이미지가 보이지 않음

S3/CloudFront 접근 정책과 백엔드의 `AWS_S3_BASE_URL` 값을 확인합니다.

