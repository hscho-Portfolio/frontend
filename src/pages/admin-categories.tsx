import { AdminShell } from './admin-shell'

const CATEGORIES = [
  { name: 'Web Application', slug: 'web', count: 2, color: '#6366f1' },
  { name: 'AI Service', slug: 'ai', count: 2, color: '#ec4899' },
  { name: 'Cloud / Infra', slug: 'cloud', count: 0, color: '#0ea5e9' },
  { name: 'Data Analysis', slug: 'data', count: 2, color: '#10b981' },
  { name: 'Research', slug: 'research', count: 0, color: '#a78bfa' },
  { name: 'Frontend', slug: 'frontend', count: 0, color: '#f59e0b' },
  { name: 'Backend', slug: 'backend', count: 0, color: '#ef4444' },
]

export const AdminCategoriesPage = () => {
  return (
    <AdminShell
      active="Categories"
      title="Categories"
      subtitle="프로젝트 분류 카테고리를 관리합니다."
      actions={
        <button class="btn-primary">
          <i class="fa-solid fa-plus"></i> Add Category
        </button>
      }
    >
      <div class="adm-cat-grid">
        {CATEGORIES.map((c, i) => (
          <div class="adm-cat-card">
            <div class="adm-cat-mark" style={`background:${c.color}`}>
              <span>{c.name.charAt(0)}</span>
            </div>
            <div class="adm-cat-text">
              <div class="adm-cat-name">{c.name}</div>
              <div class="adm-cat-meta">
                /{c.slug} · {c.count} projects
              </div>
            </div>
            <div class="adm-cat-order">
              <span>#{i + 1}</span>
            </div>
            <div class="adm-cat-actions">
              <button class="adm-icon-btn" title="edit">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="adm-icon-btn adm-icon-btn-danger" title="delete">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  )
}
