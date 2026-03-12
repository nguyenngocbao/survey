"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { BackButton } from "@/components/ui/back-button"
import { useNotification } from "@/components/ui/notification-popup"
import { MultiImageUpload } from "@/components/ui/multi-image-upload"

interface Activity1FormData {
  ideaPrompt: string
  images: string[]
}

export function Activity1Form() {
  const { showError, showSuccess, showWarning, NotificationComponent } = useNotification()
  const [formData, setFormData] = useState<Activity1FormData>({
    ideaPrompt: "",
    images: []
  })
  const [isLoading, setIsLoading] = useState(true)
  const [groupName, setGroupName] = useState<string | null>(null)

  // Load existing data on component mount
  useEffect(() => {
    const loadExistingData = async () => {
      const storedGroupName = localStorage.getItem('groupName')
      
      if (!storedGroupName) {
        showWarning('Vui lòng chọn nhóm trước khi làm hoạt động', 'Thiếu thông tin nhóm')
        setTimeout(() => window.location.href = '/group', 2000)
        return
      }

      setGroupName(storedGroupName)

      try {
        const response = await fetch(`/api/group-surveys/activities?groupName=${encodeURIComponent(storedGroupName)}&activityNumber=1`)
        
        if (response.ok) {
          const result = await response.json()
          if (result.success && result.data.activityData) {
            setFormData(result.data.activityData)
          }
        }
      } catch (error) {
        console.error('Error loading existing data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadExistingData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.ideaPrompt.trim()) {
      showWarning("Vui lòng nhập ý tưởng prompt", "Thiếu thông tin")
      return
    }

    if (formData.images.length === 0) {
      showWarning("Vui lòng upload ít nhất 1 hình ảnh", "Thiếu hình ảnh")
      return
    }

    const currentGroupName = groupName || localStorage.getItem('groupName')
    if (!currentGroupName) {
      showError('Không tìm thấy thông tin nhóm. Vui lòng quay lại trang nhóm.', 'Lỗi nhóm')
      setTimeout(() => window.location.href = '/group', 2000)
      return
    }

    try {
      const response = await fetch('/api/group-surveys/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          groupName: currentGroupName,
          activityNumber: 1,
          activityData: formData
        }),
      })

      const result = await response.json()

      if (result.success) {
        showSuccess("Đã hoàn thành Hoạt động 1!", "Thành công")
        setTimeout(() => window.location.href = "/group", 2000)
      } else {
        showError(result.error || 'Có lỗi xảy ra', 'Lỗi')
      }
    } catch (error) {
      console.error('Error submitting activity 1:', error)
      showError('Có lỗi xảy ra khi lưu dữ liệu. Vui lòng thử lại.', 'Lỗi kết nối')
    }
  }

  const criteria = [
    {
      number: 1,
      title: "Khả năng nổi và cân bằng",
      description: "Mô hình nổi ổn định, không bị nghiêng hoặc lật khi thử nghiệm trên nước.",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      number: 2,
      title: "Tính kín nước và bền vững",
      description: "Các mối ghép chắc chắn, không để nước tràn vào trong khoang.",
      color: "from-green-500 to-green-600"
    },
    {
      number: 3,
      title: "Cấu trúc kỹ thuật hợp lý",
      description: "Thiết kế thân, đáy, mạn thuyền cân đối, đảm bảo khả năng chịu lực và vận hành.",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      number: 4,
      title: "Ứng dụng AI trong thiết kế",
      description: "Sử dụng hiệu quả các công cụ AI trong các bước thiết kế.",
      color: "from-purple-500 to-purple-600"
    },
    {
      number: 5,
      title: "Tính sáng tạo và thẩm mỹ",
      description: "Có yếu tố mới, đẹp mắt, phù hợp mục tiêu sử dụng và thân thiện với môi trường.",
      color: "from-pink-500 to-pink-600"
    },
    {
      number: 6,
      title: "Hiệu quả hoạt động thực tế",
      description: "Thuyền di chuyển hoặc vận hành được trên nước, đạt tiêu chí 'nổi - ổn định - an toàn'.",
      color: "from-orange-500 to-orange-600"
    },
    {
      number: 7,
      title: "Trình bày và báo cáo",
      description: "Hồ sơ thiết kế rõ ràng, thuyết minh mạch lạc, thể hiện được tư duy kỹ thuật.",
      color: "from-blue-500 to-blue-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <NotificationComponent />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <BackButton href="/group" />

        {/* Header */}
        <Card className="p-8 bg-gradient-to-r from-violet-500 to-violet-600 text-white border-0 mb-6">
          <div className="flex items-center gap-4">
            <div className="text-5xl">🌊</div>
            <div>
              <h1 className="text-3xl font-bold">
                Hoạt động 1: Bí ẩn dòng nước
              </h1>
            </div>
          </div>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Tiêu chí đánh giá */}
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-violet-600 mb-2">
                📋 Tiêu chí đánh giá
              </h2>
              <p className="text-gray-600 text-sm">
                Các tiêu chí đánh giá sản phẩm thiết kế của nhóm
              </p>
            </div>
            
            <div className="space-y-3">
              {criteria.map((criterion) => (
                <div key={criterion.number} className="flex gap-3 p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg border border-violet-100 hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white text-sm font-bold">
                    {criterion.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {criterion.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {criterion.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Ô nhập prompt ý tưởng */}
          <Card className="p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-violet-600 mb-2">
                💡 Ý tưởng Prompt
              </h2>
              <p className="text-gray-600 text-sm">
                Nhập prompt ý tưởng thiết kế của nhóm bạn
              </p>
            </div>
            
            <Textarea
              rows={6}
              placeholder="Ví dụ: Thiết kế một chiếc thuyền nhỏ có khả năng nổi tốt, cân bằng, và an toàn cho trẻ em sử dụng trong mùa nước nổi..."
              value={formData.ideaPrompt}
              onChange={(e) => setFormData(prev => ({ ...prev, ideaPrompt: e.target.value }))}
              required
              className="resize-none text-base"
            />
          </Card>

          {/* Upload hình ảnh */}
          <Card className="p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-violet-600 mb-2">
                📸 Hình ảnh minh họa
              </h2>
              <p className="text-gray-600 text-sm">
                Upload hình ảnh thiết kế, bản vẽ hoặc sản phẩm của nhóm (tối đa 10 ảnh)
              </p>
            </div>
            
            <MultiImageUpload
              label="Hình ảnh"
              value={formData.images}
              onChange={(urls) => setFormData(prev => ({ ...prev, images: urls }))}
              studentId={groupName || 'group'}
              maxImages={10}
            />
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              size="lg"
              className="bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white px-8 py-6 text-lg"
            >
              Hoàn thành hoạt động
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
