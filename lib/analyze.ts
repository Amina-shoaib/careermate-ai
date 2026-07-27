/**
 * CareerMate AI — Resume analysis engine.
 *
 * This is a rule-based "AI" resume coach implemented in plain JavaScript/TS.
 * It inspects the resume text (length, keywords, action verbs, quantified
 * achievements, sections, contact info) plus the target job title, and produces
 * a personalized review: an overall score, strengths, weaknesses, missing
 * skills, improvement suggestions and interview tips.
 *
 * Results vary depending on resume length and the keywords found, so different
 * resumes get genuinely different feedback.
 */

export interface AnalysisResult {
  id: string
  jobTitle: string
  score: number
  scoreLabel: string
  wordCount: number
  strengths: string[]
  weaknesses: string[]
  missingSkills: string[]
  improvements: string[]
  interviewTips: string[]
  date: string
}

// Strong action verbs recruiters love to see.
const ACTION_VERBS = [
  'led',
  'built',
  'created',
  'designed',
  'developed',
  'launched',
  'managed',
  'improved',
  'increased',
  'reduced',
  'delivered',
  'implemented',
  'achieved',
  'coordinated',
  'organized',
  'analyzed',
  'optimized',
  'automated',
  'collaborated',
  'mentored',
]

// Soft skills that strengthen any resume.
const SOFT_SKILLS = [
  'communication',
  'teamwork',
  'leadership',
  'problem solving',
  'time management',
  'adaptability',
]

// Common resume sections we expect to find.
const SECTIONS = [
  'experience',
  'education',
  'skills',
  'project',
  'certification',
  'summary',
  'objective',
]

// Role-specific skill libraries. The engine picks the closest role from the
// entered job title and checks which of these skills are missing.
const ROLE_SKILLS: Record<string, string[]> = {
  'software engineer': [
    'JavaScript',
    'Python',
    'Git',
    'data structures',
    'algorithms',
    'REST APIs',
    'testing',
    'SQL',
  ],
  'frontend developer': [
    'React',
    'HTML',
    'CSS',
    'JavaScript',
    'TypeScript',
    'responsive design',
    'accessibility',
    'Git',
  ],
  'backend developer': [
    'Node.js',
    'databases',
    'REST APIs',
    'SQL',
    'authentication',
    'Docker',
    'caching',
    'testing',
  ],
  'data analyst': [
    'SQL',
    'Excel',
    'Python',
    'data visualization',
    'statistics',
    'Power BI',
    'Tableau',
    'dashboards',
  ],
  'data scientist': [
    'Python',
    'machine learning',
    'statistics',
    'pandas',
    'SQL',
    'data visualization',
    'model evaluation',
  ],
  'product manager': [
    'roadmapping',
    'user research',
    'analytics',
    'stakeholder management',
    'agile',
    'prioritization',
    'wireframing',
  ],
  'ui/ux designer': [
    'Figma',
    'wireframing',
    'prototyping',
    'user research',
    'design systems',
    'accessibility',
    'usability testing',
  ],
  'digital marketer': [
    'SEO',
    'Google Analytics',
    'content marketing',
    'social media',
    'email marketing',
    'campaign management',
    'copywriting',
  ],
  'business analyst': [
    'requirements gathering',
    'SQL',
    'Excel',
    'process mapping',
    'stakeholder management',
    'documentation',
    'data analysis',
  ],
  accountant: [
    'accounting',
    'Excel',
    'financial reporting',
    'reconciliation',
    'taxation',
    'auditing',
    'QuickBooks',
  ],
}

