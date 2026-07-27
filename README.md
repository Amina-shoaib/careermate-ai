# CareerMate AI

> Your personal AI resume coach for fresh graduates.

CareerMate AI helps students and fresh graduates improve their resumes **before** they apply for jobs. Paste your resume, enter your target job title, and get an instant, personalized review — a score out of 100 plus strengths, weaknesses, missing skills, improvement suggestions and interview tips.

---

## Problem Statement

Fresh graduates rarely get honest feedback on their resumes before applying. They don't know what recruiters look for, resumes get silently rejected by screening systems, and there's no easy way to tell whether a resume is strong or weak until it's already too late. CareerMate AI closes that gap by acting as an always-available resume coach that reviews a resume in seconds and tells the candidate exactly how to improve it.

---

## Features

- **Home Page** — Modern hero section, professional blue-and-white theme, navigation bar and footer.
- **Resume Analysis Page** — Paste resume text into a large textarea, enter a desired job title, and click **Analyze Resume**.
- **AI Analysis** — Generates an overall score (out of 100), resume strengths, weaknesses, missing skills, suggested improvements and interview tips. Results change based on resume length and detected keywords.
- **History** — Every analysis is saved to browser Local Storage, showing job title, score and date, with **View Details** and **Delete** actions (plus **Clear all**).
- **About Page** — Explains how CareerMate AI helps students and fresh graduates.
- **Contact Page** — Simple contact form with Name, Email and Message (with validation).
- **Polished UI** — Beautiful cards, rounded buttons, icons, smooth animations and a fully responsive mobile-first layout.

---

## AI Feature

The app acts as an **AI Resume Coach**. It evaluates resume quality using rule-based JavaScript logic and provides personalized feedback, strengths, weaknesses, missing skills, interview tips and an overall score.

Under the hood, the analysis engine (`lib/analyze.ts`) inspects:

- **Length** — is the resume detailed but concise?
- **Sections** — Summary, Experience, Education, Skills, Projects, Certifications.
- **Action verbs** — strong verbs like *built, led, improved, launched*.
- **Quantified achievements** — numbers, percentages and metrics that prove impact.
- **Role-specific skills** — matched against a library for roles like Frontend Developer, Data Analyst, Product Manager and more, to surface missing skills.
- **Contact info & links** — email, phone, LinkedIn / GitHub / portfolio.

These signals are weighted into a score out of 100 and turned into tailored, human-readable feedback — so two different resumes get genuinely different reviews.

---

## Technologies Used

- **React** (Next.js App Router)
- **Tailwind CSS**
- **JavaScript / TypeScript**
- **Browser Local Storage** (no backend — everything runs client-side and stays private)
- **lucide-react** for icons

---

## Folder Structure

```
app/
  layout.tsx         # Root layout: fonts, navbar, footer, metadata
  globals.css        # Blue & white theme tokens
  page.tsx           # Home page
  analyze/page.tsx   # Resume analysis page
  history/page.tsx   # Saved analyses (Local Storage)
  about/page.tsx     # About page
  contact/page.tsx   # Contact form
components/
  navbar.tsx
  footer.tsx
  analysis-result.tsx  # Reusable score + feedback view
  ui/button.tsx
lib/
  analyze.ts         # The AI resume analysis engine
  storage.ts         # Local Storage helpers
```

---

## Installation Steps

1. **Clone / download** the project.

2. **Install dependencies:**

   ```bash
   pnpm install
   # or: npm install
   ```

3. **Run the development server:**

   ```bash
   pnpm dev
   # or: npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production:**

   ```bash
   pnpm build && pnpm start
   ```

---

## Screenshots

<!-- Add your screenshots here -->

| Home | Resume Analysis |
| --- | --- |
| _screenshot placeholder_ | _screenshot placeholder_ |

| Analysis Results | History |
| --- | --- |
| _screenshot placeholder_ | _screenshot placeholder_ |

---

## License

Free to use for learning and personal projects.
