import { $, escapeHtml, toast, confirmModal } from './dom.js'
import { requestJson } from './api.js'

const stackCard = (stack) => `
  <div class="adm-stack-card" style="--c:${escapeHtml(stack.color || '#64748b')}">
    <div class="adm-stack-card-icon">
      ${stack.iconUrl
        ? (stack.iconUrl.startsWith('fa-') || stack.iconUrl.startsWith('fa ')
            ? `<i class="${escapeHtml(stack.iconUrl)}"></i>`
            : `<img src="${escapeHtml(stack.iconUrl)}" alt="" />`)
        : '<i class="fa-solid fa-cube"></i>'}
    </div>
    <div class="adm-stack-card-name">${escapeHtml(stack.name)}</div>
    <div class="adm-stack-card-cat">${escapeHtml(stack.category || '')}</div>
    <p class="adm-stack-card-desc">${escapeHtml(stack.description || 'No description yet.')}</p>
    <div class="adm-stack-card-actions">
      <button class="adm-icon-btn" data-stack-edit="${stack.id}" title="edit" type="button">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button class="adm-icon-btn adm-icon-btn-danger" data-stack-delete="${stack.id}" title="delete" type="button">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  </div>
`

const isFaClass = (val) => val && (val.startsWith('fa-') || val.startsWith('fa '))

const updateStackAdminPreview = () => {
  const name  = $('#stackAdminName')?.value.trim()  || 'Stack Name'
  const cat   = $('#stackAdminCategory')?.value     || 'Backend'
  const icon  = $('#stackAdminIcon')?.value.trim()  || ''
  const color = $('#stackAdminColorHex')?.value.trim() || '#6db33f'

  const preview = $('#stackAdminPreview')
  const previewIcon = $('#stackAdminPreviewIcon')
  const previewName = $('#stackAdminPreviewName')
  const previewCat  = $('#stackAdminPreviewCat')
  if (!preview) return

  preview.style.setProperty('--c', color)
  previewName.textContent = name
  previewCat.textContent  = cat

  // reset inline styles
  previewIcon.style.cssText = ''
  if (isFaClass(icon)) {
    previewIcon.className = icon
    previewIcon.style.display = 'inline-block'
  } else if (icon) {
    // FA 7에서 <i>에서 클래스 제거 시 display:inline 으로 복귀해 width/height 무시됨
    // → img 태그로 교체
    const iconWrap = previewIcon.parentElement
    const img = document.createElement('img')
    img.src = icon
    img.alt = ''
    img.id = 'stackAdminPreviewIcon'
    img.style.cssText = 'width:26px;height:26px;object-fit:contain;display:block'
    iconWrap.replaceChild(img, previewIcon)
  } else {
    previewIcon.className = 'fa-solid fa-cube'
    previewIcon.style.display = 'inline-block'
  }
}

const openStackAdminModal = (stack = null) => {
  const modal     = $('#stackAdminModal')
  const titleText = $('#stackAdminModalTitleText')
  const submitText = $('#stackAdminSubmitText')
  const editId    = $('#stackAdminEditId')
  if (!modal) return

  if (stack) {
    titleText.textContent  = 'Edit Stack'
    submitText.textContent = 'Save Changes'
    editId.value = String(stack.id)
    $('#stackAdminName').value     = stack.name     || ''
    $('#stackAdminCategory').value = stack.category || ''
    $('#stackAdminIcon').value     = stack.iconUrl  || ''
    const color = stack.color || '#6db33f'
    $('#stackAdminColor').value    = color
    $('#stackAdminColorHex').value = color
    $('#stackAdminDesc').value     = stack.description || ''
  } else {
    titleText.textContent  = 'Add Stack'
    submitText.textContent = 'Add Stack'
    editId.value = ''
    $('#stackAdminName').value     = ''
    $('#stackAdminCategory').value = ''
    $('#stackAdminIcon').value     = ''
    $('#stackAdminColor').value    = '#6db33f'
    $('#stackAdminColorHex').value = '#6db33f'
    $('#stackAdminDesc').value     = ''
  }

  updateStackAdminPreview()
  modal.hidden = false
  modal.setAttribute('aria-hidden', 'false')
  modal.classList.add('open')
  setTimeout(() => $('#stackAdminName')?.focus(), 50)
}

