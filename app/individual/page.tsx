import { IndividualSurveyContent } from "@/components/individual/individual-survey-content"
import { HCMUEBackground } from "@/components/hcmue-background"
import { BackButton } from "@/components/ui/back-button"

export default function IndividualSurveyPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <HCMUEBackground />
      <div className="relative z-10 flex flex-col items-center min-h-screen px-4 py-12 gap-10">
        {/* Back to home link */}
        <div className="w-full max-w-6xl">
          <BackButton href="/" label="Quay về trang chủ" variant="home" />
        </div>

        <IndividualSurveyContent />
      </div>
    </main>
  )
}