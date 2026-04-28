import { AdminShell } from './admin-shell'

export const AdminAwardsPage = () => {
  return (
    <AdminShell
      active="Awards"
      title="Awards"
      subtitle="Manage awards and certificates displayed on the desktop Career window."
      actions={
        <button class="btn-primary" id="award-add-button" type="button">
          <i class="fa-solid fa-plus"></i> Add Award
        </button>
      }
    >
      <div class="adm-award-admin-grid" id="awards-grid">
        <div class="adm-card">Loading awards...</div>
      </div>

      {/* Add / Edit Award Modal */}
      <div class="adm-modal" id="awardModal" hidden aria-hidden="true">
        <div class="adm-modal-backdrop" data-close-award></div>
        <div class="adm-modal-card" role="dialog" aria-modal="true" aria-labelledby="awardModalTitle">
          <header class="adm-modal-head">
            <h3 id="awardModalTitle">
              <i class="fa-solid fa-trophy"></i> <span id="awardModalTitleText">Add Award</span>
            </h3>
            <button type="button" class="adm-icon-btn" data-close-award aria-label="Close">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </header>

          <div class="adm-modal-body">
            <input type="hidden" id="awardEditId" />

            <label class="adm-field">
              <span>수상명 <em class="adm-required">*</em></span>
              <input type="text" id="awardPrize" placeholder="우수상" />
            </label>

            <label class="adm-field">
              <span>대회명 <em class="adm-required">*</em></span>
              <input type="text" id="awardContest" placeholder="2025 AI Powered SW 창업경진대회" />
            </label>

            <div class="adm-form-row two">
              <label class="adm-field">
                <span>수상일 <em class="adm-required">*</em></span>
                <input type="text" id="awardDate" placeholder="2025.08" />
              </label>
              <label class="adm-field">
                <span>Sort Order</span>
                <input type="number" id="awardSortOrder" value="0" min="0" />
              </label>
            </div>

            <label class="adm-field">
              <span><i class="fa-solid fa-image"></i> 상장 이미지</span>
              <div class="adm-uploader" id="award-uploader">
                <div class="adm-uploader-icon"><i class="fa-solid fa-cloud-arrow-up"></i></div>
                <div class="adm-uploader-text">
                  <strong>클릭하여 상장 이미지 업로드</strong>
                  <small>JPG · PNG · WEBP 권장</small>
                </div>
                <button type="button" class="btn-secondary" id="award-upload-btn">
                  <i class="fa-solid fa-upload"></i> Upload
                </button>
                <input type="file" id="award-file-input" accept="image/*" style="display:none" />
              </div>
              <input type="text" id="awardCertificateUrl" placeholder="https://... (업로드 후 자동 입력)" />
            </label>

            {/* Certificate preview */}
            <div id="award-cert-preview" style="display:none">
              <img id="award-cert-preview-img" style="width:100%;border-radius:8px;border:1px solid var(--line)" src="" alt="certificate preview" />
            </div>
          </div>

          <footer class="adm-modal-foot">
            <button type="button" class="btn-ghost" data-close-award>Cancel</button>
            <button type="button" class="btn-primary" id="awardSubmit">
              <i class="fa-solid fa-floppy-disk"></i> <span id="awardSubmitText">Add Award</span>
            </button>
          </footer>
        </div>
      </div>
    </AdminShell>
  )
}