const closeStackAdminModal = () => {
  const modal = $('#stackAdminModal')
  if (!modal) return
  modal.classList.remove('open')
  setTimeout(() => {
    modal.hidden = true
    modal.setAttribute('aria-hidden', 'true')
  }, 200)
}

export const initStacksAdmin = () => {
  const grid = $('#stacks-grid')
  if (!grid) return

  const load = async () => {
    try {
      const stacks = await requestJson('/api/v1/stacks')
      grid.innerHTML = stacks.length
        ? stacks.map(stackCard).join('')
        : '<div class="adm-card">No stacks stored yet.</div>'

      document.querySelectorAll('[data-stack-delete]').forEach((button) => {
        button.addEventListener('click', async () => {
          const id   = button.getAttribute('data-stack-delete')
          const name = button.closest('.adm-stack-card')?.querySelector('.adm-stack-card-name')?.textContent || 'this stack'
          if (!id) return
          const ok = await confirmModal({
            title: 'Delete Stack',
            message: `"${name}" will be permanently deleted.`,
            confirmText: 'Delete',
            dangerous: true,
          })
          if (!ok) return
          try {
            await requestJson(`/api/v1/stacks/${id}`, { method: 'DELETE' })
            toast('Stack deleted.', 'success')
            load()
          } catch (error) {
            toast(error.message || 'Failed to delete stack.', 'error')
          }
        })
      })

      document.querySelectorAll('[data-stack-edit]').forEach((button) => {
        button.addEventListener('click', () => {
          const id = button.getAttribute('data-stack-edit')
          const current = stacks.find((s) => String(s.id) === id)
          if (current) openStackAdminModal(current)
        })
      })
    } catch (error) {
      grid.innerHTML = `<div class="adm-card">${escapeHtml(error.message || 'Failed to load stacks.')}</div>`
    }
  }

  // Add button
  $('#stack-add-button')?.addEventListener('click', () => openStackAdminModal(null))

  // Close modal
  document.querySelectorAll('[data-close-stack-admin]').forEach((el) => {
    el.addEventListener('click', closeStackAdminModal)
  })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeStackAdminModal()
  })

  // Live preview bindings
  ;['#stackAdminName', '#stackAdminCategory', '#stackAdminIcon', '#stackAdminDesc'].forEach((sel) => {
    $(sel)?.addEventListener('input', updateStackAdminPreview)
  })
  $('#stackAdminColor')?.addEventListener('input', (e) => {
    const hex = e.target.value
    $('#stackAdminColorHex').value = hex
    updateStackAdminPreview()
  })
  $('#stackAdminColorHex')?.addEventListener('input', (e) => {
    const hex = e.target.value
    if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
      $('#stackAdminColor').value = hex
    }
    updateStackAdminPreview()
  })

  // Submit
  $('#stackAdminSubmit')?.addEventListener('click', async () => {
    const name     = $('#stackAdminName')?.value.trim()
    const category = $('#stackAdminCategory')?.value.trim()
    if (!name) { alert('Name is required.'); return }

    const payload = {
      name,
      category,
      description: $('#stackAdminDesc')?.value.trim() || '',
      iconUrl:     $('#stackAdminIcon')?.value.trim() || '',
      color:       $('#stackAdminColorHex')?.value.trim() || '#6db33f',
    }

    const editId = $('#stackAdminEditId')?.value
    try {
      if (editId) {
        await requestJson(`/api/v1/stacks/${editId}`, { method: 'PUT', body: JSON.stringify(payload) })
        toast('Stack updated.', 'success')
      } else {
        await requestJson('/api/v1/stacks', { method: 'POST', body: JSON.stringify(payload) })
        toast('Stack added.', 'success')
      }
      closeStackAdminModal()
      load()
    } catch (error) {
      toast(error.message || 'Failed to save stack.', 'error')
    }
  })

  load()
}
