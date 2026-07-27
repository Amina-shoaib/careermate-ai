import type { AnalysisResult } from './analyze'

const STORAGE_KEY = 'careermate:history'

/** Read all saved analyses from localStorage (newest first). */
export function getHistory(): AnalysisResult[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as AnalysisResult[]) : []
  } catch {
    return []
  }
}

/** Save a new analysis to the top of the history list. */
export function saveAnalysis(result: AnalysisResult): void {
  if (typeof window === 'undefined') return
  const history = getHistory()
  const next = [result, ...history]
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

/** Delete a single analysis by id. */
export function deleteAnalysis(id: string): AnalysisResult[] {
  if (typeof window === 'undefined') return []
  const next = getHistory().filter((item) => item.id !== id)
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}

/** Remove all saved analyses. */
export function clearHistory(): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(STORAGE_KEY)
}
