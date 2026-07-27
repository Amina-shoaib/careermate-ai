'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sparkles, Loader2, RotateCcw, History } from 'lucide-react'
import { analyzeResume, type AnalysisResult } from '@/lib/analyze'
import { saveAnalysis } from '@/lib/storage'
import { AnalysisResultView } from '@/components/analysis-result'
import { Button } from '@/components/ui/button'

const SAMPLE = `John Doe
john.doe@email.com | linkedin.com/in/johndoe | github.com/johndoe

Summary
Recent Computer Science graduate seeking a Frontend Developer role.

Education
B.Sc. Computer Science, State University, 2024

Experience
Web Development Intern, TechStart (2023)
- Built responsive React components used by 5,000+ users
- Improved page load time by 35% through code splitting

Projects
- Developed a task manager app with React and TypeScript

Skills
JavaScript, React, HTML, CSS, Git`

export default function AnalyzePage() {
  const [resume, setResume] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleAnalyze() {
    if (resume.trim().length < 40) {
      setError('Please paste a longer resume (at least a few sentences).')
      return
    }
    if (!jobTitle.trim()) {
      setError('Please enter the job title you are targeting.')
      return
    }
    setError('')
    setLoading(true)
    setResult(null)

    // Simulate AI "thinking" for a smoother experience.
    setTimeout(() => {
      const analysis = analyzeResume(resume, jobTitle)
      saveAnalysis(analysis)
      setResult(analysis)
      setLoading(false)
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }, 1100)
  }

  function handleReset() {
    setResult(null)
    setResume('')
    setJobTitle('')
    setError('')
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-primary shadow-sm">
          <Sparkles className="h-4 w-4" />
          AI Resume Review
        </span>
        <h1 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Analyze your resume
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-muted-foreground">
          Paste your resume and target job title. Our AI coach will score it and
          give personalized feedback.
        </p>
      </div>

      {result ? (
        <div className="mt-10">
          <div className="mb-6 flex flex-wrap justify-center gap-3">
            <Button onClick={handleReset} className="rounded-full">
              <RotateCcw className="mr-1 h-4 w-4" />
              Analyze another resume
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/history">
                <History className="mr-1 h-4 w-4" />
                View history
              </Link>
            </Button>
          </div>
          <AnalysisResultView result={result} />
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="jobTitle"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Desired job title
              </label>
              <input
                id="jobTitle"
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Frontend Developer, Data Analyst"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="resume"
                  className="block text-sm font-medium text-foreground"
                >
                  Resume text
                </label>
                <button
                  type="button"
                  onClick={() => setResume(SAMPLE)}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Try a sample
                </button>
              </div>
              <textarea
                id="resume"
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                rows={14}
                placeholder="Paste your full resume text here..."
                className="w-full resize-y rounded-xl border border-input bg-background px-4 py-3 text-sm leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                {resume.trim() ? resume.trim().split(/\s+/).length : 0} words
              </p>
            </div>

            {error && (
              <p className="rounded-lg bg-destructive/10 px-4 py-2.5 text-sm font-medium text-destructive">
                {error}
              </p>
            )}

            <Button
              onClick={handleAnalyze}
              disabled={loading}
              size="lg"
              className="w-full rounded-full text-base"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing your resume...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Analyze Resume
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
