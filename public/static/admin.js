// ============================================================
// CHO OS Admin Entry Script
// ============================================================
import { requireAuth, reflectSessionUser, bindLogout, bindGlobalPickers } from './admin/core.js'
import { initDashboardAdmin } from './admin/dashboard.js'
import { initCategoriesAdmin } from './admin/categories-admin.js'
import { initStacksAdmin } from './admin/stacks-admin.js'
import { initProjectsAdmin } from './admin/projects.js'
import { initSettingsAdmin } from './admin/settings-admin.js'
import { initStackPicker } from './admin/stack-picker.js'
import { initStackModal } from './admin/stack-modal.js'
import { initUploaders } from './admin/uploaders.js'

if (!requireAuth()) {
  // requireAuth handles the redirect to the login page.
} else {
  reflectSessionUser()
  bindLogout()
  bindGlobalPickers()
  initDashboardAdmin()
  initCategoriesAdmin()
  initStacksAdmin()
  initProjectsAdmin()
  initSettingsAdmin()
  initStackPicker()
  initStackModal()
  initUploaders()
}
