import { $, $$, escapeHtml, flashClass, toast, confirmModal } from './dom.js'
import { requestJson } from './api.js'

const formatPeriod = (startDate, endDate) => {
  if (!startDate) return '-'
  const fmt = (value) => value?.slice(0, 7).replace('-', '.') || ''
  return endDate ? `${fmt(startDate)} ~ ${fmt(endDate)}` : `${fmt(startDate)} ~`
}

const linesToSections = (value, sectionType, label) =>
  String(value || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((content, index) => ({
      title: `${label} ${index + 1}`,
      sectionType,
      content,
      sortOrder: index,
    }))

const sectionLines = (sections, sectionType) =>
  (sections || [])
    .filter((section) => section.sectionType === sectionType)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((section) => section.content)
    .join('\n')

const imageByType = (images, imageType) =>
  (images || [])
    .filter((image) => image.imageType === imageType)
    .sort((a, b) => a.sortOrder - b.sortOrder)[0] || null

// ── Project Stack inline manager ──────────────────────────────
let psItems = []   // { name, iconUrl, color, category, usageDescription }[]

const renderPsIcon = (iconUrl) => {
  if (!iconUrl) return '<i class="fa-solid fa-cube"></i>'
  if (iconUrl.startsWith('fa-') || iconUrl.startsWith('fa '))
    return `<i class="${escapeHtml(iconUrl)}"></i>`
  return `<img src="${escapeHtml(iconUrl)}" alt="" style="width:18px;height:18px;object-fit:contain;display:block" />`
}

const renderPsList = () => {
  const list = document.getElementById('ps-list')
  if (!list) return
  if (!psItems.length) {
    list.innerHTML = '<p class="ps-empty">스택이 없습니다. Add 버튼으로 추가하세요.</p>'
    return
  }
  list.innerHTML = psItems.map((s, i) => `
    <div class="ps-row" data-ps-index="${i}">
      <span class="ps-row-icon" style="background:${escapeHtml(s.color || '#64748b')}">${renderPsIcon(s.iconUrl)}</span>
      <span class="ps-row-name">${escapeHtml(s.name)}</span>
      <span class="ps-row-cat">${escapeHtml(s.category || '')}</span>
      <span class="ps-row-usage">${escapeHtml(s.usageDescription || '')}</span>
      <button type="button" class="adm-icon-btn adm-icon-btn-danger ps-row-del" data-ps-del="${i}" title="Remove">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  `).join('')
  list.querySelectorAll('[data-ps-del]').forEach((btn) => {
    btn.addEventListener('click', () => {
      psItems.splice(Number(btn.getAttribute('data-ps-del')), 1)
      renderPsList()
    })
  })
}

const initPsForm = () => {
  const addBtn     = document.getElementById('ps-add-btn')
  const form       = document.getElementById('ps-form')
  const cancelBtn  = document.getElementById('ps-cancel-btn')
  const confirmBtn = document.getElementById('ps-confirm-btn')
  const colorPicker = document.getElementById('ps-color-picker')
  const colorHex   = document.getElementById('ps-color')
  if (!addBtn || !form) return

  addBtn.addEventListener('click', () => { form.hidden = false; document.getElementById('ps-name')?.focus() })
  cancelBtn?.addEventListener('click', () => { form.hidden = true })
  colorPicker?.addEventListener('input', (e) => { if (colorHex) colorHex.value = e.target.value })
  colorHex?.addEventListener('input', (e) => {
    if (/^#[0-9a-fA-F]{6}$/.test(e.target.value) && colorPicker) colorPicker.value = e.target.value
  })
  confirmBtn?.addEventListener('click', () => {
    const name = document.getElementById('ps-name')?.value.trim()
    if (!name) { alert('Name is required.'); return }
    psItems.push({
      name,
      iconUrl:          document.getElementById('ps-icon')?.value.trim() || '',
      color:            document.getElementById('ps-color')?.value.trim() || '#64748b',
      category:         document.getElementById('ps-category')?.value || '',
      usageDescription: document.getElementById('ps-usage')?.value.trim() || '',
    })
    renderPsList()
    // 폼 초기화
    ;['ps-name','ps-icon','ps-usage'].forEach(id => { const el = document.getElementById(id); if (el) el.value = '' })
    document.getElementById('ps-category').value = ''
    document.getElementById('ps-color').value = '#64748b'
    document.getElementById('ps-color-picker').value = '#64748b'
    form.hidden = true
  })
}

const renderProjectRow = (project) => {
  const category = project.category?.name || '-'
  const statusLabel = project.status === 'completed' ? 'Completed' : 'In Progress'
  const statusClass = project.status === 'completed' ? 'done' : 'wip'
  const isShortcut = project.isDesktopShortcut
  return `
    <tr data-project-id="${project.id}">
      <td>
        <span class="adm-thumb" style="${project.thumbnailUrl ? `background-image:url(${project.thumbnailUrl});background-size:cover;background-position:center;` : 'background:linear-gradient(135deg,#2563eb 0%,#0ea5e9 100%);'}">
          ${project.thumbnailUrl ? '' : '<i class="fa-solid fa-folder-open"></i>'}
        </span>
      </td>
      <td>
        <div class="adm-cell-title">${escapeHtml(project.title)}</div>
        <div class="adm-cell-sub">/${escapeHtml(project.slug)}</div>
      </td>
      <td><span class="adm-tag">${escapeHtml(category)}</span></td>
      <td><span class="adm-status adm-status-${statusClass}">${statusLabel}</span></td>
      <td class="th-center">${project.featured ? 'Yes' : 'No'}</td>
      <td class="th-center">${project.published ? 'Public' : 'Private'}</td>
      <td class="adm-cell-sub">${escapeHtml(formatPeriod(project.startDate, project.endDate))}</td>
      <td class="th-right">
        <div class="adm-table-actions">
          <button
            class="adm-icon-btn adm-shortcut-btn ${isShortcut ? 'active' : ''}"
            data-project-shortcut="${project.id}"
            title="${isShortcut ? '바로가기 해제' : '바로가기 등록'}"
            type="button"
          >
            <i class="fa-${isShortcut ? 'solid' : 'regular'} fa-star"></i>
          </button>
          <a class="adm-icon-btn" href="/admin/dashboard/projects/${project.id}" title="Edit">
            <i class="fa-solid fa-pen-to-square"></i>
          </a>
          <button class="adm-icon-btn adm-icon-btn-danger" data-project-delete="${project.id}" title="Delete" type="button">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `
}

const setThumbPreview = (url) => {
  const upload = $('#thumbUpload')
  const hidden = $('#project-thumbnail-url')
  if (!upload || !hidden) return
  hidden.value = url || ''
  if (url) {
    upload.classList.add('has-image')
    upload.style.backgroundImage = `url(${url})`
  } else {
    upload.classList.remove('has-image')
    upload.style.backgroundImage = ''
  }
}

const setArchImagePreview = (image) => {
  const upload = $('#archUpload')
  if (!upload) return
  const url = image?.imageUrl || ''
  let hidden = upload.querySelector('input[name="archImageUrl"]')
  if (!hidden) {
    hidden = document.createElement('input')
    hidden.type = 'hidden'
    hidden.name = 'archImageUrl'
    upload.appendChild(hidden)
  }
  hidden.value = url

  const empty = upload.querySelector('.adm-arch-upload-empty')
  const previewBox = upload.querySelector('.adm-arch-upload-preview')
  const previewImg = previewBox?.querySelector('img')
  const filename = upload.querySelector('.adm-arch-upload-filename')
  const sizeEl = upload.querySelector('.adm-arch-upload-size')
  if (url) {
    if (previewImg) previewImg.src = url
    if (filename) filename.textContent = image?.altText || url.split('/').pop() || 'architecture image'
    if (sizeEl) sizeEl.textContent = 'Saved'
    if (empty) empty.hidden = true
    if (previewBox) previewBox.hidden = false
    upload.classList.add('has-image')
  }
}

const initProjectsListPage = () => {
  const body = $('#projects-table-body')
  if (!body) return

  const totalLabel = $('#projects-total-label')
  const search = $('#projects-search')
  const statusFilter = $('#projects-status-filter')
  const visibilityFilter = $('#projects-visibility-filter')
  let projects = []

  const applyFilters = () => {
    const q = (search?.value || '').trim().toLowerCase()
    const status = statusFilter?.value || 'all'
    const visibility = visibilityFilter?.value || 'all'
    const filtered = projects.filter((project) => {
      const matchesQuery =
        !q || project.title.toLowerCase().includes(q) || project.slug.toLowerCase().includes(q)
      const matchesStatus = status === 'all' || project.status === status
      const matchesVisibility =
        visibility === 'all' ||
        (visibility === 'public' && project.published) ||
        (visibility === 'private' && !project.published)
      return matchesQuery && matchesStatus && matchesVisibility
    })

    body.innerHTML = filtered.length
      ? filtered.map(renderProjectRow).join('')
      : '<tr><td colspan="8">No projects found.</td></tr>'
    if (totalLabel) totalLabel.textContent = `Total ${filtered.length}`

    $$('[data-project-shortcut]', body).forEach((button) => {
      button.addEventListener('click', async () => {
        const projectId = button.getAttribute('data-project-shortcut')
        if (!projectId) return
        try {
          const updated = await requestJson(`/api/v1/projects/${projectId}/shortcut`, { method: 'PATCH' })
          projects = projects.map((p) => String(p.id) === projectId ? { ...p, isDesktopShortcut: updated.isDesktopShortcut } : p)
          const isNowShortcut = updated.isDesktopShortcut
          button.classList.toggle('active', isNowShortcut)
          button.title = isNowShortcut ? '바로가기 해제' : '바로가기 등록'
          button.querySelector('i').className = `fa-${isNowShortcut ? 'solid' : 'regular'} fa-star`
          toast(isNowShortcut ? '바로가기에 등록됐어요.' : '바로가기에서 해제됐어요.', 'success')
        } catch (error) {
          toast(error.message || '변경에 실패했어요.', 'error')
        }
      })
    })

    $$('[data-project-delete]', body).forEach((button) => {
      button.addEventListener('click', async () => {
        const projectId = button.getAttribute('data-project-delete')
        const title = button.closest('tr')?.querySelector('.adm-cell-title')?.textContent || 'this project'
        if (!projectId) return
        const ok = await confirmModal({
          title: 'Delete Project',
          message: `"${title}" will be permanently deleted. This action cannot be undone.`,
          confirmText: 'Delete',
          dangerous: true,
        })
        if (!ok) return
        try {
          await requestJson(`/api/v1/projects/${projectId}`, { method: 'DELETE' })
          toast('Project deleted.', 'success')
          projects = projects.filter((project) => String(project.id) !== projectId)
          applyFilters()
        } catch (error) {
          toast(error.message || 'Failed to delete project.', 'error')
        }
      })
    })
  }

  const load = async () => {
    body.innerHTML = '<tr><td colspan="8">Loading projects...</td></tr>'
    try {
      const data = await requestJson('/api/v1/projects')
      projects = Array.isArray(data) ? data : []
      applyFilters()
    } catch (error) {
      toast(error.message || 'Failed to load projects.', 'error')
      body.innerHTML = `<tr><td colspan="8">${escapeHtml(error.message || 'Failed to load projects.')}</td></tr>`
    }
  }

  search?.addEventListener('input', applyFilters)
  statusFilter?.addEventListener('change', applyFilters)
  visibilityFilter?.addEventListener('change', applyFilters)
  load()
}

const initProjectFormPage = () => {
  const form = $('#project-form')
  if (!form) return

  const saveButton = $('#project-save-button')
  const mode = form.getAttribute('data-mode') || 'new'
  const projectId = form.getAttribute('data-project-id') || ''
  const categorySelect = $('#project-category-id')

  const setLoading = (on) => {
    if (!saveButton) return
    saveButton.disabled = on
    saveButton.innerHTML = on
      ? '<i class="fa-solid fa-circle-notch fa-spin"></i> Saving'
      : '<i class="fa-solid fa-floppy-disk"></i> Save'
  }

  const fillCategories = (categories, selectedId = '') => {
    if (!categorySelect) return
    categorySelect.innerHTML =
      '<option value="">No category</option>' +
      categories.map((category) => `<option value="${category.id}">${escapeHtml(category.name)}</option>`).join('')
    categorySelect.value = selectedId ? String(selectedId) : ''
  }


  const fillForm = (project) => {
    $('#project-title').value = project.title || ''
    $('#project-slug').value = project.slug || ''
    $('#project-summary').value = project.summary || ''
    $('#project-description').value = project.description || ''
    $('#project-status').value = project.status || 'in_progress'
    $('#project-start-date').value = project.startDate || ''
    $('#project-end-date').value = project.endDate || ''
    $('#project-sort-order').value = String(project.sortOrder || 0)
    $('#project-github-url').value = project.githubUrl || ''
    $('#project-demo-url').value = project.demoUrl || ''
    $('#project-featured').checked = !!project.featured
    $('#project-published').checked = !!project.published
    $('#project-features').value = sectionLines(project.sections, 'features')
    $('#project-architecture').value = sectionLines(project.sections, 'architecture')
    $('#project-retrospective').value = sectionLines(project.sections, 'retrospective')
    setThumbPreview(project.thumbnailUrl || '')
    setArchImagePreview(imageByType(project.images, 'architecture'))
    if (categorySelect) categorySelect.value = project.category?.id ? String(project.category.id) : ''
  }

  const selectedStacksPayload = () =>
    psItems.map((s, index) => ({ ...s, sortOrder: index }))

  const payloadFromForm = () => ({
    title: $('#project-title').value.trim(),
    slug: $('#project-slug').value.trim(),
    summary: $('#project-summary').value.trim(),
    description: $('#project-description').value.trim(),
    categoryId: categorySelect?.value ? Number(categorySelect.value) : null,
    thumbnailUrl: $('#project-thumbnail-url').value.trim() || null,
    githubUrl: $('#project-github-url').value.trim() || null,
    demoUrl: $('#project-demo-url').value.trim() || null,
    status: $('#project-status').value,
    startDate: $('#project-start-date').value || null,
    endDate: $('#project-end-date').value || null,
    isFeatured: $('#project-featured').checked,
    isPublished: $('#project-published').checked,
    sortOrder: Number($('#project-sort-order').value || 0),
    stacks: selectedStacksPayload(),
    sections: [
      ...linesToSections($('#project-features').value, 'features', 'Feature'),
      ...linesToSections($('#project-architecture').value, 'architecture', 'Architecture'),
      ...linesToSections($('#project-retrospective').value, 'retrospective', 'Retrospective'),
    ],
    images: [
      ...($('#archUpload')?.querySelector('input[name="archImageUrl"]')?.value
        ? [{
            imageUrl: $('#archUpload').querySelector('input[name="archImageUrl"]').value,
            altText: `${$('#project-title').value.trim() || 'Project'} architecture`,
            imageType: 'architecture',
            sortOrder: 0,
          }]
        : []),
    ],
  })

  const load = async () => {
    try {
      const categories = await requestJson('/api/v1/categories')
      fillCategories(categories)

      if (mode === 'edit' && projectId) {
        const project = await requestJson(`/api/v1/projects/${projectId}`)
        fillCategories(categories, project.category?.id)
        // 저장된 스택 복원
        psItems = (project.stacks || []).map((s) => ({
          name:             s.name || '',
          iconUrl:          s.iconUrl || '',
          color:            s.color || '#64748b',
          category:         s.category || '',
          usageDescription: s.usageDescription || '',
        }))
        renderPsList()
        fillForm(project)
      } else {
        renderPsList()
      }
      initPsForm()
      document.dispatchEvent(new Event('project-form-loaded'))
    } catch (error) {
      toast(error.message || 'Failed to load project form.', 'error')
    }
  }

  saveButton?.addEventListener('click', async () => {
    const payload = payloadFromForm()
    if (!payload.title) { toast('Title is required.', 'warn'); $('#project-title')?.focus(); return }
    if (!payload.slug)  { toast('Slug is required.',  'warn'); $('#project-slug')?.focus();  return }

    setLoading(true)
    try {
      const saved = await requestJson(
        mode === 'edit' && projectId ? `/api/v1/projects/${projectId}` : '/api/v1/projects',
        {
          method: mode === 'edit' && projectId ? 'PUT' : 'POST',
          body: JSON.stringify(payload),
        }
      )
      flashClass(form, 'flash', 800)
      toast(mode === 'edit' ? 'Project saved.' : 'Project created.', 'success')
      setTimeout(() => { window.location.href = `/admin/dashboard/projects/${saved.id}` }, 700)
    } catch (error) {
      toast(error.message || 'Failed to save project.', 'error')
    } finally {
      setLoading(false)
    }
  })

  load()
}

const initFullPreview = () => {
  const btn     = document.getElementById('project-full-preview-btn')
  const overlay = document.getElementById('fpOverlay')
  const closeBtn = document.getElementById('fpCloseBtn')
  if (!btn || !overlay) return

  const fmtMonth = (val) => val ? val.slice(0, 7).replace('-', '.') : ''

  const syncClock = () => {
    const el = document.getElementById('fpClock')
    if (!el) return
    const now = new Date()
    el.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const buildPreview = () => {
    const title    = document.getElementById('project-title')?.value.trim()   || ''
    const summary  = document.getElementById('project-summary')?.value.trim() || ''
    const desc     = document.getElementById('project-description')?.value.trim() || ''
    const status   = document.getElementById('project-status')?.value         || 'in_progress'
    const startDate = document.getElementById('project-start-date')?.value    || ''
    const endDate   = document.getElementById('project-end-date')?.value      || ''
    const githubUrl = document.getElementById('project-github-url')?.value.trim() || ''
    const demoUrl   = document.getElementById('project-demo-url')?.value.trim()   || ''
    const featuresRaw = document.getElementById('project-features')?.value    || ''
    const archRaw     = document.getElementById('project-architecture')?.value || ''
    const retroRaw    = document.getElementById('project-retrospective')?.value || ''

    const thumbBg = document.getElementById('thumbUpload')?.style.backgroundImage || ''
    const thumbUrl = document.getElementById('project-thumbnail-url')?.value.trim() || ''

    const isDone = status === 'completed'
    const start  = fmtMonth(startDate)
    const end    = fmtMonth(endDate)
    const period = start ? (end ? `${start} ~ ${end}` : `${start} ~`) : '—'

    // Window title
    document.getElementById('fpWindowTitle').textContent = title || 'Project'

    // Hero background
    const hero = document.getElementById('fpHero')
    if (thumbBg && thumbBg !== 'none') {
      hero.style.backgroundImage = thumbBg
      hero.classList.add('has-thumb')
    } else {
      hero.style.backgroundImage = ''
      hero.classList.remove('has-thumb')
    }

    // Status
    const dot  = document.getElementById('fpStatusDot')
    const pill = document.getElementById('fpStatusPill')
    document.getElementById('fpStatusText').textContent = isDone ? 'Completed' : 'In Progress'
    dot.className  = `adm-fp-status-dot${isDone ? ' done' : ''}`
    pill.className = `adm-fp-status-pill${isDone ? ' done' : ''}`

    document.getElementById('fpPeriod').textContent = period
    document.getElementById('fpTitle').textContent   = title   || 'Project Title'
    document.getElementById('fpSummary').textContent = summary || 'Summary will appear here.'
    document.getElementById('fpOverview').textContent = desc   || '—'

    // GitHub / Demo buttons
    const ghBtn = document.getElementById('fpGithubBtn')
    const dmBtn = document.getElementById('fpDemoBtn')
    ghBtn.hidden = !githubUrl
    dmBtn.hidden = !demoUrl

    // Features
    const featureLines = featuresRaw.split('\n').map(l => l.trim()).filter(Boolean)
    const featSec = document.getElementById('fpFeaturesSection')
    const featList = document.getElementById('fpFeatures')
    featSec.hidden = featureLines.length === 0
    featList.innerHTML = featureLines.map((f, i) =>
      `<li><span class="adm-fp-feature-no">${String(i + 1).padStart(2, '0')}</span><span>${escapeHtml(f)}</span></li>`
    ).join('')

    // Stacks
    const stackSec  = document.getElementById('fpStackSection')
    const stackGrid = document.getElementById('fpStackGrid')
    stackSec.hidden = psItems.length === 0
    stackGrid.innerHTML = psItems.map(s =>
      `<div class="adm-fp-stack-card">
        <div class="adm-fp-stack-icon">${renderPsIcon(s.iconUrl)}</div>
        <div class="adm-fp-stack-name">${escapeHtml(s.name)}</div>
        <div class="adm-fp-stack-cat">${escapeHtml(s.category || '')}</div>
      </div>`
    ).join('')

    // Architecture
    const archLines   = archRaw.split('\n').map(l => l.trim()).filter(Boolean)
    const archImageUrl = document.getElementById('archUpload')?.querySelector('input[name="archImageUrl"]')?.value || ''
    const archSec     = document.getElementById('fpArchSection')
    const archImgWrap = document.getElementById('fpArchImg')
    const archEl      = document.getElementById('fpArch')
    archSec.hidden = archLines.length === 0 && !archImageUrl
    if (archImgWrap) {
      if (archImageUrl) {
        archImgWrap.hidden = false
        archImgWrap.querySelector('img').src = archImageUrl
      } else {
        archImgWrap.hidden = true
      }
    }
    archEl.hidden = archLines.length === 0
    archEl.innerHTML = archLines.map((node, i) =>
      `<div class="adm-fp-arch-node">${escapeHtml(node)}</div>${i < archLines.length - 1 ? '<div class="adm-fp-arch-arrow">↓</div>' : ''}`
    ).join('')

    // Retrospective
    const retroLines = retroRaw.split('\n').map(l => l.trim()).filter(Boolean)
    const retroSec   = document.getElementById('fpRetroSection')
    const retroList  = document.getElementById('fpRetro')
    retroSec.hidden = retroLines.length === 0
    retroList.innerHTML = retroLines.map(r =>
      `<li><i class="fa-solid fa-quote-left"></i><span>${escapeHtml(r)}</span></li>`
    ).join('')
  }

  const open = () => {
    buildPreview()
    overlay.hidden = false
    overlay.removeAttribute('aria-hidden')
    document.body.style.overflow = 'hidden'
    syncClock()
  }

  const close = () => {
    overlay.hidden = true
    overlay.setAttribute('aria-hidden', 'true')
    document.body.style.overflow = ''
  }

  btn.addEventListener('click', open)
  closeBtn?.addEventListener('click', close)
  overlay.addEventListener('keydown', (e) => { if (e.key === 'Escape') close() })

  let clockTimer
  const obs = new MutationObserver(() => {
    if (!overlay.hidden) { syncClock(); clearInterval(clockTimer); clockTimer = setInterval(syncClock, 30000) }
    else clearInterval(clockTimer)
  })
  obs.observe(overlay, { attributes: true, attributeFilter: ['hidden'] })
}

export const initProjectsAdmin = () => {
  initProjectsListPage()
  initProjectFormPage()
  initFullPreview()
}
