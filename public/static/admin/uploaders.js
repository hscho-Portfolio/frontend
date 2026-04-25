// === Admin / Image Uploaders ===
// (1) Architecture diagram uploader (드래그&드롭, 미리보기, 교체/삭제)
// (2) Thumbnail uploader (썸네일 → background-image)
// (3) Architecture mode toggle (image / text)
import { $, $$ } from './dom.js'
import { formatSize } from './dom.js'

/** Architecture 이미지/텍스트 모드 토글 */
const initArchModeToggle = () => {
  const btns = $$('.adm-arch-mode-btn')
  if (!btns.length) return
  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-arch-mode')
      btns.forEach((b) => b.classList.toggle('active', b === btn))
      $$('[data-arch-pane]').forEach((p) => {
        p.hidden = p.getAttribute('data-arch-pane') !== mode
      })
    })
  })
}

/** Architecture 다이어그램 업로더 (DnD + preview) */
const initArchUploader = () => {
  const upload = $('#archUpload')
  const input = $('#archImageInput')
  if (!upload || !input) return

  const empty = $('.adm-arch-upload-empty', upload)
  const previewBox = $('.adm-arch-upload-preview', upload)
  const previewImg = previewBox?.querySelector('img')
  const filename = $('.adm-arch-upload-filename', upload)
  const sizeEl = $('.adm-arch-upload-size', upload)

  const showPreview = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => {
      if (previewImg) previewImg.src = e.target.result
      if (filename) filename.textContent = file.name
      if (sizeEl) sizeEl.textContent = `— ${formatSize(file.size)}`
      if (empty) empty.hidden = true
      if (previewBox) previewBox.hidden = false
      upload.classList.add('has-image')
    }
    reader.readAsDataURL(file)
  }

  const clearPreview = () => {
    if (previewImg) previewImg.src = ''
    if (empty) empty.hidden = false
    if (previewBox) previewBox.hidden = true
    upload.classList.remove('has-image')
    input.value = ''
  }

  // 클릭 → 다이얼로그 (단, 이미지가 이미 있으면 클릭 무시)
  upload.addEventListener('click', (e) => {
    if (e.target.closest('[data-arch-replace], [data-arch-remove]')) return
    if (upload.classList.contains('has-image')) return
    input.click()
  })
  $('.adm-arch-upload-link', upload)?.addEventListener('click', (e) => {
    e.stopPropagation()
    input.click()
  })
  input.addEventListener('change', () => {
    const f = input.files?.[0]
    if (f) showPreview(f)
  })

  // 교체 / 삭제
  $('[data-arch-replace]', upload)?.addEventListener('click', (e) => {
    e.stopPropagation()
    input.click()
  })
  $('[data-arch-remove]', upload)?.addEventListener('click', (e) => {
    e.stopPropagation()
    if (confirm('업로드한 이미지를 삭제하시겠습니까?')) clearPreview()
  })

  // Drag & Drop
  ;['dragenter', 'dragover'].forEach((ev) =>
    upload.addEventListener(ev, (e) => {
      e.preventDefault()
      e.stopPropagation()
      upload.classList.add('drag')
    })
  )
  ;['dragleave', 'drop'].forEach((ev) =>
    upload.addEventListener(ev, (e) => {
      e.preventDefault()
      e.stopPropagation()
      upload.classList.remove('drag')
    })
  )
  upload.addEventListener('drop', (e) => {
    const file = e.dataTransfer?.files?.[0]
    if (file) showPreview(file)
  })
}

/** 썸네일 업로더 (오른쪽 사이드바) */
const initThumbUploader = () => {
  const upload = $('#thumbUpload')
  const input = $('#thumbInput')
  if (!upload || !input) return
  upload.addEventListener('click', () => input.click())
  input.addEventListener('change', () => {
    const f = input.files?.[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = (e) => {
      upload.classList.add('has-image')
      upload.style.backgroundImage = `url(${e.target.result})`
    }
    reader.readAsDataURL(f)
  })
}

export const initUploaders = () => {
  initArchModeToggle()
  initArchUploader()
  initThumbUploader()
}
