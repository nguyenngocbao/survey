'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useNotification } from '@/components/ui/notification-popup'
import { SurveyDetailModal } from '@/components/admin/survey-detail-modal'
import Link from 'next/link'

interface IndividualSurveyStats {
  total: number
  today: number
  recent: any[]
}

interface Survey {
  _id: string
  personalInfo: {
    fullName: string
    class: string
  }
  responses: {
    question1?: string
    question2?: string
    question3?: string
    [key: string]: any
  }
  createdAt: string
}

export default function AdminIndividualSurveysPage() {
  const [stats, setStats] = useState<IndividualSurveyStats | null>(null)
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
      // Load stats
      const statsResponse = await fetch('/api/individual-surveys/stats')
      if (statsResponse.status === 401) {
        router.push('/admin/login')
        return
      }
      if (statsResponse.ok) {
        const statsResult = await statsResponse.json()
        setStats(statsResult.data)
      }

      // Load surveys
      const surveysResponse = await fetch('/api/individual-surveys?limit=50')
      if (surveysResponse.ok) {
        const surveysResult = await surveysResponse.json()
        setSurveys(surveysResult.data || [])
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
      const response = await fetch(`/api/admin/export?type=individual&format=${format}`)
      
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
        const filename = contentDisposition?.match(/filename="(.+)"/)?.[1] || `individual-surveys.${format}`
        
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

  const getAnsweredQuestions = (survey: Survey) => {
    if (!survey.responses) return 0
    return Object.keys(survey.responses).filter(key => 
      key.startsWith('question') && survey.responses[key]
    ).length
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="outline" className="bg-white/50 backdrop-blur-sm border-orange-200 hover:bg-orange-50">
                ← Về trang chủ Admin
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent mb-2">
                👤 Quản lý khảo sát cá nhân
              </h1>
              <p className="text-gray-600">Thống kê và quản lý các khảo sát cá nhân về trải nghiệm học tập</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <p className="text-orange-100 text-sm">Tổng số khảo sát</p>
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
                  <p className="text-green-100 text-sm">Khảo sát hôm nay</p>
                  <p className="text-3xl font-bold">{stats.today}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <p className="text-blue-100 text-sm">Tỷ lệ hoàn thành</p>
                  <p className="text-3xl font-bold">100%</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Question Analysis */}
        <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-lg border-0 rounded-2xl mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Phân tích câu hỏi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((questionNum) => {
              const answeredCount = surveys.filter(s => 
                s.responses && s.responses[`question${questionNum}`]
              ).length
              const percentage = surveys.length > 0 ? Math.round((answeredCount / surveys.length) * 100) : 0
              
              const questionTitles = {
                1: 'Khoảng khắc ấn tượng',
                2: 'Điểm tiến bộ nhất',
                3: 'Đề xuất cải tiến'
              }
              
              return (
                <div key={questionNum} className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl mb-2">❓</div>
                  <h3 className="font-semibold text-orange-800">Câu hỏi {questionNum}</h3>
                  <p className="text-xs text-orange-600 mb-2">{questionTitles[questionNum as keyof typeof questionTitles]}</p>
                  <p className="text-2xl font-bold text-orange-800 mt-2">{answeredCount}</p>
                  <p className="text-sm text-orange-600">{percentage}% trả lời</p>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Export Section */}
        <Card className="p-6 mb-8 bg-white/95 backdrop-blur-sm shadow-lg border-0 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Xuất dữ liệu khảo sát cá nhân</h3>
              <p className="text-gray-600 mt-1">Tải xuống dữ liệu khảo sát dưới định dạng CSV hoặc JSON</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() => handleExport('csv')}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
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
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
            >
              📋 Xuất JSON
            </Button>
          </div>
        </Card>

        {/* Surveys List */}
        <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-lg border-0 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Danh sách khảo sát cá nhân</h2>
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              {surveys.length} khảo sát
            </Badge>
          </div>

          {surveys.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-gray-600 text-lg">Chưa có khảo sát nào</p>
              <p className="text-gray-500 mt-2">Khảo sát sẽ xuất hiện ở đây khi được hoàn thành</p>
            </div>
          ) : (
            <div className="space-y-4">
              {surveys.map((survey, index) => (
                <div
                  key={survey._id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">👤</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Khảo sát cá nhân #{index + 1}</h3>
                      <p className="text-sm text-gray-600">
                        Đã trả lời {getAnsweredQuestions(survey)} câu hỏi
                      </p>
                      <p className="text-xs text-gray-500">{formatDate(survey.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {[1, 2, 3].map((num) => {
                        const isAnswered = survey.responses && survey.responses[`question${num}`]
                        return (
                          <div
                            key={num}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                              isAnswered 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-gray-100 text-gray-400'
                            }`}
                          >
                            {isAnswered ? '✓' : num}
                          </div>
                        )
                      })}
                    </div>
                    <Badge className="bg-green-100 text-green-800">Hoàn thành</Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedSurvey({ id: survey._id, type: 'individual' })}
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