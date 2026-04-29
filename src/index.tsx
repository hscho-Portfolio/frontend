import { Hono } from 'hono'
import { renderer } from './renderer'
import { IntroPage } from './pages/intro'
import { DesktopPage } from './pages/desktop'
import { ProjectDetailPage } from './pages/project-detail'
import { fetchProjects, fetchProjectBySlug, fetchShortcuts } from './data/api'
import { AdminLoginPage } from './pages/admin-login'
import { AdminDashboardPage } from './pages/admin-dashboard'
import { AdminProjectsPage } from './pages/admin-projects'
import { AdminProjectFormPage } from './pages/admin-project-form'
import { AdminStacksPage } from './pages/admin-stacks'
import { AdminCategoriesPage } from './pages/admin-categories'
import { AdminAwardsPage } from './pages/admin-awards'
import { AdminSettingsPage } from './pages/admin-settings'
import { NotFoundPage } from './pages/not-found'

/**
 * 페이지 그룹별 CSS 묶음 — renderer가 base.css + group + responsive.css 순으로 로드.
 *
 *   intro     : 인트로(맥북 부팅) + 데스크톱 공통
 *   desktop   : 데스크톱(아이콘·독·앱창·폴더 오버레이)
 *   project   : 프로젝트 상세(Hero·Stack 3D·Architecture)
 *   admin     : 어드민 콘솔 전체 (login + shell + form + modal + 404 시스템 알림)
 */
const CSS_BUNDLES = {
  intro: ['/static/mac-laptop.css', '/static/css/desktop.css'],
  desktop: ['/static/css/desktop.css', '/static/css/shortcut-cards.css', '/static/css/loader.css'],
  project: ['/static/css/desktop.css', '/static/css/project.css'],
  admin: ['/static/css/admin.css'],
  notFound: ['/static/css/project.css'], // 404는 project.css에 포함된 .nf-* 만 사용
} as const

const app = new Hono()
app.use(renderer)

// ============================================================
// Public routes
// ============================================================
app.get('/', (c) =>
  c.render(<IntroPage />, {
    title: 'CHO OS — Welcome',
    bodyClass: 'intro-body',
    pageScript: '/static/intro.js',
    css: CSS_BUNDLES.intro,
  } as any)
)

app.get('/desktop', (c) => {
  return c.render(<DesktopPage projects={[]} shortcuts={[]} />, {
    title: 'CHO OS — Desktop',
    bodyClass: 'desktop-body',
    pageScript: '/static/desktop.js',
    extraScripts: ['/static/characters.js'],
    css: CSS_BUNDLES.desktop,
  } as any)
})

app.get('/project/:slug', async (c) => {
  const slug = c.req.param('slug')
  const project = await fetchProjectBySlug(slug)
  return c.render(<ProjectDetailPage project={project} />, {
    title: `CHO OS — Project / ${slug}`,
    bodyClass: 'project-body',
    pageScript: '/static/project-detail.js',
    css: CSS_BUNDLES.project,
  } as any)
})

// ============================================================
// Admin routes
// ============================================================
app.get('/admin/login', (c) =>
  c.render(<AdminLoginPage />, {
    title: 'CHO OS — Admin Login',
    bodyClass: 'admin-login-body',
    pageScript: '/static/admin-login.js',
    css: CSS_BUNDLES.admin,
  } as any)
)

const adminPage = (
  Component: any,
  title: string,
  extra: { id?: string; mode?: 'new' | 'edit' } = {}
) => ({
  body: <Component {...extra} />,
  opts: {
    title,
    bodyClass: 'admin-body',
    pageScript: '/static/admin.js',
    css: CSS_BUNDLES.admin,
  } as any,
})

app.get('/admin/dashboard', (c) => {
  const { body, opts } = adminPage(AdminDashboardPage, 'CHO OS — Admin Dashboard')
  return c.render(body, opts)
})

app.get('/admin/dashboard/projects', (c) => {
  const { body, opts } = adminPage(AdminProjectsPage, 'CHO OS — Projects Management')
  return c.render(body, opts)
})

app.get('/admin/dashboard/projects/new', (c) => {
  const { body, opts } = adminPage(AdminProjectFormPage, 'CHO OS — New Project', { mode: 'new' })
  return c.render(body, opts)
})

app.get('/admin/dashboard/projects/:id', (c) => {
  const id = c.req.param('id')
  const { body, opts } = adminPage(AdminProjectFormPage, `CHO OS — Edit Project / ${id}`, {
    mode: 'edit',
    id,
  })
  return c.render(body, opts)
})

app.get('/admin/dashboard/stacks', (c) => {
  const { body, opts } = adminPage(AdminStacksPage, 'CHO OS — Stacks Management')
  return c.render(body, opts)
})

app.get('/admin/dashboard/categories', (c) => {
  const { body, opts } = adminPage(AdminCategoriesPage, 'CHO OS — Categories Management')
  return c.render(body, opts)
})

app.get('/admin/dashboard/awards', (c) => {
  const { body, opts } = adminPage(AdminAwardsPage, 'CHO OS — Awards Management')
  return c.render(body, opts)
})

app.get('/admin/dashboard/settings', (c) => {
  const { body, opts } = adminPage(AdminSettingsPage, 'CHO OS — Settings')
  return c.render(body, opts)
})

// ============================================================
// 404
// ============================================================
app.notFound((c) => {
  c.status(404)
  return c.render(<NotFoundPage />, {
    title: 'CHO OS — System Alert',
    bodyClass: 'not-found-body',
    css: CSS_BUNDLES.notFound,
  } as any)
})

export default app
