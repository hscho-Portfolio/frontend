# CHO OS — Portfolio (Frontend)

OS형 인터페이스를 가진 실무형 포트폴리오 CMS의 **프론트 페이지** 1차 구현입니다.
맥북 오프닝 인트로 → OS 데스크톱 → iOS 폴더 형식의 프로젝트 탐색 → 3D 카드 기반 프로젝트 상세 → 글래스모피즘 어드민까지 모두 정적 렌더링(SSR + 인터랙션 JS) 으로 구현되어 있습니다.

## 🎯 Project Overview
- **Name**: CHO OS Portfolio
- **Goal**: 단순한 정적 포트폴리오를 넘어, 운영 가능한 CMS 구조를 가진 OS형 포트폴리오 제품을 만든다.
- **Stack**: Hono(SSR) + TypeScript + JSX + Vanilla CSS(Glassmorphism) + Tailwind CDN + FontAwesome
- **Deploy Target**: Cloudflare Pages

## 🌐 URLs (현재 구현된 라우트)

### Public
| Path | 설명 |
|---|---|
| `/` | **Intro** — 별 배경 + 클릭 시 열리는 맥북 + 부팅 화면, 자동으로 `/desktop` 이동 |
| `/desktop` | **Desktop OS** — TopBar / 바탕화면 아이콘 / Welcome 위젯 / Dock |
| `/project/:slug` | **Project Detail** — Hero / Overview / Features / 3D Tech Stack 카드 / Architecture / Retrospective |

### Admin
| Path | 설명 |
|---|---|
| `/admin/login` | 글래스모피즘 OS 로그인 카드 (테스트 계정: `admin@cho.os` / `admin1234`) |
| `/admin/dashboard` | 통계 카드 4개 + Recent Projects + Quick Actions |
| `/admin/dashboard/projects` | 프로젝트 테이블, 필터, 토글 스위치 |
| `/admin/dashboard/projects/new` | 신규 프로젝트 등록 폼 |
| `/admin/dashboard/projects/:id` | 프로젝트 수정 폼 |
| `/admin/dashboard/stacks` | 기술 스택 카드 그리드 (카테고리 탭 포함) |
| `/admin/dashboard/categories` | 카테고리 카드 (정렬 핸들 포함) |
| `/admin/dashboard/settings` | 사이트 정보 / 외부 링크 / 테마 / Danger Zone |

`/not-exist` 등 매칭되지 않는 경로 → **System Alert 404** 페이지

## 🧪 Test Account
어드민 로그인 테스트는 클라이언트 mock 인증으로 동작합니다.
```
Email:    admin@cho.os
Password: admin1234
```

## 🗂️ 데이터 구조 (현재는 mock)
실제 DB 연동 전 임시 데이터로 동작합니다. (`src/data/mock.ts`)

```ts
Project {
  slug, title, tagline,
  status: 'In Progress' | 'Completed',
  period, category, featured,
  thumbColor, icon,
  overview, features[], stacks[],
  architecture[], retrospective[],
  links: { github, demo }
}

TechStack {
  name, category, icon, color, usage
}
```

## 🧩 핵심 인터랙션
- **맥북 오프닝**: 사용자가 업로드한 CSS 베이스 위에 클릭/Enter 시 `is-open` 클래스로 스크린이 열림 → 부팅 로그 → 자동 이동
- **iOS 폴더 확대**: Projects 아이콘/Dock 클릭 시 backdrop blur + 카드 expand
- **3D 스택 카드**: 호버 시 앞면이 슬라이드되며 사용 설명이 보이는 transition (사용자 업로드 카드 효과 기반)
- **App Window**: About / Skills / Career / Research / Contact 는 별도 페이지가 아닌 **데스크톱 위 윈도우 오버레이**로 열림 (JS로 컨텐츠 주입)
- **ESC 키**: 열린 폴더/윈도우/프로젝트 상세 닫기

