import { SurveyTypeSelector } from "@/components/survey-type-selector"
import { HCMUEBackground } from "@/components/hcmue-background"
import Link from "next/link"

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <HCMUEBackground />
      
      {/* Admin Link */}
      <div className="absolute top-4 right-4 z-20">
        <Link
          href="/admin/login"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all duration-300 text-sm font-medium"
        >
          🔐 Admin
        </Link>
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <SurveyTypeSelector />
      </div>
    </main>
  )
}
