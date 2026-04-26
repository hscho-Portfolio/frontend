import { $, escapeHtml } from './dom.js'
import { requestJson } from './api.js'

const recentItem = (project) => `
  <li>
    <span class="adm-recent-thumb" style="${project.thumbnailUrl ? `background-image:url(${project.thumbnailUrl});background-size:cover;background-position:center;` : 'background:linear-gradient(135deg,#2563eb 0%,#0ea5e9 100%);'}">
      ${project.thumbnailUrl ? '' : '<i class="fa-solid fa-folder-open"></i>'}
    </span>
    <div class="adm-recent-text">
      <div class="adm-recent-title">${escapeHtml(project.title)}</div>
      <div class="adm-recent-sub">${escapeHtml(project.category?.name || '-')}</div>
    </div>
    <span class="adm-status adm-status-${project.status === 'completed' ? 'done' : 'wip'}">
      ${project.status === 'completed' ? 'Completed' : 'In Progress'}
    </span>
    <a class="adm-row-action" href="/admin/dashboard/projects/${project.id}" title="edit">
      <i class="fa-solid fa-pen-to-square"></i>
    </a>
  </li>
`

export const initDashboardAdmin = async () => {
  const recent = $('#dashboard-recent-projects')
  if (!recent) return

  try {
    const [projects, stacks] = await Promise.all([
      requestJson('/api/v1/projects'),
      requestJson('/api/v1/stacks'),
    ])

    const setStat = (label, value) => {
      const el = document.querySelector(`[data-stat-value="${label}"]`)
      if (el) el.textContent = String(value)
    }

    setStat('Projects', projects.length)
    setStat('In Progress', projects.filter((project) => project.status === 'in_progress').length)
    setStat('Featured', projects.filter((project) => project.featured).length)
    setStat('Tech Stacks', stacks.length)

    recent.innerHTML = projects.length
      ? projects.slice(0, 5).map(recentItem).join('')
      : '<li>No projects in the database yet.</li>'
  } catch (error) {
    recent.innerHTML = `<li>${escapeHtml(error.message || 'Failed to load dashboard data.')}</li>`
  }
}
