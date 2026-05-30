import settingsService from '../../services/tauri/settings.ts'
import { useQuery } from '@tanstack/react-query'
import SettingsForm from './SettingsForm'

function Settings() {
  const result = useQuery({
    queryKey: ['settings'],
    queryFn: settingsService.getSettings,
  })
  if (!result.isSuccess) return <div>Loading...</div>
  return (
    <div>
      <SettingsForm settings={result.data} />
    </div>
  )
}

export default Settings
