import { AdminShell } from './admin-shell'

export const AdminDashboardPage = () => {
  return (
    <AdminShell
      active="Dashboard"
      title="Dashboard"
      subtitle="Overview of the current backend data."
      actions={
        <a class="btn-primary" href="/admin/dashboard/projects/new">
          <i class="fa-solid fa-plus"></i> New Project
        </a>
      }
    >
      <section class="adm-grid adm-grid-4" id="dashboard-stats">
        {[
          ['Projects', '0', 'fa-solid fa-folder-open', '#2563eb'],
          ['In Progress', '0', 'fa-solid fa-spinner', '#f59e0b'],
          ['Featured', '0', 'fa-solid fa-star', '#ec4899'],
          ['Tech Stacks', '0', 'fa-solid fa-layer-group', '#10b981'],
        ].map(([label, value, icon, color]) => (
          <div class="adm-stat-card">
            <div class="adm-stat-icon" style={`--c:${color}`}><i class={icon}></i></div>
            <div class="adm-stat-text">
              <div class="adm-stat-label">{label}</div>
              <div class="adm-stat-value" data-stat-value={label}>{value}</div>
              <div class="adm-stat-trend">Live backend data</div>
            </div>
          </div>
        ))}
      </section>

      <section class="adm-grid adm-grid-2 mt-24">
        <div class="adm-card">
          <header class="adm-card-head">
            <div>
              <h3>Recent Projects</h3>
              <p>Latest projects stored in the backend.</p>
            </div>
            <a class="adm-card-action" href="/admin/dashboard/projects">
              View all <i class="fa-solid fa-arrow-right"></i>
            </a>
          </header>
          <ul class="adm-recent" id="dashboard-recent-projects">
            <li>Loading recent projects...</li>
          </ul>
        </div>

        <div class="adm-card">
          <header class="adm-card-head">
            <div>
              <h3>Quick Actions</h3>
              <p>Shortcuts into the main admin workflows.</p>
            </div>
          </header>
          <div class="adm-quick-grid">
            <a class="adm-quick" href="/admin/dashboard/projects/new">
              <span class="adm-quick-icon" style="--c:#2563eb">
                <i class="fa-solid fa-plus"></i>
              </span>
              <span class="adm-quick-text">
                <strong>New Project</strong>
                <small>Create a project</small>
              </span>
            </a>
            <a class="adm-quick" href="/admin/dashboard/stacks">
              <span class="adm-quick-icon" style="--c:#10b981">
                <i class="fa-solid fa-layer-group"></i>
              </span>
              <span class="adm-quick-text">
                <strong>Manage Stacks</strong>
                <small>Edit tech stacks</small>
              </span>
            </a>
            <a class="adm-quick" href="/admin/dashboard/categories">
              <span class="adm-quick-icon" style="--c:#f59e0b">
                <i class="fa-solid fa-sitemap"></i>
              </span>
              <span class="adm-quick-text">
                <strong>Categories</strong>
                <small>Edit categories</small>
              </span>
            </a>
            <a class="adm-quick" href="/admin/dashboard/settings">
              <span class="adm-quick-icon" style="--c:#ec4899">
                <i class="fa-solid fa-sliders"></i>
              </span>
              <span class="adm-quick-text">
                <strong>Settings</strong>
                <small>Site information</small>
              </span>
            </a>
          </div>
        </div>
      </section>
    </AdminShell>
  )
}
