import { $, $$, escapeHtml, flashClass, toast, confirmModal } from './dom.js'
import { requestJson } from './api.js'
import { applyStackFilter, bindStackRow, updateSelectedCount } from './stack-picker.js'

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

const createStackRow = (stack, selected = null) => {
  const checked = !!selected
  return `
    <div
      class="adm-stack-row ${checked ? 'on' : ''}"
      data-stack-id="${stack.id}"
      data-stack-name="${escapeHtml(stack.name)}"
      data-stack-cat="${escapeHtml(stack.category || '')}"
    >
      <label class="adm-stack-pick">
        <input type="checkbox" ${checked ? 'checked' : ''} />
        <span class="adm-stack-pick-mark" style="--c:${escapeHtml(stack.color || '#64748b')}">
          <i class="fa-solid fa-cube"></i>
        </span>
        <span class="adm-stack-pick-name">${escapeHtml(stack.name)}</span>
        <span class="adm-stack-pick-cat">${escapeHtml(stack.category || '')}</span>
      </label>
      <input
        type="text"
        class="adm-stack-usage"
        value="${escapeHtml(selected?.usageDescription || '')}"
        placeholder="How this stack was used"
      />
    </div>
  `
}

const renderProjectRow = (project) => {
  const category = project.category?.name || '-'
  const statusLabel = project.status === 'completed' ? 'Completed' : 'In Progress'
  const statusClass = project.status === 'completed' ? 'done' : 'wip'
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
  const stackList = $('#stackList')

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

  const renderStacks = (stacks, selectedStacks = []) => {
    if (!stackList) return
    const selectedMap = new Map(selectedStacks.map((stack) => [String(stack.id), stack]))
    stackList.innerHTML = stacks.map((stack) => createStackRow(stack, selectedMap.get(String(stack.id)))).join('')
    $$('.adm-stack-row', stackList).forEach(bindStackRow)
    updateSelectedCount()
    applyStackFilter()
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
    $$('.adm-stack-row', stackList)
      .filter((row) => row.querySelector('input[type="checkbox"]')?.checked)
      .map((row, index) => ({
        stackId: Number(row.getAttribute('data-stack-id')),
        usageDescription: row.querySelector('.adm-stack-usage')?.value?.trim() || '',
        sortOrder: index,
      }))

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
      const [categories, stacks] = await Promise.all([
        requestJson('/api/v1/categories'),
        requestJson('/api/v1/stacks'),
      ])

      fillCategories(categories)
      renderStacks(stacks)

      if (mode === 'edit' && projectId) {
        const project = await requestJson(`/api/v1/projects/${projectId}`)
        fillCategories(categories, project.category?.id)
        renderStacks(stacks, project.stacks || [])
        fillForm(project)
      }
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
    const checkedRows = document.querySelectorAll('.adm-stack-row input[type="checkbox"]:checked')
    const stackSec   = document.getElementById('fpStackSection')
    const stackGrid  = document.getElementById('fpStackGrid')
    const stackItems = Array.from(checkedRows).map(cb => {
      const row  = cb.closest('.adm-stack-row')
      const name = row?.getAttribute('data-stack-name') || ''
      const cat  = row?.getAttribute('data-stack-cat')  || ''
      return { name, cat }
    })
    stackSec.hidden = stackItems.length === 0
    stackGrid.innerHTML = stackItems.map(s =>
      `<div class="adm-fp-stack-card">
        <div class="adm-fp-stack-icon"><i class="fa-solid fa-cube"></i></div>
        <div class="adm-fp-stack-name">${escapeHtml(s.name)}</div>
        <div class="adm-fp-stack-cat">${escapeHtml(s.cat)}</div>
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
