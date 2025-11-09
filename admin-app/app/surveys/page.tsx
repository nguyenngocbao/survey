import { SurveyList } from "@/components/admin/survey-list"
import { HCMUEBackground } from "@/components/hcmue-background"

export default function SurveysPage() {
  return (
    <main className="relative min-h-screen overflow-hidden p-4">
      <HCMUEBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        <div className="text-center py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-red-800 mb-2">
            📋 Chi tiết khảo sát
          </h1>
          <p className="text-gray-600 mb-4">
            Xem chi tiết từng khảo sát đã được nộp
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/admin"
              className="text-sm text-red-700 hover:text-red-900 underline font-medium"
            >
              ← Quay về dashboard
            </a>
            <a
              href="/"
              className="text-sm text-amber-700 hover:text-amber-900 underline font-medium"
            >
              🏠 Trang chủ
            </a>
          </div>
        </div>
        
        <SurveyList />
      </div>
    </main>
  )
}