// CHO OS — Tech stack catalog (mock)
//
// 추후 D1 DB의 `stacks` 테이블에서 fetch 하도록 교체 예정.
import type { StackCategory, TechStack } from './types'

/** 스택 카테고리 — 어드민 필터 / 통계용 */
export const STACK_CATEGORIES: { name: StackCategory; icon: string }[] = [
  { name: 'Language', icon: 'fa-solid fa-code' },
  { name: 'Frontend', icon: 'fa-solid fa-window-maximize' },
  { name: 'Backend', icon: 'fa-solid fa-server' },
  { name: 'Database', icon: 'fa-solid fa-database' },
  { name: 'Cloud', icon: 'fa-solid fa-cloud' },
  { name: 'DevOps', icon: 'fa-solid fa-gears' },
  { name: 'AI/Data', icon: 'fa-solid fa-brain' },
]

/** 전체 스택 목록 (관리자 + 프로젝트 폼에서 선택지로 노출) */
export const ALL_STACKS: TechStack[] = [
  { name: 'Next.js', category: 'Frontend', icon: 'fa-brands fa-react', color: '#000000', usage: 'OS형 화면 구성과 라우팅' },
  { name: 'React', category: 'Frontend', icon: 'fa-brands fa-react', color: '#61DAFB', usage: '컴포넌트 기반 UI 구성' },
  { name: 'TypeScript', category: 'Language', icon: 'fa-solid fa-code', color: '#3178C6', usage: '타입 안전한 프론트엔드' },
  { name: 'Tailwind CSS', category: 'Frontend', icon: 'fa-solid fa-wind', color: '#06B6D4', usage: '유틸리티 기반 스타일링' },
  { name: 'FastAPI', category: 'Backend', icon: 'fa-solid fa-bolt', color: '#009688', usage: 'CMS API와 CRUD 구현' },
  { name: 'Spring Boot', category: 'Backend', icon: 'fa-solid fa-leaf', color: '#6DB33F', usage: 'Java 기반 백엔드 서비스' },
  { name: 'Python', category: 'Language', icon: 'fa-brands fa-python', color: '#3776AB', usage: '데이터 분석과 ML 모델링' },
  { name: 'PostgreSQL', category: 'Database', icon: 'fa-solid fa-database', color: '#336791', usage: '관계형 데이터 저장' },
  { name: 'MySQL', category: 'Database', icon: 'fa-solid fa-database', color: '#4479A1', usage: '서비스 데이터 저장' },
  { name: 'AWS', category: 'Cloud', icon: 'fa-brands fa-aws', color: '#FF9900', usage: '클라우드 인프라' },
  { name: 'Docker', category: 'DevOps', icon: 'fa-brands fa-docker', color: '#2496ED', usage: '컨테이너 배포' },
  { name: 'GitHub Actions', category: 'DevOps', icon: 'fa-brands fa-github', color: '#2088FF', usage: 'CI/CD 파이프라인' },
  { name: 'Scikit-learn', category: 'AI/Data', icon: 'fa-solid fa-chart-line', color: '#F7931E', usage: 'ML 모델 학습' },
  { name: 'XGBoost', category: 'AI/Data', icon: 'fa-solid fa-tree', color: '#E53935', usage: '회귀/분류 모델' },
]

/** 이름 배열로 stack 객체 배열 만들기 (없는 이름은 무시) */
export const pickStacks = (...names: string[]): TechStack[] =>
  names.map((n) => ALL_STACKS.find((s) => s.name === n)).filter((s): s is TechStack => !!s)

/** 이름으로 단일 스택 찾기 */
export const findStack = (name: string): TechStack | undefined =>
  ALL_STACKS.find((s) => s.name === name)

/** 한 프로젝트에서의 스택 사용 설명을 매핑 (이름 → usage 텍스트) */
export const withUsage = (stacks: TechStack[], usageMap: Record<string, string>): TechStack[] =>
  stacks.map((s) => ({ ...s, usage: usageMap[s.name] ?? s.usage }))
