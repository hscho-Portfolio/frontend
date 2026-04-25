// ============================================================
// CHO OS — Admin Entry Script
// 어드민 모든 페이지의 공통 부트스트랩.
// ESM 모듈로 분할된 각 기능을 import해서 init만 수행.
// ============================================================
import { ensureMockSession, reflectSessionUser, bindLogout, bindGlobalPickers } from './admin/core.js'
import { initStackPicker } from './admin/stack-picker.js'
import { initStackModal } from './admin/stack-modal.js'
import { initUploaders } from './admin/uploaders.js'

// 1) 백엔드 연동 전 임시 세션 확보 (직접 URL 진입도 허용)
ensureMockSession()
reflectSessionUser()

// 2) 공통 인터랙션
bindLogout()
bindGlobalPickers()

// 3) 페이지별 모듈 — 해당 DOM이 없으면 각 init이 자동 noop
initStackPicker()
initStackModal()
initUploaders()
