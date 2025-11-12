import { GroupPageContent } from "@/components/group/group-page-content"
import { HCMUEBackground } from "@/components/hcmue-background"

export default function GroupSurveyPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <HCMUEBackground />
      <div className="relative z-10 flex flex-col items-center min-h-screen px-4 py-8">
        {/* Back to home link */}
        <div className="w-full max-w-6xl mb-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-red-700 hover:text-red-900 transition-colors font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Quay về trang chủ
          </a>
        </div>

        <GroupPageContent />
      </div>
    </main>
  )
}
