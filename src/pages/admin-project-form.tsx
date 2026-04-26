import { AdminShell } from './admin-shell'
import { STACK_CATEGORIES } from '../data/stacks'

export const AdminProjectFormPage = ({ mode, id }: { mode: 'new' | 'edit'; id?: string }) => {
  const isEdit = mode === 'edit'
  const titleText = isEdit ? `Edit Project / ${id}` : 'New Project'

  return (
    <AdminShell
      active="Projects"
      title={titleText}
      subtitle="Create or update a project in the backend database."
      actions={
        <>
          <button class="btn-ghost" id="project-full-preview-btn" type="button">
            <i class="fa-solid fa-eye"></i> Full Preview
          </button>
          <a class="btn-ghost" href="/admin/dashboard/projects">
            Cancel
          </a>
          <button class="btn-primary" id="project-save-button" type="button">
            <i class="fa-solid fa-floppy-disk"></i> Save
          </button>
        </>
      }
    >
      <form
        class="adm-form-grid"
        id="project-form"
        data-mode={mode}
        data-project-id={id || ''}
      >
        <div class="adm-form-main">
          <section class="adm-card">
            <header class="adm-card-head">
              <div>
                <h3>Basic Info</h3>
                <p>Core metadata for the project.</p>
              </div>
            </header>
            <div class="adm-form-row two">
              <label class="adm-field">
                <span>Title</span>
                <input id="project-title" name="title" type="text" placeholder="Project title" />
              </label>
              <label class="adm-field">
                <span>Slug</span>
                <input id="project-slug" name="slug" type="text" placeholder="project-slug" />
              </label>
            </div>
            <label class="adm-field">
              <span>Summary</span>
              <input id="project-summary" name="summary" type="text" placeholder="Short summary" />
            </label>
            <label class="adm-field">
              <span>Description</span>
              <textarea id="project-description" name="description" rows={6} placeholder="Project description"></textarea>
            </label>
            <div class="adm-form-row three">
              <label class="adm-field">
                <span>Category</span>
                <select id="project-category-id" name="categoryId">
                  <option value="">No category</option>
                </select>
              </label>
              <label class="adm-field">
                <span>Status</span>
                <select id="project-status" name="status">
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </label>
              <label class="adm-field">
                <span>Sort Order</span>
                <input id="project-sort-order" name="sortOrder" type="number" value="0" />
              </label>
            </div>
            <div class="adm-form-row two">
              <label class="adm-field">
                <span>Start Date</span>
                <input id="project-start-date" name="startDate" type="date" />
              </label>
              <label class="adm-field">
                <span>End Date</span>
                <input id="project-end-date" name="endDate" type="date" />
              </label>
            </div>
          </section>

          <section class="adm-card">
            <header class="adm-card-head">
              <div>
                <h3>Detail Sections</h3>
                <p>These textareas map to project sections in the backend.</p>
              </div>
            </header>
            <label class="adm-field">
              <span>Features (one line per item)</span>
              <textarea id="project-features" rows={5} placeholder="Admin dashboard&#10;Project CRUD&#10;AWS deployment"></textarea>
            </label>
            <label class="adm-field">
              <span>Architecture (one line per item)</span>
              <textarea id="project-architecture" rows={5} placeholder="User&#10;Frontend&#10;Backend&#10;Database"></textarea>
            </label>
            <label class="adm-field">
              <span>Retrospective (one line per item)</span>
              <textarea id="project-retrospective" rows={5} placeholder="What went well&#10;What changed&#10;What comes next"></textarea>
            </label>
          </section>

          <section class="adm-card" id="stackCard">
            <header class="adm-card-head">
              <div>
                <h3>Tech Stack</h3>
                <p>Select backend stacks and optionally describe how they were used.</p>
              </div>
              <button type="button" class="btn-ghost adm-stack-new-btn" data-open-stack-modal>
                <i class="fa-solid fa-plus"></i> Add Stack
              </button>
            </header>

            <div class="adm-stack-toolbar">
              <div class="adm-stack-search">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="stackSearch" placeholder="Search stack" />
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

            <div class="adm-stack-selected" id="stackSelected">
              <span class="adm-stack-selected-label">Selected</span>
              <span class="adm-stack-selected-count" id="stackSelectedCount">0</span>
              <span class="adm-stack-selected-empty">No stack selected yet.</span>
            </div>

            <div class="adm-stack-list" id="stackList"></div>

            <div class="adm-stack-empty" id="stackEmpty" hidden>
              <i class="fa-regular fa-face-smile-beam"></i>
              <span>No stacks match this filter.</span>
            </div>
          </section>
        </div>

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
                <input id="project-featured" name="isFeatured" type="checkbox" />
                <span></span>
              </label>
            </div>
            <div class="adm-side-row">
              <span>Visible</span>
              <label class="adm-toggle">
                <input id="project-published" name="isPublished" type="checkbox" />
                <span></span>
              </label>
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
              <input id="project-github-url" name="githubUrl" type="url" placeholder="https://github.com/..." />
            </label>
            <label class="adm-field">
              <span>Demo URL</span>
              <input id="project-demo-url" name="demoUrl" type="url" placeholder="https://..." />
            </label>
          </section>

          <section class="adm-card">
            <header class="adm-card-head">
              <div>
                <h3>Thumbnail</h3>
                <p>Upload or reuse the thumbnail URL saved in the backend.</p>
              </div>
            </header>
            <div class="adm-upload" id="thumbUpload">
              <input type="file" id="thumbInput" accept="image/*" hidden />
              <i class="fa-regular fa-image"></i>
              <span>Click to upload a thumbnail</span>
              <small>PNG, JPG up to 5MB</small>
              <input type="hidden" id="project-thumbnail-url" name="thumbnailUrl" />
            </div>
          </section>

          <section class="adm-card">
            <header class="adm-card-head">
              <div>
                <h3>Architecture Upload</h3>
                <p>Optional helper for uploading an architecture image.</p>
              </div>
            </header>
            <div class="adm-arch-mode" role="tablist" aria-label="Architecture mode">
              <button type="button" class="adm-arch-mode-btn active" data-arch-mode="image">
                <i class="fa-regular fa-image"></i> Image
              </button>
              <button type="button" class="adm-arch-mode-btn" data-arch-mode="text">
                <i class="fa-solid fa-list"></i> Text
              </button>
            </div>
            <div class="adm-arch-pane" data-arch-pane="image">
              <div class="adm-arch-upload" id="archUpload">
                <input type="file" id="archImageInput" accept="image/*" hidden />
                <div class="adm-arch-upload-empty">
                  <div class="adm-arch-upload-icon">
                    <i class="fa-solid fa-cloud-arrow-up"></i>
                  </div>
                  <div class="adm-arch-upload-title">Upload architecture image</div>
                  <div class="adm-arch-upload-desc">
                    Drag and drop or <span class="adm-arch-upload-link">choose a file</span>
                  </div>
                  <small>PNG, JPG, SVG, WebP up to 10MB</small>
                </div>
                <div class="adm-arch-upload-preview" hidden>
                  <img alt="architecture preview" />
                  <div class="adm-arch-upload-meta">
                    <div class="adm-arch-upload-meta-text">
                      <i class="fa-regular fa-image"></i>
                      <span class="adm-arch-upload-filename">architecture.png</span>
                      <span class="adm-arch-upload-size">0 KB</span>
                    </div>
                    <div class="adm-arch-upload-actions">
                      <button type="button" class="adm-icon-btn" data-arch-replace title="Replace">
                        <i class="fa-solid fa-arrows-rotate"></i>
                      </button>
                      <button type="button" class="adm-icon-btn adm-icon-btn-danger" data-arch-remove title="Remove">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="adm-arch-pane" data-arch-pane="text" hidden>
              <p class="adm-cell-sub">Use the text section above if you want architecture lines in the public detail page.</p>
            </div>
          </section>
        </aside>
      </form>

      {/* Full Desktop Preview Overlay */}
      <div class="adm-fp-overlay" id="fpOverlay" hidden aria-hidden="true">
        <div class="adm-fp-desktop">
          <div class="adm-fp-topbar">
            <div class="adm-fp-topbar-left">
              <span class="adm-fp-apple"><i class="fa-brands fa-apple"></i></span>
              <span class="adm-fp-clock" id="fpClock"></span>
            </div>
            <div class="adm-fp-topbar-center">Preview Mode</div>
            <div class="adm-fp-topbar-right">
              <button type="button" class="adm-fp-close-btn" id="fpCloseBtn">
                <i class="fa-solid fa-xmark"></i> Close Preview
              </button>
            </div>
          </div>

          <div class="adm-fp-content">
            <div class="adm-fp-window">
              <header class="adm-fp-window-bar">
                <div class="adm-fp-window-controls">
                  <span class="adm-fp-wc adm-fp-wc-close"></span>
                  <span class="adm-fp-wc adm-fp-wc-min"></span>
                  <span class="adm-fp-wc adm-fp-wc-max"></span>
                </div>
                <div class="adm-fp-window-title" id="fpWindowTitle">Project</div>
                <div class="adm-fp-window-spacer"></div>
              </header>

              <section class="adm-fp-hero" id="fpHero">
                <div class="adm-fp-hero-inner">
                  <div class="adm-fp-hero-meta">
                    <span class="adm-fp-status-pill" id="fpStatusPill">
                      <span class="adm-fp-status-dot" id="fpStatusDot"></span>
                      <span id="fpStatusText">In Progress</span>
                    </span>
                    <span class="adm-fp-hero-period">
                      <i class="fa-regular fa-calendar"></i> <span id="fpPeriod">—</span>
                    </span>
                  </div>
                  <h1 class="adm-fp-hero-title" id="fpTitle">Project Title</h1>
                  <p class="adm-fp-hero-tagline" id="fpSummary">Summary will appear here.</p>
                  <div class="adm-fp-hero-actions">
                    <span class="adm-fp-hero-btn" id="fpGithubBtn" hidden>
                      <i class="fa-brands fa-github"></i> GitHub
                    </span>
                    <span class="adm-fp-hero-btn adm-fp-hero-btn-sec" id="fpDemoBtn" hidden>
                      <i class="fa-solid fa-up-right-from-square"></i> Live Demo
                    </span>
                  </div>
                </div>
              </section>

              <div class="adm-fp-body">
                <section class="adm-fp-section">
                  <header class="adm-fp-section-head">
                    <span class="adm-fp-section-no">01</span>
                    <h2>Overview</h2>
                  </header>
                  <p class="adm-fp-overview" id="fpOverview">—</p>
                </section>

                <section class="adm-fp-section" id="fpFeaturesSection">
                  <header class="adm-fp-section-head">
                    <span class="adm-fp-section-no">02</span>
                    <h2>Key Features</h2>
                  </header>
                  <ul class="adm-fp-features" id="fpFeatures"></ul>
                </section>

                <section class="adm-fp-section" id="fpStackSection">
                  <header class="adm-fp-section-head">
                    <span class="adm-fp-section-no">03</span>
                    <h2>Tech Stack</h2>
                  </header>
                  <div class="adm-fp-stack-grid" id="fpStackGrid"></div>
                </section>

                <section class="adm-fp-section" id="fpArchSection">
                  <header class="adm-fp-section-head">
                    <span class="adm-fp-section-no">04</span>
                    <h2>Architecture</h2>
                  </header>
                  <div class="adm-fp-arch-img-wrap" id="fpArchImg" hidden>
                    <img alt="architecture" />
                  </div>
                  <div class="adm-fp-arch" id="fpArch" hidden></div>
                </section>

                <section class="adm-fp-section" id="fpRetroSection">
                  <header class="adm-fp-section-head">
                    <span class="adm-fp-section-no">05</span>
                    <h2>Retrospective</h2>
                  </header>
                  <ul class="adm-fp-retro" id="fpRetro"></ul>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="adm-modal" id="stackModal" hidden aria-hidden="true">
        <div class="adm-modal-backdrop" data-close-stack-modal></div>
        <div class="adm-modal-card" role="dialog" aria-modal="true" aria-labelledby="stackModalTitle">
          <header class="adm-modal-head">
            <h3 id="stackModalTitle">
              <i class="fa-solid fa-plus"></i> Add New Stack
            </h3>
            <button type="button" class="adm-icon-btn" data-close-stack-modal aria-label="Close">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </header>

          <div class="adm-modal-body">
            <div class="adm-form-row two">
              <label class="adm-field">
                <span>Name *</span>
                <input type="text" id="newStackName" placeholder="Svelte" />
              </label>
              <label class="adm-field">
                <span>Category *</span>
                <select id="newStackCategory">
                  {STACK_CATEGORIES.map((c) => (
                    <option value={c.name}>{c.name}</option>
                  ))}
                </select>
              </label>
            </div>

            <div class="adm-form-row two">
              <label class="adm-field">
                <span>Icon URL or class</span>
                <input type="text" id="newStackIcon" placeholder="/icons/svelte.svg" />
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
              <span>Description</span>
              <textarea id="newStackDesc" rows={3} placeholder="Short description"></textarea>
            </label>

            <div class="adm-stack-preview-wrap">
              <span class="adm-stack-preview-label">Preview</span>
              <div class="adm-stack-preview" id="newStackPreview" style="--c:#8b5cf6">
                <div class="adm-stack-preview-icon">
                  <i class="fa-solid fa-cube" id="newStackPreviewIcon"></i>
                </div>
                <div class="adm-stack-preview-name" id="newStackPreviewName">New Stack</div>
                <div class="adm-stack-preview-cat" id="newStackPreviewCat">Frontend</div>
              </div>
            </div>
          </div>

          <footer class="adm-modal-foot">
            <button type="button" class="btn-ghost" data-close-stack-modal>
              Cancel
            </button>
            <button type="button" class="btn-primary" id="newStackSubmit">
              <i class="fa-solid fa-plus"></i> Add and Select
            </button>
          </footer>
        </div>
      </div>
    </AdminShell>
  )
}
