export const IntroPage = () => {
  return (
    <div id="intro-root" class="intro-root">
      {/* 별 배경 */}
      <div class="intro-stars" aria-hidden="true"></div>
      <div class="intro-glow" aria-hidden="true"></div>

      {/* Stage 1: Closed Mac (Click to open) */}
      <div id="stage-closed" class="intro-stage stage-closed visible">
        <div class="intro-brand">
          <div class="intro-logo">
            <i class="fa-brands fa-apple"></i>
          </div>
          <div class="intro-os-name">CHO OS</div>
          <div class="intro-os-version">version 1.0 · Portfolio Edition</div>
        </div>

        <div class="mac-laptop" id="mac-laptop">
          {/* mac-laptop.css가 처리. 없을 경우를 대비한 기본 폴백 */}
          <div class="mac-screen">
            <div class="mac-display">
              <div class="mac-camera"></div>
            </div>
          </div>
          <div class="mac-base">
            <div class="mac-hinge"></div>
          </div>
        </div>

        <button id="open-btn" class="intro-cta" type="button">
          <span class="intro-cta-dot"></span>
          <span class="intro-cta-text">Click to open</span>
          <span class="intro-cta-key">↵ Enter</span>
        </button>

        <div class="intro-footer">
          <span>© 2026 CHO OS</span>
          <span class="dot">·</span>
          <span>designed by Hosung Cho</span>
        </div>
      </div>

      {/* Stage 2: Booting */}
      <div id="stage-boot" class="intro-stage stage-boot">
        <div class="boot-apple">
          <i class="fa-brands fa-apple"></i>
        </div>
        <div class="boot-progress">
          <div class="boot-progress-bar" id="boot-bar"></div>
        </div>
        <ul class="boot-log" id="boot-log">
          <li>Initializing portfolio system...</li>
          <li>Loading projects...</li>
          <li>Loading tech stacks...</li>
          <li>Mounting desktop environment...</li>
          <li class="boot-ready">Ready.</li>
        </ul>
      </div>
    </div>
  )
}
