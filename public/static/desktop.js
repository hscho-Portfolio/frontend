// CHO OS — Desktop interactions
(function () {
  const $ = (s) => document.querySelector(s)
  const $$ = (s) => Array.from(document.querySelectorAll(s))

  // ---- Clock ----
  const clock = $('#topbar-time')
  const updateClock = () => {
    const now = new Date()
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const d = days[now.getDay()]
    const h = String(now.getHours()).padStart(2, '0')
    const m = String(now.getMinutes()).padStart(2, '0')
    if (clock) clock.textContent = `${d} ${h}:${m}`
  }
  updateClock()
  setInterval(updateClock, 1000 * 30)

  // ---- App content templates ----
  const APP_CONTENT = {
    about: {
      title: 'About Me',
      html: `
        <div class="aw-hero">
          <div class="aw-avatar"><i class="fa-solid fa-user-astronaut"></i></div>
          <div class="aw-hero-text">
            <h2>조호성</h2>
            <p>AI Implementation · Full-stack Builder · Cloud-aware</p>
          </div>
        </div>
        <div class="aw-h3">Positioning</div>
        <p class="aw-p">데이터 분석, 백엔드, 클라우드 배포를 연결해 실제로 동작하는 AI 서비스를 구현하는 개발자입니다. 단순 모델 학습이 아닌 ‘운영 가능한 제품’으로 만드는 것을 목표로 합니다.</p>
        <div class="aw-h3">Core Identity</div>
        <ul class="aw-list">
          <li><i class="fa-solid fa-circle-check"></i> AI 구현 — 학습된 모델을 API로 노출하고, 워크플로우에 연결</li>
          <li><i class="fa-solid fa-circle-check"></i> 데이터 기반 문제 해결 — 가설/실험/측정 사이클로 의사결정</li>
          <li><i class="fa-solid fa-circle-check"></i> 클라우드 기반 서비스화 — AWS/Docker로 안정 운영</li>
        </ul>
        <div class="aw-h3">Interest</div>
        <ul class="aw-list">
          <li><i class="fa-solid fa-cube"></i> AI Infra · Manufacturing System · Cloud Backend</li>
        </ul>
      `,
    },
    skills: {
      title: 'Skills',
      html: `
        <div class="aw-skill-section">
          <div class="aw-skill-title"><i class="fa-solid fa-code"></i> Language</div>
          <div class="aw-skill-grid">
            <div class="aw-skill-tag"><i class="fa-brands fa-python"></i> Python</div>
            <div class="aw-skill-tag"><i class="fa-solid fa-code"></i> TypeScript</div>
            <div class="aw-skill-tag"><i class="fa-brands fa-java"></i> Java</div>
            <div class="aw-skill-tag"><i class="fa-solid fa-database"></i> SQL</div>
          </div>
        </div>
        <div class="aw-skill-section">
          <div class="aw-skill-title"><i class="fa-solid fa-window-maximize"></i> Frontend</div>
          <div class="aw-skill-grid">
            <div class="aw-skill-tag"><i class="fa-brands fa-react"></i> React / Next.js</div>
            <div class="aw-skill-tag"><i class="fa-solid fa-wind"></i> Tailwind CSS</div>
          </div>
        </div>
        <div class="aw-skill-section">
          <div class="aw-skill-title"><i class="fa-solid fa-server"></i> Backend</div>
          <div class="aw-skill-grid">
            <div class="aw-skill-tag"><i class="fa-solid fa-bolt"></i> FastAPI</div>
            <div class="aw-skill-tag"><i class="fa-solid fa-leaf"></i> Spring Boot</div>
            <div class="aw-skill-tag"><i class="fa-solid fa-link"></i> SQLAlchemy</div>
          </div>
        </div>
        <div class="aw-skill-section">
          <div class="aw-skill-title"><i class="fa-solid fa-cloud"></i> Cloud / Infra</div>
          <div class="aw-skill-grid">
            <div class="aw-skill-tag"><i class="fa-brands fa-aws"></i> AWS (S3, RDS, ECS)</div>
            <div class="aw-skill-tag"><i class="fa-brands fa-docker"></i> Docker</div>
            <div class="aw-skill-tag"><i class="fa-brands fa-github"></i> GitHub Actions</div>
          </div>
        </div>
        <div class="aw-skill-section">
          <div class="aw-skill-title"><i class="fa-solid fa-brain"></i> AI / Data</div>
          <div class="aw-skill-grid">
            <div class="aw-skill-tag"><i class="fa-solid fa-chart-line"></i> Scikit-learn</div>
            <div class="aw-skill-tag"><i class="fa-solid fa-tree"></i> XGBoost</div>
            <div class="aw-skill-tag"><i class="fa-solid fa-comments"></i> NLP</div>
            <div class="aw-skill-tag"><i class="fa-solid fa-diagram-project"></i> Topic Modeling</div>
          </div>
        </div>
        <p class="aw-p" style="margin-top:18px;color:var(--text-3);font-size:12px;">* 숙련도 % 대신 실제 사용 경험 기반으로 표시했습니다.</p>
      `,
    },
    career: {
      title: 'Career',
      html: `
        <div class="aw-hero">
          <div class="aw-avatar"><i class="fa-solid fa-briefcase"></i></div>
          <div class="aw-hero-text">
            <h2>Career Timeline</h2>
            <p>학력, 교육, 프로젝트 이력</p>
          </div>
        </div>
        <div class="aw-tl">
          <div class="aw-tl-item">
            <div class="aw-tl-year">2026</div>
            <div class="aw-tl-title">AWS 기반 포트폴리오 CMS 구축</div>
            <div class="aw-tl-desc">Next.js + FastAPI + AWS 기반 OS형 포트폴리오 / 관리자 CMS 제작.</div>
          </div>
          <div class="aw-tl-item">
            <div class="aw-tl-year">2025</div>
            <div class="aw-tl-title">LG DX School · 고령층 복지 추천 서비스 · QLED 데이터 분석</div>
            <div class="aw-tl-desc">팀 프로젝트와 도메인 데이터 분석 경험을 통해, 데이터-모델-서비스 간 연결을 학습했습니다.</div>
          </div>
          <div class="aw-tl-item">
            <div class="aw-tl-year">2024</div>
            <div class="aw-tl-title">블록체인 투표 플랫폼 · 관광 리뷰 NLP 분석</div>
            <div class="aw-tl-desc">서비스 설계와 텍스트 분석을 동시에 다루며 풀스택 관점을 키웠습니다.</div>
          </div>
        </div>
      `,
    },
    research: {
      title: 'Research',
      html: `
        <div class="aw-hero">
          <div class="aw-avatar"><i class="fa-solid fa-flask"></i></div>
          <div class="aw-hero-text">
            <h2>Research</h2>
            <p>전공/도메인 기반 관심 주제</p>
          </div>
        </div>
        <ul class="aw-list">
          <li><i class="fa-solid fa-atom"></i> AI + Materials — 재료 데이터 기반 성능 예측</li>
          <li><i class="fa-solid fa-microchip"></i> QLED / OLED Device Analysis — 소자 구조와 성능 회귀</li>
          <li><i class="fa-solid fa-memory"></i> Semiconductor / AI Infra — 생산/공정 데이터 모델링</li>
          <li><i class="fa-solid fa-battery-full"></i> Battery / BMS — 충방전 데이터 분석</li>
          <li><i class="fa-solid fa-comments"></i> NLP-based UX Analysis — 리뷰/피드백 텍스트 분석</li>
        </ul>
        <div class="aw-h3">Selected</div>
        <ul class="aw-list">
          <li>
            <i class="fa-solid fa-flask"></i>
            <div>
              <strong>QLED Device Performance Prediction</strong><br/>
              <span style="font-size:12px;color:var(--text-2);">XGBoost 회귀로 CE/EQE 예측. 데이터 부족과 feature 한계를 어떻게 다루는지 학습한 프로젝트.</span>
            </div>
          </li>
        </ul>
      `,
    },
    contact: {
      title: 'Contact',
      html: `
        <div class="aw-hero">
          <div class="aw-avatar"><i class="fa-solid fa-paper-plane"></i></div>
          <div class="aw-hero-text">
            <h2>Get in touch</h2>
            <p>연락은 언제든 환영입니다.</p>
          </div>
        </div>
        <div class="aw-contact">
          <a href="mailto:hello@cho.os">
            <i class="fa-solid fa-envelope"></i>
            <span>hello@cho.os</span>
            <span class="sub">Email</span>
          </a>
          <a href="https://github.com" target="_blank">
            <i class="fa-brands fa-github"></i>
            <span>github.com/hosung</span>
            <span class="sub">GitHub</span>
          </a>
          <a href="https://linkedin.com" target="_blank">
            <i class="fa-brands fa-linkedin"></i>
            <span>linkedin.com/in/hosung</span>
            <span class="sub">LinkedIn</span>
          </a>
          <a href="#">
            <i class="fa-solid fa-file-arrow-down"></i>
            <span>Resume.pdf</span>
            <span class="sub">Download</span>
          </a>
        </div>
        <p class="aw-p" style="margin-top:24px;color:var(--text-3);font-size:12px;">메시지 폼은 백엔드 연동 후 제공될 예정입니다.</p>
      `,
    },
    admin: {
      title: 'Admin',
      html: `
        <div class="aw-hero">
          <div class="aw-avatar" style="background:linear-gradient(135deg,#94a3b8,#475569);"><i class="fa-solid fa-lock"></i></div>
          <div class="aw-hero-text">
            <h2>Administrator</h2>
            <p>CMS에 접근하려면 로그인이 필요합니다.</p>
          </div>
        </div>
        <p class="aw-p">관리자 페이지에서는 프로젝트, 기술스택, 카테고리, 사이트 설정을 관리할 수 있습니다.</p>
        <div style="display:flex;gap:8px;margin-top:24px;">
          <a class="btn-primary" href="/admin/login">
            <i class="fa-solid fa-arrow-right-to-bracket"></i> Login
          </a>
          <a class="btn-ghost" href="/admin/dashboard">
            Skip to Dashboard (dev)
          </a>
        </div>
      `,
    },
  }

  // ---- Folder open/close ----
  const folderOverlay = $('#folder-overlay')
  const appOverlay = $('#app-overlay')
  const appTitle = $('#app-title')
  const appBody = $('#app-window-body')

  const openFolder = () => folderOverlay && folderOverlay.classList.add('open')
  const closeFolder = () => folderOverlay && folderOverlay.classList.remove('open')

  const openApp = (id) => {
    const data = APP_CONTENT[id]
    if (!data || !appOverlay) return
    appTitle.textContent = data.title
    appBody.innerHTML = data.html
    appOverlay.classList.add('open')
  }
  const closeApp = () => appOverlay && appOverlay.classList.remove('open')

  // Click on desktop icons / dock
  $$('.desktop-icon, .dock-item').forEach((el) => {
    el.addEventListener('click', (e) => {
      const id = el.getAttribute('data-app')
      if (!id) return
      e.preventDefault()
      if (id === 'projects') openFolder()
      else if (id === 'admin') {
        // navigate to login
        window.location.href = '/admin/login'
      } else openApp(id)
    })
  })

  // Close handlers
  $$('[data-close="folder"]').forEach((el) =>
    el.addEventListener('click', closeFolder)
  )
  $$('[data-close="app"]').forEach((el) =>
    el.addEventListener('click', closeApp)
  )
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeFolder()
      closeApp()
    }
  })

  // Auto-open from query string ?open=projects
  const params = new URLSearchParams(window.location.search)
  const openParam = params.get('open')
  if (openParam === 'projects') {
    setTimeout(openFolder, 200)
  } else if (openParam && APP_CONTENT[openParam]) {
    setTimeout(() => openApp(openParam), 200)
  }

  // ---- Folder filtering ----
  const filterBtns = $$('#folder-filters .chip')
  const searchInput = $('#folder-search-input')
  const cards = $$('.project-card')
  let currentFilter = 'all'

  const applyFilter = () => {
    const q = (searchInput?.value || '').toLowerCase().trim()
    cards.forEach((card) => {
      const status = card.getAttribute('data-status')
      const featured = card.getAttribute('data-featured') === 'true'
      const title = card.getAttribute('data-title') || ''

      let showByFilter = true
      if (currentFilter === 'featured') showByFilter = featured
      else if (currentFilter !== 'all') showByFilter = status === currentFilter

      const showBySearch = !q || title.includes(q)
      card.setAttribute('data-hidden', String(!(showByFilter && showBySearch)))
    })
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'))
      btn.classList.add('active')
      currentFilter = btn.getAttribute('data-filter') || 'all'
      applyFilter()
    })
  })
  if (searchInput) searchInput.addEventListener('input', applyFilter)
})()
