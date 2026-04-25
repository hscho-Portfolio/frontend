export const NotFoundPage = () => {
  return (
    <div class="nf-root">
      <div class="wallpaper" aria-hidden="true">
        <div class="wallpaper-mesh"></div>
        <div class="wallpaper-grain"></div>
      </div>

      <div class="nf-card">
        <header class="window-bar">
          <div class="window-controls">
            <a class="wc wc-close" href="/desktop"></a>
            <span class="wc wc-min"></span>
            <span class="wc wc-max"></span>
          </div>
          <div class="window-title">System Alert</div>
          <div class="window-spacer"></div>
        </header>
        <div class="nf-body">
          <div class="nf-icon">
            <i class="fa-solid fa-triangle-exclamation"></i>
          </div>
          <div class="nf-code">404</div>
          <h1 class="nf-title">This window could not be found.</h1>
          <p class="nf-desc">
            요청하신 경로가 존재하지 않거나, 더 이상 사용되지 않는 윈도우입니다.
          </p>
          <div class="nf-actions">
            <a class="btn-primary" href="/desktop">
              <i class="fa-solid fa-house"></i> Back to Desktop
            </a>
            <a class="btn-ghost" href="/">
              <i class="fa-solid fa-rotate-left"></i> Restart
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
