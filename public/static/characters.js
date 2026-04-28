// === Desktop Characters ===
(() => {
  const COLORS = ['blue', 'green', 'purple', 'red', 'white', 'yellow']
  const BASE = '/static/characters'
  const COUNT = 3        // 동시에 등장하는 캐릭터 수
  const SPEED = 1.2      // px per frame
  const FPS   = 150      // ms per animation frame
  const DIR_CHANGE_MIN = 2000   // 방향 전환 최소 ms
  const DIR_CHANGE_MAX = 5000   // 방향 전환 최대 ms
  const PANIC_DURATION = 1200   // panic 유지 ms

  // 방향별 프레임 정의
  const FRAMES = {
    front: (c) => ({
      default: `${BASE}/${c}/front/default.png`,
      walk:    [`${BASE}/${c}/front/1.png`, `${BASE}/${c}/front/2.png`],
    }),
    back: (c) => ({
      default: `${BASE}/${c}/back/default.png`,
      walk:    [`${BASE}/${c}/back/1.png`, `${BASE}/${c}/back/2.png`],
    }),
    left: (c) => ({
      default: `${BASE}/${c}/side/left_default.png`,
      walk:    [`${BASE}/${c}/side/left_1.png`, `${BASE}/${c}/side/left_2.png`],
    }),
    right: (c) => ({
      default: `${BASE}/${c}/side/right_default.png`,
      walk:    [`${BASE}/${c}/side/right_1.png`, `${BASE}/${c}/side/right_2.png`],
    }),
  }

  const DIRS = ['front', 'back', 'left', 'right']

  const rand  = (min, max) => Math.random() * (max - min) + min
  const randInt = (min, max) => Math.floor(rand(min, max))
  const pick  = (arr) => arr[randInt(0, arr.length)]

  // 방향 → (dx, dy)
  const velocity = (dir) => {
    if (dir === 'left')  return { dx: -SPEED, dy: 0 }
    if (dir === 'right') return { dx:  SPEED, dy: 0 }
    if (dir === 'front') return { dx: 0, dy:  SPEED }
    /* back */           return { dx: 0, dy: -SPEED }
  }

  function createCharacter(color) {
    const el = document.createElement('div')
    el.style.cssText = `
      position: fixed;
      width: 48px;
      height: 48px;
      image-rendering: pixelated;
      cursor: pointer;
      z-index: 9999;
      user-select: none;
      pointer-events: auto;
    `

    const img = document.createElement('img')
    img.style.cssText = 'width:100%;height:100%;display:block;'
    img.draggable = false
    el.appendChild(img)
    document.body.appendChild(el)

    // 초기 위치 (데스크탑 영역 안)
    let x = rand(60, window.innerWidth  - 100)
    let y = rand(60, window.innerHeight - 100)
    let dir = pick(DIRS)
    let vel = velocity(dir)
    let frameIdx = 0
    let panic = false
    let panicTimer = null
    let walkToggle = false

    const setPos = () => {
      el.style.left = x + 'px'
      el.style.top  = y + 'px'
    }
    setPos()

    // 방향 전환 스케줄
    const scheduleDir = () => {
      const delay = rand(DIR_CHANGE_MIN, DIR_CHANGE_MAX)
      setTimeout(() => {
        if (!panic) {
          dir = pick(DIRS)
          vel = velocity(dir)
        }
        scheduleDir()
      }, delay)
    }
    scheduleDir()

    // 애니메이션 프레임 교체
    const animInterval = setInterval(() => {
      if (panic) {
        img.src = `${BASE}/${color}/panic.png`
        return
      }
      const frames = FRAMES[dir](color)
      walkToggle = !walkToggle
      img.src = walkToggle ? frames.walk[0] : frames.walk[1]
    }, FPS)

    // 이동 루프
    const moveInterval = setInterval(() => {
      if (panic) return

      x += vel.dx
      y += vel.dy

      // 벽 반사
      const margin = 10
      const maxX = window.innerWidth  - 58
      const maxY = window.innerHeight - 58

      if (x < margin) {
        x = margin
        dir = 'right'
        vel = velocity(dir)
      } else if (x > maxX) {
        x = maxX
        dir = 'left'
        vel = velocity(dir)
      }
      if (y < margin + 30) {  // topbar 아래
        y = margin + 30
        dir = 'front'
        vel = velocity(dir)
      } else if (y > maxY) {
        y = maxY
        dir = 'back'
        vel = velocity(dir)
      }

      setPos()
    }, 16)

    // 클릭 → panic
    el.addEventListener('click', () => {
      if (panic) return
      panic = true
      img.src = `${BASE}/${color}/panic.png`

      clearTimeout(panicTimer)
      panicTimer = setTimeout(() => {
        panic = false
      }, PANIC_DURATION)
    })

    return { el, animInterval, moveInterval }
  }

  // 각 색상 중복 없이 랜덤 픽
  const shuffled = [...COLORS].sort(() => Math.random() - 0.5)
  const chosen = shuffled.slice(0, COUNT)
  const characters = chosen.map((color) => createCharacter(color))

  // 오버레이가 열리면 캐릭터 숨기기
  const folderOverlay = document.getElementById('folder-overlay')
  const appOverlay    = document.getElementById('app-overlay')

  const setVisible = (visible) => {
    characters.forEach(({ el }) => {
      el.style.visibility = visible ? 'visible' : 'hidden'
    })
  }

  const observer = new MutationObserver(() => {
    const anyOpen =
      folderOverlay?.classList.contains('open') ||
      appOverlay?.classList.contains('open')
    setVisible(!anyOpen)
  })

  if (folderOverlay) observer.observe(folderOverlay, { attributes: true, attributeFilter: ['class'] })
  if (appOverlay)    observer.observe(appOverlay,    { attributes: true, attributeFilter: ['class'] })
})()
