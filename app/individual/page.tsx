import { IndividualSurveyContent } from "@/components/individual/individual-survey-content"
import { HCMUEBackground } from "@/components/hcmue-background"

export default function IndividualSurveyPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <HCMUEBackground />
      <div className="relative z-10 flex flex-col items-center min-h-screen px-4 py-12 gap-10">
        {/* Back to home link */}
        <div className="w-full max-w-6xl">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm hover:bg-white/95 text-red-700 hover:text-red-900 transition-all duration-300 font-medium shadow-lg hover:shadow-xl group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Quay về trang chủ
          </a>
        </div>

        <IndividualSurveyContent />
      </div>
    </main>
  )
}