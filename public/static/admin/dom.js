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
