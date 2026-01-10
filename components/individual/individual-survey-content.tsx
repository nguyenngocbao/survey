'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useNotification } from '@/components/ui/notification-popup'

interface IndividualSurveyData {
  personalInfo: {
    fullName: string
    class: string
  }
  responses: {
    question1: string
    question2: string
    question3: string
  }
}

interface SurveyStats {
  totalCount: number
  completedCount: number
  pendingCount: number
  recentSurveys: Array<{
    _id: string
    personalInfo: {
      fullName: string
      class: string
    }
    submittedAt: string
  }>
}

export function IndividualSurveyContent() {
  const { showError, showSuccess, NotificationComponent } = useNotification()
  const [formData, setFormData] = useState<IndividualSurveyData>({
    personalInfo: {
      fullName: '',
      class: ''
    },
    responses: {
      question1: '',
      question2: '',
      question3: ''
    }
  })

  const [stats, setStats] = useState<SurveyStats>({
    totalCount: 0,
    completedCount: 0,
    pendingCount: 0,
    recentSurveys: []
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Load stats on component mount
  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const response = await fetch('/api/individual-surveys/stats')
      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          setStats(result.data)
        }
      }
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  const handlePersonalInfoChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }))
  }

  const handleResponseChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      responses: {
        ...prev.responses,
        [field]: value
      }
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.personalInfo.fullName || !formData.personalInfo.class) {
      showError('Vui lòng điền đầy đủ thông tin cá nhân bắt buộc', 'Thiếu thông tin')
      return
    }

    if (!formData.responses.question1.trim()) {
      showError('Vui lòng nhập câu trả lời', 'Câu 1: Thiếu câu trả lời')
      return
    }

    if (!formData.responses.question2.trim()) {
      showError('Vui lòng nhập câu trả lời', 'Câu 2: Thiếu câu trả lời')
      return
    }

    if (!formData.responses.question3.trim()) {
      showError('Vui lòng nhập câu trả lời', 'Câu 3: Thiếu câu trả lời')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/individual-surveys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setIsSubmitted(true)
        showSuccess('Cảm ơn bạn đã hoàn thành khảo sát!', 'Hoàn thành thành công')
        // Reload stats to show updated data
        loadStats()
      } else {
        showError(result.error || 'Có lỗi xảy ra', 'Lỗi')
      }
    } catch (error) {
      console.error('Error submitting survey:', error)
      showError('Có lỗi xảy ra khi lưu dữ liệu. Vui lòng thử lại.', 'Lỗi kết nối')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Vừa xong'
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} giờ trước`
    return `${Math.floor(diffInMinutes / 1440)} ngày trước`
  }

  return (
    <div className="w-full max-w-6xl space-y-8">
      <NotificationComponent />
      {/* Single Section - All in One */}
      <form onSubmit={handleSubmit}>
        <Card className="relative overflow-hidden p-10 md:p-12 bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-3xl">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-500/5 to-cyan-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-500/5 to-blue-600/5 rounded-full blur-3xl"></div>
          
          <div className="relative space-y-12">
            {/* Main Title */}
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                Hoạt động cá nhân
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Mở khóa tệp tin cảm xúc. Chỉ bạn thấy góc nhìn riêng.
              </p>
            </div>

            {/* Part 1: Personal Info */}
            <div className="space-y-6 bg-gradient-to-br from-teal-50/50 to-cyan-50/50 rounded-2xl p-8 border border-teal-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-xl">📝</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Phần 1: Thông tin cá nhân
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName">Họ và tên *</Label>
                  <Input
                    id="fullName"
                    value={formData.personalInfo.fullName}
                    onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                    placeholder="Nguyễn Văn A"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="class">Lớp *</Label>
                  <Input
                    id="class"
                    value={formData.personalInfo.class}
                    onChange={(e) => handlePersonalInfoChange('class', e.target.value)}
                    placeholder="10A1"
                    required
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Decorative Divider */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-dashed border-gradient-to-r from-teal-200 via-cyan-200 to-teal-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-6 text-2xl">✦</span>
              </div>
            </div>

            {/* Part 2: Survey Questions */}
            <div className="space-y-8 bg-gradient-to-br from-cyan-50/50 to-blue-50/50 rounded-2xl p-8 border border-cyan-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-xl">💭</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Phần 2: Câu hỏi khảo sát
                </h3>
              </div>

              {/* Question 1 */}
              <div className="space-y-3 bg-white/70 rounded-xl p-6 border border-cyan-100">
                <Label htmlFor="question1" className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <span className="text-cyan-600">1</span>
                  Khoảng khắc ấn tượng nhất *
                </Label>
                <p className="text-gray-600 leading-relaxed">
                  Khoảng khắc nào khiến bạn ấn tượng nhất và nó giúp bạn hiểu gì hơn về AI hoặc thiết kế kỹ thuật?
                </p>
                <Textarea
                  id="question1"
                  rows={6}
                  value={formData.responses.question1}
                  onChange={(e) => handleResponseChange('question1', e.target.value)}
                  placeholder="Trả lời:"
                  required
                  className="mt-2 border-cyan-200 focus:border-cyan-500 focus:ring-cyan-500"
                />
                <p className="text-sm text-gray-500">
                  Nhập câu trả lời của bạn
                </p>
              </div>

              {/* Question 2 */}
              <div className="space-y-3 bg-white/70 rounded-xl p-6 border border-cyan-100">
                <Label htmlFor="question2" className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <span className="text-cyan-600">2</span>
                  Điểm tiến bộ nhất *
                </Label>
                <p className="text-gray-600 leading-relaxed">
                  Sau buổi học, bạn cảm thấy mình tiến bộ nhất ở điểm nào? Vì sao?
                </p>
                <Textarea
                  id="question2"
                  rows={6}
                  value={formData.responses.question2}
                  onChange={(e) => handleResponseChange('question2', e.target.value)}
                  placeholder="Trả lời:"
                  required
                  className="mt-2 border-cyan-200 focus:border-cyan-500 focus:ring-cyan-500"
                />
                <p className="text-sm text-gray-500">
                  Nhập câu trả lời của bạn
                </p>
              </div>

              {/* Question 3 */}
              <div className="space-y-3 bg-white/70 rounded-xl p-6 border border-cyan-100">
                <Label htmlFor="question3" className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <span className="text-cyan-600">3</span>
                  Đề xuất cải tiến *
                </Label>
                <p className="text-gray-600 leading-relaxed">
                  Nếu cải tiến buổi học tiếp theo, bạn muốn thêm hoặc thay đổi điều gì để học hiệu quả hơn?
                </p>
                <Textarea
                  id="question3"
                  rows={6}
                  value={formData.responses.question3}
                  onChange={(e) => handleResponseChange('question3', e.target.value)}
                  placeholder="Trả lời:"
                  required
                  className="mt-2 border-cyan-200 focus:border-cyan-500 focus:ring-cyan-500"
                />
                <p className="text-sm text-gray-500">
                  Nhập câu trả lời của bạn
                </p>
              </div>
            </div>

            {/* Submit Button - Inside Card */}
            <div className="pt-8 text-center border-t border-gray-200">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting || isSubmitted}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-12 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span className="flex items-center gap-3">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Đang lưu...
                    </>
                  ) : isSubmitted ? (
                    <>
                      Đã hoàn thành
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </>
                  ) : (
                    <>
                      Hoàn thành
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </>
                  )}
                </span>
              </Button>
            </div>
          </div>
        </Card>
      </form>

      {/* Stats Section - Completed Members */}
      <Card className="p-8 md:p-10 bg-white/95 backdrop-blur-sm shadow-xl border-0 rounded-3xl">
        <div className="space-y-6">
          {/* Section Title */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-xl">📊</span>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Thống kê hoàn thành
              </h2>
            </div>
            <p className="text-gray-600">Danh sách học sinh đã hoàn thành khảo sát</p>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border-2 border-green-200 text-center hover:scale-105 transition-transform">
              <div className="text-4xl mb-2">✅</div>
              <div className="text-4xl font-bold text-gray-800 mb-1">{stats.completedCount}</div>
              <div className="text-sm text-gray-700 font-semibold">Đã hoàn thành</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-100 rounded-xl p-6 border-2 border-orange-200 text-center hover:scale-105 transition-transform">
              <div className="text-4xl mb-2">⏳</div>
              <div className="text-4xl font-bold text-gray-800 mb-1">{stats.pendingCount}</div>
              <div className="text-sm text-gray-700 font-semibold">Đang thực hiện</div>
            </div>
          </div>

          {/* Completed Members List */}
          <div className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 rounded-2xl p-6 border border-green-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-green-600">👥</span>
              Danh sách đã hoàn thành
            </h3>
            
            {/* Member List - Dynamic */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {stats.recentSurveys.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-3">📝</div>
                  <p className="text-sm italic">Chưa có học sinh nào hoàn thành khảo sát</p>
                  <p className="text-xs text-gray-400 mt-2">Danh sách sẽ cập nhật tự động khi có người hoàn thành</p>
                </div>
              ) : (
                stats.recentSurveys.map((survey, index) => (
                  <div key={survey._id} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{survey.personalInfo.fullName}</p>
                      <p className="text-xs text-gray-500">Lớp {survey.personalInfo.class} • {formatTimeAgo(survey.submittedAt)}</p>
                    </div>
                    <div className="text-green-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Real-time indicator */}
          <div className="text-center pt-4 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-green-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="italic">Dữ liệu được cập nhật theo thời gian thực</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
