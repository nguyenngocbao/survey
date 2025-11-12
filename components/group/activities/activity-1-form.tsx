"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Activity1Form() {
  // State for all questions
  const [question1, setQuestion1] = useState("")
  const [question2, setQuestion2] = useState(
    Array(5).fill({ criterion: "", reason: "" })
  )
  const [question3, setQuestion3] = useState(
    Array(5).fill("")
  )
  const [question4, setQuestion4] = useState("")
  const [question5, setQuestion5] = useState("")

  const updateCriterion = (index: number, field: "criterion" | "reason", value: string) => {
    const newQ2 = [...question2]
    newQ2[index] = { ...newQ2[index], [field]: value }
    setQuestion2(newQ2)
  }

  const updateCategory = (index: number, value: string) => {
    const newQ3 = [...question3]
    newQ3[index] = value
    setQuestion3(newQ3)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (question1.length < 50) {
      alert("Câu 1: Vui lòng nhập ít nhất 50 ký tự")
      return
    }

    // Check all criteria filled
    const allFilled = question2.every(item => 
      item.criterion.length >= 10 && item.reason.length >= 15
    )
    if (!allFilled) {
      alert("Câu 2: Vui lòng điền đầy đủ 5 tiêu chí và lý do")
      return
    }

    // Check all categorized
    if (question3.some(cat => !cat)) {
      alert("Câu 3: Vui lòng phân loại tất cả 5 tiêu chí")
      return
    }

    if (question4.length < 100) {
      alert("Câu 4: Vui lòng nhập ít nhất 100 ký tự")
      return
    }

    if (question5.length < 150) {
      alert("Câu 5: Vui lòng nhập ít nhất 150 ký tự")
      return
    }

    // Save data
    const data = {
      question1: { factors: question1 },
      question2: { criteria: question2 },
      question3: { 
        categorization: question2.map((item, idx) => ({
          criterion: item.criterion,
          category: question3[idx]
        }))
      },
      question4: { aiAnalysis: question4 },
      question5: { finalCriteria: question5 },
    }

    console.log("Saving Activity 1:", data)
    // TODO: Call API
    alert("Đã hoàn thành Hoạt động 1!")
    window.location.href = "/group"
  }

  return (
    <div className="w-full max-w-4xl space-y-6">
      {/* Back Button */}
      <a
        href="/group"
        className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors font-medium"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Quay lại
      </a>

      {/* Header */}
      <Card className="p-6 bg-gradient-to-r from-violet-500 to-violet-600 text-white border-0">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🌊</div>
          <div>
            <h1 className="text-2xl font-bold">Hoạt động 1: Bí ẩn đại dương</h1>
            <p className="text-violet-100">Khám phá những bí ẩn dưới đáy đại dương</p>
          </div>
        </div>
      </Card>

      {/* Instruction Box */}
      <Card className="p-4 bg-blue-50 border-l-4 border-blue-500">
        <div className="flex gap-3">
          <div className="text-2xl">🌊</div>
          <p className="text-sm text-gray-700">
            Nhóm 3-5 bạn là thuyền trưởng và kỹ sư, đang thử nghiệm thuyền vượt lũ. 
            Trả lời từng câu trên web hoặc điện thoại. Bạn có thể dùng AI như 'trợ lý thông minh', 
            nhưng nhóm là người quyết định cuối cùng.
          </p>
        </div>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Question 1 */}
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label className="text-lg font-bold text-gray-800">
                Câu 1 - Nhập vai sinh tồn
              </Label>
              <p className="text-gray-700 mt-2">
                Bạn là một chiếc thuyền đang lướt giữa sông nước nổi sóng. Sóng lớn, gió mạnh xuất hiện…
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li>Điều gì khiến bạn nổi được hay chìm xuống?</li>
                <li>Điều gì khiến bạn dễ nghiêng hoặc khó giữ thăng bằng?</li>
              </ul>
              <p className="text-sm text-gray-500 italic mt-2">
                Ví dụ minh họa: chiều dài/thân rộng, vật liệu, trọng lượng, trọng tâm, đáy thuyền.
              </p>
            </div>
            <Textarea
              value={question1}
              onChange={(e) => setQuestion1(e.target.value)}
              rows={6}
              placeholder="Nhóm ghi 3-5 yếu tố..."
              required
              className="w-full"
            />
            <p className="text-xs text-gray-500">{question1.length} / 50 ký tự tối thiểu</p>
          </div>
        </Card>

        {/* Question 2 */}
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label className="text-lg font-bold text-gray-800">
                Câu 2 - Thử thách kỹ sư
              </Label>
              <p className="text-gray-700 mt-2">Bạn là kỹ sư thiết kế thuyền.</p>
              <p className="text-gray-700">Viết ra 5 tiêu chí quan trọng nhất để thuyền vượt sóng an toàn và bền lâu.</p>
              <p className="text-gray-700">Mỗi tiêu chí đi kèm 1 lý do ngắn gọn.</p>
              <p className="text-sm text-gray-500 italic mt-2">
                Ví dụ: 'Thân thuyền rộng → giúp thuyền ổn định trên sóng lớn'
              </p>
            </div>
            
            <div className="space-y-3">
              {question2.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm">Tiêu chí {index + 1}</Label>
                    <Input
                      value={item.criterion}
                      onChange={(e) => updateCriterion(index, "criterion", e.target.value)}
                      placeholder={`Tiêu chí ${index + 1}`}
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Lý do</Label>
                    <Input
                      value={item.reason}
                      onChange={(e) => updateCriterion(index, "reason", e.target.value)}
                      placeholder="Lý do cho tiêu chí này"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Question 3 */}
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label className="text-lg font-bold text-gray-800">
                Câu 3 - Kho báu phân loại
              </Label>
              <p className="text-gray-700 mt-2">
                Nhóm bạn có 4 kho báu: Kỹ thuật - Thẩm mỹ - Kinh tế - Bền vững.
              </p>
              <p className="text-gray-700">
                Hãy xếp các tiêu chí vừa viết vào kho báu phù hợp.
              </p>
              <p className="text-sm text-gray-500 italic mt-2">
                Ví dụ: 'Thân thuyền bằng gỗ nhẹ → Kỹ thuật; màu sắc → Thẩm mỹ'
              </p>
            </div>

            <div className="space-y-3">
              {question2.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.criterion || `Tiêu chí ${index + 1}`}</p>
                    <p className="text-sm text-gray-600">{item.reason}</p>
                  </div>
                  <div className="w-48">
                    <Select
                      value={question3[index]}
                      onValueChange={(value) => updateCategory(index, value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn kho báu" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Kỹ thuật">Kỹ thuật</SelectItem>
                        <SelectItem value="Thẩm mỹ">Thẩm mỹ</SelectItem>
                        <SelectItem value="Kinh tế">Kinh tế</SelectItem>
                        <SelectItem value="Bền vững">Bền vững</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Question 4 */}
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label className="text-lg font-bold text-gray-800">
                Câu 4 - Trợ lý AI thám hiểm
              </Label>
              <p className="text-gray-700 mt-2">
                Hỏi AI: 'Gợi ý 5 tiêu chí đánh giá thuyền vùng ngập lũ'.
              </p>
              <p className="text-gray-700">
                Tiêu chí nào giữ lại, điều chỉnh hay loại bỏ? Tại sao?
              </p>
              <p className="text-sm text-gray-500 italic mt-2">
                Ví dụ gợi ý AI: 'Chống lật, tiết kiệm vật liệu, dễ sửa chữa, chịu nước, an toàn cho người dùng'
              </p>
            </div>
            <Textarea
              value={question4}
              onChange={(e) => setQuestion4(e.target.value)}
              rows={8}
              placeholder="Nhóm thảo luận và ghi lại quyết định về các tiêu chí từ AI..."
              required
            />
            <p className="text-xs text-gray-500">{question4.length} / 100 ký tự tối thiểu</p>
          </div>
        </Card>

        {/* Question 5 */}
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label className="text-lg font-bold text-gray-800">
                Câu 5 - Chốt tiêu chí & phiêu lưu cuối
              </Label>
              <p className="text-gray-700 mt-2">
                Nhóm bạn chốt bộ tiêu chí cuối cùng (ít nhất 5 tiêu chí).
              </p>
              <p className="text-gray-700">
                Giải thích tại sao bộ tiêu chí này khoa học, khách quan và dễ áp dụng.
              </p>
              <p className="text-sm text-gray-500 italic mt-2">
                Ví dụ: 'Thân rộng + nhẹ → ổn định; vật liệu bền → tuổi thọ cao'
              </p>
            </div>
            <Textarea
              value={question5}
              onChange={(e) => setQuestion5(e.target.value)}
              rows={8}
              placeholder="Nhóm ghi bộ tiêu chí cuối cùng và giải thích..."
              required
            />
            <p className="text-xs text-gray-500">{question5.length} / 150 ký tự tối thiểu</p>
          </div>
        </Card>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white font-semibold py-6 text-lg"
        >
          Hoàn thành hoạt động
        </Button>
      </form>
    </div>
  )
}
