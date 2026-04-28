import { $, escapeHtml, toast, confirmModal } from './dom.js'
import { requestJson } from './api.js'
import { uploadFile } from './uploaders.js'

const awardCard = (award, index) => `
  <div class="adm-award-admin-card">
    <div class="adm-award-admin-card-head">
      <div class="adm-award-admin-icon"><i class="fa-solid fa-trophy"></i></div>
      <span class="adm-award-admin-order">#${index + 1}</span>
    </div>
    <div class="adm-award-admin-prize">${escapeHtml(award.prize)}</div>
    <div class="adm-award-admin-contest">${escapeHtml(award.contest)}</div>
    <div class="adm-award-admin-date">${escapeHtml(award.awardDate)}</div>
    ${award.certificateUrl
      ? `<div class="adm-award-admin-cert"><a href="${escapeHtml(award.certificateUrl)}" target="_blank" rel="noopener"><i class="fa-solid fa-image"></i> 상장 보기</a></div>`
      : ''}
    <div class="adm-award-admin-foot">
      <span class="adm-award-admin-order-label">
        <i class="fa-solid fa-arrow-down-wide-short"></i> Order ${award.sortOrder ?? 0}
      </span>
      <div class="adm-award-admin-actions">
        <button class="adm-icon-btn" data-award-edit="${award.id}" title="Edit" type="button">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="adm-icon-btn adm-icon-btn-danger" data-award-delete="${award.id}" data-award-prize="${escapeHtml(award.prize)}" title="Delete" type="button">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
`

const openAwardModal = (award = null) => {
  const modal = $('#awardModal')
  if (!modal) return

  $('#awardModalTitleText').textContent = award ? 'Edit Award' : 'Add Award'
  $('#awardSubmitText').textContent     = award ? 'Save Changes' : 'Add Award'
  $('#awardEditId').value               = award ? String(award.id) : ''
  $('#awardPrize').value                = award?.prize      || ''
  $('#awardContest').value              = award?.contest    || ''
  $('#awardDate').value                 = award?.awardDate  || ''
  $('#awardSortOrder').value            = String(award?.sortOrder ?? 0)
  $('#awardCertificateUrl').value       = award?.certificateUrl || ''

  const preview    = $('#award-cert-preview')
  const previewImg = $('#award-cert-preview-img')
  if (award?.certificateUrl) {
    previewImg.src    = award.certificateUrl
    preview.style.display = 'block'
  } else {
    previewImg.src    = ''
    preview.style.display = 'none'
  }

  modal.hidden = false
  modal.setAttribute('aria-hidden', 'false')
  modal.classList.add('open')
  setTimeout(() => $('#awardPrize')?.focus(), 50)
}

const closeAwardModal = () => {
  const modal = $('#awardModal')
  if (!modal) return
  modal.classList.remove('open')
  setTimeout(() => {
    modal.hidden = true
    modal.setAttribute('aria-hidden', 'true')
  }, 200)
}

export const initAwardsAdmin = () => {
  const grid = $('#awards-grid')
  if (!grid) return

  const load = async () => {
    try {
      const awards = await requestJson('/api/v1/awards')
      grid.innerHTML = awards.length
        ? awards.map(awardCard).join('')
        : '<div class="adm-card adm-empty-state"><i class="fa-solid fa-trophy"></i><p>수상 내역이 없습니다. 추가해보세요.</p></div>'

      document.querySelectorAll('[data-award-delete]').forEach((btn) => {
        btn.addEventListener('click', async () => {
          const id    = btn.getAttribute('data-award-delete')
          const prize = btn.getAttribute('data-award-prize') || '이 수상 내역'
          if (!id) return
          const ok = await confirmModal({
            title: '수상 내역 삭제',
            message: `"${prize}" 을(를) 영구 삭제합니다.`,
            confirmText: '삭제',
            dangerous: true,
          })
          if (!ok) return
          try {
            await requestJson(`/api/v1/awards/${id}`, { method: 'DELETE' })
            toast('삭제되었습니다.', 'success')
            load()
          } catch (err) {
            toast(err.message || '삭제에 실패했습니다.', 'error')
          }
        })
      })

      document.querySelectorAll('[data-award-edit]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-award-edit')
          const current = awards.find((a) => String(a.id) === id)
          if (current) openAwardModal(current)
        })
      })
    } catch (err) {
      grid.innerHTML = `<div class="adm-card">${escapeHtml(err.message || '불러오기 실패')}</div>`
    }
  }

  // 업로드 버튼
  $('#award-upload-btn')?.addEventListener('click', () => $('#award-file-input')?.click())
  $('#award-file-input')?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    toast('업로드 중...', 'info')
    const url = await uploadFile(file, 'awards')
    if (url) {
      $('#awardCertificateUrl').value = url
      const preview    = $('#award-cert-preview')
      const previewImg = $('#award-cert-preview-img')
      previewImg.src   = url
      preview.style.display = 'block'
      toast('업로드 완료', 'success')
    } else {
      toast('업로드 실패', 'error')
    }
    e.target.value = ''
  })

  // certificateUrl 직접 입력 시 미리보기
  $('#awardCertificateUrl')?.addEventListener('input', (e) => {
    const url     = e.target.value.trim()
    const preview = $('#award-cert-preview')
    const img     = $('#award-cert-preview-img')
    if (url) {
      img.src = url
      preview.style.display = 'block'
    } else {
      preview.style.display = 'none'
    }
  })

  // 모달 열기/닫기
  $('#award-add-button')?.addEventListener('click', () => openAwardModal(null))
  document.querySelectorAll('[data-close-award]').forEach((el) =>
    el.addEventListener('click', closeAwardModal)
  )
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAwardModal()
  })

  // 제출
  $('#awardSubmit')?.addEventListener('click', async () => {
    const prize          = $('#awardPrize')?.value.trim()
    const contest        = $('#awardContest')?.value.trim()
    const awardDate      = $('#awardDate')?.value.trim()
    const sortOrder      = Number($('#awardSortOrder')?.value || 0)
    const certificateUrl = $('#awardCertificateUrl')?.value.trim() || null
    const editId         = $('#awardEditId')?.value

    if (!prize)     { toast('수상명을 입력하세요.', 'warn'); $('#awardPrize')?.focus(); return }
    if (!contest)   { toast('대회명을 입력하세요.', 'warn'); $('#awardContest')?.focus(); return }
    if (!awardDate) { toast('수상일을 입력하세요.', 'warn'); $('#awardDate')?.focus(); return }

    const payload = { prize, contest, awardDate, sortOrder, certificateUrl }
    try {
      if (editId) {
        await requestJson(`/api/v1/awards/${editId}`, { method: 'PUT', body: JSON.stringify(payload) })
        toast('수정되었습니다.', 'success')
      } else {
        await requestJson('/api/v1/awards', { method: 'POST', body: JSON.stringify(payload) })
        toast('추가되었습니다.', 'success')
      }
      closeAwardModal()
      load()
    } catch (err) {
      toast(err.message || '저장에 실패했습니다.', 'error')
    }
  })

  load()
}
