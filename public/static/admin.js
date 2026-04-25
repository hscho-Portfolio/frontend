// CHO OS — Admin pages (logout etc.)
(function () {
  const logout = document.getElementById('admin-logout')
  if (logout) {
    logout.addEventListener('click', () => {
      window.location.href = '/admin/login'
    })
  }
})()
