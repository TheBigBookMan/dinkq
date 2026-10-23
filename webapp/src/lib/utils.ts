export { cn } from "cn"

// 83000 -> "01:23", 4_000_000 -> "1:06:40"
export function formatDuration(ms: number) {
  if (!Number.isFinite(ms)) return '--:--'
  const total = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(total / 3600)
  const mm = String(Math.floor((total % 3600) / 60)).padStart(2, '0')
  const ss = String(total % 60).padStart(2, '0')
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`
}