import { AdminShell } from './admin-shell'
import { STACK_CATEGORIES } from '../data/stacks'

export const AdminStacksPage = () => {
  return (
    <AdminShell
      active="Stacks"
      title="Tech Stacks"
      subtitle="Manage stacks stored in the backend database."
      actions={
        <button class="btn-primary" id="stack-add-button" type="button">
          <i class="fa-solid fa-plus"></i> Add Stack
        </button>
      }
    >
      <div class="adm-stack-grid" id="stacks-grid">
        <div class="adm-card">Loading stacks...</div>
      </div>

      {/* Add / Edit Stack Modal */}
      <div class="adm-modal" id="stackAdminModal" hidden aria-hidden="true">
        <div class="adm-modal-backdrop" data-close-stack-admin></div>
        <div class="adm-modal-card" role="dialog" aria-modal="true" aria-labelledby="stackAdminModalTitle">
          <header class="adm-modal-head">
            <h3 id="stackAdminModalTitle">
              <i class="fa-solid fa-layer-group"></i> <span id="stackAdminModalTitleText">Add Stack</span>
            </h3>
            <button type="button" class="adm-icon-btn" data-close-stack-admin aria-label="Close">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </header>

          <div class="adm-modal-body">
            <input type="hidden" id="stackAdminEditId" />

            <div class="adm-form-row two">
              <label class="adm-field">
                <span>Name *</span>
                <input type="text" id="stackAdminName" placeholder="Spring Boot" />
              </label>
              <label class="adm-field">
                <span>Category *</span>
                <select id="stackAdminCategory">
                  {STACK_CATEGORIES.map((c) => (
                    <option value={c.name}>{c.name}</option>
                  ))}
                </select>
              </label>
            </div>

            <div class="adm-form-row two">
              <label class="adm-field">
                <span>Icon URL or class</span>
                <input type="text" id="stackAdminIcon" placeholder="fa-brands fa-java  or  /icons/spring.svg" />
              </label>
              <label class="adm-field">
                <span>Brand Color</span>
                <div class="adm-color-input">
                  <input type="color" id="stackAdminColor" value="#6db33f" />
                  <input type="text" id="stackAdminColorHex" value="#6db33f" placeholder="#6db33f" />
                </div>
              </label>
            </div>

            <label class="adm-field">
              <span>Description</span>
              <textarea id="stackAdminDesc" rows={3} placeholder="Short description of this technology"></textarea>
            </label>

            <div class="adm-stack-preview-wrap">
              <span class="adm-stack-preview-label">Preview</span>
              <div class="adm-stack-preview" id="stackAdminPreview" style="--c:#6db33f">
                <div class="adm-stack-preview-icon">
                  <i class="fa-solid fa-cube" id="stackAdminPreviewIcon"></i>
                </div>
                <div>
                  <div class="adm-stack-preview-name" id="stackAdminPreviewName">Stack Name</div>
                  <div class="adm-stack-preview-cat" id="stackAdminPreviewCat">Backend</div>
                </div>
              </div>
            </div>
          </div>

          <footer class="adm-modal-foot">
            <button type="button" class="btn-ghost" data-close-stack-admin>Cancel</button>
            <button type="button" class="btn-primary" id="stackAdminSubmit">
              <i class="fa-solid fa-floppy-disk"></i> <span id="stackAdminSubmitText">Add Stack</span>
            </button>
          </footer>
        </div>
      </div>
    </AdminShell>
  )
}
