import { tauriInvoke } from './core.ts'
import { SettingsDto } from '../../types/generated/SettingsDto.ts'

const settingsService = {
  async getSettings(): Promise<SettingsDto> {
    return await tauriInvoke('get_settings')
  },

  async setSettings(args: { settings: SettingsDto }): Promise<void> {
    return await tauriInvoke('set_settings', args)
  },
}

export default settingsService
