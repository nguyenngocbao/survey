import { TeacherSurveyContent } from "@/components/teacher-survey/teacher-survey-content"
import { HCMUEBackground } from "@/components/hcmue-background"

export default function TeacherAISurveyPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <HCMUEBackground />
      <div className="relative z-10 flex flex-col items-center min-h-screen px-4 py-8">
        <TeacherSurveyContent />
      </div>
    </main>
  )
}