function pickRole(jobTitle: string): { role: string; skills: string[] } {
  const t = jobTitle.toLowerCase().trim()
  for (const role of Object.keys(ROLE_SKILLS)) {
    if (t.includes(role)) return { role, skills: ROLE_SKILLS[role] }
  }
  // Partial keyword matching for flexibility.
  if (/front|react|web/.test(t))
    return { role: 'frontend developer', skills: ROLE_SKILLS['frontend developer'] }
  if (/back|api|server/.test(t))
    return { role: 'backend developer', skills: ROLE_SKILLS['backend developer'] }
  if (/data.*scien|machine|ml|ai/.test(t))
    return { role: 'data scientist', skills: ROLE_SKILLS['data scientist'] }
  if (/data|analyst/.test(t))
    return { role: 'data analyst', skills: ROLE_SKILLS['data analyst'] }
  if (/design|ux|ui/.test(t))
    return { role: 'ui/ux designer', skills: ROLE_SKILLS['ui/ux designer'] }
  if (/market|seo|content/.test(t))
    return { role: 'digital marketer', skills: ROLE_SKILLS['digital marketer'] }
  if (/product/.test(t))
    return { role: 'product manager', skills: ROLE_SKILLS['product manager'] }
  if (/account|finance/.test(t))
    return { role: 'accountant', skills: ROLE_SKILLS.accountant }
  if (/engineer|develop|program|softwar/.test(t))
    return { role: 'software engineer', skills: ROLE_SKILLS['software engineer'] }
  // Generic fallback.
  return {
    role: t || 'your target role',
    skills: [
      'relevant technical skills',
      'measurable achievements',
      'industry keywords',
      'certifications',
    ],
  }
}

function countMatches(text: string, terms: string[]): string[] {
  const lower = text.toLowerCase()
  return terms.filter((term) => lower.includes(term.toLowerCase()))
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n))
}

