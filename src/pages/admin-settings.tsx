import { AdminShell } from './admin-shell'

export const AdminSettingsPage = () => {
  return (
    <AdminShell
      active="Settings"
      title="Settings"
      subtitle="사이트의 기본 정보와 외관을 설정합니다."
      actions={
        <button class="btn-primary">
          <i class="fa-solid fa-floppy-disk"></i> Save Changes
        </button>
      }
    >
      <div class="adm-form-grid">
        <div class="adm-form-main">
          <section class="adm-card">
            <header class="adm-card-head">
              <div>
                <h3>Site Info</h3>
                <p>OS 화면과 메타데이터에 표시되는 기본 정보</p>
              </div>
            </header>
            <div class="adm-form-row two">
              <label class="adm-field">
                <span>Site Title</span>
                <input type="text" defaultValue="CHO OS — Portfolio" />
              </label>
              <label class="adm-field">
                <span>OS Version</span>
                <input type="text" defaultValue="1.0 · Portfolio Edition" />
              </label>
            </div>
            <label class="adm-field">
              <span>Tagline</span>
              <input
                type="text"
                defaultValue="데이터 분석, 백엔드, 클라우드 배포를 연결해 실제 동작하는 AI 서비스를 구현하는 개발자"
              />
            </label>
            <label class="adm-field">
              <span>About</span>
              <textarea rows={4}>
                AI 구현, 데이터 기반 문제 해결, 클라우드 기반 서비스화를 핵심 역량으로 삼고 있습니다.
              </textarea>
            </label>
          </section>

          <section class="adm-card">
            <header class="adm-card-head">
              <div>
                <h3>Contact / Links</h3>
                <p>Contact 창과 푸터에 노출됩니다.</p>
              </div>
            </header>
            <div class="adm-form-row two">
              <label class="adm-field">
                <span>Email</span>
                <input type="email" placeholder="hello@cho.os" />
              </label>
              <label class="adm-field">
                <span>Resume URL</span>
                <input type="url" placeholder="https://..." />
              </label>
            </div>
            <div class="adm-form-row two">
              <label class="adm-field">
                <span>GitHub</span>
                <input type="url" placeholder="https://github.com/..." />
              </label>
              <label class="adm-field">
                <span>LinkedIn</span>
                <input type="url" placeholder="https://linkedin.com/in/..." />
              </label>
            </div>
          </section>
        </div>

        <aside class="adm-form-side">
          <section class="adm-card">
            <header class="adm-card-head">
              <div>
                <h3>Appearance</h3>
              </div>
            </header>
            <div class="adm-color-row">
              <span>Accent</span>
              <div class="adm-color-list">
                <button class="adm-color active" style="background:#6366f1"></button>
                <button class="adm-color" style="background:#ec4899"></button>
                <button class="adm-color" style="background:#10b981"></button>
                <button class="adm-color" style="background:#f59e0b"></button>
                <button class="adm-color" style="background:#0ea5e9"></button>
              </div>
            </div>
            <div class="adm-side-row">
              <span>Dark Mode</span>
              <label class="adm-toggle">
                <input type="checkbox" checked />
                <span></span>
              </label>
            </div>
            <div class="adm-side-row">
              <span>Boot animation</span>
              <label class="adm-toggle">
                <input type="checkbox" checked />
                <span></span>
              </label>
            </div>
          </section>

          <section class="adm-card">
            <header class="adm-card-head">
              <div>
                <h3>Wallpaper</h3>
              </div>
            </header>
            <div class="adm-upload">
              <i class="fa-regular fa-image"></i>
              <span>이미지를 업로드</span>
              <small>1920x1080 이상 권장</small>
            </div>
          </section>
        </aside>
      </div>
    </AdminShell>
  )
}
