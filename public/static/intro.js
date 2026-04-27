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

    // 1) 맥북 뚜껑 열림
    laptop.classList.add('is-open')

    // 2) 뚜껑 열림 완료 후 화면 가득 채우는 줌인
    setTimeout(() => {
      laptop.classList.add('is-zooming')
    }, 2400)

    // 3) 줌 중반부에 stage-closed 페이드아웃 + 부팅 화면 페이드인
    setTimeout(() => {
      stageClosed.classList.remove('visible')
      stageBoot.classList.add('visible')
      requestAnimationFrame(() => {
        bootBar.style.width = '100%'
      })
      const logs = bootLog.querySelectorAll('li')
      logs.forEach((li, i) => {
        setTimeout(() => li.classList.add('show'), 200 + i * 350)
      })
    }, 3500)

    // 4) 부팅 화면이 충분히 보인 뒤 데스크톱으로 이동
    setTimeout(() => {
      window.location.href = '/desktop'
    }, 6200)
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
