import { AdminShell } from './admin-shell'
import { ALL_STACKS, STACK_CATEGORIES } from '../data/mock'

export const AdminStacksPage = () => {
  return (
    <AdminShell
      active="Stacks"
      title="Tech Stacks"
      subtitle="포트폴리오에서 사용될 기술 스택을 관리합니다."
      actions={
        <button class="btn-primary">
          <i class="fa-solid fa-plus"></i> Add Stack
        </button>
      }
    >
      {STACK_CATEGORIES.map((cat) => {
        const items = ALL_STACKS.filter((s) => s.category === cat.name)
        if (items.length === 0) return null
        return (
          <section class="adm-stack-section">
            <header class="adm-stack-section-head">
              <h3>
                <i class={cat.icon}></i> {cat.name}
              </h3>
              <span class="adm-stack-count">{items.length}</span>
            </header>
            <div class="adm-stack-grid">
              {items.map((s) => (
                <div class="adm-stack-card">
                  <span class="adm-stack-card-icon" style={`--c:${s.color}`}>
                    <i class={s.icon}></i>
                  </span>
                  <div class="adm-stack-card-text">
                    <div class="adm-stack-card-name">{s.name}</div>
                    <div class="adm-stack-card-cat">{s.category}</div>
                  </div>
                  <div class="adm-stack-card-actions">
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
          </section>
        )
      })}
    </AdminShell>
  )
}
