// === Admin / Stack Picker ===
// 프로젝트 폼의 "Tech Stack" 섹션:
//  - 체크박스 toggle highlight
//  - 카테고리 필터 + 검색 인터랙션
//  - 선택 카운트 표시
import { $, $$ } from './dom.js'

const els = () => ({
  list: $('#stackList'),
  search: $('#stackSearch'),
  empty: $('#stackEmpty'),
  filters: $$('.adm-stack-filter'),
  selected: $('#stackSelected'),
  count: $('#stackSelectedCount'),
})

let activeCat = 'all'

/** 현재 검색/필터 조건으로 row를 보여주거나 숨김 */
export const applyStackFilter = () => {
  const { list, search, empty } = els()
  if (!list) return
  const q = (search?.value || '').trim().toLowerCase()
  let visible = 0
  $$('.adm-stack-row', list).forEach((row) => {
    const name = (row.getAttribute('data-stack-name') || '').toLowerCase()
    const cat = row.getAttribute('data-stack-cat') || ''
    const show =
      (!q || name.includes(q)) && (activeCat === 'all' || cat === activeCat)
    row.style.display = show ? '' : 'none'
    if (show) visible++
  })
  if (empty) empty.hidden = visible !== 0
}

/** 선택된 스택 개수 갱신 (selected chip) */
export const updateSelectedCount = () => {
  const { count, selected } = els()
  const n = $$('.adm-stack-row.on').length
  if (count) count.textContent = String(n)
  if (selected) selected.classList.toggle('is-empty', n === 0)
}

/** 단일 row 토글 바인딩 — 새 행 추가 시 재호출 가능 */
export const bindStackRow = (row) => {
  const cb = row.querySelector('input[type="checkbox"]')
  if (!cb) return
  cb.addEventListener('change', () => {
    row.classList.toggle('on', cb.checked)
    updateSelectedCount()
  })
}

/** 전체 초기화: 페이지 로드 시 한 번 호출 */
export const initStackPicker = () => {
  const { list, search, filters } = els()
  if (!list) return // 스택 섹션이 없는 페이지에서는 noop

  // 1) 기존 row 모두 바인딩
  $$('.adm-stack-row', list).forEach(bindStackRow)
  // 2) 검색
  search?.addEventListener('input', applyStackFilter)
  // 3) 카테고리 필터
  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      filters.forEach((b) => b.classList.remove('active'))
      btn.classList.add('active')
      activeCat = btn.getAttribute('data-stack-cat') || 'all'
      applyStackFilter()
    })
  })
  // 4) 초기 카운트
  updateSelectedCount()
}
