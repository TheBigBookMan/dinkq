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

const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' })
const DAY = 86_400_000

// "today", "yesterday", "5 days ago", "3 weeks ago", "4 months ago"
export function timeAgo(iso: string): string | null {
  const t = Date.parse(iso)
  if (Number.isNaN(t)) return null
  const days = Math.max(0, Math.floor((Date.now() - t) / DAY))
  if (days < 14) return rtf.format(-days, 'day')
  if (days < 60) return rtf.format(-Math.floor(days / 7), 'week')
  return rtf.format(-Math.floor(days / 30), 'month')
}