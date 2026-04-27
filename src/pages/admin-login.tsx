export const AdminLoginPage = () => {
  return (
    <div class="login-root">
      {/* Blurred wallpaper background */}
      <div class="wallpaper" aria-hidden="true">
        <div class="wallpaper-mesh"></div>
        <div class="wallpaper-grain"></div>
      </div>
      <div class="login-blur" aria-hidden="true"></div>

      {/* Top bar (slim) */}
      <header class="topbar topbar-slim">
        <div class="topbar-left">
          <span class="topbar-logo"><i class="fa-brands fa-apple"></i></span>
          <span class="topbar-title">CHO OS — Admin</span>
        </div>
        <div class="topbar-right">
          <a class="topbar-icon" href="/desktop" title="Back to desktop">
            <i class="fa-solid fa-arrow-left"></i>
          </a>
        </div>
      </header>

      <div class="login-card">
        <div class="login-avatar">
          <i class="fa-solid fa-user-astronaut"></i>
        </div>
        <div class="login-name">Hosung Cho</div>
        <div class="login-role">Administrator</div>

        <form class="login-form" id="login-form" autocomplete="off">
          <label class="login-field">
            <span class="login-label">Email</span>
            <div class="login-input">
              <i class="fa-solid fa-envelope"></i>
              <input type="email" name="email" placeholder="admin@cho.os" required />
            </div>
          </label>
          <label class="login-field">
            <span class="login-label">Password</span>
            <div class="login-input">
              <i class="fa-solid fa-lock"></i>
              <input type="password" name="password" placeholder="••••••••" required />
              <button type="button" class="login-eye" id="login-eye" aria-label="show password">
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>
          </label>

          <div class="login-error" id="login-error" hidden></div>

          <button type="submit" class="login-submit">
            <span>Login</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </form>

        <div class="login-foot">
          <a href="/desktop">← Back to desktop</a>
          <span>v1.0</span>
        </div>
      </div>


      {/* 로그인 실패 팝업 */}
      <div class="hosung-popup" id="hosung-popup">
        <div class="hosung-popup-inner">
          <button class="hosung-popup-close" id="hosung-popup-close" aria-label="닫기">✕</button>
          <div class="hosung-popup-emoji">🚨</div>
          <div class="hosung-popup-title">비밀번호가 틀렸어요!</div>
          <div class="hosung-popup-sub">그냥 가시면 안 되고요~</div>
          <div class="hosung-popup-img-wrap">
            <img src="/static/hosung.jpg" alt="귀여운 호성이" class="hosung-popup-img" />
          </div>
          <div class="hosung-popup-msg">귀여운 호성이 보고 가세요 🐣</div>
        </div>
      </div>
    </div>
  )
}
