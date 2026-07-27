'use client'

import {
  ThumbsUp,
  AlertTriangle,
  Target,
  Lightbulb,
  MessageSquareText,
  FileText,
} from 'lucide-react'
import type { AnalysisResult } from '@/lib/analyze'
import { cn } from '@/lib/utils'

function ScoreRing({ score, label }: { score: number; label: string }) {
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const tone =
    score >= 85
      ? 'text-chart-2'
      : score >= 70
        ? 'text-primary'
        : score >= 50
          ? 'text-chart-4'
          : 'text-destructive'

  return (
    <div className="relative flex h-40 w-40 items-center justify-center">
      <svg className="h-40 w-40 -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          strokeWidth="10"
          className="text-secondary"
          stroke="currentColor"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          className={cn('transition-all duration-1000 ease-out', tone)}
          stroke="currentColor"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={cn('text-4xl font-bold', tone)}>{score}</span>
        <span className="text-xs font-medium text-muted-foreground">
          out of 100
        </span>
      </div>
    </div>
  )
}

function ListCard({
  icon: Icon,
  title,
  items,
  accent,
  badges = false,
}: {
  icon: React.ElementType
  title: string
  items: string[]
  accent: string
  badges?: boolean
}) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 rounded-2xl border border-border bg-card p-6 shadow-sm duration-500">
      <div className="flex items-center gap-3">
        <span
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xl',
            accent,
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      {badges ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nice — no gaps found for this role.
            </p>
          ) : (
            items.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
              >
                {item}
              </span>
            ))
          )}
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed">
              <span
                className={cn(
                  'mt-1.5 h-2 w-2 shrink-0 rounded-full',
                  accent.replace('bg-', 'bg-').split(' ')[0],
                )}
              />
              <span className="text-foreground/90">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function AnalysisResultView({ result }: { result: AnalysisResult }) {
  return (
    <div className="space-y-6">
      {/* Score summary */}
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-6 text-center shadow-sm sm:flex-row sm:text-left">
        <ScoreRing score={result.score} label={result.scoreLabel} />
        <div className="flex-1">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
            <Target className="h-4 w-4" />
            {result.jobTitle}
          </span>
          <h2 className="mt-3 text-2xl font-bold text-foreground">
            {result.scoreLabel} resume
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Your resume scored{' '}
            <span className="font-semibold text-foreground">
              {result.score}/100
            </span>{' '}
            for the {result.jobTitle} role. Review the coaching below to push it
            higher.
          </p>
          <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <FileText className="h-4 w-4" />
            {result.wordCount} words analyzed
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ListCard
          icon={ThumbsUp}
          title="Strengths"
          items={result.strengths}
          accent="bg-chart-2/15 text-chart-2"
        />
        <ListCard
          icon={AlertTriangle}
          title="Weaknesses"
          items={result.weaknesses}
          accent="bg-destructive/15 text-destructive"
        />
      </div>

      <ListCard
        icon={Target}
        title="Missing Skills"
        items={result.missingSkills}
        accent="bg-primary/15 text-primary"
        badges
      />

      <div className="grid gap-6 md:grid-cols-2">
        <ListCard
          icon={Lightbulb}
          title="Suggested Improvements"
          items={result.improvements}
          accent="bg-chart-4/20 text-chart-4"
        />
        <ListCard
          icon={MessageSquareText}
          title="Interview Tips"
          items={result.interviewTips}
          accent="bg-primary/15 text-primary"
        />
      </div>
    </div>
  )
}
