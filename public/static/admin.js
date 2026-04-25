// === Admin global ===
(() => {
  const logoutBtn = document.getElementById('admin-logout')
  logoutBtn?.addEventListener('click', () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      window.location.href = '/admin/login'
    }
  })

  // Color swatch single-select
  document.querySelectorAll('.adm-color-list').forEach((list) => {
    list.querySelectorAll('.adm-color-swatch').forEach((sw) => {
      sw.addEventListener('click', () => {
        list.querySelectorAll('.adm-color-swatch').forEach((s) => s.classList.remove('on'))
        sw.classList.add('on')
      })
    })
  })

  // Wallpaper single-select
  document.querySelectorAll('.adm-wall-list').forEach((list) => {
    list.querySelectorAll('.adm-wall').forEach((w) => {
      w.addEventListener('click', () => {
        list.querySelectorAll('.adm-wall').forEach((x) => x.classList.remove('on'))
        w.classList.add('on')
      })
    })
  })

  // Cat tab single select
  document.querySelectorAll('.adm-cat-tabs').forEach((list) => {
    list.querySelectorAll('.adm-cat-tab').forEach((t) => {
      t.addEventListener('click', () => {
        list.querySelectorAll('.adm-cat-tab').forEach((x) => x.classList.remove('active'))
        t.classList.add('active')
      })
    })
  })

  // Stack picker toggle highlight
  document.querySelectorAll('.adm-stack-row').forEach((row) => {
    const cb = row.querySelector('input[type="checkbox"]')
    if (!cb) return
    cb.addEventListener('change', () => {
      row.classList.toggle('on', cb.checked)
    })
  })
})()
