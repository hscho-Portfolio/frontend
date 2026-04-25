export const NotFoundPage = () => {
  return (
    <div class="nf-root">
      <div class="wallpaper" aria-hidden="true">
        <div class="wallpaper-mesh"></div>
        <div class="wallpaper-grain"></div>
      </div>

      <div class="nf-alert">
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
          <h1 class="nf-title">404 — Window not found</h1>
          <p class="nf-msg">
            요청하신 페이지를 찾을 수 없습니다.
            <br />
            창이 닫혔거나, 잘못된 경로를 입력하셨을 수 있어요.
          </p>
          <div class="nf-actions">
            <a class="btn-primary" href="/desktop">
              <i class="fa-solid fa-house"></i> Back to Desktop
            </a>
            <a class="btn-ghost" href="/">
              <i class="fa-brands fa-apple"></i> Restart CHO OS
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
