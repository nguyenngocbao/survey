"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function Activity2Form() {
  const [question1, setQuestion1] = useState("")
  const [question2, setQuestion2] = useState(
    Array(3).fill({ principle: "", example: "" })
  )
  const [prompt1, setPrompt1] = useState("")
  const [result1, setResult1] = useState("")
  const [prompt2, setPrompt2] = useState("")
  const [result2, setResult2] = useState("")
  const [comparison, setComparison] = useState("")
  const [selectedIdeas, setSelectedIdeas] = useState<string[]>([])
  const [question4, setQuestion4] = useState("")
  const [question5, setQuestion5] = useState("")

  const updatePrinciple = (index: number, field: "principle" | "example", value: string) => {
    const newQ2 = [...question2]
    newQ2[index] = { ...newQ2[index], [field]: value }
    setQuestion2(newQ2)
  }

  const toggleIdea = (idea: string) => {
    setSelectedIdeas(prev => 
      prev.includes(idea) 
        ? prev.filter(i => i !== idea)
        : [...prev, idea]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (question1.length < 80) {
      alert("Câu 1: Vui lòng nhập ít nhất 80 ký tự")
      return
    }

    const allFilled = question2.every(item => 
      item.principle.length >= 10 && item.example.length >= 20
    )
    if (!allFilled) {
      alert("Câu 2: Vui lòng điền đầy đủ 3 nguyên tắc và ví dụ")
      return
    }

    if (!prompt1 || !result1 || !comparison) {
      alert("Câu 3: Vui lòng điền đầy đủ prompt, kết quả và so sánh")
      return
    }

    if (selectedIdeas.length === 0) {
      alert("Câu 3: Vui lòng chọn ít nhất 1 ý tưởng khả thi")
      return
    }

    if (question4.length < 150) {
      alert("Câu 4: Vui lòng nhập ít nhất 150 ký tự")
      return
    }

    if (question5.length < 150) {
      alert("Câu 5: Vui lòng nhập ít nhất 150 ký tự")
      return
    }

    alert("Đã hoàn thành Hoạt động 2!")
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
      <Card className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🔮</div>
          <div>
            <h1 className="text-2xl font-bold">Hoạt động 2: Bí mật thuyền sinh tồn</h1>
            <p className="text-pur
ple-100">Giải mã những bí mật huyền bí của sự sống</p>
          </div>
        </div>
      </Card>

      {/* Instruction Box */}
      <Card className="p-4 bg-purple-50 border-l-4 border-purple-500">
        <div className="flex gap-3">
          <div className="text-2xl">🔮</div>
          <p className="text-sm text-gray-700">
            Hoạt động theo nhóm 3-5 bạn. Quan sát video/hình ảnh, thảo luận, điền câu trả lời trực tiếp. 
            Sử dụng AI như trợ lý gợi ý, nhưng nhóm quyết định giữ hay điều chỉnh kết quả.
          </p>
        </div>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Question 1 */}
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label className="text-lg font-bold text-gray-800">
                Câu 1 - Phân tích yếu tố nổi và cân bằng
              </Label>
              <div className="mt-2 space-y-1 text-gray-700">
                <p>Quan sát các loại thuyền: đánh cá, du thuyền, thuyền chở hàng.</p>
                <p>Những yếu tố nào giúp thuyền nổi tốt và cân bằng ổn định?</p>
                <p>Theo nhóm, hình dạng, vật liệu và cấu trúc nào quan trọng nhất?</p>
                <p>Giải thích ngắn gọn lý do khoa học.</p>
              </div>
            </div>
            <Textarea
              value={question1}
              onChange={(e) => setQuestion1(e.target.value)}
              rows={6}
              placeholder="Nhóm ghi 3-5 yếu tố + lý do khoa học..."
              required
            />
            <p className="text-xs text-gray-500">{question1.length} / 80 ký tự tối thiểu</p>
          </div>
        </Card>

        {/* Question 2 */}
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label className="text-lg font-bold text-gray-800">
                Câu 2 - Nguyên tắc viết prompt AI
              </Label>
              <p className="text-gray-700 mt-2">
                Nhóm đề xuất 3 nguyên tắc viết prompt hiệu quả để AI gợi ý ý tưởng thuyền, kèm ví dụ minh họa ngắn.
              </p>
              <div className="text-sm text-gray-500 italic mt-2 space-y-1">
                <p>• Ngắn gọn + rõ mục tiêu → 'Gợi ý 3 kiểu thuyền từ vật liệu tái chế'</p>
                <p>• Cụ thể + chi tiết → 'Thuyền nhỏ, nổi tốt, dùng gỗ và chai nhựa'</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {question2.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm">Nguyên tắc {index + 1}</Label>
                    <Input
                      value={item.principle}
                      onChange={(e) => updatePrinciple(index, "principle", e.target.value)}
                      placeholder={`Nguyên tắc ${index + 1}`}
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Ví dụ minh họa</Label>
                    <Input
                      value={item.example}
                      onChange={(e) => updatePrinciple(index, "example", e.target.value)}
                      placeholder="Ví dụ prompt cụ thể"
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
                Câu 3 - Thử prompt & so sánh kết quả
              </Label>
              <div className="mt-2 space-y-1 text-gray-700">
                <p>Nhập 1-2 prompt khác nhau vào AI (ngắn, dài, cụ thể, mơ hồ).</p>
                <p>Ghi lại kết quả: hình dạng, vật liệu, ưu điểm.</p>
                <p>So sánh và thảo luận: tại sao kết quả khác nhau?</p>
                <p>Nhóm tick chọn các ý tưởng khả thi nhất để đưa vào bước tiếp theo.</p>
              </div>
            </div>

            {/* Prompt 1 */}
            <div className="space-y-3 p-4 bg-purple-50 rounded-lg">
              <div>
                <Label>Prompt thứ nhất *</Label>
                <Textarea
                  value={prompt1}
                  onChange={(e) => setPrompt1(e.target.value)}
                  rows={3}
                  placeholder="Nhập prompt đầu tiên..."
                  required
                />
              </div>
              <div>
                <Label>Kết quả từ AI (hình dạng, vật liệu, ưu điểm) *</Label>
                <Textarea
                  value={result1}
                  onChange={(e) => setResult1(e.target.value)}
                  rows={4}
                  placeholder="Ghi lại kết quả AI trả về..."
                  required
                />
              </div>
            </div>

            {/* Prompt 2 (Optional) */}
            <div className="space-y-3 p-4 bg-purple-50 rounded-lg">
              <div>
                <Label>Prompt thứ hai (tùy chọn)</Label>
                <Textarea
                  value={prompt2}
                  onChange={(e) => setPrompt2(e.target.value)}
                  rows={3}
                  placeholder="Nhập prompt thứ hai..."
                />
              </div>
              {prompt2 && (
                <div>
                  <Label>Kết quả từ AI</Label>
                  <Textarea
                    value={result2}
                    onChange={(e) => setResult2(e.target.value)}
                    rows={4}
                    placeholder="Ghi lại kết quả AI trả về..."
                  />
                </div>
              )}
            </div>

            {/* Comparison */}
            <div>
              <Label>Tại sao kết quả khác nhau? *</Label>
              <Textarea
                value={comparison}
                onChange={(e) => setComparison(e.target.value)}
                rows={5}
                placeholder="Nhóm thảo luận và phân tích..."
                required
              />
            </div>

            {/* Selected Ideas */}
            <div>
              <Label>Tick chọn ý tưởng khả thi *</Label>
              <div className="space-y-2 mt-2">
                {["Ý tưởng từ Prompt 1", "Ý tưởng từ Prompt 2", "Ý tưởng kết hợp"].map((idea) => (
                  <div key={idea} className="flex items-center space-x-2">
                    <Checkbox
                      id={idea}
                      checked={selectedIdeas.includes(idea)}
                      onCheckedChange={() => toggleIdea(idea)}
                    />
                    <label htmlFor={idea} className="text-sm text-gray-700 cursor-pointer">
                      {idea}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Question 4 */}
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label className="text-lg font-bold text-gray-800">
                Câu 4 - Chốt ý tưởng sơ bộ
              </Label>
              <div className="mt-2 space-y-1 text-gray-700">
                <p>Dựa trên các yếu tố khoa học, kết quả AI, và tiêu chí đánh giá ở Hoạt động 1:</p>
                <p>Nhóm chọn 1 ý tưởng khả thi nhất.</p>
                <p>Mô tả hoặc vẽ sơ bộ (bằng tay hoặc AI): hình dạng, vật liệu, nguyên lý nổi, ưu điểm nổi bật.</p>
              </div>
            </div>
            <div>
              <Label>Mô tả chi tiết ý tưởng thuyền *</Label>
              <Textarea
                value={question4}
                onChange={(e) => setQuestion4(e.target.value)}
                rows={8}
                placeholder="Hình dạng, vật liệu, nguyên lý nổi, ưu điểm..."
                required
              />
              <p className="text-xs text-gray-500 mt-1">{question4.length} / 150 ký tự tối thiểu</p>
            </div>
            <div>
              <Label>Tải lên hình vẽ hoặc phác thảo (tùy chọn)</Label>
              <Input
                type="file"
                accept="image/*,.pdf"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">Chấp nhận: JPG, PNG, PDF. Tối đa 5MB</p>
            </div>
          </div>
        </Card>

        {/* Question 5 */}
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label className="text-lg font-bold text-gray-800">
                Câu 5 - Phản biện & cải thiện
              </Label>
              <div className="mt-2 space-y-1 text-gray-700">
                <p>Giải thích tại sao ý tưởng này khả thi, khoa học, an toàn và phù hợp tiêu chí đánh giá.</p>
                <p>Nếu được thử nghiệm thực tế, nhóm sẽ chỉnh sửa gì để tối ưu hơn?</p>
              </div>
            </div>
            <Textarea
              value={question5}
              onChange={(e) => setQuestion5(e.target.value)}
              rows={8}
              placeholder="Nhóm phản biện và đề xuất cải thiện..."
              required
            />
            <p className="text-xs text-gray-500">{question5.length} / 150 ký tự tối thiểu</p>
          </div>
        </Card>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-6 text-lg"
        >
          Hoàn thành hoạt động
        </Button>
      </form>
    </div>
  )
}
