import Link from 'next/link'
import {
  Sparkles,
  Gauge,
  ThumbsUp,
  AlertTriangle,
  Target,
  Lightbulb,
  MessageSquareText,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const features = [
  {
    icon: Gauge,
    title: 'Overall Score',
    desc: 'Get an instant resume score out of 100 based on structure, keywords and impact.',
  },
  {
    icon: ThumbsUp,
    title: 'Strengths',
    desc: 'See what your resume already does well so you can lean into it.',
  },
  {
    icon: AlertTriangle,
    title: 'Weaknesses',
    desc: 'Uncover the gaps and red flags recruiters spot in seconds.',
  },
  {
    icon: Target,
    title: 'Missing Skills',
    desc: 'Discover role-specific skills and keywords you should add.',
  },
  {
    icon: Lightbulb,
    title: 'Improvements',
    desc: 'Actionable suggestions to rewrite and strengthen your resume.',
  },
  {
    icon: MessageSquareText,
    title: 'Interview Tips',
    desc: 'Personalized advice to help you ace the interview for your target role.',
  },
]

const steps = [
  {
    step: '01',
    title: 'Paste your resume',
    desc: 'Drop your resume text and the job title you are targeting.',
  },
  {
    step: '02',
    title: 'Run the AI review',
    desc: 'Our AI coach evaluates your resume in seconds — no sign up needed.',
  },
  {
    step: '03',
    title: 'Improve and re-apply',
    desc: 'Follow the feedback, track progress in history, and apply with confidence.',
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/50 to-background" />
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-primary shadow-sm">
              <Sparkles className="h-4 w-4" />
              AI Resume Coach for fresh graduates
            </span>
            <h1 className="mt-6 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl">
              Improve your resume{' '}
              <span className="text-primary">before you apply</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              CareerMate AI reviews your resume like a real career coach. Get an
              instant score, strengths, weaknesses, missing skills and interview
              tips tailored to your dream job.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-8 text-base">
                <Link href="/analyze">
                  Analyze My Resume
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8 text-base"
              >
                <Link href="/about">How it works</Link>
              </Button>
            </div>
            <p className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Free and private — everything runs in your browser.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to stand out
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            A complete resume review, powered by an AI coach that knows what
            recruiters look for.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How CareerMate AI works
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Three simple steps from draft to standout resume.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.step}
                className="relative rounded-2xl border border-border bg-background p-8"
              >
                <span className="text-4xl font-bold text-primary/25">
                  {s.step}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center sm:px-12">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to land your first job?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-primary-foreground/80">
            Get honest, instant feedback on your resume and walk into your next
            interview with confidence.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="mt-8 rounded-full px-8 text-base"
          >
            <Link href="/analyze">
              Start free analysis
              <ArrowRight className="ml-1 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
