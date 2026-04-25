import { Hono } from 'hono'
import { renderer } from './renderer'
import { IntroPage } from './pages/intro'
import { DesktopPage } from './pages/desktop'
import { ProjectDetailPage } from './pages/project-detail'
import { AdminLoginPage } from './pages/admin-login'
import { AdminDashboardPage } from './pages/admin-dashboard'
import { AdminProjectsPage } from './pages/admin-projects'
import { AdminProjectFormPage } from './pages/admin-project-form'
import { AdminStacksPage } from './pages/admin-stacks'
import { AdminCategoriesPage } from './pages/admin-categories'
import { AdminSettingsPage } from './pages/admin-settings'
import { NotFoundPage } from './pages/not-found'

const app = new Hono()

app.use(renderer)

// === Public ===
app.get('/', (c) => {
  return c.render(<IntroPage />, {
    title: 'CHO OS — Welcome',
    bodyClass: 'intro-body',
    pageScript: '/static/intro.js',
  } as any)
})

app.get('/desktop', (c) => {
  return c.render(<DesktopPage />, {
    title: 'CHO OS — Desktop',
    bodyClass: 'desktop-body',
    pageScript: '/static/desktop.js',
  } as any)
})

app.get('/project/:slug', (c) => {
  const slug = c.req.param('slug')
  return c.render(<ProjectDetailPage slug={slug} />, {
    title: `CHO OS — Project / ${slug}`,
    bodyClass: 'project-body',
    pageScript: '/static/project-detail.js',
  } as any)
})

// === Admin ===
app.get('/admin/login', (c) => {
  return c.render(<AdminLoginPage />, {
    title: 'CHO OS — Admin Login',
    bodyClass: 'admin-login-body',
    pageScript: '/static/admin-login.js',
  } as any)
})

app.get('/admin/dashboard', (c) => {
  return c.render(<AdminDashboardPage />, {
    title: 'CHO OS — Admin Dashboard',
    bodyClass: 'admin-body',
    pageScript: '/static/admin.js',
  } as any)
})

app.get('/admin/dashboard/projects', (c) => {
  return c.render(<AdminProjectsPage />, {
    title: 'CHO OS — Projects Management',
    bodyClass: 'admin-body',
    pageScript: '/static/admin.js',
  } as any)
})

app.get('/admin/dashboard/projects/new', (c) => {
  return c.render(<AdminProjectFormPage mode="new" />, {
    title: 'CHO OS — New Project',
    bodyClass: 'admin-body',
    pageScript: '/static/admin.js',
  } as any)
})

app.get('/admin/dashboard/projects/:id', (c) => {
  const id = c.req.param('id')
  return c.render(<AdminProjectFormPage mode="edit" id={id} />, {
    title: `CHO OS — Edit Project / ${id}`,
    bodyClass: 'admin-body',
    pageScript: '/static/admin.js',
  } as any)
})

app.get('/admin/dashboard/stacks', (c) => {
  return c.render(<AdminStacksPage />, {
    title: 'CHO OS — Stacks Management',
    bodyClass: 'admin-body',
    pageScript: '/static/admin.js',
  } as any)
})

app.get('/admin/dashboard/categories', (c) => {
  return c.render(<AdminCategoriesPage />, {
    title: 'CHO OS — Categories Management',
    bodyClass: 'admin-body',
    pageScript: '/static/admin.js',
  } as any)
})

app.get('/admin/dashboard/settings', (c) => {
  return c.render(<AdminSettingsPage />, {
    title: 'CHO OS — Settings',
    bodyClass: 'admin-body',
    pageScript: '/static/admin.js',
  } as any)
})

// === 404 ===
app.notFound((c) => {
  return c.render(<NotFoundPage />, {
    title: 'CHO OS — System Alert',
    bodyClass: 'not-found-body',
  } as any)
})

export default app
