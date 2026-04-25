// CHO OS — Domain types
//
// 도메인 타입을 한 곳에서 관리. 추후 DB 스키마와 1:1로 매핑할 예정.

export type StackCategory =
  | 'Language'
  | 'Frontend'
  | 'Backend'
  | 'Database'
  | 'Cloud'
  | 'DevOps'
  | 'AI/Data'

export type ProjectStatus = 'In Progress' | 'Completed'

export interface TechStack {
  name: string
  category: StackCategory
  /** Font Awesome class string. e.g. "fa-brands fa-react" */
  icon: string
  /** Brand hex color. e.g. "#61DAFB" */
  color: string
  /** 이 프로젝트(혹은 전역)에서의 사용 설명 */
  usage?: string
}

export interface ProjectLinks {
  github?: string
  demo?: string
}

export interface Project {
  slug: string
  title: string
  tagline: string
  status: ProjectStatus
  period: string
  category: string
  featured: boolean
  /** linear-gradient css string for thumbnail */
  thumbColor: string
  /** Font Awesome class for project icon */
  icon: string
  overview: string
  features: string[]
  stacks: TechStack[]
  architecture: string[]
  retrospective: string[]
  links: ProjectLinks
}
