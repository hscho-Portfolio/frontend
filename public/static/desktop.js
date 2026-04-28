// === Desktop 인터랙션 ===
(() => {
  // ============ Theme toggle ============
  const themeToggle = document.getElementById('theme-toggle')
  const themeIcon = themeToggle?.querySelector('i')
  const getTheme = () => {
    try {
      return localStorage.getItem('cho-os-theme') === 'dark' ? 'dark' : 'light'
    } catch {
      return 'light'
    }
  }
  const setTheme = (theme) => {
    const nextTheme = theme === 'dark' ? 'dark' : 'light'
    document.documentElement.dataset.theme = nextTheme
    try {
      localStorage.setItem('cho-os-theme', nextTheme)
    } catch {
      // Ignore storage failures in private browsing modes.
    }
    if (themeToggle) {
      const isDark = nextTheme === 'dark'
      themeToggle.setAttribute('aria-pressed', String(isDark))
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode')
      themeToggle.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode')
    }
    if (themeIcon) {
      themeIcon.className = nextTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'
    }
  }

  setTheme(getTheme())
  themeToggle?.addEventListener('click', () => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark')
  })

  // ============ Time ============
  const timeEl = document.getElementById('topbar-time')
  const fmtTime = () => {
    const d = new Date()
    const days = ['일', '월', '화', '수', '목', '금', '토']
    const hh = String(d.getHours()).padStart(2, '0')
    const mm = String(d.getMinutes()).padStart(2, '0')
    return `${days[d.getDay()]} ${d.getMonth() + 1}.${d.getDate()} ${hh}:${mm}`
  }
  if (timeEl) {
    timeEl.textContent = fmtTime()
    setInterval(() => (timeEl.textContent = fmtTime()), 30 * 1000)
  }

  // ============ Folder open ============
  const folderOverlay = document.getElementById('folder-overlay')
  const folderTitle = document.getElementById('folder-title')
  const appOverlay = document.getElementById('app-overlay')
  const appTitle = document.getElementById('app-title')
  const appBody = document.getElementById('app-window-body')

  const openFolder = (id) => {
    if (id === 'projects') {
      folderTitle.textContent = 'Projects'
      folderOverlay.classList.add('open')
    } else if (id === 'admin') {
      window.location.href = '/admin/login'
    } else {
      const data = buildAppContent(id)
      if (!data) return
      appTitle.textContent = data.title
      appBody.innerHTML = data.html
      appOverlay.classList.add('open')
      // Award 클릭 → 상장 라이트박스
      appBody.querySelectorAll('.aw-award-item.has-cert').forEach((el) => {
        el.addEventListener('click', () => openCert(el.dataset.cert))
        el.addEventListener('keydown', (e) => { if (e.key === 'Enter') openCert(el.dataset.cert) })
      })
    }
  }

  document.querySelectorAll('[data-app]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      const id = btn.getAttribute('data-app')
      openFolder(id)
    })
  })

  document.querySelectorAll('[data-close]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-close')
      if (target === 'folder') folderOverlay.classList.remove('open')
      if (target === 'app') appOverlay.classList.remove('open')
    })
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      folderOverlay.classList.remove('open')
      appOverlay.classList.remove('open')
    }
  })

  // ============ Folder filters ============
  const filterEls = document.querySelectorAll('#folder-filters .chip')
  const grid = document.getElementById('folder-grid')
  const searchInput = document.getElementById('folder-search-input')
  let activeFilter = 'all'

  const applyFilter = () => {
    const q = (searchInput?.value || '').toLowerCase().trim()
    grid?.querySelectorAll('.project-card').forEach((card) => {
      const status = card.getAttribute('data-status')
      const featured = card.getAttribute('data-featured') === 'true'
      const title = card.getAttribute('data-title') || ''
      let match = true
      if (activeFilter === 'featured') match = featured
      else if (activeFilter !== 'all') match = status === activeFilter
      if (match && q) match = title.includes(q)
      card.style.display = match ? '' : 'none'
    })
  }

  filterEls.forEach((el) => {
    el.addEventListener('click', () => {
      filterEls.forEach((x) => x.classList.remove('active'))
      el.classList.add('active')
      activeFilter = el.getAttribute('data-filter')
      applyFilter()
    })
  })
  searchInput?.addEventListener('input', applyFilter)

  // ============ Auto-open via query (?open=projects) ============
  const params = new URLSearchParams(window.location.search)
  if (params.get('open')) {
    setTimeout(() => openFolder(params.get('open')), 300)
  }

  // ============ Site settings ============
  let siteSettings = {}
  let cachedAwards = []
  let cachedStacks = []

  const applySettings = (s) => {
    // Welcome widget owner name
    const nameSpan = document.querySelector('.welcome-widget-title span')
    if (nameSpan && s.ownerName) nameSpan.textContent = s.ownerName

    // Wallpaper
    if (s.defaultWallpaperUrl) {
      const wallpaper = document.querySelector('.wallpaper')
      if (wallpaper) {
        wallpaper.style.backgroundImage = `url(${s.defaultWallpaperUrl})`
        wallpaper.style.backgroundSize = 'cover'
        wallpaper.style.backgroundPosition = 'center'
      }
    }
  }

  const loadSettings = async () => {
    try {
      const backendUrl = window.BACKEND_URL || 'http://localhost:8080'
      const res = await fetch(`${backendUrl}/api/v1/public/site-settings`, {
        signal: AbortSignal.timeout(3000),
      })
      if (res.ok) {
        siteSettings = await res.json()
        applySettings(siteSettings)
      }
    } catch {
      // 네트워크 실패 시 하드코딩 fallback 유지
    }
  }

  const loadAwards = async () => {
    try {
      const backendUrl = window.BACKEND_URL || 'http://localhost:8080'
      const res = await fetch(`${backendUrl}/api/v1/public/awards`, {
        signal: AbortSignal.timeout(3000),
      })
      if (res.ok) cachedAwards = await res.json()
    } catch {
      // fallback: empty
    }
  }

  const loadStacks = async () => {
    try {
      const backendUrl = window.BACKEND_URL || 'http://localhost:8080'
      const res = await fetch(`${backendUrl}/api/v1/public/stacks`, {
        signal: AbortSignal.timeout(3000),
      })
      if (res.ok) cachedStacks = await res.json()
    } catch {
      // fallback: empty
    }
  }

  loadSettings()
  loadAwards()
  loadStacks()

  // ============ Certificate lightbox ============
  const certLightbox = document.getElementById('cert-lightbox')
  const certLightboxImg = document.getElementById('cert-lightbox-img')

  const openCert = (url) => {
    if (!certLightbox || !certLightboxImg) return
    certLightboxImg.src = url
    certLightbox.classList.add('open')
  }
  const closeCert = () => {
    if (!certLightbox) return
    certLightbox.classList.remove('open')
    setTimeout(() => { certLightboxImg.src = '' }, 300)
  }

  certLightbox?.addEventListener('click', (e) => {
    if (e.target === certLightbox || e.target.closest('[data-close-cert]')) closeCert()
  })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCert()
  })

  // ============ App contents (About/Skills/Career/Contact/Research) ============
  // buildAppContent()는 openFolder() 호출 시점에 최신 siteSettings를 참조한다.
  const buildAppContent = (id) => {
    const s = siteSettings
    const ownerName   = s.ownerName   || '조호성 · Hosung Cho'
    const headline    = s.headline    || 'AI Implementer / Full-stack Builder'
    const bio         = s.bio         || '데이터 분석, 백엔드, 클라우드 배포를 연결해 실제 동작하는 AI 서비스를 구현합니다.'
    const email       = s.email       || 'hello@cho.os'
    const githubUrl   = s.githubUrl   || 'https://github.com'
    const linkedinUrl = s.linkedinUrl || 'https://linkedin.com'
    const resumeUrl   = s.resumeUrl   || '#'
    const profileImg  = s.profileImageUrl

    const avatarSrc  = profileImg || '/static/hosung.jpg'
    const avatarHtml = `<img src="${avatarSrc}" alt="${ownerName}" />`

    const contents = {
      about: {
        title: 'About Me',
        html: `
          <div class="aw-profile-head">
            <div class="aw-avatar">${avatarHtml}</div>
            <div>
              <div class="aw-profile-name">조호성</div>
              <div class="aw-profile-role">AI Implementer · Full-stack · Cloud / Infra</div>
              <div class="aw-profile-bio">데이터를 분석하고 모델을 설계하는 데서 그치지 않고, 이를 실제 서비스와 시스템으로 구현해 운영까지 연결하는 AI 구현자입니다. 문제를 정의하고 데이터를 통해 해결 방향을 찾은 뒤 구현과 검증까지 끝내는 방식으로 성과를 만들어 왔습니다.</div>
              <div class="aw-tags" style="margin-top:10px">
                <span class="aw-tag">#AI구현자</span>
                <span class="aw-tag">#머신러닝</span>
                <span class="aw-tag">#데이터엔지니어링</span>
                <span class="aw-tag">#소재이해</span>
                <span class="aw-tag">#시스템구현</span>
              </div>
            </div>
          </div>

          <div class="aw-section">
            <div class="aw-eyebrow"><i class="fa-solid fa-flag"></i> Core Identity</div>
            <h2 class="aw-title">단순 분석가가 아니라 <em style="color:#7c3aed;font-style:normal">서비스로 연결하는 사람</em></h2>
            <p class="aw-sub">머신러닝·딥러닝 모델 설계부터 API 연동, 클라우드 배포까지 전 과정을 직접 다룹니다. <strong style="color:#6d28d9">카드를 호버해보세요 →</strong></p>
            <div class="uiv-row">
              <div class="uiv-card is-indigo">
                <div class="uiv-front">
                  <div class="uiv-front-icon" style="display:flex;gap:6px;font-size:20px;align-items:center">
                    <i class="fa-brands fa-python"></i>
                    <i class="fa-solid fa-brain"></i>
                  </div>
                  <p>Python</p>
                  <small>AI Implementer</small>
                </div>
                <div class="uiv-content">
                  <p class="uiv-heading">Python × AI</p>
                  <p>PyTorch · YOLO · LangChain · LangGraph로 모델을 만들고 FastAPI · Spring Boot로 서비스까지 직접 붙입니다. RAG, STT, 의도 분류 등 LLM 기반 기능을 구현합니다.</p>
                </div>
              </div>
              <div class="uiv-card is-violet">
                <div class="uiv-front">
                  <div class="uiv-front-icon"><i class="fa-brands fa-rust"></i></div>
                  <p>Rust</p>
                  <small>Systems</small>
                </div>
                <div class="uiv-content">
                  <p class="uiv-heading">Rust</p>
                  <p>GC 없이 메모리 안전성 보장, 소유권 시스템으로 런타임 오버헤드 제로. Crabpaste 오픈소스로 mDNS 탐색 · P2P WebSocket · 핀 페어링을 경량 구현.</p>
                </div>
              </div>
              <div class="uiv-card is-cyan">
                <div class="uiv-front">
                  <div class="uiv-front-icon"><i class="fa-solid fa-flask"></i></div>
                  <p>Materials</p>
                  <small>× AI</small>
                </div>
                <div class="uiv-content">
                  <p class="uiv-heading">Materials × AI</p>
                  <p>신소재공학(주전공)으로 반도체·이차전지·디스플레이 공정을 이해하고 제조 데이터 해석에 연결합니다. 소재 물성과 공정·성능 간 상관관계 분석 역량을 보유합니다.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="aw-section">
            <div class="aw-eyebrow"><i class="fa-solid fa-briefcase"></i> Experience</div>
            <h2 class="aw-title">경험</h2>
            <div class="aw-exp-list">
              <div class="aw-exp-item">
                <div class="aw-exp-period">2025.12 ~ 2026.06</div>
                <div class="aw-exp-body">
                  <div class="aw-exp-title">LG 전자 DX School</div>
                </div>
              </div>
              <div class="aw-exp-item">
                <div class="aw-exp-period">2024.12 ~ 2025.11</div>
                <div class="aw-exp-body">
                  <div class="aw-exp-title">KSEB Bootcamp 4기</div>
                </div>
              </div>
            </div>
          </div>

          <div class="aw-section">
            <div class="aw-eyebrow"><i class="fa-solid fa-graduation-cap"></i> Education</div>
            <div class="aw-row">
              <div class="aw-row-key">학교</div>
              <div class="aw-row-value">경기대학교 · 2020.03 – 2026.08</div>
            </div>
            <div class="aw-row">
              <div class="aw-row-key">전공</div>
              <div class="aw-row-value">신소재공학과 (주전공) · 컴퓨터공학과 (복수전공) · GPA 4.01 / 4.5</div>
            </div>
            <div class="aw-row">
              <div class="aw-row-key">전공역량</div>
              <div class="aw-row-value">반도체 공정·소자 구조 / 이차전지 소재·전기화학 / 디스플레이 공정 최적화 / 재료 물성·미세구조 분석</div>
            </div>
            <div class="aw-row">
              <div class="aw-row-key">Interest</div>
              <div class="aw-row-value">
                <div class="aw-tags">
                  <span class="aw-tag">AX / AI 서비스</span>
                  <span class="aw-tag">스마트 팩토리</span>
                  <span class="aw-tag">LLM · RAG</span>
                  <span class="aw-tag">Materials × AI</span>
                  <span class="aw-tag">Cloud Infra</span>
                </div>
              </div>
            </div>
            <div class="aw-row">
              <div class="aw-row-key">Contact</div>
              <div class="aw-row-value">
                <a href="mailto:chohosung27@gmail.com" style="color:inherit;text-decoration:underline;text-underline-offset:3px">chohosung27@gmail.com</a>
                · <a href="https://github.com/hscho0048" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:underline;text-underline-offset:3px">github.com/hscho0048</a>
                · +82-10-9757-0148
              </div>
            </div>
          </div>

          <div class="aw-section">
            <div class="aw-eyebrow"><i class="fa-solid fa-file-lines"></i> Publications</div>
            <h2 class="aw-title">논문 <span style="font-size:14px;font-weight:500;color:var(--ink-400)">한국정보기술학회 학술대회 논문집 게재 2편</span></h2>
            <div class="aw-paper-list">
              <div class="aw-paper-item">
                <div class="aw-paper-title">LLM 기반과 자체 알고리즘의 복지 추천 기능에 따른 고령 인구의 기술 수용성 비교</div>
                <ul class="aw-exp-bullets">
                  <li>LLM 기반 vs 자체 알고리즘 추천 구조 비교 설계</li>
                  <li>성향 분석·추천 단계 분리 및 태그 기반 알고리즘 구현</li>
                  <li>응답 속도 최대 5,000배 이상 개선, 비용 0으로 절감</li>
                </ul>
              </div>
              <div class="aw-paper-item">
                <div class="aw-paper-title">이더리움 기반 본인 인증을 통한 투표 플랫폼의 개발</div>
                <ul class="aw-exp-bullets">
                  <li>이더리움 기반 본인 인증 및 투표 구조 설계</li>
                  <li>웹 인증 + 블록체인 인증 분리 아키텍처 구현</li>
                  <li>스마트 컨트랙트 기반 투표 기록·검증 시스템 구축</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="aw-section">
            <div class="aw-eyebrow"><i class="fa-solid fa-user"></i> Work Style</div>
            <h2 class="aw-title">나를 나타내는 말</h2>
            <div class="aw-trait-grid">
              <div class="aw-trait-card">
                <div class="aw-trait-title">실행 중심형</div>
                <div class="aw-trait-desc">새로운 기술이나 문제를 접하면 빠르게 시도하고, 결과를 바탕으로 개선 방향을 찾는 실행력</div>
              </div>
              <div class="aw-trait-card">
                <div class="aw-trait-title">구조화 성향</div>
                <div class="aw-trait-desc">복잡한 문제를 단계와 흐름으로 나누어 정리, 체계적으로 해결하는 구조화 능력</div>
              </div>
              <div class="aw-trait-card">
                <div class="aw-trait-title">실용 가치 중심형</div>
                <div class="aw-trait-desc">기술보다 실제 활용 가능성을 중요하게 여기며, 결과를 서비스와 운영까지 연결하는 실용성</div>
              </div>
              <div class="aw-trait-card">
                <div class="aw-trait-title">개선 지향형</div>
                <div class="aw-trait-desc">한 번 만든 결과에 머무르지 않고, 더 나은 방식이 있는지 지속적으로 검토하고 발전시키는 개선 지향성</div>
              </div>
            </div>
          </div>
        `,
      },
      skills: {
        title: 'Skills',
        html: (() => {
          const cats = {}
          cachedStacks.forEach((s) => {
            const cat = s.category || 'Etc'
            if (!cats[cat]) cats[cat] = []
            cats[cat].push([s.name, s.description || ''])
          })
          const catIconMap = {
            'Language': 'fa-solid fa-code',
            'Frontend': 'fa-solid fa-window-maximize',
            'Backend':  'fa-solid fa-server',
            'Database': 'fa-solid fa-database',
            'Cloud':    'fa-solid fa-cloud',
            'DevOps':   'fa-solid fa-gears',
            'AI/Data':  'fa-solid fa-brain',
            'Etc':      'fa-solid fa-layer-group',
          }
          const catOrder = ['Language', 'AI/Data', 'Backend', 'Frontend', 'Cloud', 'DevOps', 'Database', 'Etc']
          const sorted = catOrder.filter((c) => cats[c]).concat(Object.keys(cats).filter((c) => !catOrder.includes(c)))
          const rendered = sorted.map((cat) =>
            renderSkillCat(cat, catIconMap[cat] || 'fa-solid fa-layer-group', cats[cat])
          ).join('')
          return '<div class="aw-section"><div class="aw-eyebrow"><i class="fa-solid fa-layer-group"></i> Tech Stack</div><h2 class="aw-title">기술 스택</h2></div>' + rendered
        })(),
      },
      career: {
        title: 'Awards',
        html: (() => {
          const items = cachedAwards.length > 0
            ? cachedAwards.map((a) => renderAward(a.awardDate, a.prize, a.contest, a.certificateUrl)).join('')
            : [
                renderAward('2025.08', '우수사업계획서상', '2025 AI Powered SW 창업경진대회'),
                renderAward('2025.08', '우수상', 'K-SoftVation Showcase 프로젝트 경진대회'),
                renderAward('2025.06', '동상', '2025 한국정보기술학회 하계종합학술대회'),
                renderAward('2024.11', '장려상', '제5회 세종시 빅데이터 분석 아이디어 공모전'),
                renderAward('2024.10', '우수상 (생성형 AI 부문)', '2024 캡스톤디자인 및 AI 해커톤 경진대회'),
                renderAward('2024.05', '은상', '2024 한국정보기술학회 하계종합학술대회'),
              ].join('')
          return `
            <div class="aw-section">
              <div class="aw-eyebrow"><i class="fa-solid fa-trophy"></i> Awards & Honors</div>
              <h2 class="aw-title">수상 내역</h2>
              <p class="aw-sub">각종 경진대회 및 학술대회 수상 이력입니다.</p>
            </div>
            <div class="aw-award-list">${items}</div>
          `
        })(),
      },
      research: {
        title: 'Research',
        html: `
          <div class="aw-section">
            <div class="aw-eyebrow"><i class="fa-solid fa-flask"></i> Research Interest</div>
            <h2 class="aw-title">관심 연구 영역</h2>
            <p class="aw-sub">전공(재료공학)과 AI/데이터를 잇는 지점에 관심이 많습니다.</p>
          </div>
          <div class="aw-research-grid">
            ${renderRC('AI × Materials', '재료 데이터에 AI를 결합해 신소재 후보 탐색과 성능 예측 가능성을 탐구합니다.')}
            ${renderRC('QLED / OLED Device Analysis', '소자 구조 데이터로 디바이스 성능을 예측하는 모델을 구축한 경험.')}
            ${renderRC('Semiconductor / AI Infra', '반도체 제조 데이터와 AI 인프라 연결, 생산성 향상에 관심.')}
            ${renderRC('Battery / BMS', '배터리 셀 데이터와 BMS 제어 로직에 AI를 적용하는 방향.')}
            ${renderRC('NLP-based UX Analysis', '리뷰/피드백 텍스트로 UX 개선 포인트를 정량화.')}
          </div>
        `,
      },
      contact: {
        title: 'Contact',
        html: `
          <div class="aw-section">
            <div class="aw-eyebrow"><i class="fa-solid fa-paper-plane"></i> Get In Touch</div>
            <h2 class="aw-title">연락하기</h2>
            <p class="aw-sub">언제든 환영합니다.</p>
          </div>
          <div class="aw-contact-grid">
            <a class="aw-contact-card" href="mailto:${email}"><i class="fa-solid fa-envelope"></i><div><strong>Email</strong><span>${email}</span></div></a>
            <a class="aw-contact-card" href="${githubUrl}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i><div><strong>GitHub</strong><span>${githubUrl.replace(/^https?:\/\//, '')}</span></div></a>
            <a class="aw-contact-card" href="${resumeUrl}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-file-pdf"></i><div><strong>Resume</strong><span>이력서 다운로드</span></div></a>
          </div>
        `,
      },
    }

    return contents[id] ?? null
  }

  function renderSkillCat(name, icon, list) {
    return `
      <div class="aw-skill-cat">
        <div class="aw-skill-cat-head">
          <i class="${icon}"></i>
          <span class="aw-skill-cat-name">${name}</span>
        </div>
        <div class="aw-skill-list">
          ${list
            .map(
              ([n, d]) =>
                `<div class="aw-skill"><strong>${n}</strong><span>${d}</span></div>`
            )
            .join('')}
        </div>
      </div>`
  }

  function renderAward(date, prize, contest, certUrl) {
    const hasCert = !!certUrl
    return `
      <div class="aw-award-item${hasCert ? ' has-cert' : ''}" ${hasCert ? `data-cert="${certUrl}"` : ''} ${hasCert ? 'role="button" tabindex="0" title="상장 보기"' : ''}>
        <div class="aw-award-icon"><i class="fa-solid fa-trophy"></i></div>
        <div class="aw-award-body">
          <div class="aw-award-prize">${prize}</div>
          <div class="aw-award-contest">${contest}</div>
        </div>
        <div class="aw-award-date">${date}</div>
        ${hasCert ? '<div class="aw-award-cert-badge"><i class="fa-solid fa-image"></i></div>' : ''}
      </div>`
  }

  function renderTL(year, title, desc) {
    return `
      <div class="aw-tl-item">
        <div class="aw-tl-year">${year}</div>
        <div class="aw-tl-title">${title}</div>
        <div class="aw-tl-desc">${desc}</div>
      </div>`
  }

  function renderRC(title, desc) {
    return `<div class="aw-research-card"><h4>${title}</h4><p>${desc}</p></div>`
  }
})()
