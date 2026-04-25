// === Admin / Core (session · logout · global pickers) ===
import { $, bindSingleSelect } from './dom.js'

const TOKEN_KEY = 'cho-os-admin-token'

/** 백엔드 연동 전 임시 세션 — 토큰이 없으면 mock 토큰 자동 발급 */
export const ensureMockSession = () => {
  try {
    if (!localStorage.getItem(TOKEN_KEY)) {
      localStorage.setItem(
        TOKEN_KEY,
        JSON.stringify({
          token: 'mock-jwt-bypass-' + Date.now().toString(36),
          email: 'admin@cho.os',
          ts: Date.now(),
        })
      )
    }
  } catch {}
}

/** 로그인된 이메일을 우상단 사용자명에 반영 */
export const reflectSessionUser = () => {
  try {
    const session = JSON.parse(localStorage.getItem(TOKEN_KEY) || '{}')
    const nameEl = $('.admin-user-name')
    if (session.email && nameEl && session.email !== 'admin@cho.os') {
      nameEl.textContent = session.email
    }
  } catch {}
}

/** 로그아웃 버튼 바인딩 */
export const bindLogout = () => {
  const btn = $('#admin-logout')
  btn?.addEventListener('click', () => {
    if (!confirm('로그아웃 하시겠습니까?')) return
    try { localStorage.removeItem(TOKEN_KEY) } catch {}
    window.location.href = '/admin/login'
  })
}

/** 어드민 전역 단일 선택 그룹들 (컬러 스와치, 배경, 카테고리 탭) */
export const bindGlobalPickers = () => {
  bindSingleSelect('.adm-color-list', '.adm-color-swatch', 'on')
  bindSingleSelect('.adm-wall-list', '.adm-wall', 'on')
  bindSingleSelect('.adm-cat-tabs', '.adm-cat-tab', 'active')
}
