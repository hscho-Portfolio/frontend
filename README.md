# CHO OS — Portfolio

## Project Overview
- **Name**: CHO OS Portfolio
- **Goal**: 맥북 오프닝 + OS형 인터페이스를 가진 실무형 포트폴리오 + 관리자 CMS
- **Stack**: Hono (Cloudflare Pages) · TypeScript · Tailwind (CDN) · Vanilla JS

## URLs
- **Local Dev**: http://localhost:3000
- **Sandbox**: https://3000-i9cgx2vaqo6tyuu9es6mt-583b4d74.sandbox.novita.ai
- **Production**: 미배포

## 페이지 구조 (구현 완료)

### Public
| Path | 역할 |
|---|---|
| `/` | 인트로 — 닫힌 맥북 → 클릭 → 열림 → 부팅 로그 → 자동으로 `/desktop` 이동 |
| `/desktop` | OS형 메인 화면 — TopBar + 바탕화면 아이콘 + Dock + 폴더/앱 오버레이 |
| `/project/:slug` | 프로젝트 상세 — Hero / Overview / Features / **3D Tech Stack 카드** / Architecture / Retrospective |

### Admin
| Path | 역할 |
|---|---|
| `/admin/login` | OS 로그인 스타일 (mock — 어떤 값이든 로그인 시 dashboard 이동) |
| `/admin/dashboard` | 대시보드 — 통계 카드 / 최근 프로젝트 / Quick Actions |
| `/admin/dashboard/projects` | 프로젝트 목록 테이블 + 필터 + 토글 |
| `/admin/dashboard/projects/new` | 새 프로젝트 등록 폼 |
| `/admin/dashboard/projects/:id` | 프로젝트 수정 폼 (스택 사용 설명 입력 포함) |
| `/admin/dashboard/stacks` | 기술 스택 카테고리별 관리 |
| `/admin/dashboard/categories` | 카테고리 관리 |
| `/admin/dashboard/settings` | 사이트 정보 / 외관 설정 |

### Etc
| Path | 역할 |
|---|---|
| `/*` (404) | System Alert 스타일 not-found |

## 인터랙션 요약
- **인트로** — 클릭/Enter/Space 로 맥북 열림 → 부팅 진행률 → 자동 이동
- **Desktop 아이콘 / Dock** — 클릭 시:
  - `Projects` → iOS 스타일 폴더 확대 오버레이 (검색 + 필터 + 카드 그리드)
  - `About / Skills / Career / Research / Contact` → 앱 윈도우 오버레이
  - `Admin` → `/admin/login` 으로 이동
- **Folder** — 검색창 + filter chip(All/Featured/In Progress/Completed)
- **Project Detail** — 호버 시 3D 회전하는 Tech Stack 카드 (앞: 이름/카테고리, 뒤: 사용 설명)
- **ESC** — 열린 오버레이 닫기 / 상세 페이지에서는 데스크톱으로 복귀

## 데이터
- 임시 mock 데이터: `src/data/mock.ts`
  - `PROJECTS` — 6개 샘플 프로젝트 (Portfolio CMS, QLED, Senior Welfare, NLP, Blockchain, AI Drawing)
  - `ALL_STACKS` — 14개 기술 스택
  - `STACK_CATEGORIES` — 7개 카테고리
- 추후 백엔드 (FastAPI + PostgreSQL) 연결 예정

## 폴더 구조
```
src/
├── index.tsx              # 라우팅
├── renderer.tsx           # 공통 HTML 셸 (head/script 주입)
├── data/mock.ts           # 임시 데이터
└── pages/
    ├── intro.tsx
    ├── desktop.tsx
    ├── project-detail.tsx
    ├── admin-login.tsx
    ├── admin-shell.tsx          # 어드민 공통 레이아웃 (사이드바 + 탑바)
    ├── admin-dashboard.tsx
    ├── admin-projects.tsx
    ├── admin-project-form.tsx   # new + edit 통합
    ├── admin-stacks.tsx
    ├── admin-categories.tsx
    ├── admin-settings.tsx
    └── not-found.tsx

public/static/
├── style.css              # 글로벌 토큰 + 공통 컴포넌트
├── mac-laptop.css         # 맥북 폴백 (사용자가 따로 가진 mac_laptop.css로 교체 가능)
├── desktop.css            # Desktop / Intro / Project / Admin 통합 스타일
├── intro.js               # 인트로 인터랙션
├── desktop.js             # 데스크톱 인터랙션 (폴더 / 앱 / 시계 / 필터)
├── project-detail.js
├── admin-login.js
└── admin.js
```

## 미구현 / 다음 단계
1. **백엔드 연동** — FastAPI + PostgreSQL CRUD
2. **JWT 인증** — `/admin/login` 실제 로그인
3. **이미지 업로드** — S3 또는 R2 연동
4. **프로젝트 상세 페이지의 슬러그 라우팅** — 현재는 mock 슬러그 기반
5. **창 드래그 / 멀티 윈도우** — 현재는 단일 오버레이
6. **AWS / Cloudflare Pages 배포**
7. **mac_laptop.css 적용** — 사용자가 가지고 있는 정밀한 맥북 CSS로 폴백 교체

## 사용 가이드
1. 사이트 진입 시 닫힌 맥북 화면 — 클릭하거나 Enter 누르면 열림
2. 부팅 완료 후 `/desktop` 으로 자동 이동
3. 바탕화면 아이콘 또는 하단 Dock 클릭으로 각 섹션 탐색
4. `Projects` 폴더에서 카드 클릭 시 상세 페이지 이동 (`/project/:slug`)
5. 상세 페이지의 Tech Stack 카드는 호버 시 회전하면서 사용 설명이 표시됨
6. 우측 상단 `←` 또는 `ESC` 로 데스크톱 복귀
7. `Admin` 클릭 시 로그인 페이지 → 어떤 이메일/비밀번호로도 dashboard 이동 (현재 mock)

## 개발
```bash
# 빌드
npm run build

# PM2로 실행
pm2 start ecosystem.config.cjs

# 로그 확인
pm2 logs webapp --nostream

# 정지
pm2 delete webapp
```

## Last Updated
2026-04-25
