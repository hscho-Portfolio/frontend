import { AdminShell } from './admin-shell'

export const AdminProjectsPage = () => {
  return (
    <AdminShell
      active="Projects"
      title="Projects"
      subtitle="Manage projects stored in the backend database."
      actions={
        <a class="btn-primary" href="/admin/dashboard/projects/new">
          <i class="fa-solid fa-plus"></i> New Project
        </a>
      }
    >
      <div class="adm-filters" id="projects-filters">
        <div class="adm-filter-group">
          <label>Search</label>
          <div class="adm-search-inline">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input id="projects-search" placeholder="Search title or slug" />
          </div>
        </div>
        <div class="adm-filter-group">
          <label>Status</label>
          <select id="projects-status-filter">
            <option value="all">All</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div class="adm-filter-group">
          <label>Visibility</label>
          <select id="projects-visibility-filter">
            <option value="all">All</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
      </div>

      <div class="adm-card adm-card-no-pad" id="projects-list-page">
        <div class="adm-table-wrap">
          <table class="adm-table">
            <thead>
              <tr>
                <th class="th-thumb"></th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th class="th-center">Featured</th>
                <th class="th-center">Visible</th>
                <th>Period</th>
                <th class="th-right">Actions</th>
              </tr>
            </thead>
            <tbody id="projects-table-body">
              <tr>
                <td colSpan={8}>Loading projects...</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="adm-table-foot">
          <span id="projects-total-label">Total 0</span>
        </div>
      </div>
    </AdminShell>
  )
}
