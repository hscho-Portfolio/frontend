# CHO OS — Portfolio Frontend

macOS 스타일 데스크톱 UI로 구성된 인터랙티브 포트폴리오입니다.  
Hono + Preact SSR 기반으로 Vercel에 배포됩니다.

---

## 기술 스택

| 영역 | 사용 기술 |
|---|---|
| 런타임 | [Hono](https://hono.dev) + Vercel (Node.js SSR) |
| UI | Preact JSX (서버 사이드 렌더링, 클라이언트 hydration 없음) |
| 스타일 | 바닐라 CSS (글래스모피즘 + 파스텔 그라디언트 디자인 시스템) |
| 인터랙션 | 바닐라 JS (ESM 모듈, 프레임워크 없음) |
| 빌드 | Vite + `@hono/vite-build` (Vercel 어댑터) |
| 폰트/아이콘 | Pretendard, JetBrains Mono, FontAwesome 6 |

---

## 프로젝트 구조

```
frontend/
├── src/
│   ├── index.tsx          # 라우트 정의 + 페이지별 CSS 번들 매핑
│   ├── renderer.tsx       # 공통 HTML 레이아웃 (CSS/JS 주입, BACKEND_URL 설정)
│   ├── data/
│   │   ├── types.ts       # 도메인 타입 (Project, TechStack 등)
│   │   ├── api.ts         # 백엔드 SSR fetch 함수 (실패 시 mock fallback)
│   │   ├── stacks.ts      # 스택 카탈로그 + 카테고리 목록
│   │   └── projects.ts    # 로컬 mock 프로젝트 데이터
│   └── pages/
│       ├── intro.tsx              # 인트로 (맥북 애니메이션)
│       ├── desktop.tsx            # 데스크톱 메인
│       ├── project-detail.tsx     # 프로젝트 상세
│       ├── not-found.tsx          # 404
│       ├── admin-shell.tsx        # 어드민 공통 레이아웃 (사이드바 + 탑바)
│       ├── admin-login.tsx        # 로그인 페이지
│       ├── admin-dashboard.tsx    # 대시보드
│       ├── admin-projects.tsx     # 프로젝트 목록
│       ├── admin-project-form.tsx # 프로젝트 등록/수정 폼
│       ├── admin-stacks.tsx       # 기술 스택 관리
│       ├── admin-categories.tsx   # 카테고리 관리
│       └── admin-settings.tsx     # 사이트 설정
│
├── public/static/
│   ├── style.css          # 공통 디자인 토큰 + reset
│   ├── mac-laptop.css     # 인트로 맥북 애니메이션 전용
│   ├── css/
│   │   ├── desktop.css    # 데스크톱 / 폴더 / 앱 윈도우
│   │   ├── project.css    # 프로젝트 상세 + 3D 스택 카드 + 404
│   │   ├── admin.css      # 어드민 전체 (로그인 / 폼 / 모달 / 업로더)
│   │   ├── components.css # 공통 재사용 컴포넌트
│   │   └── responsive.css # 반응형 브레이크포인트
│   ├── intro.js           # 인트로 인터랙션 (맥북 열기 → 부팅 → 이동)
│   ├── desktop.js         # 데스크톱 인터랙션 (윈도우 / 폴더 / 필터 / 시계)
│   ├── project-detail.js  # 프로젝트 상세 인터랙션 (3D 스택 카드 등)
│   ├── admin-login.js     # 로그인 폼 제출 + JWT 저장
│   ├── admin.js           # 어드민 ESM 엔트리 (모든 init 함수 호출)
│   └── admin/
│       ├── api.js         # 어드민 fetch 헬퍼 (Authorization 헤더 자동 주입)
│       ├── core.js        # JWT 세션 / 로그아웃 / requireAuth
│       ├── dom.js         # DOM 유틸리티 ($, $$, escapeHtml, flashClass)
│       ├── stack-picker.js    # 스택 검색 · 필터 · 체크박스
│       ├── stack-modal.js     # "+ 새 스택" 모달 + 라이브 프리뷰
│       ├── uploaders.js       # 아키텍처 / 썸네일 이미지 업로더
│       ├── projects.js        # 프로젝트 CRUD
│       ├── stacks-admin.js    # 스택 CRUD
│       ├── categories-admin.js # 카테고리 CRUD
│       ├── dashboard.js       # 대시보드 통계
│       └── settings-admin.js  # 사이트 설정 저장
│
├── .env.local             # 로컬 환경 변수 (커밋 금지)
├── .env.example           # 환경 변수 예시 (커밋용)
├── vite.config.ts
└── package.json
```

---

## 로컬 개발 환경 설정

### 1. 환경 변수 설정

```bash
cp .env.example .env.local
```

`.env.local` 내용:

```env
# 백엔드 API URL — SSR fetch와 어드민 API 호출 모두 이 값을 사용
VITE_BACKEND_URL=http://localhost:8080
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

기본 포트: `http://localhost:5173`

> 백엔드가 실행 중이어야 프로젝트 데이터가 표시됩니다.  
> 백엔드가 없으면 `src/data/projects.ts`의 mock 데이터로 자동 fallback됩니다.

---

## 빌드 및 배포

### 빌드

```bash
npm run build
```

`.vercel/output/` 폴더에 Vercel Build Output API 형식의 번들이 생성됩니다.

### Vercel 배포

#### 최초 1회 — Vercel CLI 설치 및 프로젝트 연결

```bash
npm install -g vercel
vercel login
vercel link
```

#### 환경 변수 설정

Vercel 대시보드 → Project Settings → Environment Variables 에서 추가:

| 변수 | 값 |
|---|---|
| `VITE_BACKEND_URL` | 실제 백엔드 URL (예: `https://api.your-domain.com`) |

#### 배포

```bash
npm run deploy
```

또는 빌드와 배포를 분리해서:

```bash
npm run build
npx vercel --prod
```

#### GitHub 자동 배포 (권장)

Vercel 대시보드에서 GitHub 레포지토리를 연결하면 `main` 브랜치에 push할 때마다 자동으로 배포됩니다.  
이 경우 `npm run deploy`는 따로 실행하지 않아도 됩니다.

---

## 페이지 라우트

| 경로 | 설명 |
|---|---|
| `/` | 인트로 — 닫힌 맥북 → 클릭/Enter → 뚜껑 열림 → 줌 → 부팅 → `/desktop` 이동 |
| `/desktop` | 데스크톱 OS UI — 탑바, 아이콘 그리드, Dock, 앱/폴더 윈도우 |
| `/project/:slug` | 프로젝트 상세 — Hero / Overview / Features / 3D Stack / Architecture / Retrospective |
| `/admin/login` | 어드민 로그인 |
| `/admin/dashboard` | 대시보드 — 통계 카드 + 최근 프로젝트 |
| `/admin/dashboard/projects` | 프로젝트 목록 / 검색 / 필터 / 삭제 |
| `/admin/dashboard/projects/new` | 새 프로젝트 등록 |
| `/admin/dashboard/projects/:id` | 프로젝트 수정 |
| `/admin/dashboard/stacks` | 기술 스택 관리 |
| `/admin/dashboard/categories` | 카테고리 관리 |
| `/admin/dashboard/settings` | 사이트 설정 |

---

## 어드민 인증

로그인 시 백엔드에서 발급받은 JWT 토큰을 `localStorage['cho-os-admin-token']`에 저장합니다.  
모든 어드민 API 요청에 `Authorization: Bearer <token>` 헤더가 자동으로 추가됩니다.

기본 계정 (백엔드 `AdminSeeder` 생성):

```
Email:    admin@portfolio.local
Password: changeme123!
```

---

## 데이터 흐름

```
Vercel Node.js SSR
  └── Hono 라우트
        ├── fetchProjects()  → GET /api/v1/public/projects  (백엔드)
        │     └── 실패 시 → src/data/projects.ts (mock fallback)
        └── Preact JSX 렌더링 → HTML 응답

브라우저
  └── <script type="module" src="/static/admin.js"> 로드
        └── requireAuth() → 토큰 없으면 /admin/login 리다이렉트
              └── 각 init 함수 → 해당 DOM 있을 때만 동작 (없으면 noop)
```

---

## 데스크톱 주요 인터랙션

- 탑바 시계 30초 자동 갱신
- 아이콘/Dock 클릭 → 앱 윈도우 또는 폴더 오버레이 오픈
- Projects 폴더 → 카드 그리드 + 검색 + 필터 (All / Featured / In Progress / Completed)
- 프로젝트 카드 클릭 → `/project/:slug`
- ESC / 백드롭 클릭 → 윈도우 닫기
- `?open=projects` 쿼리스트링으로 특정 폴더 자동 오픈

---

## 라이선스

© 2026 Hosung Cho — Portfolio Edition
