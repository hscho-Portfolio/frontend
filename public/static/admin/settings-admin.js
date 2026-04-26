import { $, flashClass, toast } from './dom.js'
import { requestJson } from './api.js'
import { uploadFile } from './uploaders.js'

export const initSettingsAdmin = () => {
  const form = $('#settings-form')
  const saveButton = $('#settings-save-button')
  if (!form || !saveButton) return

  const setLoading = (on) => {
    saveButton.disabled = on
    saveButton.innerHTML = on
      ? '<i class="fa-solid fa-circle-notch fa-spin"></i> Saving'
      : '<i class="fa-solid fa-floppy-disk"></i> Save Changes'
  }

  const fill = (data) => {
    $('#settings-site-title').value = data.siteTitle || ''
    $('#settings-owner-name').value = data.ownerName || ''
    $('#settings-headline').value = data.headline || ''
    $('#settings-bio').value = data.bio || ''
    $('#settings-email').value = data.email || ''
    $('#settings-github-url').value = data.githubUrl || ''
    $('#settings-linkedin-url').value = data.linkedinUrl || ''
    $('#settings-resume-url').value = data.resumeUrl || ''
    $('#settings-default-wallpaper-url').value = data.defaultWallpaperUrl || ''
    $('#settings-default-wallpaper-url-media').value = data.defaultWallpaperUrl || ''
    $('#settings-profile-image-url').value = data.profileImageUrl || ''
    $('#settings-hero-image-url').value = data.heroImageUrl || ''
    $('#settings-about-image-url').value = data.aboutImageUrl || ''
    $('#settings-favicon-url').value = data.faviconUrl || ''
    updateMediaPreviews()
  }

  const payload = () => ({
    siteTitle: $('#settings-site-title').value.trim(),
    ownerName: $('#settings-owner-name').value.trim(),
    headline: $('#settings-headline').value.trim(),
    bio: $('#settings-bio').value.trim(),
    email: $('#settings-email').value.trim(),
    githubUrl: $('#settings-github-url').value.trim(),
    linkedinUrl: $('#settings-linkedin-url').value.trim(),
    resumeUrl: $('#settings-resume-url').value.trim(),
    defaultWallpaperUrl: $('#settings-default-wallpaper-url').value.trim(),
    profileImageUrl: $('#settings-profile-image-url').value.trim(),
    heroImageUrl: $('#settings-hero-image-url').value.trim(),
    aboutImageUrl: $('#settings-about-image-url').value.trim(),
    faviconUrl: $('#settings-favicon-url').value.trim(),
  })

  const updatePreview = (input) => {
    const preview = document.querySelector(`[data-settings-preview="${input.id}"]`)
    if (!preview) return
    const url = input.value.trim()
    preview.style.backgroundImage = url ? `url(${url})` : ''
    preview.classList.toggle('has-image', !!url)
  }

  const updateMediaPreviews = () => {
    ;[
      'settings-profile-image-url',
      'settings-default-wallpaper-url-media',
      'settings-hero-image-url',
      'settings-about-image-url',
      'settings-favicon-url',
    ].forEach((id) => {
      const input = document.getElementById(id)
      if (input) updatePreview(input)
    })
  }

  const syncWallpaperFields = (source) => {
    const main = $('#settings-default-wallpaper-url')
    const media = $('#settings-default-wallpaper-url-media')
    if (!main || !media) return
    if (source === media) main.value = media.value
    else media.value = main.value
    updatePreview(media)
  }

  const bindMediaUploads = () => {
    document.querySelectorAll('[data-settings-upload]').forEach((row) => {
      const folder = row.getAttribute('data-settings-upload') || 'images'
      const fileInput = row.querySelector('[data-settings-file]')
      const button = row.querySelector('[data-settings-upload-button]')
      const urlInput = row.querySelector('input[type="url"]')
      if (!fileInput || !button || !urlInput) return

      button.addEventListener('click', () => fileInput.click())
      urlInput.addEventListener('input', () => {
        if (urlInput.id === 'settings-default-wallpaper-url-media') syncWallpaperFields(urlInput)
        updatePreview(urlInput)
      })

      fileInput.addEventListener('change', async () => {
        const file = fileInput.files?.[0]
        if (!file) return
        button.disabled = true
        try {
          const url = await uploadFile(file, folder)
          if (!url) throw new Error('Upload failed.')
          urlInput.value = url
          if (urlInput.id === 'settings-default-wallpaper-url-media') syncWallpaperFields(urlInput)
          updatePreview(urlInput)
          toast('Asset uploaded.', 'success')
        } catch (error) {
          toast(error.message || 'Failed to upload asset.', 'error')
        } finally {
          button.disabled = false
          fileInput.value = ''
        }
      })
    })

    $('#settings-default-wallpaper-url')?.addEventListener('input', (event) => syncWallpaperFields(event.target))
  }

  const load = async () => {
    try {
      fill(await requestJson('/api/v1/settings'))
    } catch (error) {
      toast(error.message || 'Failed to load settings.', 'error')
    }
  }

  saveButton.addEventListener('click', async () => {
    setLoading(true)
    try {
      fill(await requestJson('/api/v1/settings', {
        method: 'PUT',
        body: JSON.stringify(payload()),
      }))
      flashClass(form, 'flash', 800)
      toast('Settings saved.', 'success')
    } catch (error) {
      toast(error.message || 'Failed to save settings.', 'error')
    } finally {
      setLoading(false)
    }
  })

  bindMediaUploads()
  load()
}
