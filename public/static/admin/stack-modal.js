// === Admin / New Stack Modal ===
// "+ 새 스택 추가" 모달 — 입력값으로 라이브 프리뷰 + 리스트에 row 주입
import { $, $$, escapeHtml, flashClass, toast } from './dom.js'
import { applyStackFilter, updateSelectedCount, bindStackRow } from './stack-picker.js'
import { authHeaders } from './core.js'

const ids = {
  modal: 'stackModal',
  name: 'newStackName',
  cat: 'newStackCategory',
  icon: 'newStackIcon',
  color: 'newStackColor',
  colorHex: 'newStackColorHex',
  desc: 'newStackDesc',
  preview: 'newStackPreview',
  pIcon: 'newStackPreviewIcon',
  pName: 'newStackPreviewName',
  pCat: 'newStackPreviewCat',
  submit: 'newStackSubmit',
}

const open = () => {
  const m = $('#' + ids.modal)
  if (!m) return
  m.hidden = false
  m.setAttribute('aria-hidden', 'false')
  requestAnimationFrame(() => m.classList.add('open'))
  $('#' + ids.name)?.focus()
}

const close = () => {
  const m = $('#' + ids.modal)
  if (!m) return
  m.classList.remove('open')
  setTimeout(() => {
    m.hidden = true
    m.setAttribute('aria-hidden', 'true')
  }, 180)
}

/** 입력값에 맞춰 카드 미리보기 업데이트 */
const syncPreview = () => {
  const preview = $('#' + ids.preview)
  if (!preview) return
  const c = ($('#' + ids.colorHex)?.value || $('#' + ids.color)?.value || '#8b5cf6').trim()
  preview.style.setProperty('--c', c)
  const pName = $('#' + ids.pName)
  const pCat = $('#' + ids.pCat)
  const pIcon = $('#' + ids.pIcon)
  if (pName) pName.textContent = $('#' + ids.name)?.value || '새 기술'
  if (pCat) pCat.textContent = $('#' + ids.cat)?.value || 'Frontend'
  if (pIcon) pIcon.className = ($('#' + ids.icon)?.value || 'fa-solid fa-cube').trim()
}

/** 새 스택을 백엔드에 저장한 뒤 row를 stackList에 주입 (또는 중복 시 기존 row 활성화) */
const submitNewStack = async () => {
  const list = $('#stackList')
  if (!list) return

  const nameEl = $('#' + ids.name)
  const name = (nameEl?.value || '').trim()
  if (!name) {
    nameEl?.focus()
    flashClass(nameEl, 'shake', 400)
    return
  }
  const cat = $('#' + ids.cat)?.value || 'Frontend'
  const icon = ($('#' + ids.icon)?.value || '').trim()
  const color = ($('#' + ids.colorHex)?.value || $('#' + ids.color)?.value || '#8b5cf6').trim()
  const desc = ($('#' + ids.desc)?.value || '').trim()

  // 중복: 기존 row 활성화 + usage 갱신
  const exists = list.querySelector(`[data-stack-name="${CSS.escape(name)}"]`)
  if (exists) {
    const cb = exists.querySelector('input[type="checkbox"]')
    if (cb && !cb.checked) {
      cb.checked = true
      exists.classList.add('on')
    }
    const usage = exists.querySelector('.adm-stack-usage')
    if (usage && desc) usage.value = desc
    exists.scrollIntoView({ behavior: 'smooth', block: 'center' })
    flashClass(exists, 'flash')
    updateSelectedCount()
    close()
    return
  }

  // 백엔드에 저장
  let savedId = null
  try {
    const backendUrl = window.BACKEND_URL || 'http://localhost:8080'
    const res = await fetch(`${backendUrl}/api/v1/stacks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ name, category: cat, iconUrl: icon || null, color, description: desc }),
    })
    const data = res.headers.get('content-type')?.includes('application/json') ? await res.json() : null
    if (!res.ok) {
      toast(data?.error || `Stack save failed (${res.status})`, 'error')
      return
    }
    savedId = data?.id
  } catch {
    toast('Cannot connect to backend server.', 'error')
    return
  }

  // 새 row 생성 + prepend
  const row = document.createElement('div')
  row.className = 'adm-stack-row on is-new'
  row.setAttribute('data-stack-name', name)
  row.setAttribute('data-stack-cat', cat)
  if (savedId) row.setAttribute('data-stack-id', String(savedId))
  row.innerHTML = `
    <label class="adm-stack-pick">
      <input type="checkbox" checked />
      <span class="adm-stack-pick-mark" style="--c:${color}">
        ${icon ? `<i class="${icon}"></i>` : `<span>${name[0]}</span>`}
      </span>
      <span class="adm-stack-pick-name">${escapeHtml(name)} <span class="adm-stack-pick-new">NEW</span></span>
      <span class="adm-stack-pick-cat">${escapeHtml(cat)}</span>
    </label>
    <input type="text" class="adm-stack-usage" value="${escapeHtml(desc)}" placeholder="이 프로젝트에서의 사용 설명" />
  `
  list.prepend(row)
  bindStackRow(row)

  // 폼 초기화
  if (nameEl) nameEl.value = ''
  if ($('#' + ids.desc)) $('#' + ids.desc).value = ''
  if ($('#' + ids.icon)) $('#' + ids.icon).value = ''
  syncPreview()
  updateSelectedCount()
  close()
  row.scrollIntoView({ behavior: 'smooth', block: 'center' })
  flashClass(row, 'flash')
  applyStackFilter()
}

/** 페이지 로드 시 한 번 호출 */
export const initStackModal = () => {
  const modal = $('#' + ids.modal)
  if (!modal) return // 모달이 없는 페이지에선 noop

  // 열기/닫기 버튼
  $$('[data-open-stack-modal]').forEach((b) => b.addEventListener('click', open))
  $$('[data-close-stack-modal]').forEach((b) => b.addEventListener('click', close))
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) close()
  })

  // 라이브 프리뷰
  ;[ids.name, ids.cat, ids.icon, ids.desc].forEach((id) =>
    $('#' + id)?.addEventListener('input', syncPreview)
  )
  $('#' + ids.color)?.addEventListener('input', () => {
    const hex = $('#' + ids.colorHex)
    if (hex) hex.value = $('#' + ids.color).value
    syncPreview()
  })
  $('#' + ids.colorHex)?.addEventListener('input', () => {
    const v = $('#' + ids.colorHex).value.trim()
    const picker = $('#' + ids.color)
    if (/^#[0-9a-fA-F]{6}$/.test(v) && picker) picker.value = v
    syncPreview()
  })

  // 제출
  $('#' + ids.submit)?.addEventListener('click', submitNewStack)
}
