"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ActivityStatus {
  number: number
  completed: boolean
}

const activities = [
  {
    number: 1,
    title: "Bí ẩn dòng nước",
    description: "Khám phá những bí ẩn dưới đáy đại dương",
    icon: "🌊",
    color: "violet",
    route: "/group/activity-1",
  },
  {
    number: 2,
    title: "Khám phá thủy lực",
    description: "Tìm hiểu nguyên lý nổi và thiết kế thuyền",
    icon: "🔮",
    color: "purple",
    route: "/group/activity-2",
  },
  {
    number: 3,
    title: "Thiết kế kỳ diệu",
    description: "Tạo bản vẽ kỹ thuật hoàn chỉnh với AI",
    icon: "🗺️",
    color: "indigo",
    route: "/group/activity-3",
  },
  {
    number: 4,
    title: "Bản vẽ toả sáng",
    description: "Tìm hiểu bản vẽ phát ra ánh sáng kỳ diệu",
    icon: "✨",
    color: "blue",
    route: "/group/activity-4",
  },
]

const colorClasses = {
  violet: {
    bg: "from-violet-50 to-violet-100",
    border: "border-violet-200",
    badge: "bg-gradient-to-r from-violet-500 to-violet-600",
    button: "bg-violet-500 hover:bg-violet-600",
  },
  purple: {
    bg: "from-purple-50 to-purple-100",
    border: "border-purple-200",
    badge: "bg-gradient-to-r from-purple-500 to-purple-600",
    button: "bg-purple-500 hover:bg-purple-600",
  },
  indigo: {
    bg: "from-indigo-50 to-indigo-100",
    border: "border-indigo-200",
    badge: "bg-gradient-to-r from-indigo-500 to-indigo-600",
    button: "bg-indigo-500 hover:bg-indigo-600",
  },
  blue: {
    bg: "from-blue-50 to-blue-100",
    border: "border-blue-200",
    badge: "bg-gradient-to-r from-blue-500 to-blue-600",
    button: "bg-blue-500 hover:bg-blue-600",
  },
}

export function GroupActivities() {
  const [activityStatuses, setActivityStatuses] = useState<ActivityStatus[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [groupName, setGroupName] = useState<string | null>(null)

  useEffect(() => {
    const loadActivityStatuses = async () => {
      const storedGroupName = localStorage.getItem('groupName')
      
      if (storedGroupName) {
        setGroupName(storedGroupName)
        
        try {
          const response = await fetch(`/api/group-surveys/activities?groupName=${encodeURIComponent(storedGroupName)}`)
          
          if (response.ok) {
            const result = await response.json()
            if (result.success && result.data) {
              const statuses: ActivityStatus[] = [
                { number: 1, completed: !!result.data.activity1 },
                { number: 2, completed: !!result.data.activity2 },
                { number: 3, completed: !!result.data.activity3 },
                { number: 4, completed: !!result.data.activity4 },
              ]
              setActivityStatuses(statuses)
            }
          }
        } catch (error) {
          console.error('Error loading activity statuses:', error)
        }
      }
      
      setIsLoading(false)
    }

    loadActivityStatuses()
  }, [])

  const getActivityStatus = (activityNumber: number): boolean => {
    const status = activityStatuses.find(s => s.number === activityNumber)
    return status?.completed || false
  }

  return (
    <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-xl border-0">
      <div className="space-y-6">
        {/* Section Title */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
            <span className="text-2xl">🎯</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Các hoạt động khám phá
            </h2>
            {groupName && (
              <div className="flex items-center gap-3 mt-1">
                <p className="text-sm text-gray-600">
                  Nhóm: <span className="font-medium">{groupName}</span>
                </p>
                <Button
                  onClick={() => {
                    if (confirm('Bạn có muốn chuyển sang nhóm khác không? Dữ liệu hiện tại sẽ được lưu.')) {
                      localStorage.removeItem('groupName')
                      window.location.href = '/group'
                    }
                  }}
                  variant="outline"
                  size="sm"
                  className="text-xs px-2 py-1 h-6"
                >
                  Đổi nhóm
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
            <p className="text-gray-600 text-sm">Đang tải trạng thái hoạt động...</p>
          </div>
        )}

        {/* Activities Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activities.map((activity) => {
              const colors = colorClasses[activity.color as keyof typeof colorClasses]
              const isCompleted = getActivityStatus(activity.number)
              
              return (
                <div
                  key={activity.number}
                  className={`p-6 bg-gradient-to-br ${colors.bg} border-2 ${colors.border} rounded-lg hover:shadow-lg hover:scale-102 transition-all cursor-pointer`}
                >
                  <div className="space-y-4">
                    {/* Badge & Icon */}
                    <div className="flex items-center justify-between">
                      <span className={`${colors.badge} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                        Hoạt động {activity.number}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="text-3xl">{activity.icon}</div>
                        {isCompleted && (
                          <div className="text-green-500 text-xl">✅</div>
                        )}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {activity.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {activity.description}
                      </p>
                    </div>

                    {/* Status & Action */}
                    <div className="flex items-center justify-between pt-2">
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                        isCompleted 
                          ? "bg-green-100 text-green-700" 
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {isCompleted ? "Đã hoàn thành" : "Chưa hoàn thành"}
                      </span>
                      
                      <Button
                        onClick={() => window.location.href = activity.route}
                        size="sm"
                        className={`${colors.button} text-white`}
                      >
                        {isCompleted ? "Chỉnh sửa" : "Bắt đầu"}
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </Card>
  )
}
