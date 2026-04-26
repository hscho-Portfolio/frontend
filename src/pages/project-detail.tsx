import type { Project } from '../data/types'

export const ProjectDetailPage = ({ project }: { project: Project | null }) => {
  const p = project

  if (!p) {
    return (
      <div class="project-not-found">
        <div class="window-bar">
          <div class="window-controls">
            <a class="wc wc-close" href="/desktop"></a>
            <span class="wc wc-min"></span>
            <span class="wc wc-max"></span>
          </div>
          <div class="window-title">Project not found</div>
          <div class="window-spacer"></div>
        </div>
        <div style="padding:48px;text-align:center;">
          <p style="color:#94a3b8;margin-bottom:16px;">해당 프로젝트를 찾을 수 없습니다.</p>
          <a href="/desktop" class="btn-primary">데스크톱으로 돌아가기</a>
        </div>
      </div>
    )
  }

  const heroStyle = p.thumbnailUrl
    ? `--hero-bg:url(${p.thumbnailUrl})`
    : `--hero-bg:${p.thumbColor}`

  return (
    <div class="project-detail-root">
      {/* Window frame */}
      <div class="project-window">
        <header class="window-bar window-bar-detail">
          <div class="window-controls">
            <a class="wc wc-close" href="/desktop" title="close"></a>
            <span class="wc wc-min"></span>
            <span class="wc wc-max"></span>
          </div>
          <div class="window-title">{p.title}</div>
          <div class="window-spacer">
            <a class="window-action" href="/desktop">
              <i class="fa-solid fa-arrow-left"></i> Desktop
            </a>
          </div>
        </header>

        {/* Hero */}
        <section class="pd-hero" style={heroStyle}>
          <div class="pd-hero-inner">
            <div class="pd-hero-meta">
              <span class={`status-pill status-${p.status === 'completed' ? 'done' : 'wip'}`}>
                <span class="status-dot"></span>
                {p.status === 'completed' ? 'Completed' : 'In Progress'}
              </span>
              <span class="pd-hero-period">
                <i class="fa-regular fa-calendar"></i> {p.period}
              </span>
              <span class="pd-hero-period">
                <i class="fa-solid fa-tag"></i> {p.category}
              </span>
            </div>
            <h1 class="pd-hero-title">{p.title}</h1>
            <p class="pd-hero-tagline">{p.tagline}</p>
            <div class="pd-hero-actions">
              {p.links.github ? (
                <a class="btn-primary" href={p.links.github} target="_blank">
                  <i class="fa-brands fa-github"></i> GitHub
                </a>
              ) : null}
              {p.links.demo ? (
                <a class="btn-secondary" href={p.links.demo} target="_blank">
                  <i class="fa-solid fa-up-right-from-square"></i> Live Demo
                </a>
              ) : null}
            </div>
          </div>
          {p.icon ? (
            <div class="pd-hero-icon">
              <i class={p.icon}></i>
            </div>
          ) : null}
        </section>

        {/* Body */}
        <div class="pd-body">
          {/* Overview */}
          <section class="pd-section">
            <header class="pd-section-head">
              <span class="pd-section-no">01</span>
              <h2>Overview</h2>
            </header>
            <p class="pd-overview">{p.overview}</p>
          </section>

          {/* Key Features */}
          {p.features.length > 0 ? (
            <section class="pd-section">
              <header class="pd-section-head">
                <span class="pd-section-no">02</span>
                <h2>Key Features</h2>
              </header>
              <ul class="pd-features">
                {p.features.map((f, i) => (
                  <li>
                    <span class="pd-feature-no">{String(i + 1).padStart(2, '0')}</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* Tech Stack — 3D cards */}
          {p.stacks.length > 0 ? (
            <section class="pd-section">
              <header class="pd-section-head">
                <span class="pd-section-no">03</span>
                <h2>Tech Stack</h2>
                <span class="pd-section-hint">카드를 호버해 확인해보세요</span>
              </header>
              <div class="stack-grid">
                {p.stacks.map((s) => (
                  <div class="stack-card" style={`--stack-color:${s.color}`}>
                    <div class="stack-card-inner">
                      <div class="stack-card-front">
                        <div class="stack-card-icon">
                          {s.iconUrl
                            ? <img src={s.iconUrl} alt={s.name} style="width:2rem;height:2rem;object-fit:contain" />
                            : s.icon
                              ? <i class={s.icon}></i>
                              : <i class="fa-solid fa-cube"></i>}
                        </div>
                        <div class="stack-card-name">{s.name}</div>
                        <div class="stack-card-cat">{s.category}</div>
                      </div>
                      <div class="stack-card-back">
                        <div class="stack-card-name-sm">{s.name}</div>
                        <p class="stack-card-usage">{s.usage || '프로젝트에서 활용'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* Architecture */}
          {p.architecture.length > 0 ? (
            <section class="pd-section">
              <header class="pd-section-head">
                <span class="pd-section-no">04</span>
                <h2>Architecture</h2>
              </header>
              <div class="pd-arch">
                {p.architecture.map((node, i) => (
                  <>
                    <div class="pd-arch-node">{node}</div>
                    {i < p.architecture.length - 1 ? <div class="pd-arch-arrow">↓</div> : null}
                  </>
                ))}
              </div>
            </section>
          ) : null}

          {/* Retrospective */}
          {p.retrospective.length > 0 ? (
            <section class="pd-section">
              <header class="pd-section-head">
                <span class="pd-section-no">05</span>
                <h2>Retrospective</h2>
              </header>
              <ul class="pd-retro">
                {p.retrospective.map((r) => (
                  <li>
                    <i class="fa-solid fa-quote-left"></i>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* Footer nav */}
          <section class="pd-footer-nav">
            <a class="btn-ghost" href="/desktop">
              <i class="fa-solid fa-arrow-left"></i> Back to Desktop
            </a>
            <a class="btn-ghost" href="/desktop?open=projects">
              See other projects <i class="fa-solid fa-arrow-right"></i>
            </a>
          </section>
        </div>
      </div>
    </div>
  )
}
