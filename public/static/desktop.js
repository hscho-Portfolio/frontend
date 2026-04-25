// === Desktop 인터랙션 ===
(() => {
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
      // App window
      const data = APP_CONTENTS[id]
      if (!data) return
      appTitle.textContent = data.title
      appBody.innerHTML = data.html
      appOverlay.classList.add('open')
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

  // ============ App contents (About/Skills/Career/Contact/Research) ============
  const APP_CONTENTS = {
    about: {
      title: 'About Me',
      html: `
        <div class="aw-profile-head">
          <div class="aw-avatar"><i class="fa-solid fa-user-astronaut"></i></div>
          <div>
            <div class="aw-profile-name">조호성 · Hosung Cho</div>
            <div class="aw-profile-role">AI Implementer / Full-stack Builder</div>
            <div class="aw-profile-bio">데이터 분석, 백엔드, 클라우드 배포를 연결해 실제 동작하는 AI 서비스를 구현합니다.</div>
          </div>
        </div>
        <div class="aw-section">
          <div class="aw-eyebrow"><i class="fa-solid fa-flag"></i> Core Identity</div>
          <h2 class="aw-title">단순 분석가가 아니라 <em style="color:#c4b5fd;font-style:normal">서비스로 연결하는 사람</em></h2>
          <p class="aw-sub">분석/모델링에 멈추지 않고 백엔드와 클라우드까지 직접 잇는 것을 원칙으로 합니다.</p>
        </div>
        <div class="aw-section">
          <div class="aw-row">
            <div class="aw-row-key">Identity</div>
            <div class="aw-row-value">AI 구현 · 데이터 기반 문제 해결 · 클라우드 기반 서비스화</div>
          </div>
          <div class="aw-row">
            <div class="aw-row-key">Interest</div>
            <div class="aw-row-value">
              <div class="aw-tags">
                <span class="aw-tag">AI Infra</span>
                <span class="aw-tag">Manufacturing System</span>
                <span class="aw-tag">Cloud Backend</span>
                <span class="aw-tag">Materials × AI</span>
              </div>
            </div>
          </div>
          <div class="aw-row">
            <div class="aw-row-key">Education</div>
            <div class="aw-row-value">재료공학 전공 · LG DX School 수료</div>
          </div>
          <div class="aw-row">
            <div class="aw-row-key">Now</div>
            <div class="aw-row-value">AI Infra / 생산시스템 직무를 준비하며, OS형 포트폴리오 CMS를 직접 만드는 중입니다.</div>
          </div>
        </div>
      `,
    },
    skills: {
      title: 'Skills',
      html: `
        <div class="aw-section">
          <div class="aw-eyebrow"><i class="fa-solid fa-layer-group"></i> Tech Stack Overview</div>
          <h2 class="aw-title">현재 다루는 기술</h2>
          <p class="aw-sub">숙련도 막대보다 <em style="color:#c4b5fd;font-style:normal">사용 경험</em>을 중심으로 정리합니다.</p>
        </div>
        ${renderSkillCat('Language', 'fa-solid fa-code', [
          ['Python', '데이터 전처리, ML 모델링, FastAPI 서버 구현'],
          ['TypeScript', '프론트엔드 + 백엔드 풀스택 구현'],
          ['Java', 'Spring Boot 기반 서비스 구현'],
          ['SQL', '관계형 DB 설계와 쿼리 튜닝'],
        ])}
        ${renderSkillCat('Frontend', 'fa-solid fa-window-maximize', [
          ['React / Next.js', 'OS형 화면 구성과 라우팅'],
          ['Tailwind CSS', '유틸리티 기반 스타일링'],
        ])}
        ${renderSkillCat('Backend', 'fa-solid fa-server', [
          ['FastAPI', 'CMS API와 CRUD 구현'],
          ['Spring Boot', '엔터프라이즈 백엔드 서비스'],
          ['SQLAlchemy', 'ORM 기반 데이터 모델링'],
        ])}
        ${renderSkillCat('Cloud / Infra', 'fa-solid fa-cloud', [
          ['AWS', 'S3, CloudFront, RDS, ECS Fargate 배포 설계'],
          ['Docker', '백엔드 컨테이너화 및 일관된 배포'],
          ['GitHub Actions', 'CI/CD 파이프라인 구성'],
        ])}
        ${renderSkillCat('AI / Data', 'fa-solid fa-brain', [
          ['Scikit-learn / XGBoost', 'baseline 모델링과 평가'],
          ['NLP / Topic Modeling', 'LDA 기반 텍스트 분석'],
        ])}
      `,
    },
    career: {
      title: 'Career',
      html: `
        <div class="aw-section">
          <div class="aw-eyebrow"><i class="fa-solid fa-briefcase"></i> Career Timeline</div>
          <h2 class="aw-title">지금까지 걸어온 길</h2>
          <p class="aw-sub">학력, 교육, 프로젝트 이력을 시간순으로.</p>
        </div>
        <div class="aw-timeline">
          ${renderTL('2026', 'AWS 기반 포트폴리오 CMS 구축', 'OS형 인터페이스 + FastAPI + AWS 운영 경험 확보')}
          ${renderTL('2026', 'AI Infra / 생산시스템 직무 준비', '제조 도메인 + AI 서비스 결합 방향 모색')}
          ${renderTL('2025', 'LG DX School 수료', '데이터 분석, ML, 백엔드 풀스택 교육 과정')}
          ${renderTL('2025', '고령층 복지 추천 서비스', '룰 기반 + 컨텐츠 기반 추천 시스템 구현')}
          ${renderTL('2025', 'QLED 소자 데이터 분석', '회귀 모델로 CE/EQE 예측 baseline 구축')}
          ${renderTL('2024', '관광 리뷰 NLP 분석', 'LDA 토픽 모델링 + 감성 분류')}
          ${renderTL('2024', '블록체인 투표 플랫폼', '스마트 컨트랙트 기반 무결성 보장 투표')}
        </div>
      `,
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
          <a class="aw-contact-card" href="mailto:hello@cho.os"><i class="fa-solid fa-envelope"></i><div><strong>Email</strong><span>hello@cho.os</span></div></a>
          <a class="aw-contact-card" href="https://github.com" target="_blank"><i class="fa-brands fa-github"></i><div><strong>GitHub</strong><span>github.com/hosung</span></div></a>
          <a class="aw-contact-card" href="https://linkedin.com" target="_blank"><i class="fa-brands fa-linkedin"></i><div><strong>LinkedIn</strong><span>linkedin.com/in/hosung</span></div></a>
          <a class="aw-contact-card" href="#"><i class="fa-solid fa-file-pdf"></i><div><strong>Resume</strong><span>이력서 다운로드</span></div></a>
        </div>
        <div class="aw-section" style="margin-top:28px">
          <div class="aw-eyebrow"><i class="fa-solid fa-comment-dots"></i> Quick Message</div>
          <h2 class="aw-title" style="font-size:18px">메시지 보내기</h2>
          <p class="aw-sub">백엔드 연동 후 활성화될 예정입니다.</p>
          <div style="display:flex;flex-direction:column;gap:10px">
            <input class="adm-stack-usage" placeholder="Your email" />
            <textarea class="adm-stack-usage" rows="4" placeholder="메시지 내용"></textarea>
            <button class="btn-primary" style="align-self:flex-start" disabled><i class="fa-solid fa-paper-plane"></i> Send (coming soon)</button>
          </div>
        </div>
      `,
    },
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
