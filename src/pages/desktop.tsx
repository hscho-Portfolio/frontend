import type { Project, Shortcut } from '../data/types'

const SHORTCUT_COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#0ea5e9', '#10b981',
]

const DOCK_APPS = [
  { id: 'projects', label: 'Projects', icon: 'fa-solid fa-folder', color: '#fbbf24' },
  { id: 'about', label: 'About', icon: 'fa-solid fa-user', color: '#60a5fa' },
  { id: 'skills', label: 'Skills', icon: 'fa-solid fa-layer-group', color: '#a78bfa' },
  { id: 'career', label: 'Awards', icon: 'fa-solid fa-trophy', color: '#34d399' },
  { id: 'contact', label: 'Contact', icon: 'fa-solid fa-paper-plane', color: '#22d3ee' },
  { id: 'admin', label: 'Admin', icon: 'fa-solid fa-lock', color: '#94a3b8' },
]

export const DesktopPage = ({ projects, shortcuts }: { projects: Project[]; shortcuts: Shortcut[] }) => {
  return (
    <div id="desktop-root" class="desktop-root">
      {/* Wallpaper */}
      <div class="wallpaper" aria-hidden="true">
        <div class="wallpaper-mesh"></div>
        <div class="wallpaper-grain"></div>
      </div>

      {/* TopBar */}
      <header class="topbar">
        <div class="topbar-left">
          <span class="topbar-logo">
            <i class="fa-brands fa-apple"></i>
          </span>
          <span class="topbar-title">CHO OS</span>
          <nav class="topbar-menu" aria-label="menu">
            <button class="topbar-menu-item">File</button>
            <button class="topbar-menu-item">Edit</button>
            <button class="topbar-menu-item">View</button>
            <button class="topbar-menu-item">Help</button>
          </nav>
        </div>
        <div class="topbar-right">
          <span class="topbar-icon" title="Wi-Fi"><i class="fa-solid fa-wifi"></i></span>
          <span class="topbar-icon" title="Battery"><i class="fa-solid fa-battery-three-quarters"></i></span>
          <span class="topbar-icon" title="Search"><i class="fa-solid fa-magnifying-glass"></i></span>
          <button class="topbar-theme-toggle" id="theme-toggle" type="button" aria-label="Toggle dark mode" aria-pressed="false" title="Toggle dark mode">
            <i class="fa-solid fa-moon"></i>
          </button>
          <span class="topbar-time" id="topbar-time">--:--</span>
        </div>
      </header>

      {/* Desktop area */}
      <main class="desktop-area" id="desktop-area">
        <div class="desktop-icons">
          {shortcuts.map((it, i) => (
            <a
              class="desktop-icon desktop-icon-shortcut"
              href={`/project/${it.slug}`}
              data-shortcut-slug={it.slug}
            >
              <span
                class="desktop-icon-img"
                style={it.thumbnailUrl
                  ? `background-image:url(${it.thumbnailUrl});background-size:cover;background-position:center;--icon-color:${SHORTCUT_COLORS[i % 5]}`
                  : `--icon-color:${SHORTCUT_COLORS[i % 5]}`}
              >
                {!it.thumbnailUrl && <i class="fa-solid fa-folder-open"></i>}
              </span>
              <span class="desktop-icon-label">{it.title}</span>
            </a>
          ))}
        </div>

        {/* Welcome widget */}
        <div class="welcome-widget" aria-hidden="true">
          <div class="welcome-widget-eyebrow">
            <span class="dot pulse"></span> System ready
          </div>
          <div class="welcome-widget-profile">
            <img class="welcome-widget-photo" src="/static/hosung.jpg" alt="조호성" />
            <div class="welcome-widget-info">
              <h1 class="welcome-widget-title">
                <span>조호성</span>
              </h1>
              <p class="welcome-widget-role">AI Implementer · Full-stack · Cloud / Infra</p>
              <p class="welcome-widget-desc">
                데이터 분석과 모델 설계를 넘어 실제 서비스와 시스템으로 구현하는 AI 구현자입니다.
              </p>
              <div class="welcome-widget-tags">
                <span>AI Implementation</span>
                <span>Full-stack</span>
                <span>Cloud / Infra</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Folder overlay */}
      <div id="folder-overlay" class="folder-overlay" aria-hidden="true">
        <div class="folder-backdrop" data-close="folder"></div>
        <div class="folder-window" id="folder-window">
          <header class="window-bar">
            <div class="window-controls">
              <button class="wc wc-close" data-close="folder" aria-label="close"></button>
              <button class="wc wc-min" aria-label="minimize"></button>
              <button class="wc wc-max" aria-label="maximize"></button>
            </div>
            <div class="window-title" id="folder-title">Projects</div>
            <div class="window-spacer"></div>
          </header>
          <div class="folder-toolbar">
            <div class="folder-search">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input id="folder-search-input" placeholder="Search projects..." type="text" />
            </div>
            <div class="folder-filters" id="folder-filters">
              <button class="chip active" data-filter="all">All</button>
              <button class="chip" data-filter="featured">★ Featured</button>
              <button class="chip" data-filter="in_progress">In Progress</button>
              <button class="chip" data-filter="completed">Completed</button>
            </div>
          </div>
          <div class="folder-grid" id="folder-grid">
            {projects.map((p) => (
              <a
                class="project-card"
                data-status={p.status}
                data-featured={String(p.featured)}
                data-title={p.title.toLowerCase()}
                href={`/project/${p.slug}`}
              >
                <div
                  class="project-card-thumb"
                  style={p.thumbnailUrl
                    ? `background-image:url(${p.thumbnailUrl})`
                    : `background:${p.thumbColor}`}
                >
                  {p.icon ? <i class={p.icon}></i> : null}
                  {p.featured ? <span class="badge-featured">★ Featured</span> : null}
                </div>
                <div class="project-card-body">
                  <div class="project-card-title">{p.title}</div>
                  <div class="project-card-tagline">{p.tagline}</div>
                  <div class="project-card-stacks">
                    {p.stacks.slice(0, 4).map((s) => (
                      <span class="stack-pill">{s.name}</span>
                    ))}
                  </div>
                  <div class="project-card-foot">
                    <span class={`status-dot status-${p.status === 'completed' ? 'done' : 'wip'}`}></span>
                    <span>{p.status === 'completed' ? 'Completed' : 'In Progress'}</span>
                    <span class="dot">·</span>
                    <span>{p.period}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Generic App window overlay (About / Skills / Career / Contact / Research) */}
      <div id="app-overlay" class="app-overlay" aria-hidden="true">
        <div class="folder-backdrop" data-close="app"></div>
        <div class="app-window" id="app-window">
          <header class="window-bar">
            <div class="window-controls">
              <button class="wc wc-close" data-close="app" aria-label="close"></button>
              <button class="wc wc-min" aria-label="minimize"></button>
              <button class="wc wc-max" aria-label="maximize"></button>
            </div>
            <div class="window-title" id="app-title">App</div>
            <div class="window-spacer"></div>
          </header>
          <div class="app-window-body" id="app-window-body">
            {/* injected by JS */}
          </div>
        </div>
      </div>

      {/* Certificate lightbox */}
      <div id="cert-lightbox" class="cert-lightbox" aria-hidden="true">
        <div class="cert-lightbox-backdrop" data-close-cert></div>
        <div class="cert-lightbox-content">
          <button class="cert-lightbox-close" data-close-cert aria-label="닫기">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <img id="cert-lightbox-img" class="cert-lightbox-img" src="" alt="상장" />
        </div>
      </div>

      {/* Dock */}
      <footer class="dock" aria-label="dock">
        <ul class="dock-list">
          {DOCK_APPS.map((it) => (
            <li>
              <button class="dock-item" data-app={it.id} title={it.label} type="button">
                <span class="dock-icon" style={`--icon-color:${it.color}`}>
                  <i class={it.icon}></i>
                </span>
                <span class="dock-tooltip">{it.label}</span>
              </button>
            </li>
          ))}
          <li class="dock-divider"></li>
          <li>
            <a class="dock-item" href="https://github.com" target="_blank" title="GitHub">
              <span class="dock-icon" style="--icon-color:#e5e7eb">
                <i class="fa-brands fa-github"></i>
              </span>
              <span class="dock-tooltip">GitHub</span>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  )
}
