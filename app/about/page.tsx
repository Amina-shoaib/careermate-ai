import Link from 'next/link'
import {
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Rocket,
  Brain,
  HeartHandshake,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const values = [
  {
    icon: Brain,
    title: 'AI-powered coaching',
    desc: 'Our engine evaluates structure, keywords, action verbs and measurable impact — just like an experienced recruiter would.',
  },
  {
    icon: GraduationCap,
    title: 'Made for graduates',
    desc: 'No years of experience? No problem. Feedback is tuned for students and fresh graduates writing their first real resume.',
  },
  {
    icon: ShieldCheck,
    title: 'Private by design',
    desc: 'Everything runs locally in your browser. Your resume is never uploaded to a server.',
  },
  {
    icon: Rocket,
    title: 'Instant results',
    desc: 'Get a score and detailed, actionable feedback in seconds — then iterate as many times as you like.',
  },
]

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/50 to-background" />
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-primary shadow-sm">
            <Sparkles className="h-4 w-4" />
            About CareerMate AI
          </span>
          <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Helping students launch their careers
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            CareerMate AI was built for one reason: applying for your first job
            is hard, and most students never get honest feedback on their
            resume before they hit submit.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-8 sm:px-6">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary">
            <HeartHandshake className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-2xl font-bold text-foreground">
            How CareerMate AI helps you
          </h2>
          <div className="mt-4 space-y-4 text-pretty leading-relaxed text-muted-foreground">
            <p>
              Fresh graduates often struggle to know what recruiters actually
              look for. Job descriptions are full of jargon, resumes get
              rejected by automated screening systems, and it&apos;s hard to
              tell whether your resume is strong or weak until it&apos;s too
              late.
            </p>
            <p>
              CareerMate AI acts as your personal <strong>AI resume coach</strong>.
              You paste your resume and the job title you&apos;re targeting, and
              the app instantly evaluates it — giving you an overall score out
              of 100 along with your strengths, weaknesses, missing skills,
              concrete improvement suggestions and tailored interview tips.
            </p>
            <p>
              Because you can run the analysis as many times as you want and
              track your history over time, you can keep refining your resume
              until it&apos;s genuinely ready — helping you apply with
              confidence and land more interviews.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {v.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <div className="rounded-3xl bg-primary px-6 py-12 text-center sm:px-12">
          <h2 className="text-balance text-2xl font-bold text-primary-foreground sm:text-3xl">
            Your first job starts with a great resume
          </h2>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="mt-6 rounded-full px-8 text-base"
          >
            <Link href="/analyze">
              Analyze your resume
              <ArrowRight className="ml-1 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
