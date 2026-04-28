import type { Project } from '../data/types'

const DESKTOP_ICONS = [
  { id: 'projects', label: 'Projects', icon: 'fa-solid fa-folder', color: '#fbbf24' },
  { id: 'about', label: 'About Me', icon: 'fa-solid fa-id-badge', color: '#60a5fa' },
  { id: 'skills', label: 'Skills', icon: 'fa-solid fa-layer-group', color: '#a78bfa' },
  { id: 'career', label: 'Career', icon: 'fa-solid fa-briefcase', color: '#34d399' },
  { id: 'research', label: 'Research', icon: 'fa-solid fa-flask', color: '#f472b6' },
  { id: 'contact', label: 'Contact', icon: 'fa-solid fa-paper-plane', color: '#22d3ee' },
  { id: 'admin', label: 'Admin', icon: 'fa-solid fa-lock', color: '#94a3b8' },
]

const DOCK_APPS = [
  { id: 'projects', label: 'Projects', icon: 'fa-solid fa-folder', color: '#fbbf24' },
  { id: 'about', label: 'About', icon: 'fa-solid fa-user', color: '#60a5fa' },
  { id: 'skills', label: 'Skills', icon: 'fa-solid fa-layer-group', color: '#a78bfa' },
  { id: 'career', label: 'Career', icon: 'fa-solid fa-briefcase', color: '#34d399' },
  { id: 'contact', label: 'Contact', icon: 'fa-solid fa-paper-plane', color: '#22d3ee' },
  { id: 'admin', label: 'Admin', icon: 'fa-solid fa-lock', color: '#94a3b8' },
]

export const DesktopPage = ({ projects }: { projects: Project[] }) => {
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
          {DESKTOP_ICONS.map((it) => (
            <button class="desktop-icon" data-app={it.id} type="button">
              <span class="desktop-icon-img" style={`--icon-color:${it.color}`}>
                <i class={it.icon}></i>
              </span>
              <span class="desktop-icon-label">{it.label}</span>
            </button>
          ))}
        </div>

        {/* Welcome widget */}
        <div class="welcome-widget" aria-hidden="true">
          <div class="welcome-widget-eyebrow">
            <span class="dot pulse"></span> System ready
          </div>
          <h1 class="welcome-widget-title">
            안녕하세요, <span>조호성</span>의 데스크톱입니다
          </h1>
          <p class="welcome-widget-desc">
            아이콘을 더블클릭하거나 Dock에서 앱을 실행해 포트폴리오를 탐색해보세요.
          </p>
          <div class="welcome-widget-tags">
            <span>AI Implementation</span>
            <span>Full-stack</span>
            <span>Cloud / Infra</span>
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
    <script src="/static/characters.js"></script>
  )
}
