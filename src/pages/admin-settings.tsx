import { AdminShell } from './admin-shell'

export const AdminSettingsPage = () => {
  return (
    <AdminShell
      active="Settings"
      title="Settings"
      subtitle="사이트 기본 정보와 표시 설정을 관리합니다."
      actions={
        <button class="btn-primary">
          <i class="fa-solid fa-floppy-disk"></i> Save Changes
        </button>
      }
    >
      <div class="adm-settings-grid">
        {/* Site identity */}
        <section class="adm-card">
          <header class="adm-card-head">
            <div>
              <h3>사이트 정보</h3>
              <p>포트폴리오의 기본 정보</p>
            </div>
          </header>
          <label class="adm-field">
            <span>Site Title</span>
            <input type="text" defaultValue="CHO OS" />
          </label>
          <label class="adm-field">
            <span>One-line Bio</span>
            <input
              type="text"
              defaultValue="데이터 분석, 백엔드, 클라우드 배포를 연결해 실제 동작하는 AI 서비스를 구현하는 개발자"
            />
          </label>
          <div class="adm-form-row two">
            <label class="adm-field">
              <span>Email</span>
              <input type="email" defaultValue="hello@cho.os" />
            </label>
            <label class="adm-field">
              <span>Resume URL</span>
              <input type="url" placeholder="https://..." />
            </label>
          </div>
        </section>

        {/* Social links */}
        <section class="adm-card">
          <header class="adm-card-head">
            <div>
              <h3>외부 링크</h3>
              <p>SNS 및 외부 프로필</p>
            </div>
          </header>
          <label class="adm-field">
            <span><i class="fa-brands fa-github"></i> GitHub</span>
            <input type="url" placeholder="https://github.com/..." />
          </label>
          <label class="adm-field">
            <span><i class="fa-brands fa-linkedin"></i> LinkedIn</span>
            <input type="url" placeholder="https://linkedin.com/in/..." />
          </label>
          <label class="adm-field">
            <span><i class="fa-solid fa-blog"></i> Blog</span>
            <input type="url" placeholder="https://..." />
          </label>
        </section>

        {/* Theme */}
        <section class="adm-card adm-card-wide">
          <header class="adm-card-head">
            <div>
              <h3>Theme & Wallpaper</h3>
              <p>데스크톱 배경과 메인 컬러</p>
            </div>
          </header>

          <div class="adm-theme-row">
            <span class="adm-theme-label">Accent Color</span>
            <div class="adm-color-list">
              {['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#ef4444'].map((c, i) => (
                <button
                  type="button"
                  class={`adm-color-swatch ${i === 0 ? 'on' : ''}`}
                  style={`--c:${c}`}
                  aria-label={c}
                ></button>
              ))}
            </div>
          </div>

          <div class="adm-theme-row">
            <span class="adm-theme-label">Wallpaper</span>
            <div class="adm-wall-list">
              {[
                'linear-gradient(135deg,#0f172a,#312e81,#581c87)',
                'linear-gradient(135deg,#0c4a6e,#1e3a8a,#312e81)',
                'linear-gradient(135deg,#831843,#4c1d95,#1e1b4b)',
                'linear-gradient(135deg,#064e3b,#1e3a8a,#312e81)',
              ].map((g, i) => (
                <button type="button" class={`adm-wall ${i === 0 ? 'on' : ''}`} style={`background:${g}`}></button>
              ))}
            </div>
          </div>

          <div class="adm-theme-row">
            <span class="adm-theme-label">Effects</span>
            <div class="adm-toggle-row">
              <label class="adm-side-row">
                <span>Glassmorphism</span>
                <label class="adm-toggle">
                  <input type="checkbox" checked />
                  <span></span>
                </label>
              </label>
              <label class="adm-side-row">
                <span>Animated wallpaper</span>
                <label class="adm-toggle">
                  <input type="checkbox" checked />
                  <span></span>
                </label>
              </label>
              <label class="adm-side-row">
                <span>Reduce motion</span>
                <label class="adm-toggle">
                  <input type="checkbox" />
                  <span></span>
                </label>
              </label>
            </div>
          </div>
        </section>

        {/* Danger zone */}
        <section class="adm-card adm-card-danger adm-card-wide">
          <header class="adm-card-head">
            <div>
              <h3>위험 구역</h3>
              <p>되돌릴 수 없는 작업</p>
            </div>
          </header>
          <div class="adm-danger-row">
            <div>
              <strong>모든 프로젝트를 비공개로 전환</strong>
              <p>임시 점검 시에 사용하세요.</p>
            </div>
            <button class="btn-ghost btn-danger">Hide All</button>
          </div>
          <div class="adm-danger-row">
            <div>
              <strong>샘플 데이터 초기화</strong>
              <p>모든 mock 데이터를 비웁니다.</p>
            </div>
            <button class="btn-ghost btn-danger">Reset</button>
          </div>
        </section>
      </div>
    </AdminShell>
  )
}
