import { Activity1Form } from "@/components/group/activities/activity-1-form"
import { HCMUEBackground } from "@/components/hcmue-background"

export default function Activity1Page() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <HCMUEBackground />
      <div className="relative z-10 flex flex-col items-center min-h-screen px-4 py-8">
        <Activity1Form />
      </div>
    </main>
  )
}
