import { AdminShell } from './admin-shell'

const CATEGORIES = [
  { name: 'AI Service', slug: 'ai-service', count: 2, color: '#6366f1' },
  { name: 'Web Application', slug: 'web-application', count: 2, color: '#10b981' },
  { name: 'Cloud / Infra', slug: 'cloud-infra', count: 0, color: '#f59e0b' },
  { name: 'Data Analysis', slug: 'data-analysis', count: 2, color: '#ec4899' },
  { name: 'Research', slug: 'research', count: 0, color: '#22d3ee' },
  { name: 'Frontend', slug: 'frontend', count: 0, color: '#a78bfa' },
  { name: 'Backend', slug: 'backend', count: 0, color: '#34d399' },
]

export const AdminCategoriesPage = () => {
  return (
    <AdminShell
      active="Categories"
      title="Categories"
      subtitle="프로젝트를 분류하는 카테고리를 관리합니다."
      actions={
        <button class="btn-primary">
          <i class="fa-solid fa-plus"></i> Add Category
        </button>
      }
    >
      <div class="adm-cat-grid">
        {CATEGORIES.map((c, i) => (
          <div class="adm-cat-card" style={`--c:${c.color}`}>
            <div class="adm-cat-card-head">
              <span class="adm-cat-card-mark">
                <i class="fa-solid fa-sitemap"></i>
              </span>
              <span class="adm-cat-card-handle">
                <i class="fa-solid fa-grip-vertical"></i>
              </span>
            </div>
            <div class="adm-cat-card-name">{c.name}</div>
            <div class="adm-cat-card-slug">/{c.slug}</div>
            <div class="adm-cat-card-foot">
              <span class="adm-cat-card-count">
                <i class="fa-solid fa-folder-open"></i> {c.count} projects
              </span>
              <div class="adm-cat-card-actions">
                <button class="adm-icon-btn" title="edit">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="adm-icon-btn adm-icon-btn-danger" title="delete">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
            <div class="adm-cat-card-order">#{i + 1}</div>
          </div>
        ))}

        <button class="adm-cat-card adm-cat-add">
          <span class="adm-stack-add-icon">
            <i class="fa-solid fa-plus"></i>
          </span>
          <span>새 카테고리 추가</span>
        </button>
      </div>
    </AdminShell>
  )
}
