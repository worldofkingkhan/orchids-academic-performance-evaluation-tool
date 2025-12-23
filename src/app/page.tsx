import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GraduationCap, BarChart3, ClipboardCheck, Award, ShieldCheck } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      {/* Hero Section */}
      <header className="border-b bg-zinc-50/50 px-6 py-4 dark:bg-zinc-900/50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">AKI Assessment</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium hover:text-blue-600">Dashboard</Link>
            <Button asChild>
              <Link href="/form">New Evaluation</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-8 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-400">
              National Academic Performance Tool
            </div>
            <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl">
              Academic Knowledge Index <span className="text-blue-600">(AKI)</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              A data-driven indicator designed for ministries and universities to measure 
              academic performance improvement. Support promotion and international scientific 
              representation decisions with realistic data.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              <Button size="lg" className="h-12 px-8 text-base" asChild>
                <Link href="/form">Start Evaluation</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </div>
          </div>

          <div className="mt-24 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl border bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:bg-zinc-900">
              <BarChart3 className="mb-4 h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-bold">Measurable Data</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Quantitative tracking of teaching quality, scientific output, and training progress.
              </p>
            </div>
            <div className="rounded-2xl border bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:bg-zinc-900">
              <ClipboardCheck className="mb-4 h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-bold">Decision Support</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Automatic recommendations for promotion or further training based on AKI thresholds.
              </p>
            </div>
            <div className="rounded-2xl border bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:bg-zinc-900">
              <ShieldCheck className="mb-4 h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-bold">Institutional Standard</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Professional reporting suitable for ministerial and university administration.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-zinc-50 py-24 dark:bg-zinc-900/50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">AKI Methodology</h2>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                Our calculation logic combines four critical pillars of academic excellence.
              </p>
            </div>
            <div className="mt-16 flex flex-wrap justify-center gap-4">
              {['Teaching (25%)', 'Science (25%)', 'Training (25%)', 'Supervision (25%)'].map((pillar) => (
                <div key={pillar} className="rounded-full bg-white px-6 py-2 font-semibold shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-700">
                  {pillar}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 px-6">
        <div className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2024 AKI - National Academic Performance Tool</p>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-blue-600">Methodology</Link>
            <Link href="#" className="hover:text-blue-600">Privacy Policy</Link>
            <Link href="#" className="hover:text-blue-600">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
