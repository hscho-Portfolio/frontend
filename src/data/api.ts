// CHO OS — Backend API client
//
// SSR-side fetch functions. Falls back to mock data when the backend is unreachable.
// Backend URL is read from VITE_BACKEND_URL at build time (default: http://localhost:8080).

import type { Project, TechStack, StackCategory, ApiProjectList, ApiProjectDetail } from './types'
import { PROJECTS } from './projects'
import { ALL_STACKS } from './stacks'

export const BACKEND_URL: string =
  (import.meta as any).env?.VITE_BACKEND_URL ?? 'http://localhost:8080'

// ── helpers ────────────────────────────────────────────────────────────────

const THUMB_FALLBACKS = [
  'linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#ec4899 100%)',
  'linear-gradient(135deg,#0ea5e9 0%,#22d3ee 50%,#a78bfa 100%)',
  'linear-gradient(135deg,#f59e0b 0%,#ef4444 50%,#ec4899 100%)',
  'linear-gradient(135deg,#10b981 0%,#06b6d4 100%)',
  'linear-gradient(135deg,#1e40af 0%,#7c3aed 100%)',
  'linear-gradient(135deg,#ec4899 0%,#f97316 100%)',
]

let _fallbackIdx = 0
const nextFallback = () => THUMB_FALLBACKS[_fallbackIdx++ % THUMB_FALLBACKS.length]

function formatPeriod(startDate?: string, endDate?: string): string {
  if (!startDate) return ''
  const fmt = (d: string) => {
    const [y, m] = d.split('-')
    return `${y}.${m}`
  }
  return endDate ? `${fmt(startDate)} ~ ${fmt(endDate)}` : `${fmt(startDate)} ~`
}

function sectionsOf(sections: ApiProjectDetail['sections'], type: string): string[] {
  return sections
    .filter((s) => s.sectionType === type)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((s) => s.content)
}

// ── mappers ────────────────────────────────────────────────────────────────

function mapListToProject(api: ApiProjectList): Project {
  return {
    slug: api.slug,
    title: api.title,
    tagline: api.summary ?? '',
    status: (api.status === 'in_progress' || api.status === 'completed')
      ? api.status
      : 'in_progress',
    period: '',
    category: api.category?.name ?? '',
    featured: api.isFeatured,
    thumbColor: api.thumbnailUrl ?? nextFallback(),
    thumbnailUrl: api.thumbnailUrl ?? undefined,
    overview: api.summary ?? '',
    features: [],
    stacks: api.stacks.map((s) => ({
      name: s.name,
      category: s.category as StackCategory,
      color: '#64748b',
    })),
    architecture: [],
    retrospective: [],
    links: {},
  }
}

function mapDetailToProject(api: ApiProjectDetail): Project {
  return {
    slug: api.slug,
    title: api.title,
    tagline: api.summary ?? api.description ?? '',
    status: (api.status === 'in_progress' || api.status === 'completed')
      ? api.status
      : 'in_progress',
    period: formatPeriod(api.startDate, api.endDate),
    startDate: api.startDate,
    endDate: api.endDate,
    category: api.category?.name ?? '',
    featured: api.isFeatured,
    thumbColor: api.thumbnailUrl ?? nextFallback(),
    thumbnailUrl: api.thumbnailUrl ?? undefined,
    overview: api.summary ?? api.description ?? '',
    features: sectionsOf(api.sections, 'features'),
    stacks: api.stacks.map((s) => ({
      name: s.name,
      category: s.category as StackCategory,
      iconUrl: s.iconUrl ?? undefined,
      color: s.color,
      usage: s.usageDescription,
    })),
    architecture: sectionsOf(api.sections, 'architecture'),
    retrospective: sectionsOf(api.sections, 'retrospective'),
    links: {
      github: api.githubUrl ?? undefined,
      demo: api.demoUrl ?? undefined,
    },
  }
}

// ── public API ─────────────────────────────────────────────────────────────

export async function fetchProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/public/projects`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(3000),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data: ApiProjectList[] = await res.json()
    return data.map(mapListToProject)
  } catch {
    return PROJECTS
  }
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/public/projects/${slug}`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(3000),
    })
    if (res.status === 404) return null
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data: ApiProjectDetail = await res.json()
    return mapDetailToProject(data)
  } catch {
    return PROJECTS.find((p) => p.slug === slug) ?? null
  }
}

export async function fetchStacks(): Promise<TechStack[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/public/stacks`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(3000),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data: { id: number; name: string; category: string; iconUrl?: string; color: string; description?: string }[] =
      await res.json()
    return data.map((s) => ({
      name: s.name,
      category: s.category as StackCategory,
      iconUrl: s.iconUrl ?? undefined,
      color: s.color,
      usage: s.description,
    }))
  } catch {
    return ALL_STACKS
  }
}
