// CHO OS — Admin Login (mock)
(function () {
  const form = document.getElementById('login-form')
  const errBox = document.getElementById('login-error')
  const eyeBtn = document.getElementById('login-eye')

  if (eyeBtn) {
    eyeBtn.addEventListener('click', () => {
      const input = form?.querySelector('input[name="password"]')
      if (!input) return
      input.type = input.type === 'password' ? 'text' : 'password'
      const icon = eyeBtn.querySelector('i')
      if (icon) {
        icon.classList.toggle('fa-eye')
        icon.classList.toggle('fa-eye-slash')
      }
    })
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      // Mock login — dev convenience
      if (errBox) errBox.hidden = true
      window.location.href = '/admin/dashboard'
    })
  }
})()
