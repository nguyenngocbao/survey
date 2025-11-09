import { SurveyTypeSelector } from "@/components/survey-type-selector"
import { HCMUEBackground } from "@/components/hcmue-background"

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <HCMUEBackground />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <SurveyTypeSelector />
      </div>
    </main>
  )
}
