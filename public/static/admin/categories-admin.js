import { $, escapeHtml, toast, confirmModal } from './dom.js'
import { requestJson } from './api.js'

const PALETTE = [
  '#6366f1','#8b5cf6','#ec4899','#f43f5e',
  '#f59e0b','#10b981','#06b6d4','#3b82f6',
]

const categoryCard = (category, index) => `
  <div class="adm-cat-card" style="--c:${PALETTE[index % PALETTE.length]}">
    <div class="adm-cat-card-head">
      <span class="adm-cat-card-mark">
        <i class="fa-solid fa-sitemap"></i>
      </span>
      <span class="adm-cat-card-order">#${index + 1}</span>
    </div>
    <div class="adm-cat-card-name">${escapeHtml(category.name)}</div>
    <div class="adm-cat-card-slug">/${escapeHtml(category.slug || '')}</div>
    ${category.description ? `<p class="adm-cat-card-desc">${escapeHtml(category.description)}</p>` : ''}
    <div class="adm-cat-card-foot">
      <span class="adm-cat-card-count">
        <i class="fa-solid fa-arrow-down-wide-short"></i> Order ${category.sortOrder ?? 0}
      </span>
      <div class="adm-cat-card-actions">
        <button class="adm-icon-btn" data-category-edit="${category.id}" title="Edit" type="button">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="adm-icon-btn adm-icon-btn-danger" data-category-delete="${category.id}" data-category-name="${escapeHtml(category.name)}" title="Delete" type="button">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
`

const toSlug = (name) =>
  name.toLowerCase().trim()
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/^-|-$/g, '')

const openCategoryModal = (category = null) => {
  const modal = $('#categoryModal')
  if (!modal) return

  const titleText  = $('#categoryModalTitleText')
  const submitText = $('#categorySubmitText')
  const editId     = $('#categoryEditId')
  let slugManuallyEdited = false

  if (category) {
    titleText.textContent  = 'Edit Category'
    submitText.textContent = 'Save Changes'
    editId.value = String(category.id)
    $('#categoryName').value      = category.name || ''
    $('#categorySlug').value      = category.slug || ''
    $('#categoryDesc').value      = category.description || ''
    $('#categorySortOrder').value = String(category.sortOrder ?? 0)
    slugManuallyEdited = true
  } else {
    titleText.textContent  = 'Add Category'
    submitText.textContent = 'Add Category'
    editId.value = ''
    $('#categoryName').value      = ''
    $('#categorySlug').value      = ''
    $('#categoryDesc').value      = ''
    $('#categorySortOrder').value = '0'
    slugManuallyEdited = false
  }

  // 이름 입력 시 슬러그 자동 생성 (수동 편집 전까지)
  const nameInput = $('#categoryName')
  const slugInput = $('#categorySlug')
  const onNameInput = () => {
    if (!slugManuallyEdited) slugInput.value = toSlug(nameInput.value)
  }
  const onSlugInput = () => { slugManuallyEdited = true }
  nameInput.removeEventListener('input', onNameInput)
  slugInput.removeEventListener('input', onSlugInput)
  nameInput.addEventListener('input', onNameInput)
  slugInput.addEventListener('input', onSlugInput)

  modal.hidden = false
  modal.setAttribute('aria-hidden', 'false')
  modal.classList.add('open')
  setTimeout(() => nameInput?.focus(), 50)
}

const closeCategoryModal = () => {
  const modal = $('#categoryModal')
  if (!modal) return
  modal.classList.remove('open')
  setTimeout(() => {
    modal.hidden = true
    modal.setAttribute('aria-hidden', 'true')
  }, 200)
}

export const initCategoriesAdmin = () => {
  const grid = $('#categories-grid')
  if (!grid) return

  const load = async () => {
    try {
      const categories = await requestJson('/api/v1/categories')
      grid.innerHTML = categories.length
        ? categories.map(categoryCard).join('')
        : '<div class="adm-card adm-empty-state"><i class="fa-solid fa-sitemap"></i><p>No categories yet. Add one to get started.</p></div>'

      document.querySelectorAll('[data-category-delete]').forEach((button) => {
        button.addEventListener('click', async () => {
          const id   = button.getAttribute('data-category-delete')
          const name = button.getAttribute('data-category-name') || 'this category'
          if (!id) return
          const ok = await confirmModal({
            title: 'Delete Category',
            message: `"${name}" will be permanently deleted. Projects using this category will become uncategorized.`,
            confirmText: 'Delete',
            dangerous: true,
          })
          if (!ok) return
          try {
            await requestJson(`/api/v1/categories/${id}`, { method: 'DELETE' })
            toast('Category deleted.', 'success')
            load()
          } catch (error) {
            toast(error.message || 'Failed to delete category.', 'error')
          }
        })
      })

      document.querySelectorAll('[data-category-edit]').forEach((button) => {
        button.addEventListener('click', () => {
          const id = button.getAttribute('data-category-edit')
          const current = categories.find((c) => String(c.id) === id)
          if (current) openCategoryModal(current)
        })
      })
    } catch (error) {
      grid.innerHTML = `<div class="adm-card">${escapeHtml(error.message || 'Failed to load categories.')}</div>`
    }
  }

  // 모달 열기
  $('#category-add-button')?.addEventListener('click', () => openCategoryModal(null))

  // 모달 닫기
  document.querySelectorAll('[data-close-category]').forEach((el) =>
    el.addEventListener('click', closeCategoryModal)
  )
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCategoryModal()
  })

  // 제출
  $('#categorySubmit')?.addEventListener('click', async () => {
    const name      = $('#categoryName')?.value.trim()
    const slug      = $('#categorySlug')?.value.trim()
    const desc      = $('#categoryDesc')?.value.trim()
    const sortOrder = Number($('#categorySortOrder')?.value || 0)
    const editId    = $('#categoryEditId')?.value

    if (!name) { toast('Name is required.', 'warn'); $('#categoryName')?.focus(); return }
    if (!slug) { toast('Slug is required.', 'warn'); $('#categorySlug')?.focus(); return }

    const payload = { name, slug, description: desc, sortOrder }
    try {
      if (editId) {
        await requestJson(`/api/v1/categories/${editId}`, { method: 'PUT', body: JSON.stringify(payload) })
        toast('Category updated.', 'success')
      } else {
        await requestJson('/api/v1/categories', { method: 'POST', body: JSON.stringify(payload) })
        toast('Category added.', 'success')
      }
      closeCategoryModal()
      load()
    } catch (error) {
      toast(error.message || 'Failed to save category.', 'error')
    }
  })

  load()
}
