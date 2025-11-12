"use client"

import { GroupHeaderCard } from "./group-header-card"
import { GroupInfoForm } from "./group-info-form"
import { GroupActivities } from "./group-activities"
import { GroupStats } from "./group-stats"

export function GroupPageContent() {
  return (
    <div className="w-full max-w-6xl space-y-8">
      {/* Section 1: Header Card */}
      <GroupHeaderCard />

      {/* Section 2: Group Info & Members */}
      <GroupInfoForm />

      {/* Section 3: Activities */}
      <GroupActivities />

      {/* Section 4: Real-time Stats */}
      <GroupStats />
    </div>
  )
}
