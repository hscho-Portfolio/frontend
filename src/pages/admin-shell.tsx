type NavItem = {
  href: string
  label: string
  icon: string
  match: string[]
}

const NAV: NavItem[] = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: 'fa-solid fa-gauge-high', match: ['/admin/dashboard'] },
  {
    href: '/admin/dashboard/projects',
    label: 'Projects',
    icon: 'fa-solid fa-folder-open',
    match: ['/admin/dashboard/projects'],
  },
  {
    href: '/admin/dashboard/stacks',
    label: 'Stacks',
    icon: 'fa-solid fa-layer-group',
    match: ['/admin/dashboard/stacks'],
  },
  {
    href: '/admin/dashboard/categories',
    label: 'Categories',
    icon: 'fa-solid fa-sitemap',
    match: ['/admin/dashboard/categories'],
  },
  {
    href: '/admin/dashboard/awards',
    label: 'Awards',
    icon: 'fa-solid fa-trophy',
    match: ['/admin/dashboard/awards'],
  },
  {
    href: '/admin/dashboard/settings',
    label: 'Settings',
    icon: 'fa-solid fa-sliders',
    match: ['/admin/dashboard/settings'],
  },
]

export const AdminShell = ({
  children,
  active,
  title,
  subtitle,
  actions,
}: {
  children: any
  active: string
  title: string
  subtitle?: string
  actions?: any
}) => {
  return (
    <div class="admin-root">
      {/* Sidebar */}
      <aside class="admin-sidebar">
        <a class="admin-brand" href="/admin/dashboard">
          <span class="admin-brand-mark">
            <i class="fa-brands fa-apple"></i>
          </span>
          <div class="admin-brand-text">
            <div class="admin-brand-title">CHO OS</div>
            <div class="admin-brand-sub">Admin Console</div>
          </div>
        </a>

        <nav class="admin-nav" aria-label="admin">
          {NAV.map((n) => (
            <a class={`admin-nav-item ${active === n.label ? 'active' : ''}`} href={n.href}>
              <i class={n.icon}></i>
              <span>{n.label}</span>
              {active === n.label ? <span class="admin-nav-marker"></span> : null}
            </a>
          ))}
        </nav>

        <div class="admin-sidebar-foot">
          <a class="admin-back" href="/desktop">
            <i class="fa-solid fa-arrow-left"></i> Back to desktop
          </a>
          <button class="admin-logout" id="admin-logout">
            <i class="fa-solid fa-power-off"></i> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div class="admin-main">
        <header class="admin-topbar">
          <div class="admin-topbar-left">
            <h1 class="admin-page-title">{title}</h1>
            {subtitle ? <p class="admin-page-sub">{subtitle}</p> : null}
          </div>
          <div class="admin-topbar-right">
            {actions ? <div class="admin-actions">{actions}</div> : null}
            <div class="admin-user">
              <span class="admin-user-avatar">
                <i class="fa-solid fa-user"></i>
              </span>
              <div class="admin-user-text">
                <div class="admin-user-name">Hosung Cho</div>
                <div class="admin-user-role">Administrator</div>
              </div>
            </div>
          </div>
        </header>

        <main class="admin-content">{children}</main>
      </div>
    </div>
  )
}
