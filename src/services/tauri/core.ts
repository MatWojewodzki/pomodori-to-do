import { invoke } from '@tauri-apps/api/core'

export async function tauriInvoke<T>(
    command: string,
    args?: Record<string, unknown>
): Promise<T> {
    try {
        return await invoke<T>(command, args)
    } catch (err) {
        console.error(`Tauri command failed: ${command}`, err)
        throw err
    }
}
