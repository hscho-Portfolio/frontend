// === Admin Login ===
;(() => {
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

  const showError = (msg) => {
    if (!errorBox) return
    errorBox.textContent = msg
    errorBox.hidden = false
  }

  const setLoading = (on) => {
    if (!form) return
    form.style.opacity = on ? '0.6' : ''
    form.style.pointerEvents = on ? 'none' : ''
    const btn = form.querySelector('.login-submit')
    if (btn) {
      btn.innerHTML = on
        ? '<span>Authenticating…</span><i class="fa-solid fa-circle-notch fa-spin"></i>'
        : '<span>Login</span><i class="fa-solid fa-arrow-right-to-bracket"></i>'
    }
  }

  form?.addEventListener('submit', async (e) => {
    e.preventDefault()
    if (errorBox) errorBox.hidden = true

    const data = new FormData(form)
    const email = (data.get('email') || '').toString().trim()
    const password = (data.get('password') || '').toString()

    if (!email || !password) {
      showError('이메일과 비밀번호를 입력해주세요.')
      return
    }

    setLoading(true)

    try {
      const backendUrl = window.BACKEND_URL || 'http://localhost:8080'
      const res = await fetch(`${backendUrl}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (res.status === 401 || res.status === 403) {
        showError('이메일 또는 비밀번호가 올바르지 않습니다.')
        setLoading(false)
        return
      }

      if (!res.ok) {
        showError(`서버 오류가 발생했습니다. (${res.status})`)
        setLoading(false)
        return
      }

      const json = await res.json()
      try {
        localStorage.setItem(
          'cho-os-admin-token',
          JSON.stringify({
            token: json.accessToken,
            email: json.email,
            name: json.name,
            ts: Date.now(),
          })
        )
      } catch {}

      window.location.href = '/admin/dashboard'
    } catch {
      showError('백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.')
      setLoading(false)
    }
  })
})()
