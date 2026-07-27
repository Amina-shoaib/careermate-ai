'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Trash2,
  Eye,
  ArrowLeft,
  FileClock,
  Calendar,
  Briefcase,
  Sparkles,
} from 'lucide-react'
import {
  getHistory,
  deleteAnalysis,
  clearHistory,
} from '@/lib/storage'
import type { AnalysisResult } from '@/lib/analyze'
import { AnalysisResultView } from '@/components/analysis-result'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function scoreTone(score: number) {
  if (score >= 85) return 'text-chart-2 bg-chart-2/15'
  if (score >= 70) return 'text-primary bg-primary/15'
  if (score >= 50) return 'text-chart-4 bg-chart-4/20'
  return 'text-destructive bg-destructive/15'
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function HistoryPage() {
  const [history, setHistory] = useState<AnalysisResult[]>([])
  const [selected, setSelected] = useState<AnalysisResult | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setHistory(getHistory())
    setLoaded(true)
  }, [])

  function handleDelete(id: string) {
    const next = deleteAnalysis(id)
    setHistory(next)
    if (selected?.id === id) setSelected(null)
  }

  function handleClearAll() {
    clearHistory()
    setHistory([])
    setSelected(null)
  }

  if (selected) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <Button
          variant="ghost"
          className="mb-6 rounded-full"
          onClick={() => setSelected(null)}
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to history
        </Button>
        <AnalysisResultView result={selected} />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Analysis History
          </h1>
          <p className="mt-2 text-muted-foreground">
            Every resume review you run is saved here in your browser.
          </p>
        </div>
        {history.length > 0 && (
          <Button
            variant="outline"
            className="rounded-full"
            onClick={handleClearAll}
          >
            <Trash2 className="mr-1 h-4 w-4" />
            Clear all
          </Button>
        )}
      </div>

      {loaded && history.length === 0 && (
        <div className="mt-12 rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-primary">
            <FileClock className="h-7 w-7" />
          </div>
          <h2 className="mt-5 text-lg font-semibold text-foreground">
            No analyses yet
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
            Run your first resume analysis and it will show up here so you can
            track your progress over time.
          </p>
          <Button asChild className="mt-6 rounded-full">
            <Link href="/analyze">
              <Sparkles className="mr-1 h-4 w-4" />
              Analyze a resume
            </Link>
          </Button>
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-8 grid gap-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    'flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl font-bold',
                    scoreTone(item.score),
                  )}
                >
                  <span className="text-2xl leading-none">{item.score}</span>
                  <span className="text-[10px] font-medium opacity-80">
                    /100
                  </span>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 font-semibold text-foreground">
                    <Briefcase className="h-4 w-4 text-primary" />
                    {item.jobTitle}
                  </h3>
                  <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(item.date)}
                  </p>
                  <span className="mt-2 inline-block rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                    {item.scoreLabel}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full"
                  onClick={() => setSelected(item)}
                >
                  <Eye className="mr-1 h-4 w-4" />
                  View Details
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => handleDelete(item.id)}
                  aria-label={`Delete analysis for ${item.jobTitle}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
