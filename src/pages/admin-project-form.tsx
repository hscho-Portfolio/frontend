import { AdminShell } from './admin-shell'
import { ALL_STACKS, STACK_CATEGORIES } from '../data/stacks'
import { findProject } from '../data/projects'

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
              <span>Retrospective (한 줄에 하나씩)</span>
              <textarea rows={4} placeholder="배운 점, 시행착오, 향후 방향">
                {(project?.retrospective || []).join('\n')}
              </textarea>
            </label>
          </section>

          {/* Architecture: 이미지 + 텍스트 다이어그램 */}
          <section class="adm-card">
            <header class="adm-card-head">
              <div>
                <h3>Architecture</h3>
                <p>다이어그램 이미지를 업로드하거나, 텍스트 흐름을 입력하세요.</p>
              </div>
              <div class="adm-arch-mode" role="tablist" aria-label="Architecture mode">
                <button type="button" class="adm-arch-mode-btn active" data-arch-mode="image">
                  <i class="fa-regular fa-image"></i> 이미지
                </button>
                <button type="button" class="adm-arch-mode-btn" data-arch-mode="text">
                  <i class="fa-solid fa-list"></i> 텍스트
                </button>
              </div>
            </header>

            {/* 이미지 업로드 영역 */}
            <div class="adm-arch-pane" data-arch-pane="image">
              <div class="adm-arch-upload" id="archUpload">
                <input type="file" id="archImageInput" accept="image/*" hidden />
                <div class="adm-arch-upload-empty">
                  <div class="adm-arch-upload-icon">
                    <i class="fa-solid fa-cloud-arrow-up"></i>
                  </div>
                  <div class="adm-arch-upload-title">아키텍처 다이어그램 이미지를 업로드하세요</div>
                  <div class="adm-arch-upload-desc">
                    이미지를 드래그&드롭하거나 <span class="adm-arch-upload-link">파일 선택</span>
                  </div>
                  <small>PNG, JPG, SVG, WebP · 최대 10MB · 권장 1600×900</small>
                </div>
                <div class="adm-arch-upload-preview" hidden>
                  <img alt="architecture preview" />
                  <div class="adm-arch-upload-meta">
                    <div class="adm-arch-upload-meta-text">
                      <i class="fa-regular fa-image"></i>
                      <span class="adm-arch-upload-filename">architecture.png</span>
                      <span class="adm-arch-upload-size">— 0 KB</span>
                    </div>
                    <div class="adm-arch-upload-actions">
                      <button type="button" class="adm-icon-btn" data-arch-replace title="교체">
                        <i class="fa-solid fa-arrows-rotate"></i>
                      </button>
                      <button
                        type="button"
                        class="adm-icon-btn adm-icon-btn-danger"
                        data-arch-remove
                        title="삭제"
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <label class="adm-field" style="margin-top:14px">
                <span>Caption (선택)</span>
                <input type="text" placeholder="다이어그램에 대한 짧은 설명" />
              </label>
            </div>

            {/* 텍스트 흐름 */}
            <div class="adm-arch-pane" data-arch-pane="text" hidden>
              <label class="adm-field">
                <span>Architecture Flow (한 줄에 하나씩)</span>
                <textarea rows={5} placeholder={'사용자\nCloudFront\nS3\nFastAPI\nRDS'}>
                  {(project?.architecture || []).join('\n')}
                </textarea>
              </label>
            </div>
          </section>

          {/* 기술 스택 */}
          <section class="adm-card" id="stackCard">
            <header class="adm-card-head">
              <div>
                <h3>Tech Stack</h3>
                <p>스택을 선택하고, 프로젝트에서의 사용 설명을 입력하세요.</p>
              </div>
              <button type="button" class="btn-ghost adm-stack-new-btn" data-open-stack-modal>
                <i class="fa-solid fa-plus"></i> 새 스택 추가
              </button>
            </header>

            {/* 스택 검색 + 카테고리 필터 */}
            <div class="adm-stack-toolbar">
              <div class="adm-stack-search">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="stackSearch" placeholder="스택 검색 (예: React, Python, AWS...)" />
              </div>
              <div class="adm-stack-filters">
                <button type="button" class="adm-stack-filter active" data-stack-cat="all">
                  All
                </button>
                {STACK_CATEGORIES.map((c) => (
                  <button type="button" class="adm-stack-filter" data-stack-cat={c.name}>
                    <i class={c.icon}></i>
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 선택된 스택 칩 (요약) */}
            <div class="adm-stack-selected" id="stackSelected">
              <span class="adm-stack-selected-label">선택됨</span>
              <span class="adm-stack-selected-count" id="stackSelectedCount">
                {project?.stacks.length || 0}
              </span>
              <span class="adm-stack-selected-empty">아직 선택된 스택이 없습니다.</span>
            </div>

            {/* 전체 스택 그리드 */}
            <div class="adm-stack-list" id="stackList">
              {ALL_STACKS.map((s) => {
                const checked = project?.stacks.some((ps) => ps.name === s.name)
                const usage = project?.stacks.find((ps) => ps.name === s.name)?.usage || ''
                return (
                  <div
                    class={`adm-stack-row ${checked ? 'on' : ''}`}
                    data-stack-name={s.name}
                    data-stack-cat={s.category}
                  >
                    <label class="adm-stack-pick">
                      <input type="checkbox" checked={!!checked} />
                      <span class="adm-stack-pick-mark" style={`--c:${s.color}`}>
                        <i class={s.icon}></i>
                      </span>
                      <span class="adm-stack-pick-name">{s.name}</span>
                      <span class="adm-stack-pick-cat">{s.category}</span>
                    </label>
                    <input
                      type="text"
                      class="adm-stack-usage"
                      value={usage}
                      placeholder="이 프로젝트에서의 사용 설명 (3D 카드 뒷면에 노출)"
                    />
                  </div>
                )
              })}
            </div>

            <div class="adm-stack-empty" id="stackEmpty" hidden>
              <i class="fa-regular fa-face-smile-beam"></i>
              <span>검색 결과가 없습니다. 새 스택을 추가해 보세요.</span>
              <button type="button" class="btn-ghost" data-open-stack-modal>
                <i class="fa-solid fa-plus"></i> 새 스택 추가
              </button>
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
                <h3>Thumbnail</h3>
                <p>리스트와 폴더에 노출될 대표 이미지</p>
              </div>
            </header>
            <div class="adm-upload" id="thumbUpload">
              <input type="file" id="thumbInput" accept="image/*" hidden />
              <i class="fa-regular fa-image"></i>
              <span>이미지를 드래그하거나 클릭하여 업로드</span>
              <small>PNG, JPG · 최대 5MB</small>
            </div>
          </section>
        </aside>
      </form>

      {/* 새 스택 추가 모달 */}
      <div class="adm-modal" id="stackModal" hidden aria-hidden="true">
        <div class="adm-modal-backdrop" data-close-stack-modal></div>
        <div class="adm-modal-card" role="dialog" aria-modal="true" aria-labelledby="stackModalTitle">
          <header class="adm-modal-head">
            <h3 id="stackModalTitle">
              <i class="fa-solid fa-plus"></i> 새 기술 스택 추가
            </h3>
            <button type="button" class="adm-icon-btn" data-close-stack-modal aria-label="닫기">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </header>

          <div class="adm-modal-body">
            <div class="adm-form-row two">
              <label class="adm-field">
                <span>Name *</span>
                <input type="text" id="newStackName" placeholder="예: Svelte" />
              </label>
              <label class="adm-field">
                <span>Category *</span>
                <select id="newStackCategory">
                  <option value="Language">Language</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Cloud">Cloud</option>
                  <option value="DevOps">DevOps</option>
                  <option value="AI/Data">AI/Data</option>
                </select>
              </label>
            </div>

            <div class="adm-form-row two">
              <label class="adm-field">
                <span>Icon (Font Awesome class)</span>
                <input type="text" id="newStackIcon" placeholder="fa-brands fa-react" />
              </label>
              <label class="adm-field">
                <span>Brand Color</span>
                <div class="adm-color-input">
                  <input type="color" id="newStackColor" value="#8b5cf6" />
                  <input type="text" id="newStackColorHex" value="#8b5cf6" placeholder="#8b5cf6" />
                </div>
              </label>
            </div>

            <label class="adm-field">
              <span>Description (3D 카드 뒷면에 노출)</span>
              <textarea id="newStackDesc" rows={3} placeholder="이 기술의 짧은 설명"></textarea>
            </label>

            {/* 미리보기 */}
            <div class="adm-stack-preview-wrap">
              <span class="adm-stack-preview-label">Preview</span>
              <div class="adm-stack-preview" id="newStackPreview" style="--c:#8b5cf6">
                <div class="adm-stack-preview-icon">
                  <i class="fa-solid fa-cube" id="newStackPreviewIcon"></i>
                </div>
                <div class="adm-stack-preview-name" id="newStackPreviewName">새 기술</div>
                <div class="adm-stack-preview-cat" id="newStackPreviewCat">Frontend</div>
              </div>
            </div>
          </div>

          <footer class="adm-modal-foot">
            <button type="button" class="btn-ghost" data-close-stack-modal>
              취소
            </button>
            <button type="button" class="btn-primary" id="newStackSubmit">
              <i class="fa-solid fa-plus"></i> 추가하고 선택
            </button>
          </footer>
        </div>
      </div>
    </AdminShell>
  )
}
