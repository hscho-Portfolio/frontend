// === Admin / DOM utilities ===
// 짧은 셀렉터 + 작은 헬퍼들. ESM 모듈로 다른 admin/* 모듈에서 재사용.

export const $ = (sel, root = document) => root.querySelector(sel)
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel))

/** className 문자열을 안전하게 추가/제거 */
export const toggle = (el, cls, on) => el && el.classList.toggle(cls, !!on)

/** XSS 방지용 HTML escape */
export const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[c])

/** 잠시 클래스 부착 → 일정 시간 후 제거 (애니메이션 트리거용) */
export const flashClass = (el, cls = 'flash', duration = 1200) => {
  if (!el) return
  el.classList.add(cls)
  setTimeout(() => el.classList.remove(cls), duration)
}

/** 단일 선택 그룹 (예: 컬러 스와치, 배경 픽커, 카테고리 탭) */
export const bindSingleSelect = (containerSel, itemSel, activeCls = 'active') => {
  $$(containerSel).forEach((list) => {
    $$(itemSel, list).forEach((item) => {
      item.addEventListener('click', () => {
        $$(itemSel, list).forEach((x) => x.classList.remove(activeCls))
        item.classList.add(activeCls)
      })
    })
  })
}

/** 파일 크기를 사람이 읽기 좋은 단위로 */
export const formatSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1024 / 1024).toFixed(2) + ' MB'
}

// ─────────────────────────────────────────────
// Toast 알림 시스템
// ─────────────────────────────────────────────

const TOAST_ICONS = {
  success: 'fa-circle-check',
  error:   'fa-circle-xmark',
  warn:    'fa-triangle-exclamation',
  info:    'fa-circle-info',
}

const dismissToast = (el) => {
  el.classList.remove('show')
  el.addEventListener('transitionend', () => el.remove(), { once: true })
}

/**
 * 우측 하단 토스트 알림.
 * @param {string} message
 * @param {'success'|'error'|'warn'|'info'} type
 * @param {number} duration ms (0 = 닫기 버튼으로만 닫힘)
 */
export const toast = (message, type = 'info', duration = 4000) => {
  let container = document.getElementById('adm-toast-container')
  if (!container) {
    container = document.createElement('div')
    container.id = 'adm-toast-container'
    document.body.appendChild(container)
  }

  const el = document.createElement('div')
  el.className = `adm-toast adm-toast-${type}`
  el.innerHTML = `
    <i class="fa-solid ${TOAST_ICONS[type] || TOAST_ICONS.info} adm-toast-icon"></i>
    <span class="adm-toast-msg">${escapeHtml(message)}</span>
    <button class="adm-toast-close" type="button" aria-label="close">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `
  container.appendChild(el)
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('show')))

  el.querySelector('.adm-toast-close').addEventListener('click', () => dismissToast(el))

  if (duration > 0) {
    let timer = setTimeout(() => dismissToast(el), duration)
    el.addEventListener('mouseenter', () => clearTimeout(timer))
    el.addEventListener('mouseleave', () => { timer = setTimeout(() => dismissToast(el), 1500) })
  }
}

// ─────────────────────────────────────────────
// 커스텀 확인 모달 (confirm 대체)
// ─────────────────────────────────────────────

/**
 * Promise<boolean> 를 반환하는 커스텀 confirm 모달.
 * @param {{ title?: string, message?: string, confirmText?: string, cancelText?: string, dangerous?: boolean }} opts
 */
export const confirmModal = ({
  title       = 'Are you sure?',
  message     = '',
  confirmText = 'Confirm',
  cancelText  = 'Cancel',
  dangerous   = false,
} = {}) =>
  new Promise((resolve) => {
    const overlay = document.createElement('div')
    overlay.className = 'adm-confirm-overlay'
    overlay.innerHTML = `
      <div class="adm-confirm-box" role="dialog" aria-modal="true">
        <div class="adm-confirm-icon ${dangerous ? 'danger' : ''}">
          <i class="fa-solid ${dangerous ? 'fa-triangle-exclamation' : 'fa-circle-question'}"></i>
        </div>
        <h3 class="adm-confirm-title">${escapeHtml(title)}</h3>
        ${message ? `<p class="adm-confirm-msg">${escapeHtml(message)}</p>` : ''}
        <div class="adm-confirm-actions">
          <button class="btn-ghost adm-confirm-cancel" type="button">${escapeHtml(cancelText)}</button>
          <button class="${dangerous ? 'btn-danger' : 'btn-primary'} adm-confirm-ok" type="button">${escapeHtml(confirmText)}</button>
        </div>
      </div>
    `
    document.body.appendChild(overlay)
    requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('show')))

    const close = (result) => {
      overlay.classList.remove('show')
      overlay.addEventListener('transitionend', () => { overlay.remove(); resolve(result) }, { once: true })
    }

    overlay.querySelector('.adm-confirm-ok').addEventListener('click', () => close(true))
    overlay.querySelector('.adm-confirm-cancel').addEventListener('click', () => close(false))
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(false) })

    const onKey = (e) => {
      if (e.key === 'Escape') { close(false); document.removeEventListener('keydown', onKey) }
    }
    document.addEventListener('keydown', onKey)

    setTimeout(() => overlay.querySelector('.adm-confirm-ok')?.focus(), 50)
  })
