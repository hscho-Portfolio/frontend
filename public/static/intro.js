// === Intro 인터랙션 ===
(() => {
  const laptop = document.getElementById('mac-laptop')
  const openBtn = document.getElementById('open-btn')
  const stageClosed = document.getElementById('stage-closed')
  const stageBoot = document.getElementById('stage-boot')
  const bootBar = document.getElementById('boot-bar')
  const bootLog = document.getElementById('boot-log')

  if (!laptop || !openBtn) return

  let opened = false

  const openMac = () => {
    if (opened) return
    opened = true

    // 1) 맥북 열림
    laptop.classList.add('is-open')

    // 2) 약간의 지연 후 closed stage 페이드아웃
    setTimeout(() => {
      stageClosed.classList.remove('visible')
    }, 1800)

    // 3) 부팅 화면 페이드인
    setTimeout(() => {
      stageBoot.classList.add('visible')
      // 진행 바
      requestAnimationFrame(() => {
        bootBar.style.width = '100%'
      })
      // 로그 순차 표시
      const logs = bootLog.querySelectorAll('li')
      logs.forEach((li, i) => {
        setTimeout(() => li.classList.add('show'), 200 + i * 350)
      })
    }, 2000)

    // 4) 데스크톱으로 이동
    setTimeout(() => {
      window.location.href = '/desktop'
    }, 4400)
  }

  openBtn.addEventListener('click', openMac)
  laptop.addEventListener('click', openMac)

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      openMac()
    }
  })
})()
