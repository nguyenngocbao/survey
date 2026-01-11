'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNotification } from '@/components/ui/notification-popup'
import Link from 'next/link'

interface AdminStats {
  aiSurveys: {
    total: number
    today: number
  }
  teacherSurveys: {
    total: number
    today: number
  }
  groupSurveys: {
    total: number
    today: number
  }
  individualSurveys: {
    total: number
    today: number
  }
  totals: {
    allSurveys: number
    todayTotal: number
  }
}

export default function AdminHome() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { showError, showSuccess, NotificationComponent } = useNotification()

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      const result = await response.json()

      if (response.status === 401) {
        router.push('/admin/login')
        return
      }

      if (result.success) {
        setStats(result.data)
      } else {
        showError('Không thể tải thống kê', 'Lỗi')
      }
    } catch (error) {
      console.error('Error loading stats:', error)
      showError('Có lỗi xảy ra khi tải thống kê', 'Lỗi hệ thống')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' })
      showSuccess('Đăng xuất thành công', 'Thành công')
      setTimeout(() => {
        router.push('/admin/login')
      }, 1000)
    } catch (error) {
      console.error('Logout error:', error)
      showError('Có lỗi xảy ra khi đăng xuất', 'Lỗi')
    }
  }

  const surveyTypes = [
    {
      id: 'ai',
      title: 'Khảo sát học sinh về AI',
      description: 'Quản lý và thống kê khảo sát về việc sử dụng AI trong học tập',
      icon: '🤖',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      href: '/admin/ai-surveys',
      total: stats?.aiSurveys.total || 0,
      today: stats?.aiSurveys.today || 0
    },
    {
      id: 'teacher',
      title: 'Khảo sát giáo viên về AI',
      description: 'Quản lý và thống kê khảo sát về việc sử dụng AI trong giảng dạy',
      icon: '👨‍🏫',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'from-emerald-50 to-emerald-100',
      href: '/admin/teacher-surveys',
      total: stats?.teacherSurveys.total || 0,
      today: stats?.teacherSurveys.today || 0
    },
    {
      id: 'group',
      title: 'Hoạt động nhóm',
      description: 'Quản lý và thống kê các hoạt động học tập theo nhóm',
      icon: '👥',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      href: '/admin/group-surveys',
      total: stats?.groupSurveys.total || 0,
      today: stats?.groupSurveys.today || 0
    },
    {
      id: 'individual',
      title: 'Khảo sát cá nhân',
      description: 'Quản lý và thống kê các khảo sát cá nhân về trải nghiệm học tập',
      icon: '👤',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100',
      href: '/admin/individual-surveys',
      total: stats?.individualSurveys.total || 0,
      today: stats?.individualSurveys.today || 0
    }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Chọn loại khảo sát để quản lý và xem thống kê chi tiết</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300"
          >
            Đăng xuất
          </Button>
        </div>

        {/* Total Stats */}
        {stats && (
          <Card className="p-6 mb-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 shadow-lg rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Tổng quan hệ thống</h3>
                <div className="flex items-center gap-8">
                  <div>
                    <p className="text-indigo-100 text-sm">Tổng số khảo sát</p>
                    <p className="text-3xl font-bold">{stats.totals.allSurveys}</p>
                  </div>
                  <div>
                    <p className="text-indigo-100 text-sm">Khảo sát hôm nay</p>
                    <p className="text-3xl font-bold">{stats.totals.todayTotal}</p>
                  </div>
                </div>
              </div>
              <div className="text-5xl">📊</div>
            </div>
          </Card>
        )}

        {/* Survey Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {surveyTypes.map((survey) => (
            <Card key={survey.id} className="relative overflow-hidden p-8 bg-white/95 backdrop-blur-sm shadow-2xl border-0 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group rounded-2xl">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${survey.bgColor} rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700`}></div>
              
              <div className="relative space-y-6">
                {/* Icon and Title */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${survey.color} rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300`}></div>
                    <div className={`relative w-16 h-16 bg-gradient-to-br ${survey.color} rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-500`}>
                      <span className="text-2xl">{survey.icon}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold bg-gradient-to-r ${survey.color} bg-clip-text text-transparent mb-2`}>
                      {survey.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {survey.description}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 py-4 px-6 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">{survey.total}</p>
                    <p className="text-xs text-gray-600">Tổng số</p>
                  </div>
                  <div className="w-px h-8 bg-gray-300"></div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">+{survey.today}</p>
                    <p className="text-xs text-gray-600">Hôm nay</p>
                  </div>
                </div>

                {/* Action Button */}
                <Link href={survey.href}>
                  <Button className={`w-full bg-gradient-to-r ${survey.color} hover:opacity-90 text-white font-semibold py-4 text-lg transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105`}>
                    <span className="flex items-center justify-center gap-2">
                      Quản lý & Thống kê
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <NotificationComponent />
    </div>
  )
}