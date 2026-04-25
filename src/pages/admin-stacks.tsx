import { AdminShell } from './admin-shell'
import { ALL_STACKS, STACK_CATEGORIES } from '../data/mock'

export const AdminStacksPage = () => {
  return (
    <AdminShell
      active="Stacks"
      title="Tech Stacks"
      subtitle="포트폴리오에서 사용되는 기술 스택을 관리합니다."
      actions={
        <button class="btn-primary">
          <i class="fa-solid fa-plus"></i> Add Stack
        </button>
      }
    >
      <div class="adm-cat-tabs">
        <button class="adm-cat-tab active">All</button>
        {STACK_CATEGORIES.map((c) => (
          <button class="adm-cat-tab">
            <i class={c.icon}></i>
            {c.name}
          </button>
        ))}
      </div>

      <div class="adm-stack-grid">
        {ALL_STACKS.map((s) => (
          <div class="adm-stack-card" style={`--c:${s.color}`}>
            <div class="adm-stack-card-icon">
              <i class={s.icon}></i>
            </div>
            <div class="adm-stack-card-name">{s.name}</div>
            <div class="adm-stack-card-cat">{s.category}</div>
            <p class="adm-stack-card-desc">{s.usage || '기술 스택 설명을 입력하세요.'}</p>
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

        <button class="adm-stack-card adm-stack-add">
          <span class="adm-stack-add-icon">
            <i class="fa-solid fa-plus"></i>
          </span>
          <span>새 기술 추가</span>
        </button>
      </div>
    </AdminShell>
  )
}
