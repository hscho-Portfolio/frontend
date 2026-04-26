// CHO OS — Domain types

export type StackCategory =
  | 'Language'
  | 'Frontend'
  | 'Backend'
  | 'Database'
  | 'Cloud'
  | 'DevOps'
  | 'AI/Data'

/** Backend status values (snake_case) */
export type ProjectStatus = 'in_progress' | 'completed'

export interface TechStack {
  name: string
  category: StackCategory
  /** Font Awesome class string — local mock only */
  icon?: string
  /** Image URL from backend storage */
  iconUrl?: string
  color: string
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
  /** Formatted display string, e.g. "2026.04 ~" */
  period: string
  startDate?: string
  endDate?: string
  category: string
  featured: boolean
  /** CSS gradient fallback when no thumbnailUrl */
  thumbColor: string
  thumbnailUrl?: string
  /** Font Awesome class for project hero icon — local mock only */
  icon?: string
  /** Maps to backend's `summary` field */
  overview: string
  features: string[]
  stacks: TechStack[]
  architecture: string[]
  retrospective: string[]
  links: ProjectLinks
}

// ============================================================
// Backend API response shapes (for api.ts mapping layer)
// ============================================================

export interface ApiStackInfo {
  id: number
  name: string
  category: string
  description?: string
  usageDescription?: string
  iconUrl?: string
  color: string
  sortOrder?: number
}

export interface ApiSectionInfo {
  id: number
  title?: string
  sectionType: string
  content: string
  sortOrder: number
}

export interface ApiProjectList {
  id: number
  title: string
  slug: string
  summary?: string
  thumbnailUrl?: string
  status: string
  isFeatured: boolean
  isPublished: boolean
  sortOrder: number
  category?: { id: number; name: string }
  stacks: { id: number; name: string; category: string }[]
}

export interface ApiProjectDetail {
  id: number
  title: string
  slug: string
  summary?: string
  description?: string
  thumbnailUrl?: string
  githubUrl?: string
  demoUrl?: string
  status: string
  startDate?: string
  endDate?: string
  isFeatured: boolean
  isPublished: boolean
  sortOrder: number
  category?: { id: number; name: string; slug?: string }
  stacks: ApiStackInfo[]
  sections: ApiSectionInfo[]
  images: { id: number; imageUrl: string; altText?: string; imageType: string; sortOrder: number }[]
}