## 🎨 Design System
- **Theme**: Dark Glassmorphism + Mesh Gradient + 별 배경
- **Brand Gradient**: `#6366f1 → #8b5cf6 → #ec4899`
- **Backdrop blur**: 18~28px + saturate(180%)
- **Typography**: Pretendard / Inter / JetBrains Mono
- **Radius**: 8 / 12 / 18 / 24 / 32

## ✅ 1차 완료 (Frontend Design)
- [x] Intro page — 맥북 오프닝 + 부팅 화면
- [x] Desktop OS page — TopBar, 데스크톱 아이콘, Welcome 위젯, Dock
- [x] Projects Folder — 검색/필터/카드 그리드
- [x] Project Detail Window — Hero / Overview / Key Features / 3D Stack Cards / Architecture / Retrospective
- [x] About / Skills / Career / Research / Contact 윈도우 (오버레이)
- [x] Admin Login (Glassmorphism)
- [x] Admin Dashboard (Stats + Recent + Quick Actions)
- [x] Admin Projects Table + 필터 + 토글
- [x] Admin Project Form (new/edit, 좌우 분할)
- [x] Admin Stacks (3D Card Grid + 카테고리 탭)
- [x] Admin Categories (정렬 가능 카드)
- [x] Admin Settings (테마 / 컬러 스와치 / 월페이퍼 / Danger Zone)
- [x] 404 System Alert page

## 🚧 다음 단계 (Not Yet Implemented)
- [ ] 백엔드 연동 (FastAPI + PostgreSQL)
- [ ] JWT 기반 실제 관리자 인증
- [ ] 프로젝트 CRUD API + 이미지 업로드
- [ ] D1/KV/R2 또는 외부 DB 통합
- [ ] AWS 배포 파이프라인 (CloudFront + ECS Fargate)
- [ ] 모바일 반응형 보강 (현재는 데스크톱 우선)

## 📦 Local Development
```bash
cd /home/user/webapp
npm run build
pm2 start ecosystem.config.cjs
# → http://localhost:3000
```

PM2 명령:
```bash
pm2 logs webapp --nostream
pm2 restart webapp
pm2 list
```

## 📂 File Structure
```
src/
├── index.tsx              # Hono 라우터 (모든 라우트)
├── renderer.tsx           # JSX 공통 레이아웃 (head, scripts)
├── data/
│   └── mock.ts            # 임시 프로젝트/스택 데이터
└── pages/
    ├── intro.tsx
    ├── desktop.tsx
    ├── project-detail.tsx
    ├── admin-shell.tsx    # 어드민 공통 레이아웃 (사이드바 + 토픽바)
    ├── admin-login.tsx
    ├── admin-dashboard.tsx
    ├── admin-projects.tsx
    ├── admin-project-form.tsx
    ├── admin-stacks.tsx
    ├── admin-categories.tsx
    ├── admin-settings.tsx
    └── not-found.tsx

public/static/
├── style.css              # 글로벌 토큰 + 공통 컴포넌트
├── mac-laptop.css         # 맥북 인트로 CSS (업로드 베이스 + is-open 변형)
├── desktop.css            # 데스크톱/폴더/프로젝트상세/어드민 전체
├── intro.js               # 맥북 오프닝 시퀀스 + 부팅 로그
├── desktop.js             # 폴더/앱 윈도우 오버레이, 시계, 필터
├── admin-login.js         # 로그인 폼 + 비밀번호 토글 + mock 인증
├── admin.js               # 어드민 컬러/월페이퍼/탭 단일선택
└── project-detail.js      # ESC → 데스크톱
```

## 🚀 Deployment Status
- **Platform**: Cloudflare Pages (예정)
- **Status**: 🟡 로컬 PM2 실행 중 (배포 전)
- **Tech**: Hono + Vite (SSR via _worker.js, 96KB)
- **Last Updated**: 2026-04-25