export function analyzeResume(
  resumeText: string,
  jobTitle: string,
): AnalysisResult {
  const text = resumeText.trim()
  const lower = text.toLowerCase()
  const words = text.split(/\s+/).filter(Boolean)
  const wordCount = words.length

  const { role, skills: roleSkills } = pickRole(jobTitle)

  const foundVerbs = countMatches(text, ACTION_VERBS)
  const foundSoft = countMatches(text, SOFT_SKILLS)
  const foundSections = countMatches(text, SECTIONS)
  const foundRoleSkills = roleSkills.filter((s) =>
    lower.includes(s.toLowerCase()),
  )
  const missingSkills = roleSkills.filter(
    (s) => !lower.includes(s.toLowerCase()),
  )

  const hasNumbers = /\d/.test(text)
  const numberMatches = text.match(/\d+%?/g) || []
  const hasEmail = /[\w.-]+@[\w.-]+\.\w+/.test(text)
  const hasPhone = /(\+?\d[\d\s-]{7,}\d)/.test(text)
  const hasLinks = /(linkedin|github|portfolio|http)/i.test(text)
  const bulletCount = (text.match(/(^|\n)\s*[-•*]/g) || []).length

  // ---- Scoring (out of 100) ----
  let score = 0

  // Length (max 20)
  if (wordCount >= 350 && wordCount <= 750) score += 20
  else if (wordCount >= 200 && wordCount < 350) score += 14
  else if (wordCount > 750) score += 12
  else if (wordCount >= 100) score += 8
  else score += 3

  // Sections (max 18)
  score += clamp(foundSections.length * 3, 0, 18)

  // Action verbs (max 16)
  score += clamp(foundVerbs.length * 2, 0, 16)

  // Quantified achievements (max 14)
  if (numberMatches.length >= 5) score += 14
  else if (numberMatches.length >= 2) score += 9
  else if (hasNumbers) score += 4

  // Role-specific skills (max 20)
  const skillRatio = roleSkills.length
    ? foundRoleSkills.length / roleSkills.length
    : 0
  score += Math.round(skillRatio * 20)

  // Contact info & links (max 8)
  if (hasEmail) score += 3
  if (hasPhone) score += 2
  if (hasLinks) score += 3

  // Soft skills (max 4)
  score += clamp(foundSoft.length, 0, 4)

  score = clamp(Math.round(score), 5, 100)

  const scoreLabel =
    score >= 85
      ? 'Excellent'
      : score >= 70
        ? 'Strong'
        : score >= 50
          ? 'Needs Work'
          : 'Weak'

  // ---- Strengths ----
  const strengths: string[] = []
  if (wordCount >= 350 && wordCount <= 750)
    strengths.push(
      `Great length (${wordCount} words) — detailed but still concise.`,
    )
  if (foundVerbs.length >= 4)
    strengths.push(
      `Strong action verbs used (${foundVerbs.slice(0, 5).join(', ')}).`,
    )
  if (numberMatches.length >= 2)
    strengths.push(
      'Includes quantified achievements with numbers and metrics — recruiters love this.',
    )
  if (foundSections.length >= 4)
    strengths.push(
      `Well structured with clear sections (${foundSections.slice(0, 4).join(', ')}).`,
    )
  if (foundRoleSkills.length > 0)
    strengths.push(
      `Mentions relevant ${role} skills: ${foundRoleSkills.slice(0, 4).join(', ')}.`,
    )
  if (hasEmail && (hasPhone || hasLinks))
    strengths.push('Contact details and professional links are present.')
  if (foundSoft.length >= 2)
    strengths.push(
      `Highlights soft skills like ${foundSoft.slice(0, 3).join(', ')}.`,
    )
  if (strengths.length === 0)
    strengths.push(
      'You have a starting point — with a few targeted changes this resume can improve fast.',
    )

  // ---- Weaknesses ----
  const weaknesses: string[] = []
  if (wordCount < 200)
    weaknesses.push(
      `Resume is quite short (${wordCount} words). Add more detail about your experience and projects.`,
    )
  if (wordCount > 750)
    weaknesses.push(
      `Resume is long (${wordCount} words). Trim it toward one focused page.`,
    )
  if (numberMatches.length < 2)
    weaknesses.push(
      'Few or no quantified results. Add numbers to show measurable impact.',
    )
  if (foundVerbs.length < 3)
    weaknesses.push(
      'Weak on strong action verbs. Start bullet points with verbs like "built", "led", or "improved".',
    )
  if (foundSections.length < 3)
    weaknesses.push(
      'Missing clear sections. Add headings like Summary, Experience, Education and Skills.',
    )
  if (!hasEmail) weaknesses.push('No email address detected in your contact info.')
  if (!hasLinks)
    weaknesses.push(
      'No LinkedIn, GitHub or portfolio link found — add one to stand out.',
    )
  if (bulletCount < 3)
    weaknesses.push(
      'Not enough bullet points. Break dense paragraphs into scannable bullets.',
    )
  if (weaknesses.length === 0)
    weaknesses.push(
      'Very few issues found — focus on tailoring keywords to each specific job posting.',
    )

  // ---- Improvements ----
  const improvements: string[] = [
    `Tailor your resume to the "${jobTitle || role}" role by mirroring keywords from the job description.`,
    'Begin each bullet with a strong action verb and end with a measurable result (e.g. "increased signups by 30%").',
  ]
  if (missingSkills.length > 0)
    improvements.push(
      `Add or highlight these in-demand skills: ${missingSkills.slice(0, 5).join(', ')}.`,
    )
  if (numberMatches.length < 3)
    improvements.push(
      'Quantify at least 3 achievements with numbers, percentages or timeframes.',
    )
  if (!hasLinks)
    improvements.push(
      'Add a LinkedIn and GitHub/portfolio link near the top of your resume.',
    )
  improvements.push(
    'Keep formatting clean and consistent — one font, clear headings, and plenty of white space.',
  )

  // ---- Interview tips ----
  const interviewTips: string[] = [
    `Research the company and be ready to explain why you want this ${role} role specifically.`,
    'Prepare 2–3 STAR stories (Situation, Task, Action, Result) that map to your best resume bullets.',
    'Be ready to talk in detail about any project or skill listed on your resume.',
  ]
  if (missingSkills.length > 0)
    interviewTips.push(
      `Brush up on ${missingSkills.slice(0, 3).join(', ')} — these often come up for ${role} interviews.`,
    )
  interviewTips.push(
    'Prepare thoughtful questions to ask the interviewer about the team and growth opportunities.',
  )

  return {
    id:
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    jobTitle: jobTitle.trim() || role,
    score,
    scoreLabel,
    wordCount,
    strengths,
    weaknesses,
    missingSkills,
    improvements,
    interviewTips,
    date: new Date().toISOString(),
  }
}
