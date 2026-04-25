// CHO OS — Intro page interaction
(function () {
  const $ = (s) => document.querySelector(s)
  const closed = $('#stage-closed')
  const boot = $('#stage-boot')
  const laptop = $('#mac-laptop')
  const openBtn = $('#open-btn')
  const bar = $('#boot-bar')
  const logItems = document.querySelectorAll('#boot-log li')

  let started = false

  const startBoot = () => {
    if (started) return
    started = true

    // 1. open laptop
    laptop.classList.add('is-open')

    // 2. fade closed stage
    setTimeout(() => {
      closed.classList.add('fading')
      closed.classList.remove('visible')
    }, 1100)

    // 3. show boot stage
    setTimeout(() => {
      boot.classList.add('visible')
    }, 1500)

    // 4. progress + log
    let progress = 0
    let logIdx = 0
    const total = logItems.length
    const totalDuration = 1800
    const stepInterval = totalDuration / 100

    const tick = () => {
      progress += 1
      if (bar) bar.style.width = progress + '%'

      // reveal log items at proportional positions
      const target = Math.floor((progress / 100) * total)
      while (logIdx < target && logIdx < total) {
        logItems[logIdx].classList.add('shown')
        logIdx += 1
      }

      if (progress < 100) {
        setTimeout(tick, stepInterval)
      } else {
        // ensure all shown
        for (let i = logIdx; i < total; i++) logItems[i].classList.add('shown')
        // navigate to desktop
        setTimeout(() => {
          window.location.href = '/desktop'
        }, 700)
      }
    }
    setTimeout(tick, 1700)
  }

  if (openBtn) {
    openBtn.addEventListener('click', startBoot)
  }
  if (laptop) {
    laptop.addEventListener('click', startBoot)
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') startBoot()
  })
})()
