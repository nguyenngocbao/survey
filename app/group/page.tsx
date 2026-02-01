import { GroupPageContent } from "@/components/group/group-page-content"
import { HCMUEBackground } from "@/components/hcmue-background"
import { BackButton } from "@/components/ui/back-button"

export default function GroupSurveyPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <HCMUEBackground />
      <div className="relative z-10 flex flex-col items-center min-h-screen px-4 py-8">
        {/* Back to home link */}
        <div className="w-full max-w-6xl mb-4">
          <BackButton href="/" label="Quay về trang chủ" variant="home" />
        </div>

        <GroupPageContent />
      </div>
    </main>
  )
}
