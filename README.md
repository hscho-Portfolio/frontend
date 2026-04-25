# CHO OS — Portfolio (webapp)

## 프로젝트 개요
- **이름**: CHO OS Portfolio
- **목표**: macOS 스타일 데스크톱 UI 위에 펼쳐지는 인터랙티브 포트폴리오 + 프로젝트/스택을 직접 관리할 수 있는 어드민 CMS
- **스타일**: 라이트 톤 파스텔 글래스모피즘, 모던 트렌디 그라디언트, JetBrains Mono + Pretendard 타이포그래피

## 기술 스택
- **Edge / 서버**: Hono + Cloudflare Pages (Vite SSR)
- **프론트**: 순수 TSX (Hono JSX) + 바닐라 CSS + 작은 인터랙션 JS
- **폰트/아이콘**: Pretendard, JetBrains Mono, FontAwesome 6
- **(예정)** 백엔드: FastAPI + PostgreSQL + AWS (S3, CloudFront, RDS)

## 라우트 (현재 완료된 진입점)
| 경로 | 설명 |
|---|---|
| `/` | 인트로. 닫힌 맥북 → 클릭/Enter → 부팅 → `/desktop` 자동 이동 |
| `/desktop` | 데스크톱 OS UI. 탑바, 아이콘, Dock, 앱/폴더 윈도우 |
| `/project/:slug` | 프로젝트 상세. Hero / Overview / Key Features / 3D Tech Stack / Architecture / Retrospective |
| `/admin/login` | 글래스모피즘 로그인 (UI만, 인증은 추후) |
| `/admin/dashboard` | 요약 카드 + Recent + Quick actions |
| `/admin/dashboard/projects` | 프로젝트 목록 / 필터 / 토글 / 액션 (UI) |
| `/admin/dashboard/projects/new` · `/:id` | 프로젝트 등록·수정 폼 (UI) |
| `/admin/dashboard/stacks` | 기술 스택 카드 그리드 |
| `/admin/dashboard/categories` | 카테고리 (Project / Stack 탭) |
| `/admin/dashboard/settings` | 사이트 / 프로필 / 테마 / 위험구역 |
| 기타 | `not-found` 윈도우 (404) |

## 데스크톱 인터랙션
- 상단바 시계는 30초마다 갱신
- 데스크톱 아이콘 / Dock 아이콘 클릭 → 앱 윈도우 또는 폴더 오버레이 오픈
- Projects 폴더 → iOS-스타일 그리드 + 검색 + 필터(All / Featured / In Progress / Completed)
- 프로젝트 카드 클릭 → `/project/:slug`
- About / Skills / Career / Research / Contact 윈도우 → JS로 컨텐츠 주입
- ESC, 백드롭 클릭 → 윈도우 닫기
- `?open=projects` 와 같이 쿼리스트링으로 자동 오픈 가능

## 프로젝트 상세 페이지 구성
1. Hero (그라디언트 타이틀, 상태/기간/카테고리 칩, GitHub/Demo 버튼)
2. Overview (보더-액센트 강조 카드)
3. Key Features (그리드)
4. **Tech Stack 3D 카드** — hover 시 Y축 180° 플립, 뒷면에 사용 설명
5. Architecture (수직 노드 + 화살표 다이어그램)
6. Retrospective (인용 카드 리스트)

## 디자인 토큰 (요약)
- 배경: lavender / peach / cyan mist + radial mesh 그라디언트
- 그라디언트: `--grad-accent`, `--grad-aurora`, `--grad-warm`, `--grad-cool`
- 글래스: `rgba(255,255,255,0.55~0.85)` + `backdrop-filter: blur(28~40px) saturate(180%)`
- 액센트: violet `#8b5cf6` / pink `#ec4899` / cyan `#06b6d4`
- 라운드: 8 / 12 / 18 / 22 / 32 px

## 데이터 구조 (현재 mock)
- `src/data/mock.ts` 의 `PROJECTS`, `ALL_STACKS`, `findProject(slug)`
- 각 프로젝트는 title / slug / tagline / category / status / period / icon / thumbColor / featured / overview / features / stacks(usage 포함) / architecture / retrospective / links 필드
- 추후 FastAPI + PostgreSQL 로 대체 예정

## 사용 방법
```bash
# 개발 (sandbox)
npm run build
pm2 start ecosystem.config.cjs    # http://localhost:3000

# 배포 (Cloudflare Pages)
npm run deploy
```

## 진행 상태
- ✅ Phase 1: Intro / Desktop / Projects 폴더 / Project Detail / 3D Tech Stack 카드
- ✅ Phase 2: About Me / Skills / Career / Research / Contact 윈도우
- ✅ Phase 3 (UI): Admin Login / Dashboard / Projects CRUD / Stacks / Categories / Settings 화면
- 🔄 Phase 4: 백엔드 (FastAPI + PostgreSQL) 연동, JWT 인증, 이미지 업로드, AWS 배포
- 🔄 잔여 폴리싱: 윈도우 드래그/리사이즈/최소화 애니메이션, 컨텍스트 메뉴

## 미구현 / 다음 단계
- [ ] FastAPI 백엔드 (`/api/auth/login`, projects/stacks/categories CRUD)
- [ ] PostgreSQL 스키마 + Alembic 마이그레이션
- [ ] JWT 기반 어드민 인증 흐름과 `/admin/login` 폼 연동
- [ ] S3 직접 업로드 + CloudFront 캐싱
- [ ] 윈도우 드래그/리사이즈/Z-인덱스 관리, 컨텍스트 메뉴
- [ ] 다국어(EN/KO) 토글

## 라이선스
© 2026 Hosung Cho — Portfolio Edition
