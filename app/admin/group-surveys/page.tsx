'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useNotification } from '@/components/ui/notification-popup'
import { SurveyDetailModal } from '@/components/admin/survey-detail-modal'
import Link from 'next/link'

interface GroupSurveyStats {
  total: number
  today: number
  recent: any[]
}

interface Survey {
  _id: string
  groupName?: string
  groupInfo?: {
    groupName?: string
    leaderName: string
    memberCount: number
    members?: string[]
    class: string
    subject: string
  }
  activity1: any
  activity2: any
  activity3: any
  activity4: any
  createdAt: string
}

export default function AdminGroupSurveysPage() {
  const [stats, setStats] = useState<GroupSurveyStats | null>(null)
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSurvey, setSelectedSurvey] = useState<{ id: string; type: string } | null>(null)
  const router = useRouter()
  const { showError, showSuccess, NotificationComponent } = useNotification()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      console.log('Loading group surveys data...')
      
      // Load stats
      const statsResponse = await fetch('/api/group-surveys/stats')
      console.log('Stats response status:', statsResponse.status)
      
      if (statsResponse.status === 401) {
        router.push('/admin/login')
        return
      }
      if (statsResponse.ok) {
        const statsResult = await statsResponse.json()
        console.log('Stats result:', statsResult)
        setStats(statsResult.data)
      } else {
        console.error('Stats response not ok:', statsResponse.status, await statsResponse.text())
      }

      // Load surveys
      const surveysResponse = await fetch('/api/group-surveys?limit=50')
      console.log('Surveys response status:', surveysResponse.status)
      
      if (surveysResponse.ok) {
        const surveysResult = await surveysResponse.json()
        console.log('Surveys result:', surveysResult)
        console.log('Number of surveys:', surveysResult.data?.length || 0)
        setSurveys(surveysResult.data || [])
      } else {
        console.error('Surveys response not ok:', surveysResponse.status, await surveysResponse.text())
      }
    } catch (error) {
      console.error('Error loading data:', error)
      showError('Có lỗi xảy ra khi tải dữ liệu', 'Lỗi hệ thống')
    } finally {
      setIsLoading(false)
    }
  }

  const handleExport = async (format: string) => {
    try {
      const response = await fetch(`/api/admin/export?type=group&format=${format}`)
      
      if (response.status === 401) {
        router.push('/admin/login')
        return
      }

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        
        const contentDisposition = response.headers.get('content-disposition')
        const filename = contentDisposition?.match(/filename="(.+)"/)?.[1] || `group-surveys.${format}`
        
        a.download = filename
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        
        showSuccess(`Đã xuất dữ liệu ${format.toUpperCase()} thành công!`, 'Xuất dữ liệu thành công')
      } else {
        showError('Không thể xuất dữ liệu', 'Lỗi xuất dữ liệu')
      }
    } catch (error) {
      console.error('Export error:', error)
      showError('Có lỗi xảy ra khi xuất dữ liệu', 'Lỗi hệ thống')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN')
  }

  const getCompletedActivities = (survey: Survey) => {
    let completed = 0
    if (survey.activity1) completed++
    if (survey.activity2) completed++
    if (survey.activity3) completed++
    if (survey.activity4) completed++
    return completed
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="outline" className="bg-white/50 backdrop-blur-sm border-blue-200 hover:bg-blue-50">
                ← Về trang chủ Admin
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
                👥 Quản lý hoạt động nhóm
              </h1>
              <p className="text-gray-600">Thống kê và quản lý các hoạt động học tập theo nhóm</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <p className="text-blue-100 text-sm">Tổng số nhóm</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📈</span>
                </div>
                <div>
                  <p className="text-green-100 text-sm">Nhóm hôm nay</p>
                  <p className="text-3xl font-bold">{stats.today}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🌊</span>
                </div>
                <div>
                  <p className="text-purple-100 text-sm">Hoạt động 1</p>
                  <p className="text-3xl font-bold">
                    {surveys.filter(s => s.activity1).length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <div>
                  <p className="text-indigo-100 text-sm">Hoàn thành 4/4</p>
                  <p className="text-3xl font-bold">
                    {surveys.filter(s => getCompletedActivities(s) === 4).length}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Activities Overview */}
        <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-lg border-0 rounded-2xl mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Tổng quan hoạt động</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl mb-2">🌊</div>
              <h3 className="font-semibold text-purple-800">Hoạt động 1</h3>
              <p className="text-sm text-purple-600">Bí ẩn dòng nước</p>
              <p className="text-2xl font-bold text-purple-800 mt-2">
                {surveys.filter(s => s.activity1).length}
              </p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-2">🔮</div>
              <h3 className="font-semibold text-blue-800">Hoạt động 2</h3>
              <p className="text-sm text-blue-600">Khám phá thủy lực</p>
              <p className="text-2xl font-bold text-blue-800 mt-2">
                {surveys.filter(s => s.activity2).length}
              </p>
            </div>
            <div className="text-center p-4 bg-indigo-50 rounded-lg">
              <div className="text-3xl mb-2">🗺️</div>
              <h3 className="font-semibold text-indigo-800">Hoạt động 3</h3>
              <p className="text-sm text-indigo-600">Thiết kế kỳ diệu</p>
              <p className="text-2xl font-bold text-indigo-800 mt-2">
                {surveys.filter(s => s.activity3).length}
              </p>
            </div>
            <div className="text-center p-4 bg-violet-50 rounded-lg">
              <div className="text-3xl mb-2">✨</div>
              <h3 className="font-semibold text-violet-800">Hoạt động 4</h3>
              <p className="text-sm text-violet-600">Bản vẽ toả sáng</p>
              <p className="text-2xl font-bold text-violet-800 mt-2">
                {surveys.filter(s => s.activity4).length}
              </p>
            </div>
          </div>
        </Card>

        {/* Export Section */}
        <Card className="p-6 mb-8 bg-white/95 backdrop-blur-sm shadow-lg border-0 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Xuất dữ liệu hoạt động nhóm</h3>
              <p className="text-gray-600 mt-1">Tải xuống dữ liệu hoạt động nhóm dưới định dạng CSV hoặc JSON</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() => handleExport('csv')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
            >
              📊 Xuất CSV
            </Button>
            <Button
              onClick={() => handleExport('excel')}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
            >
              📈 Xuất Excel
            </Button>
            <Button
              onClick={() => handleExport('json')}
              className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white"
            >
              📋 Xuất JSON
            </Button>
          </div>
        </Card>

        {/* Surveys List */}
        <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-lg border-0 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Danh sách nhóm</h2>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {surveys.length} nhóm
            </Badge>
          </div>

          {surveys.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-gray-600 text-lg">Chưa có nhóm nào</p>
              <p className="text-gray-500 mt-2">Nhóm sẽ xuất hiện ở đây khi hoàn thành đăng ký</p>
            </div>
          ) : (
            <div className="space-y-4">
              {surveys.map((survey) => (
                <div
                  key={survey._id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">👥</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{survey.groupName || survey.groupInfo?.groupName}</h3>
                      <p className="text-sm text-gray-600">
                        Trưởng nhóm: {survey.groupInfo?.leaderName} - {survey.groupInfo?.memberCount} thành viên
                      </p>
                      {survey.groupInfo?.members && survey.groupInfo.members.length > 0 && (
                        <p className="text-sm text-gray-600">
                          Thành viên: {survey.groupInfo.members.join(', ')}
                        </p>
                      )}
                      <p className="text-sm text-gray-600">
                        {survey.groupInfo?.class} - {survey.groupInfo?.subject}
                      </p>
                      <p className="text-xs text-gray-500">{formatDate(survey.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((num) => {
                        const isCompleted = survey[`activity${num}` as keyof Survey]
                        return (
                          <div
                            key={num}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                              isCompleted 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-gray-100 text-gray-400'
                            }`}
                          >
                            {isCompleted ? '✓' : num}
                          </div>
                        )
                      })}
                    </div>
                    <Badge 
                      className={
                        getCompletedActivities(survey) === 4 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }
                    >
                      {getCompletedActivities(survey)}/4 hoạt động
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedSurvey({ id: survey._id, type: 'group' })}
                    >
                      Xem chi tiết
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
      
      {/* Survey Detail Modal */}
      {selectedSurvey && (
        <SurveyDetailModal
          isOpen={!!selectedSurvey}
          onClose={() => setSelectedSurvey(null)}
          surveyId={selectedSurvey.id}
          surveyType={selectedSurvey.type}
        />
      )}
      
      <NotificationComponent />
    </div>
  )
}