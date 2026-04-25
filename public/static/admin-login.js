// === Admin Login ===
(() => {
  const form = document.getElementById('login-form')
  const errorBox = document.getElementById('login-error')
  const eyeBtn = document.getElementById('login-eye')
  const pw = form?.querySelector('input[name="password"]')

  eyeBtn?.addEventListener('click', () => {
    if (!pw) return
    const isPw = pw.type === 'password'
    pw.type = isPw ? 'text' : 'password'
    eyeBtn.innerHTML = isPw
      ? '<i class="fa-solid fa-eye-slash"></i>'
      : '<i class="fa-solid fa-eye"></i>'
  })

  form?.addEventListener('submit', (e) => {
    e.preventDefault()
    const data = new FormData(form)
    const email = data.get('email')
    const password = data.get('password')

    // 임시 테스트용 인증 — 실제로는 백엔드 연동
    if (email === 'admin@cho.os' && password === 'admin1234') {
      // 성공 — 부드럽게 이동
      errorBox.hidden = true
      form.style.opacity = '0.5'
      form.style.pointerEvents = 'none'
      setTimeout(() => (window.location.href = '/admin/dashboard'), 400)
    } else {
      errorBox.hidden = false
      errorBox.textContent =
        '이메일 또는 비밀번호가 올바르지 않습니다. (테스트 계정: admin@cho.os / admin1234)'
      form.querySelector('.login-submit')?.animate(
        [
          { transform: 'translateX(0)' },
          { transform: 'translateX(-6px)' },
          { transform: 'translateX(6px)' },
          { transform: 'translateX(0)' },
        ],
        { duration: 280, easing: 'ease-out' }
      )
    }
  })
})()
