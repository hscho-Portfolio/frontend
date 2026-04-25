import { AdminShell } from './admin-shell'
import { PROJECTS } from '../data/mock'

export const AdminProjectsPage = () => {
  return (
    <AdminShell
      active="Projects"
      title="Projects"
      subtitle="포트폴리오에 노출될 프로젝트를 관리합니다."
      actions={
        <a class="btn-primary" href="/admin/dashboard/projects/new">
          <i class="fa-solid fa-plus"></i> New Project
        </a>
      }
    >
      {/* Filters */}
      <div class="adm-filters">
        <div class="adm-filter-group">
          <label>Category</label>
          <select>
            <option>All categories</option>
            <option>Web Application</option>
            <option>AI Service</option>
            <option>Data Analysis</option>
            <option>Cloud / Infra</option>
            <option>Research</option>
          </select>
        </div>
        <div class="adm-filter-group">
          <label>Status</label>
          <select>
            <option>All</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
        <div class="adm-filter-group">
          <label>Visibility</label>
          <select>
            <option>All</option>
            <option>Public</option>
            <option>Private</option>
          </select>
        </div>
        <div class="adm-filter-spacer"></div>
        <div class="adm-search-inline">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input placeholder="프로젝트명, 슬러그 검색" />
        </div>
      </div>

      {/* Table */}
      <div class="adm-card adm-card-no-pad">
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
                <th>Updated</th>
                <th class="th-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {PROJECTS.map((p) => (
                <tr>
                  <td>
                    <span class="adm-thumb" style={`background:${p.thumbColor}`}>
                      <i class={p.icon}></i>
                    </span>
                  </td>
                  <td>
                    <div class="adm-cell-title">{p.title}</div>
                    <div class="adm-cell-sub">/{p.slug}</div>
                  </td>
                  <td>
                    <span class="adm-tag">{p.category}</span>
                  </td>
                  <td>
                    <span class={`adm-status adm-status-${p.status === 'Completed' ? 'done' : 'wip'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td class="th-center">
                    <label class="adm-toggle">
                      <input type="checkbox" checked={p.featured} />
                      <span></span>
                    </label>
                  </td>
                  <td class="th-center">
                    <label class="adm-toggle">
                      <input type="checkbox" checked />
                      <span></span>
                    </label>
                  </td>
                  <td class="adm-cell-sub">2 days ago</td>
                  <td class="th-right">
                    <a class="adm-icon-btn" href={`/admin/dashboard/projects/${p.slug}`} title="edit">
                      <i class="fa-solid fa-pen-to-square"></i>
                    </a>
                    <button class="adm-icon-btn" title="duplicate">
                      <i class="fa-solid fa-copy"></i>
                    </button>
                    <button class="adm-icon-btn adm-icon-btn-danger" title="delete">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div class="adm-table-foot">
          <span>총 {PROJECTS.length}개</span>
          <div class="adm-pagination">
            <button disabled><i class="fa-solid fa-angle-left"></i></button>
            <button class="active">1</button>
            <button><i class="fa-solid fa-angle-right"></i></button>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
