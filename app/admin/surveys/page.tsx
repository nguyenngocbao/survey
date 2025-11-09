import { SurveyList } from "@/components/admin/survey-list"

export default function SurveysPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      
      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📋 Chi tiết khảo sát
          </h1>
          <p className="text-gray-600 mb-4">
            Xem chi tiết từng khảo sát đã được nộp
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/admin"
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              ← Quay về dashboard
            </a>
            <a
              href="/"
              className="text-sm text-blue-600 hover:text-blue-800 underline"
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