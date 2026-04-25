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

  // === 임시 인증 우회 (백엔드 연동 전) ===
  // 어떤 입력값이든 통과시켜 /admin/dashboard 로 이동
  // 로컬스토리지에 mock 토큰을 박아두어 admin.js 가 이를 인식
  form?.addEventListener('submit', (e) => {
    e.preventDefault()
    const data = new FormData(form)
    const email = (data.get('email') || 'admin@cho.os').toString()

    try {
      localStorage.setItem(
        'cho-os-admin-token',
        JSON.stringify({
          token: 'mock-jwt-' + Date.now().toString(36),
          email,
          ts: Date.now(),
        })
      )
    } catch {}

    if (errorBox) errorBox.hidden = true
    form.style.opacity = '0.5'
    form.style.pointerEvents = 'none'
    const submitBtn = form.querySelector('.login-submit')
    if (submitBtn) {
      submitBtn.innerHTML =
        '<span>Authenticating…</span><i class="fa-solid fa-circle-notch fa-spin"></i>'
    }
    setTimeout(() => (window.location.href = '/admin/dashboard'), 500)
  })
})()
