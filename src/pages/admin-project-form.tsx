import { AdminShell } from './admin-shell'
import { ALL_STACKS, findProject } from '../data/mock'

export const AdminProjectFormPage = ({ mode, id }: { mode: 'new' | 'edit'; id?: string }) => {
  const isEdit = mode === 'edit'
  const project = isEdit && id ? findProject(id) : null
  const titleText = isEdit ? `Edit Project · ${project?.title || id}` : 'New Project'

  return (
    <AdminShell
      active="Projects"
      title={titleText}
      subtitle="프로젝트 정보를 입력하고 저장하세요."
      actions={
        <>
          <a class="btn-ghost" href="/admin/dashboard/projects">
            Cancel
          </a>
          <button class="btn-primary">
            <i class="fa-solid fa-floppy-disk"></i> Save
          </button>
        </>
      }
    >
      <form class="adm-form-grid">
        {/* Left: main */}
        <div class="adm-form-main">
          {/* 기본 정보 */}
          <section class="adm-card">
            <header class="adm-card-head">
              <div>
                <h3>기본 정보</h3>
                <p>프로젝트의 핵심 메타데이터</p>
              </div>
            </header>
            <div class="adm-form-row two">
              <label class="adm-field">
                <span>Title</span>
                <input type="text" value={project?.title || ''} placeholder="프로젝트 제목" />
              </label>
              <label class="adm-field">
                <span>Slug</span>
                <input type="text" value={project?.slug || ''} placeholder="url-friendly-slug" />
              </label>
            </div>
            <label class="adm-field">
              <span>Tagline</span>
              <input type="text" value={project?.tagline || ''} placeholder="한 줄 설명" />
            </label>
            <div class="adm-form-row three">
              <label class="adm-field">
                <span>Category</span>
                <select>
                  <option>Web Application</option>
                  <option>AI Service</option>
                  <option>Data Analysis</option>
                  <option>Cloud / Infra</option>
                  <option>Research</option>
                </select>
              </label>
              <label class="adm-field">
                <span>Status</span>
                <select>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </label>
              <label class="adm-field">
                <span>Period</span>
                <input type="text" value={project?.period || ''} placeholder="2026.04 ~" />
              </label>
            </div>
          </section>

          {/* 상세 섹션 */}
          <section class="adm-card">
            <header class="adm-card-head">
              <div>
                <h3>상세 섹션</h3>
                <p>프로젝트 상세 페이지에 노출될 내용</p>
              </div>
            </header>
            <label class="adm-field">
              <span>Overview</span>
              <textarea rows={5} placeholder="프로젝트의 목적과 범위">
                {project?.overview || ''}
              </textarea>
            </label>
            <label class="adm-field">
              <span>Key Features (한 줄에 하나씩)</span>
              <textarea rows={5} placeholder={'관리자 CMS\n프로젝트 CRUD\nAWS 배포'}>
                {(project?.features || []).join('\n')}
              </textarea>
            </label>
            <label class="adm-field">
              <span>Architecture (한 줄에 하나씩)</span>
              <textarea rows={4} placeholder={'사용자\nCloudFront\nS3'}>
                {(project?.architecture || []).join('\n')}
              </textarea>
            </label>
            <label class="adm-field">
              <span>Retrospective (한 줄에 하나씩)</span>
              <textarea rows={4} placeholder="배운 점, 시행착오, 향후 방향">
                {(project?.retrospective || []).join('\n')}
              </textarea>
            </label>
          </section>

          {/* 기술 스택 */}
          <section class="adm-card">
            <header class="adm-card-head">
              <div>
                <h3>Tech Stack</h3>
                <p>스택을 선택하고, 프로젝트에서의 사용 설명을 입력하세요.</p>
              </div>
            </header>
            <div class="adm-stack-list">
              {ALL_STACKS.slice(0, 8).map((s) => {
                const checked = project?.stacks.some((ps) => ps.name === s.name)
                const usage = project?.stacks.find((ps) => ps.name === s.name)?.usage || ''
                return (
                  <div class={`adm-stack-row ${checked ? 'on' : ''}`}>
                    <label class="adm-stack-pick">
                      <input type="checkbox" checked={!!checked} />
                      <span class="adm-stack-pick-mark" style={`--c:${s.color}`}>
                        <i class={s.icon}></i>
                      </span>
                      <span class="adm-stack-pick-name">{s.name}</span>
                      <span class="adm-stack-pick-cat">{s.category}</span>
                    </label>
                    <input type="text" class="adm-stack-usage" value={usage} placeholder="이 프로젝트에서의 사용 설명" />
                  </div>
                )
              })}
            </div>
          </section>
        </div>

        {/* Right: sidebar */}
        <aside class="adm-form-side">
          <section class="adm-card">
            <header class="adm-card-head">
              <div>
                <h3>Publish</h3>
              </div>
            </header>
            <div class="adm-side-row">
              <span>Featured</span>
              <label class="adm-toggle">
                <input type="checkbox" checked={!!project?.featured} />
                <span></span>
              </label>
            </div>
            <div class="adm-side-row">
              <span>Visible</span>
              <label class="adm-toggle">
                <input type="checkbox" checked />
                <span></span>
              </label>
            </div>
            <div class="adm-side-row">
              <span>Sort order</span>
              <input type="number" defaultValue={0} class="adm-side-num" />
            </div>
          </section>

          <section class="adm-card">
            <header class="adm-card-head">
              <div>
                <h3>Links</h3>
              </div>
            </header>
            <label class="adm-field">
              <span>GitHub URL</span>
              <input type="url" value={project?.links.github || ''} placeholder="https://github.com/..." />
            </label>
            <label class="adm-field">
              <span>Demo URL</span>
              <input type="url" value={project?.links.demo || ''} placeholder="https://..." />
            </label>
          </section>

          <section class="adm-card">
            <header class="adm-card-head">
              <div>
                <h3>Images</h3>
                <p>썸네일과 갤러리 이미지를 업로드</p>
              </div>
            </header>
            <div class="adm-upload">
              <i class="fa-regular fa-image"></i>
              <span>이미지를 드래그하거나 클릭하여 업로드</span>
              <small>PNG, JPG · 최대 5MB</small>
            </div>
          </section>
        </aside>
      </form>
    </AdminShell>
  )
}
