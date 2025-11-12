"use client"

import { Card } from "@/components/ui/card"

export function GroupStats() {
  // Mock data - will be replaced with real data
  const stats = {
    members: 5,
    completedActivities: 2,
    progress: 50,
    lastUpdate: "5 phút trước",
  }

  return (
    <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-xl border-0">
      <div className="space-y-6">
        {/* Section Title */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
            <span className="text-2xl">📊</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Thống kê nhóm
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Stat 1: Members */}
          <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="text-3xl">👥</div>
              <div className="text-3xl font-bold text-gray-800">{stats.members}</div>
              <div className="text-sm text-gray-600">Thành viên</div>
            </div>
          </div>

          {/* Stat 2: Completed Activities */}
          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="text-3xl">✅</div>
              <div className="text-3xl font-bold text-gray-800">{stats.completedActivities}/4</div>
              <div className="text-sm text-gray-600">Hoạt động</div>
            </div>
          </div>

          {/* Stat 3: Progress */}
          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="text-3xl">📈</div>
              <div className="text-3xl font-bold text-gray-800">{stats.progress}%</div>
              <div className="text-sm text-gray-600">Tiến độ</div>
            </div>
          </div>

          {/* Stat 4: Last Update */}
          <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="text-3xl">🕐</div>
              <div className="text-lg font-bold text-gray-800">{stats.lastUpdate}</div>
              <div className="text-sm text-gray-600">Cập nhật</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Tiến độ tổng thể</span>
            <span className="font-semibold">{stats.progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-violet-600 transition-all duration-500"
              style={{ width: `${stats.progress}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}
