import { AdminShell } from './admin-shell'

export const AdminSettingsPage = () => {
  return (
    <AdminShell
      active="Settings"
      title="Settings"
      subtitle="Edit site information stored in the backend database."
      actions={
        <button class="btn-primary" id="settings-save-button" type="button">
          <i class="fa-solid fa-floppy-disk"></i> Save Changes
        </button>
      }
    >
      <form class="adm-settings-grid" id="settings-form">
        <section class="adm-card">
          <header class="adm-card-head">
            <div>
              <h3>Site Identity</h3>
              <p>Core portfolio information.</p>
            </div>
          </header>
          <label class="adm-field">
            <span>Site Title</span>
            <input id="settings-site-title" type="text" />
          </label>
          <label class="adm-field">
            <span>Owner Name</span>
            <input id="settings-owner-name" type="text" />
          </label>
          <label class="adm-field">
            <span>Headline</span>
            <textarea id="settings-headline" rows={3}></textarea>
          </label>
          <label class="adm-field">
            <span>Bio</span>
            <textarea id="settings-bio" rows={5}></textarea>
          </label>
          <label class="adm-field">
            <span>Email</span>
            <input id="settings-email" type="email" />
          </label>
        </section>

        <section class="adm-card">
          <header class="adm-card-head">
            <div>
              <h3>Links</h3>
              <p>Public profile and resume URLs.</p>
            </div>
          </header>
          <label class="adm-field">
            <span>GitHub</span>
            <input id="settings-github-url" type="url" />
          </label>
          <label class="adm-field">
            <span>LinkedIn</span>
            <input id="settings-linkedin-url" type="url" />
          </label>
          <label class="adm-field">
            <span>Resume URL</span>
            <input id="settings-resume-url" type="url" />
          </label>
          <label class="adm-field">
            <span>Default Wallpaper URL</span>
            <input id="settings-default-wallpaper-url" type="url" />
          </label>
        </section>

        <section class="adm-card adm-settings-media-card">
          <header class="adm-card-head">
            <div>
              <h3>Media Library</h3>
              <p>Upload local assets now, switch to S3 later with the same URLs in the database.</p>
            </div>
          </header>
          <div class="adm-media-field" data-settings-upload="profile">
            <div class="adm-media-preview" data-settings-preview="settings-profile-image-url">
              <i class="fa-regular fa-user"></i>
            </div>
            <label class="adm-field">
              <span>Profile Image URL</span>
              <div class="adm-url-upload-row">
                <input id="settings-profile-image-url" type="url" />
                <button class="adm-icon-btn" type="button" data-settings-upload-button title="Upload profile image">
                  <i class="fa-solid fa-cloud-arrow-up"></i>
                </button>
              </div>
              <input type="file" accept="image/*" hidden data-settings-file />
            </label>
          </div>
          <div class="adm-media-field" data-settings-upload="wallpapers">
            <div class="adm-media-preview wide" data-settings-preview="settings-default-wallpaper-url">
              <i class="fa-regular fa-image"></i>
            </div>
            <label class="adm-field">
              <span>Default Wallpaper URL</span>
              <div class="adm-url-upload-row">
                <input id="settings-default-wallpaper-url-media" type="url" data-mirror-source="settings-default-wallpaper-url" />
                <button class="adm-icon-btn" type="button" data-settings-upload-button title="Upload wallpaper">
                  <i class="fa-solid fa-cloud-arrow-up"></i>
                </button>
              </div>
              <input type="file" accept="image/*" hidden data-settings-file />
            </label>
          </div>
          <div class="adm-media-field" data-settings-upload="wallpapers">
            <div class="adm-media-preview wide" data-settings-preview="settings-hero-image-url">
              <i class="fa-solid fa-panorama"></i>
            </div>
            <label class="adm-field">
              <span>Hero Image URL</span>
              <div class="adm-url-upload-row">
                <input id="settings-hero-image-url" type="url" />
                <button class="adm-icon-btn" type="button" data-settings-upload-button title="Upload hero image">
                  <i class="fa-solid fa-cloud-arrow-up"></i>
                </button>
              </div>
              <input type="file" accept="image/*" hidden data-settings-file />
            </label>
          </div>
          <div class="adm-media-field" data-settings-upload="profile">
            <div class="adm-media-preview" data-settings-preview="settings-about-image-url">
              <i class="fa-regular fa-id-card"></i>
            </div>
            <label class="adm-field">
              <span>About Image URL</span>
              <div class="adm-url-upload-row">
                <input id="settings-about-image-url" type="url" />
                <button class="adm-icon-btn" type="button" data-settings-upload-button title="Upload about image">
                  <i class="fa-solid fa-cloud-arrow-up"></i>
                </button>
              </div>
              <input type="file" accept="image/*" hidden data-settings-file />
            </label>
          </div>
          <div class="adm-media-field" data-settings-upload="images">
            <div class="adm-media-preview" data-settings-preview="settings-favicon-url">
              <i class="fa-regular fa-bookmark"></i>
            </div>
            <label class="adm-field">
              <span>Favicon URL</span>
              <div class="adm-url-upload-row">
                <input id="settings-favicon-url" type="url" />
                <button class="adm-icon-btn" type="button" data-settings-upload-button title="Upload favicon">
                  <i class="fa-solid fa-cloud-arrow-up"></i>
                </button>
              </div>
              <input type="file" accept="image/*" hidden data-settings-file />
            </label>
          </div>
        </section>
      </form>
    </AdminShell>
  )
}
