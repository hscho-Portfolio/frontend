import { AdminShell } from './admin-shell'

export const AdminCategoriesPage = () => {
  return (
    <AdminShell
      active="Categories"
      title="Categories"
      subtitle="Manage categories stored in the backend database."
      actions={
        <button class="btn-primary" id="category-add-button" type="button">
          <i class="fa-solid fa-plus"></i> Add Category
        </button>
      }
    >
      <div class="adm-cat-grid" id="categories-grid">
        <div class="adm-card">Loading categories...</div>
      </div>

      {/* Add / Edit Category Modal */}
      <div class="adm-modal" id="categoryModal" hidden aria-hidden="true">
        <div class="adm-modal-backdrop" data-close-category></div>
        <div class="adm-modal-card" role="dialog" aria-modal="true" aria-labelledby="categoryModalTitle">
          <header class="adm-modal-head">
            <h3 id="categoryModalTitle">
              <i class="fa-solid fa-sitemap"></i> <span id="categoryModalTitleText">Add Category</span>
            </h3>
            <button type="button" class="adm-icon-btn" data-close-category aria-label="Close">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </header>

          <div class="adm-modal-body">
            <input type="hidden" id="categoryEditId" />

            <div class="adm-form-row two">
              <label class="adm-field">
                <span>Name <em class="adm-required">*</em></span>
                <input type="text" id="categoryName" placeholder="Web Development" />
              </label>
              <label class="adm-field">
                <span>Slug <em class="adm-required">*</em></span>
                <input type="text" id="categorySlug" placeholder="web-development" />
              </label>
            </div>

            <label class="adm-field">
              <span>Description</span>
              <textarea id="categoryDesc" rows={3} placeholder="Short description (optional)"></textarea>
            </label>

            <label class="adm-field">
              <span>Sort Order</span>
              <input type="number" id="categorySortOrder" value="0" min="0" />
            </label>
          </div>

          <footer class="adm-modal-foot">
            <button type="button" class="btn-ghost" data-close-category>Cancel</button>
            <button type="button" class="btn-primary" id="categorySubmit">
              <i class="fa-solid fa-floppy-disk"></i> <span id="categorySubmitText">Add Category</span>
            </button>
          </footer>
        </div>
      </div>
    </AdminShell>
  )
}
