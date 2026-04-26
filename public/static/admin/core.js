// === Admin / Core (session · logout · global pickers) ===
import { $, bindSingleSelect } from './dom.js'

const TOKEN_KEY = 'cho-os-admin-token'

/** 저장된 세션에서 JWT 토큰 문자열 반환. 없으면 null. */
export const getToken = () => {
  try {
    const session = JSON.parse(localStorage.getItem(TOKEN_KEY) || 'null')
    return session?.token ?? null
  } catch {
    return null
  }
}

/** API 요청에 쓸 Authorization 헤더 객체 반환 */
export const authHeaders = () => {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

/** 토큰이 없으면 로그인 페이지로 리다이렉트 */
export const requireAuth = () => {
  if (!getToken()) {
    window.location.href = '/admin/login'
    return false
  }
  return true
}

/** 로그인된 이메일/이름을 우상단 사용자명에 반영 */
export const reflectSessionUser = () => {
  try {
    const session = JSON.parse(localStorage.getItem(TOKEN_KEY) || '{}')
    const nameEl = $('.admin-user-name')
    if (nameEl) {
      nameEl.textContent = session.name || session.email || 'Admin'
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
