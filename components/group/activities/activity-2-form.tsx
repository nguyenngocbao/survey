"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Activity2FormData {
  question1: string
  question2: string
  question3: string
  question4: string
  question5: string
}

export function Activity2Form() {
  const [formData, setFormData] = useState<Activity2FormData>({
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
  })

  const handleChange = (field: keyof Activity2FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation - minimum 50 characters for each question
    const minLength = 50
    const questions = [
      { field: "question1", label: "Câu 1" },
      { field: "question2", label: "Câu 2" },
      { field: "question3", label: "Câu 3" },
      { field: "question4", label: "Câu 4" },
      { field: "question5", label: "Câu 5" },
    ]

    for (const q of questions) {
      if (formData[q.field as keyof Activity2FormData].length < minLength) {
        alert(`${q.label}: Vui lòng nhập ít nhất ${minLength} ký tự`)
        return
      }
    }

    // TODO: Submit to API
    console.log("Activity 2 data:", formData)

    alert("Đã hoàn thành Hoạt động 2!")
    window.location.href = "/group"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back Button */}
        <a
          href="/group"
          className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors font-medium mb-6"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Quay lại
        </a>

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

        {/* Purpose Box */}
        <Card className="p-6 bg-purple-50 border-l-4 border-purple-500 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-3xl">🎯</span>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-lg">
                I. Mục tiêu
              </h3>
              <ul className="text-gray-700 space-y-2">
                <li>
                  • Hình thành trực giác về lực đẩy Archimedes, thể tích chiếm
                  nước và ảnh hưởng của hình dạng đến độ nổi.
                </li>
                <li>
                  • Nhận diện vật liệu, kết cấu và nguyên lý kỹ thuật của
                  thuyền.
                </li>
                <li>
                  • Sử dụng AI để mở rộng phương án thiết kế và lựa chọn giải
                  pháp tối ưu.
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Tasks Section */}
        <Card className="p-6 bg-blue-50 border-l-4 border-blue-500 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-3xl">📝</span>
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">
                II. Nhiệm vụ học tập
              </h3>
            </div>
          </div>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question 1 */}
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-3">
                  Câu 1 – Nguyên lý nổi
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Nếu trọng lượng thuyền không đổi, bạn sẽ điều chỉnh hình dạng
                  và thể tích chiếm nước như thế nào để thuyền nổi tốt và ổn
                  định?
                </p>
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
                  {formData.question1.length} / 50 ký tự tối thiểu
                </p>
              </div>
            </div>
          </Card>

          {/* Question 2 */}
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-3">
                  Câu 2 – Kết cấu và vật liệu
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Bạn sẽ chọn vật liệu và kết cấu ra sao để thuyền vừa nhẹ,
                  bền, vừa an toàn? Giải thích dựa trên nguyên lý kỹ thuật đã
                  học.
                </p>
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
                  {formData.question2.length} / 50 ký tự tối thiểu
                </p>
              </div>
            </div>
          </Card>

          {/* Question 3 */}
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-3">
                  Câu 3 – Quy trình thiết kế
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Mô tả 3 bước quan trọng để biến ý tưởng thuyền từ prototype
                  đất sét thành phương án thiết kế AI, nêu công cụ hỗ trợ từng
                  bước.
                </p>
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
                  {formData.question3.length} / 50 ký tự tối thiểu
                </p>
              </div>
            </div>
          </Card>

          {/* Question 4 */}
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-3">
                  Câu 4 – So sánh và đánh giá
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Khi so sánh prototype đất sét và phương án AI, bạn nhận thấy
                  điểm mạnh – điểm yếu của mỗi phương án, và đâu là cơ sở để
                  chọn giải pháp tối ưu?
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Trả lời:
                </label>
                <Textarea
                  value={formData.question4}
                  onChange={(e) => handleChange("question4", e.target.value)}
                  rows={6}
                  placeholder="Nhập câu trả lời của nhóm..."
                  required
                  className="resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.question4.length} / 50 ký tự tối thiểu
                </p>
              </div>
            </div>
          </Card>

          {/* Question 5 */}
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-3">
                  Câu 5 – Phác thảo phương án tối ưu
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Mô tả thiết kế thuyền cuối cùng: hình dạng, vật liệu, kết
                  cấu, và các ưu điểm nổi bật liên quan đến nổi, ổn định và an
                  toàn.
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Trả lời:
                </label>
                <Textarea
                  value={formData.question5}
                  onChange={(e) => handleChange("question5", e.target.value)}
                  rows={6}
                  placeholder="Nhập câu trả lời của nhóm..."
                  required
                  className="resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.question5.length} / 50 ký tự tối thiểu
                </p>
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
    </div>
  )
}
