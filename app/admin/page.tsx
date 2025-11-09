import { SurveyList } from "@/components/admin/survey-list"
import { AdminStats } from "@/components/admin/admin-stats"
import { ExportData } from "@/components/admin/export-data"

export default function AdminPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      
      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🔧 Quản trị khảo sát
          </h1>
          <p className="text-gray-600 mb-4">
            Xem và quản lý các khảo sát đã được nộp
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/"
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              ← Quay về trang khảo sát
            </a>
            <a
              href="/admin/surveys"
              className="text-sm text-green-600 hover:text-green-800 underline font-medium"
            >
              📋 Xem chi tiết khảo sát
            </a>
          </div>
        </div>
        
        <AdminStats />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SurveyList />
          </div>
          <div>
            <ExportData />
          </div>
        </div>
      </div>
    </main>
  )
}