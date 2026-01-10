"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { BackButton } from "@/components/ui/back-button"
import { useNotification } from "@/components/ui/notification-popup"

interface Activity2FormData {
  question1: string
  question2: string
  question3: string
  question4: Array<{
    step: string
    aiTool: string
    usage: string
  }>
}

export function Activity2Form() {
  const [formData, setFormData] = useState<Activity2FormData>({
    question1: "",
    question2: "",
    question3: "",
    question4: Array(3)
      .fill(null)
      .map(() => ({
        step: "",
        aiTool: "",
        usage: "",
      })),
  })
  const [isLoading, setIsLoading] = useState(true)
  const [groupName, setGroupName] = useState<string | null>(null)
  const { showError, showSuccess, showWarning, NotificationComponent } = useNotification()

  // Load existing data on component mount
  useEffect(() => {
    const loadExistingData = async () => {
      const storedGroupName = localStorage.getItem('groupName')
      
      if (!storedGroupName) {
        // No group name, redirect to group page
        showError('Vui lòng chọn nhóm trước khi làm hoạt động', 'Thiếu thông tin nhóm')
        setTimeout(() => {
          window.location.href = '/group'
        }, 2000)
        return
      }

      setGroupName(storedGroupName)

      // Try to load existing activity data
      try {
        const response = await fetch(`/api/group-surveys/activities?groupName=${encodeURIComponent(storedGroupName)}&activityNumber=2`)
        
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    )
  }

  const handleChange = (field: "question1" | "question2" | "question3", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleTableChange = (
    index: number,
    field: "step" | "aiTool" | "usage",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      question4: prev.question4.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }))
  }

  const addTableRow = () => {
    if (formData.question4.length < 7) {
      setFormData((prev) => ({
        ...prev,
        question4: [
          ...prev.question4,
          {
            step: "",
            aiTool: "",
            usage: "",
          },
        ],
      }))
    }
  }

  const removeTableRow = (index: number) => {
    if (formData.question4.length > 1) {
      setFormData((prev) => ({
        ...prev,
        question4: prev.question4.filter((_, i) => i !== index),
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation - check if text questions are filled
    const textQuestions = [
      { field: "question1", label: "Câu 1" },
      { field: "question2", label: "Câu 2" },
      { field: "question3", label: "Câu 3" },
    ]

    for (const q of textQuestions) {
      if (!formData[q.field as keyof Pick<Activity2FormData, "question1" | "question2" | "question3">].trim()) {
        showError(`${q.label}: Vui lòng nhập câu trả lời`, 'Thiếu thông tin')
        return
      }
    }

    // Validation for table - check if fields are filled
    const incompleteTable = formData.question4.some(
      (item) => !item.step.trim() || !item.aiTool.trim() || !item.usage.trim()
    )
    if (incompleteTable) {
      showError("Câu 4: Vui lòng hoàn thành tất cả các bước, công cụ AI và cách sử dụng", 'Thiếu thông tin')
      return
    }

    // Get group name from localStorage
    const currentGroupName = groupName || localStorage.getItem('groupName')
    if (!currentGroupName) {
      showError('Không tìm thấy thông tin nhóm. Vui lòng quay lại trang nhóm.', 'Thiếu thông tin nhóm')
      setTimeout(() => {
        window.location.href = '/group'
      }, 2000)
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
          activityNumber: 2,
          activityData: formData
        }),
      })

      const result = await response.json()

      if (result.success) {
        showSuccess("Đã hoàn thành Hoạt động 2!", 'Thành công')
        setTimeout(() => {
          window.location.href = "/group"
        }, 2000)
      } else {
        showError(`Lỗi: ${result.error}`, 'Lỗi lưu dữ liệu')
      }
    } catch (error) {
      console.error('Error submitting activity 2:', error)
      showError('Có lỗi xảy ra khi lưu dữ liệu. Vui lòng thử lại.', 'Lỗi hệ thống')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back Button */}
        <BackButton href="/group" />

        {/* Header */}
        <Card className="p-8 bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 mb-6">
          <div className="flex items-center gap-4">
            <div className="text-5xl">🔮</div>
            <div>
              <h1 className="text-3xl font-bold">
                Hoạt động 2: Khám phá thủy lực
              </h1>
            </div>
          </div>
        </Card>



        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question 1 */}
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-3">
                  Câu 1: Bạn sẽ điều chỉnh hình dạng và thể tích như thế nào để thuyền nổi tốt và ổn định?
                </h3>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Trả lời:
                </label>
                <Textarea
                  value={formData.question1}
                  onChange={(e) => handleChange("question1", e.target.value)}
                  rows={6}
                  placeholder="Nhập câu trả lời của nhóm..."
                  required
                  className="resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Nhập câu trả lời của nhóm
                </p>
              </div>
            </div>
          </Card>

          {/* Question 2 */}
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-3">
                  Câu 2: Vật liệu và kết cấu nào giúp thuyền vừa nhẹ, bền, vừa an toàn? Vì sao?
                </h3>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Trả lời:
                </label>
                <Textarea
                  value={formData.question2}
                  onChange={(e) => handleChange("question2", e.target.value)}
                  rows={6}
                  placeholder="Nhập câu trả lời của nhóm..."
                  required
                  className="resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Nhập câu trả lời của nhóm
                </p>
              </div>
            </div>
          </Card>

          {/* Question 3 */}
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-3">
                  Câu 3: Hãy nêu các bước chính để thiết kế một chiếc thuyền, dựa trên quy trình thiết kế kĩ thuật.
                </h3>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Trả lời:
                </label>
                <Textarea
                  value={formData.question3}
                  onChange={(e) => handleChange("question3", e.target.value)}
                  rows={6}
                  placeholder="Nhập câu trả lời của nhóm..."
                  required
                  className="resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Nhập câu trả lời của nhóm
                </p>
              </div>
            </div>
          </Card>

          {/* Question 4 - Table */}
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-3">
                  Câu 4: AI có thể giúp bạn làm gì ở các bước nào trong quá trình thiết kế kĩ thuật chiếc thuyền?
                </h3>
              </div>

              <div className="space-y-4">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 font-semibold text-sm text-gray-700 pb-3 border-b-2 border-gray-200">
                  <div className="col-span-3 text-center">Bước</div>
                  <div className="col-span-4">Công cụ AI (Tên hoặc mô tả)</div>
                  <div className="col-span-4">Cách sử dụng</div>
                  <div className="col-span-1 text-center">Thao tác</div>
                </div>

                {/* Table Rows */}
                {formData.question4.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-4 items-start">
                    <div className="col-span-3">
                      <Input
                        placeholder="Tên bước thiết kế..."
                        value={item.step}
                        onChange={(e) =>
                          handleTableChange(index, "step", e.target.value)
                        }
                        required
                        className="h-10"
                      />
                    </div>
                    <div className="col-span-4">
                      <Input
                        placeholder="ChatGPT, Gemini, CAD AI..."
                        value={item.aiTool}
                        onChange={(e) =>
                          handleTableChange(index, "aiTool", e.target.value)
                        }
                        required
                        className="h-10"
                      />
                    </div>
                    <div className="col-span-4">
                      <Textarea
                        rows={2}
                        placeholder="Mô tả cách sử dụng công cụ AI..."
                        value={item.usage}
                        onChange={(e) =>
                          handleTableChange(index, "usage", e.target.value)
                        }
                        required
                        className="resize-none"
                      />
                    </div>
                    <div className="col-span-1 flex justify-center">
                      {formData.question4.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTableRow(index)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 h-10 w-10 p-0"
                        >
                          ×
                        </Button>
                      )}
                    </div>
                  </div>
                ))}

                {/* Add Row Button */}
                {formData.question4.length < 7 && (
                  <div className="flex justify-center pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addTableRow}
                      className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 border-purple-300"
                    >
                      + Thêm bước
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-6 text-lg"
            >
              Hoàn thành hoạt động
            </Button>
          </div>
        </form>
      </div>
      <NotificationComponent />
    </div>
  )
}
