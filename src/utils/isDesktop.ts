import { isTauri } from '@tauri-apps/api/core'
import { platform } from '@tauri-apps/plugin-os'

const IS_TAURI = isTauri()

const TAURI_PLATFORM = IS_TAURI ? platform() : null

const IS_MOBILE = IS_TAURI
  ? TAURI_PLATFORM === 'ios' || TAURI_PLATFORM === 'android'
  : navigator.maxTouchPoints > 0 // Fallback for web

export default function isDesktop() {
  return !IS_MOBILE
}
