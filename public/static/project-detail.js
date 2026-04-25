// CHO OS — Project detail page (small enhancements)
(function () {
  // smooth section scroll on hash
  const hash = window.location.hash
  if (hash) {
    const el = document.querySelector(hash)
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  // ESC -> back to desktop
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.location.href = '/desktop'
    }
  })
})()
