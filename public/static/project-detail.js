// === Project Detail CSR ===
;(() => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.location.href = '/desktop'
  })

  const BACKEND_URL = window.BACKEND_URL || 'https://api.hscho-portfolio.site'

  // ── helpers ───────────────────────────────────────────────────────────────
  const esc = (s) =>
    String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')

  const fmtPeriod = (start, end) => {
    if (!start) return ''
    const fmt = (d) => { const [y, m] = d.split('-'); return `${y}.${m}` }
    return end ? `${fmt(start)} ~ ${fmt(end)}` : `${fmt(start)} ~`
  }

  const sectionsOf = (sections, type) =>
    (sections || [])
      .filter((s) => s.sectionType === type)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((s) => s.content)

  const isFaClass = (v) => !!v && String(v).trimStart().startsWith('fa-')

  const resolveUrl = (url) => {
    if (!url) return null
    if (/^(https?:)?\/\//.test(url) || url.startsWith('data:')) return url
    if (url.startsWith('/')) return `${BACKEND_URL}${url}`
    return url
  }

  const FALLBACKS = [
    'linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#ec4899 100%)',
    'linear-gradient(135deg,#0ea5e9 0%,#22d3ee 50%,#a78bfa 100%)',
    'linear-gradient(135deg,#f59e0b 0%,#ef4444 50%,#ec4899 100%)',
    'linear-gradient(135deg,#10b981 0%,#06b6d4 100%)',
    'linear-gradient(135deg,#1e40af 0%,#7c3aed 100%)',
  ]

  // ── render (HTML identical to JSX in project-detail.tsx) ──────────────────
  const renderProject = (api) => {
    const thumbnailUrl = resolveUrl(api.thumbnailUrl)
    const heroStyle = thumbnailUrl ? `--hero-bg:url(${thumbnailUrl})` : `--hero-bg:${FALLBACKS[0]}`
    const isDone = api.status === 'completed'
    const statusClass = isDone ? 'done' : 'wip'
    const statusLabel = isDone ? 'Completed' : 'In Progress'
    const period = fmtPeriod(api.startDate, api.endDate)

    const features    = sectionsOf(api.sections, 'features')
    const architecture = sectionsOf(api.sections, 'architecture')
    const retrospective = sectionsOf(api.sections, 'retrospective')
    const archImgRaw = (api.images || []).find((i) => i.imageType === 'architecture')?.imageUrl
    const archImgUrl  = resolveUrl(archImgRaw)
    const stacks      = api.stacks || []

    // ── hero ──
    const heroHtml = `
      <section class="pd-hero" style="${heroStyle}">
        <div class="pd-hero-inner">
          <div class="pd-hero-meta">
            <span class="status-pill status-${statusClass}">
              <span class="status-dot"></span>${statusLabel}
            </span>
            ${period ? `<span class="pd-hero-period"><i class="fa-regular fa-calendar"></i> ${esc(period)}</span>` : ''}
            ${api.category?.name ? `<span class="pd-hero-period"><i class="fa-solid fa-tag"></i> ${esc(api.category.name)}</span>` : ''}
          </div>
          <h1 class="pd-hero-title">${esc(api.title)}</h1>
          <p class="pd-hero-tagline">${esc(api.summary || api.description || '')}</p>
          <div class="pd-hero-actions">
            ${api.githubUrl ? `<a class="btn-primary" href="${esc(api.githubUrl)}" target="_blank"><i class="fa-brands fa-github"></i> GitHub</a>` : ''}
            ${api.demoUrl   ? `<a class="btn-secondary" href="${esc(api.demoUrl)}" target="_blank"><i class="fa-solid fa-up-right-from-square"></i> Live Demo</a>` : ''}
          </div>
        </div>
      </section>`

    // ── overview ──
    const overviewHtml = `
      <section class="pd-section">
        <header class="pd-section-head">
          <span class="pd-section-no">01</span>
          <h2>Overview</h2>
        </header>
        <p class="pd-overview">${esc(api.summary || api.description || '')}</p>
      </section>`

    // ── features ──
    const featuresHtml = features.length > 0 ? `
      <section class="pd-section">
        <header class="pd-section-head">
          <span class="pd-section-no">02</span>
          <h2>Key Features</h2>
        </header>
        <ul class="pd-features">
          ${features.map((f, i) => `
            <li>
              <span class="pd-feature-no">${String(i + 1).padStart(2, '0')}</span>
              <span>${esc(f)}</span>
            </li>`).join('')}
        </ul>
      </section>` : ''

    // ── tech stack ──
    const stackIconHtml = (s) => {
      const url = isFaClass(s.iconUrl) ? null : resolveUrl(s.iconUrl)
      const fa  = isFaClass(s.iconUrl) ? s.iconUrl : null
      if (url) return `<img src="${esc(url)}" alt="${esc(s.name)}" style="width:2rem;height:2rem;object-fit:contain">`
      if (fa)  return `<i class="${esc(fa)}"></i>`
      return `<i class="fa-solid fa-cube"></i>`
    }

    const stacksHtml = stacks.length > 0 ? `
      <section class="pd-section">
        <header class="pd-section-head">
          <span class="pd-section-no">03</span>
          <h2>Tech Stack</h2>
          <span class="pd-section-hint">카드를 호버해 확인해보세요</span>
        </header>
        <div class="stack-grid">
          ${stacks.map((s) => `
            <div class="stack-card" style="--stack-color:${esc(s.color || '#64748b')}">
              <div class="stack-card-inner">
                <div class="stack-card-front">
                  <div class="stack-card-icon">${stackIconHtml(s)}</div>
                  <div class="stack-card-name">${esc(s.name)}</div>
                  <div class="stack-card-cat">${esc(s.category)}</div>
                </div>
                <div class="stack-card-back">
                  <div class="stack-card-name-sm">${esc(s.name)}</div>
                  <p class="stack-card-usage">${esc(s.usageDescription || '프로젝트에서 활용')}</p>
                </div>
              </div>
            </div>`).join('')}
        </div>
      </section>` : ''

    // ── architecture ──
    const archHtml = (architecture.length > 0 || archImgUrl) ? `
      <section class="pd-section">
        <header class="pd-section-head">
          <span class="pd-section-no">04</span>
          <h2>Architecture</h2>
        </header>
        ${archImgUrl ? `<div class="pd-arch-img-wrap"><img class="pd-arch-img" src="${esc(archImgUrl)}" alt="${esc(api.title)} architecture"></div>` : ''}
        ${architecture.length > 0 ? `
          <div class="pd-arch">
            ${architecture.map((node, i) => `
              <div class="pd-arch-node">${esc(node)}</div>
              ${i < architecture.length - 1 ? '<div class="pd-arch-arrow">↓</div>' : ''}`).join('')}
          </div>` : ''}
      </section>` : ''

    // ── retrospective ──
    const retroHtml = retrospective.length > 0 ? `
      <section class="pd-section">
        <header class="pd-section-head">
          <span class="pd-section-no">05</span>
          <h2>Retrospective</h2>
        </header>
        <ul class="pd-retro">
          ${retrospective.map((r) => `
            <li>
              <i class="fa-solid fa-quote-left"></i>
              <span>${esc(r)}</span>
            </li>`).join('')}
        </ul>
      </section>` : ''

    // ── footer nav ──
    const footerHtml = `
      <section class="pd-footer-nav">
        <a class="btn-ghost" href="/desktop"><i class="fa-solid fa-arrow-left"></i> Back to Desktop</a>
        <a class="btn-ghost" href="/desktop?open=projects">See other projects <i class="fa-solid fa-arrow-right"></i></a>
      </section>`

    return `${heroHtml}<div class="pd-body">${overviewHtml}${featuresHtml}${stacksHtml}${archHtml}${retroHtml}${footerHtml}</div>`
  }

  // ── main ──────────────────────────────────────────────────────────────────
  const slug = window.location.pathname.replace(/^\/project\//, '').replace(/\/$/, '')
  const content = document.getElementById('pd-content')
  const titleEl = document.getElementById('pd-window-title')

  const showError = () => {
    if (titleEl) titleEl.textContent = 'Not Found'
    document.title = 'CHO OS — Not Found'
    if (content) content.innerHTML = `
      <div style="padding:48px;text-align:center;">
        <p style="color:#94a3b8;margin-bottom:16px;">해당 프로젝트를 찾을 수 없습니다.</p>
        <a href="/desktop" class="btn-primary">데스크톱으로 돌아가기</a>
      </div>`
  }

  ;(async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/public/projects/${encodeURIComponent(slug)}`, {
        signal: AbortSignal.timeout(30000),
      })
      if (res.status === 404) { showError(); return }
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const api = await res.json()
      if (titleEl) titleEl.textContent = api.title || slug
      document.title = `CHO OS — Project / ${api.title || slug}`
      if (content) content.innerHTML = renderProject(api)
    } catch {
      showError()
    }
  })()
})()
