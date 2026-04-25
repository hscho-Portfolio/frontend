import { AdminShell } from './admin-shell'
import { PROJECTS, ALL_STACKS } from '../data/mock'

export const AdminDashboardPage = () => {
  const total = PROJECTS.length
  const inProgress = PROJECTS.filter((p) => p.status === 'In Progress').length
  const featured = PROJECTS.filter((p) => p.featured).length
  const stacks = ALL_STACKS.length
  const recent = [...PROJECTS].slice(0, 5)

  return (
    <AdminShell
      active="Dashboard"
      title="Dashboard"
      subtitle="포트폴리오 운영 현황을 한눈에 확인하세요."
      actions={
        <a class="btn-primary" href="/admin/dashboard/projects/new">
          <i class="fa-solid fa-plus"></i> New Project
        </a>
      }
    >
      {/* Summary cards */}
      <section class="adm-grid adm-grid-4">
        <div class="adm-stat-card">
          <div class="adm-stat-icon" style="--c:#6366f1"><i class="fa-solid fa-folder-open"></i></div>
          <div class="adm-stat-text">
            <div class="adm-stat-label">Projects</div>
            <div class="adm-stat-value">{total}</div>
            <div class="adm-stat-trend up">
              <i class="fa-solid fa-arrow-trend-up"></i> 전체 프로젝트 수
            </div>
          </div>
        </div>
        <div class="adm-stat-card">
          <div class="adm-stat-icon" style="--c:#f59e0b"><i class="fa-solid fa-spinner"></i></div>
          <div class="adm-stat-text">
            <div class="adm-stat-label">In Progress</div>
            <div class="adm-stat-value">{inProgress}</div>
            <div class="adm-stat-trend">진행 중</div>
          </div>
        </div>
        <div class="adm-stat-card">
          <div class="adm-stat-icon" style="--c:#ec4899"><i class="fa-solid fa-star"></i></div>
          <div class="adm-stat-text">
            <div class="adm-stat-label">Featured</div>
            <div class="adm-stat-value">{featured}</div>
            <div class="adm-stat-trend">대표 프로젝트</div>
          </div>
        </div>
        <div class="adm-stat-card">
          <div class="adm-stat-icon" style="--c:#10b981"><i class="fa-solid fa-layer-group"></i></div>
          <div class="adm-stat-text">
            <div class="adm-stat-label">Tech Stacks</div>
            <div class="adm-stat-value">{stacks}</div>
            <div class="adm-stat-trend">등록된 기술</div>
          </div>
        </div>
      </section>

      {/* 2-col layout */}
      <section class="adm-grid adm-grid-2 mt-24">
        {/* Recent Projects */}
        <div class="adm-card">
          <header class="adm-card-head">
            <div>
              <h3>Recent Projects</h3>
              <p>최근에 추가/수정된 프로젝트</p>
            </div>
            <a class="adm-card-action" href="/admin/dashboard/projects">
              View all <i class="fa-solid fa-arrow-right"></i>
            </a>
          </header>
          <ul class="adm-recent">
            {recent.map((p) => (
              <li>
                <span class="adm-recent-thumb" style={`background:${p.thumbColor}`}>
                  <i class={p.icon}></i>
                </span>
                <div class="adm-recent-text">
                  <div class="adm-recent-title">
                    {p.title}
                    {p.featured ? <span class="adm-tag adm-tag-featured">★</span> : null}
                  </div>
                  <div class="adm-recent-sub">
                    {p.category} · {p.period}
                  </div>
                </div>
                <span class={`adm-status adm-status-${p.status === 'Completed' ? 'done' : 'wip'}`}>
                  {p.status}
                </span>
                <a class="adm-row-action" href={`/admin/dashboard/projects/${p.slug}`} title="edit">
                  <i class="fa-solid fa-pen-to-square"></i>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Actions */}
        <div class="adm-card">
          <header class="adm-card-head">
            <div>
              <h3>Quick Actions</h3>
              <p>자주 쓰는 작업 바로가기</p>
            </div>
          </header>
          <div class="adm-quick-grid">
            <a class="adm-quick" href="/admin/dashboard/projects/new">
              <span class="adm-quick-icon" style="--c:#6366f1">
                <i class="fa-solid fa-plus"></i>
              </span>
              <span class="adm-quick-text">
                <strong>New Project</strong>
                <small>프로젝트 등록</small>
              </span>
            </a>
            <a class="adm-quick" href="/admin/dashboard/stacks">
              <span class="adm-quick-icon" style="--c:#10b981">
                <i class="fa-solid fa-layer-group"></i>
              </span>
              <span class="adm-quick-text">
                <strong>Manage Stacks</strong>
                <small>기술 스택 관리</small>
              </span>
            </a>
            <a class="adm-quick" href="/admin/dashboard/categories">
              <span class="adm-quick-icon" style="--c:#f59e0b">
                <i class="fa-solid fa-sitemap"></i>
              </span>
              <span class="adm-quick-text">
                <strong>Categories</strong>
                <small>카테고리 관리</small>
              </span>
            </a>
            <a class="adm-quick" href="/admin/dashboard/settings">
              <span class="adm-quick-icon" style="--c:#ec4899">
                <i class="fa-solid fa-sliders"></i>
              </span>
              <span class="adm-quick-text">
                <strong>Settings</strong>
                <small>사이트 설정</small>
              </span>
            </a>
          </div>

          <div class="adm-tip">
            <i class="fa-regular fa-lightbulb"></i>
            <div>
              <strong>Tip.</strong> 프로젝트 등록 시 <em>Tech Stack 사용 설명</em>을 함께 입력하면, 상세 페이지의 3D 카드 뒷면에 자동으로 표시됩니다.
            </div>
          </div>
        </div>
      </section>
    </AdminShell>
  )
}
