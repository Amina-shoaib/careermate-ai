'use client'

import { useState } from 'react'
import {
  Mail,
  MessageSquare,
  User,
  Send,
  CheckCircle2,
  MapPin,
  Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FormState {
  name: string
  email: string
  message: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [submitted, setSubmitted] = useState(false)

  function update(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => ({ ...e, [field]: undefined }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next: Partial<FormState> = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!form.email.trim()) next.email = 'Please enter your email.'
    else if (!EMAIL_RE.test(form.email))
      next.email = 'Please enter a valid email address.'
    if (form.message.trim().length < 10)
      next.message = 'Please write a message of at least 10 characters.'

    if (Object.keys(next).length > 0) {
      setErrors(next)
      return
    }
    setSubmitted(true)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-primary shadow-sm">
          <Mail className="h-4 w-4" />
          Get in touch
        </span>
        <h1 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Contact us
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-muted-foreground">
          Questions, feedback or ideas? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {/* Info */}
        <div className="space-y-4 lg:col-span-1">
          {[
            {
              icon: Mail,
              title: 'Email',
              value: 'hello@careermate.ai',
            },
            {
              icon: MapPin,
              title: 'Location',
              value: 'Remote — worldwide',
            },
            {
              icon: Clock,
              title: 'Response time',
              value: 'Within 1–2 business days',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                <item.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center py-10 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-chart-2/15 text-chart-2">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-foreground">
                  Message sent!
                </h2>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Thanks for reaching out, {form.name.split(' ')[0]}. We&apos;ll
                  get back to you soon.
                </p>
                <Button
                  className="mt-6 rounded-full"
                  variant="outline"
                  onClick={() => {
                    setForm({ name: '', email: '', message: '' })
                    setSubmitted(false)
                  }}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    <User className="h-4 w-4 text-primary" />
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-sm text-destructive">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    <Mail className="h-4 w-4 text-primary" />
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="you@email.com"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-sm text-destructive">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    <MessageSquare className="h-4 w-4 text-primary" />
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    placeholder="How can we help?"
                    className="w-full resize-y rounded-xl border border-input bg-background px-4 py-3 text-sm leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-sm text-destructive">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-full text-base"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Send message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
