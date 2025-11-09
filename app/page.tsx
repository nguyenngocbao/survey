import { SurveyTypeSelector } from "@/components/survey-type-selector"

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <SurveyTypeSelector />
      </div>
    </main>
  )
}
