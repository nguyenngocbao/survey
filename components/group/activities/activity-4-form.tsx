"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Activity4FormData {
  question1: string
  question2: string
  question3: string
}

export default function Activity4Form() {
  const [formData, setFormData] = useState<Activity4FormData>({
    question1: "",
    question2: "",
    question3: "",
  })

  const handleChange = (field: keyof Activity4FormData, value: string) => {
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
      { field: "question1", label: "Câu hỏi 1" },
      { field: "question2", label: "Câu hỏi 2" },
      { field: "question3", label: "Câu hỏi 3" },
    ]

    for (const q of questions) {
      if (formData[q.field as keyof Activity4FormData].length < minLength) {
        alert(`${q.label}: Vui lòng nhập ít nhất ${minLength} ký tự`)
        return
      }
    }

    // TODO: Submit to API
    console.log("Activity 4 data:", formData)

    alert("Đã hoàn thành Hoạt động 4!")
    window.location.href = "/group"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
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
        <Card className="p-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 mb-6">
          <div className="flex items-center gap-4">
            <div className="text-5xl">✨</div>
            <div>
              <h1 className="text-3xl font-bold">
                Hoạt động 4: Bản vẽ toả sáng
              </h1>
            </div>
          </div>
        </Card>

        {/* Purpose Box */}
        <Card className="p-6 bg-blue-50 border-l-4 border-blue-500 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-3xl">🎯</span>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-lg">
                I. Mục tiêu
              </h3>
              <ul className="text-gray-700 space-y-2">
                <li>
                  • Trình bày và phản biện quy trình thiết kế thuyền.
                </li>
                <li>
                  • Đánh giá kết quả thử nghiệm và đề xuất cải tiến.
                </li>
                <li>
                  • Hoàn thiện hồ sơ kỹ thuật số và mô hình thuyền đáp ứng tiêu
                  chí: nổi - ổn định - an toàn - thân thiện môi trường.
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Tasks Section */}
        <Card className="p-6 bg-cyan-50 border-l-4 border-cyan-500 mb-8">
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
                <h3 className="text-xl font-bold text-blue-600 mb-3">
                  Quy trình thiết kế và kết quả thử nghiệm:
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Hãy mô tả ngắn gọn các bước thiết kế bạn thực hiện, kết quả
                  thử nghiệm nổi/chìm và các cải tiến đã đề xuất.
                </p>
              </div>
              <div>
                <Textarea
                  value={formData.question1}
                  onChange={(e) => handleChange("question1", e.target.value)}
                  rows={8}
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
                <h3 className="text-xl font-bold text-blue-600 mb-3">
                  Vai trò AI trong thiết kế và hoàn thiện hồ sơ:
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  AI đã hỗ trợ bạn những gì trong quá trình thiết kế, phân tích
                  và lập hồ sơ kỹ thuật?
                </p>
              </div>
              <div>
                <Textarea
                  value={formData.question2}
                  onChange={(e) => handleChange("question2", e.target.value)}
                  rows={8}
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
                <h3 className="text-xl font-bold text-blue-600 mb-3">
                  Hồ sơ kỹ thuật và đánh giá sản phẩm:
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Hồ sơ kỹ thuật của nhóm bạn có đầy đủ các bản vẽ, nhật ký, mô
                  hình và đáp ứng tiêu chí kỹ thuật không? Hãy tự đánh giá.
                </p>
              </div>
              <div>
                <Textarea
                  value={formData.question3}
                  onChange={(e) => handleChange("question3", e.target.value)}
                  rows={8}
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

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-6 text-lg"
            >
              Hoàn thành hoạt động
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
