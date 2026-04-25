// === Project Detail ===
(() => {
  // 부드러운 스크롤 (앵커가 있을 때)
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href')
      const el = id && document.querySelector(id)
      if (el) {
        e.preventDefault()
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  })

  // ESC → desktop
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.location.href = '/desktop'
    }
  })
})()
