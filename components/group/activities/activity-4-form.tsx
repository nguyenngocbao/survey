"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BackButton } from "@/components/ui/back-button"

interface Activity4FormData {
  // A. Tự đánh giá nhóm mình
  selfEvaluation: {
    strengths: string
    weaknesses: string
    improvements: Array<{
      id: number
      improvement: string
    }>
  }

  // B. Đánh giá nhóm bạn
  peerEvaluation: {
    strengths: string
    weaknesses: string
    improvements: Array<{
      id: number
      improvement: string
    }>
  }

  // C. Đánh giá vai trò và tác dụng của AI trong dự án
  aiEvaluation: {
    ratings: {
      creativity: number
      simulation: number
      analysis: number
      presentation: number
    }
    notes: {
      creativity: string
      simulation: string
      analysis: string
      presentation: string
    }
    aiImpact: string
    aiLimitations: string
  }
}

export default function Activity4Form() {
  const [formData, setFormData] = useState<Activity4FormData>({
    selfEvaluation: {
      strengths: "",
      weaknesses: "",
      improvements: [
        { id: 1, improvement: "" },
        { id: 2, improvement: "" },
      ],
    },
    peerEvaluation: {
      strengths: "",
      weaknesses: "",
      improvements: [
        { id: 1, improvement: "" },
        { id: 2, improvement: "" },
      ],
    },
    aiEvaluation: {
      ratings: {
        creativity: 0,
        simulation: 0,
        analysis: 0,
        presentation: 0,
      },
      notes: {
        creativity: "",
        simulation: "",
        analysis: "",
        presentation: "",
      },
      aiImpact: "",
      aiLimitations: "",
    },
  })

  const handleSelfEvaluationChange = (
    field: keyof Activity4FormData["selfEvaluation"],
    value: string | Array<{ id: number; improvement: string }>
  ) => {
    setFormData((prev) => ({
      ...prev,
      selfEvaluation: {
        ...prev.selfEvaluation,
        [field]: value,
      },
    }))
  }

  const handlePeerEvaluationChange = (
    field: keyof Activity4FormData["peerEvaluation"],
    value: string | Array<{ id: number; improvement: string }>
  ) => {
    setFormData((prev) => ({
      ...prev,
      peerEvaluation: {
        ...prev.peerEvaluation,
        [field]: value,
      },
    }))
  }

  const handleAIEvaluationChange = (
    section: "ratings" | "notes",
    field: string,
    value: number | string
  ) => {
    setFormData((prev) => ({
      ...prev,
      aiEvaluation: {
        ...prev.aiEvaluation,
        [section]: {
          ...prev.aiEvaluation[section],
          [field]: value,
        },
      },
    }))
  }

  const handleAITextChange = (field: "aiImpact" | "aiLimitations", value: string) => {
    setFormData((prev) => ({
      ...prev,
      aiEvaluation: {
        ...prev.aiEvaluation,
        [field]: value,
      },
    }))
  }

  const updateImprovement = (
    section: "selfEvaluation" | "peerEvaluation",
    index: number,
    value: string
  ) => {
    const currentImprovements = formData[section].improvements
    const updatedImprovements = currentImprovements.map((item, i) =>
      i === index ? { ...item, improvement: value } : item
    )
    
    if (section === "selfEvaluation") {
      handleSelfEvaluationChange("improvements", updatedImprovements)
    } else {
      handlePeerEvaluationChange("improvements", updatedImprovements)
    }
  }

  const addImprovement = (section: "selfEvaluation" | "peerEvaluation") => {
    const currentImprovements = formData[section].improvements
    if (currentImprovements.length < 5) {
      const newImprovement = {
        id: currentImprovements.length + 1,
        improvement: "",
      }
      const updatedImprovements = [...currentImprovements, newImprovement]
      
      if (section === "selfEvaluation") {
        handleSelfEvaluationChange("improvements", updatedImprovements)
      } else {
        handlePeerEvaluationChange("improvements", updatedImprovements)
      }
    }
  }

  const removeImprovement = (section: "selfEvaluation" | "peerEvaluation", index: number) => {
    const currentImprovements = formData[section].improvements
    if (currentImprovements.length > 1) {
      const updatedImprovements = currentImprovements
        .filter((_, i) => i !== index)
        .map((item, i) => ({ ...item, id: i + 1 }))
      
      if (section === "selfEvaluation") {
        handleSelfEvaluationChange("improvements", updatedImprovements)
      } else {
        handlePeerEvaluationChange("improvements", updatedImprovements)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation - check if fields are filled
    // Validate self evaluation
    if (!formData.selfEvaluation.strengths.trim()) {
      alert("Tự đánh giá - Ưu điểm: Vui lòng nhập nội dung")
      return
    }
    if (!formData.selfEvaluation.weaknesses.trim()) {
      alert("Tự đánh giá - Nhược điểm: Vui lòng nhập nội dung")
      return
    }

    // Validate peer evaluation
    if (!formData.peerEvaluation.strengths.trim()) {
      alert("Đánh giá nhóm bạn - Ưu điểm: Vui lòng nhập nội dung")
      return
    }
    if (!formData.peerEvaluation.weaknesses.trim()) {
      alert("Đánh giá nhóm bạn - Nhược điểm: Vui lòng nhập nội dung")
      return
    }

    // Validate AI evaluation ratings
    const ratings = Object.values(formData.aiEvaluation.ratings)
    if (ratings.some(rating => rating === 0)) {
      alert("Vui lòng đánh giá tất cả các hoạt động AI (chọn từ 1-5)")
      return
    }

    // Validate AI text fields
    if (!formData.aiEvaluation.aiImpact.trim()) {
      alert("Vui lòng mô tả tác động của AI")
      return
    }
    if (!formData.aiEvaluation.aiLimitations.trim()) {
      alert("Vui lòng mô tả hạn chế của AI")
      return
    }

    // Validate improvements
    const incompleteImprovements = [
      ...formData.selfEvaluation.improvements,
      ...formData.peerEvaluation.improvements
    ].some(item => !item.improvement.trim())
    
    if (incompleteImprovements) {
      alert("Vui lòng hoàn thành tất cả các biện pháp cải tiến")
      return
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
        <BackButton href="/group" />

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



        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section A: Tự đánh giá nhóm mình */}
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-blue-600 mb-4">
                A. Tự đánh giá nhóm mình
              </h3>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Ưu điểm
                </Label>
                <Textarea
                  value={formData.selfEvaluation.strengths}
                  onChange={(e) => handleSelfEvaluationChange("strengths", e.target.value)}
                  rows={4}
                  placeholder="Nhập các ưu điểm của nhóm mình..."
                  required
                  className="resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Nhập các ưu điểm của nhóm mình
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Nhược điểm
                </Label>
                <Textarea
                  value={formData.selfEvaluation.weaknesses}
                  onChange={(e) => handleSelfEvaluationChange("weaknesses", e.target.value)}
                  rows={4}
                  placeholder="Nhập các nhược điểm của nhóm mình..."
                  required
                  className="resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Nhập các nhược điểm của nhóm mình
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Đề xuất các biện pháp cải tiến sản phẩm nhóm mình:
                </Label>
                <div className="space-y-3">
                  {formData.selfEvaluation.improvements.map((item, index) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-8 px-2 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded text-center">
                        {item.id}
                      </div>
                      <Input
                        value={item.improvement}
                        onChange={(e) => updateImprovement("selfEvaluation", index, e.target.value)}
                        placeholder="Nhập biện pháp cải tiến..."
                        required
                        className="flex-1"
                      />
                      {formData.selfEvaluation.improvements.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeImprovement("selfEvaluation", index)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 w-8 h-8 p-0"
                        >
                          ×
                        </Button>
                      )}
                    </div>
                  ))}
                  
                  {formData.selfEvaluation.improvements.length < 5 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => addImprovement("selfEvaluation")}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-300"
                    >
                      + Thêm biện pháp
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Section B: Đánh giá nhóm bạn */}
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-blue-600 mb-4">
                B. Đánh giá nhóm bạn
              </h3>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Ưu điểm
                </Label>
                <Textarea
                  value={formData.peerEvaluation.strengths}
                  onChange={(e) => handlePeerEvaluationChange("strengths", e.target.value)}
                  rows={4}
                  placeholder="Nhập các ưu điểm của nhóm bạn..."
                  required
                  className="resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Nhập các ưu điểm của nhóm bạn
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Nhược điểm
                </Label>
                <Textarea
                  value={formData.peerEvaluation.weaknesses}
                  onChange={(e) => handlePeerEvaluationChange("weaknesses", e.target.value)}
                  rows={4}
                  placeholder="Nhập các nhược điểm của nhóm bạn..."
                  required
                  className="resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Nhập các nhược điểm của nhóm bạn
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Đề xuất các biện pháp cải tiến sản phẩm nhóm bạn:
                </Label>
                <div className="space-y-3">
                  {formData.peerEvaluation.improvements.map((item, index) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-8 px-2 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded text-center">
                        {item.id}
                      </div>
                      <Input
                        value={item.improvement}
                        onChange={(e) => updateImprovement("peerEvaluation", index, e.target.value)}
                        placeholder="Nhập biện pháp cải tiến..."
                        required
                        className="flex-1"
                      />
                      {formData.peerEvaluation.improvements.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeImprovement("peerEvaluation", index)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 w-8 h-8 p-0"
                        >
                          ×
                        </Button>
                      )}
                    </div>
                  ))}
                  
                  {formData.peerEvaluation.improvements.length < 5 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => addImprovement("peerEvaluation")}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-300"
                    >
                      + Thêm biện pháp
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Section C: Đánh giá vai trò và tác dụng của AI trong dự án */}
          <Card className="p-6">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-blue-600 mb-4">
                C. Đánh giá vai trò và tác dụng của AI trong dự án
              </h3>

              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Đánh giá mức độ hữu ích của AI (1 = ít hữu ích, 5 = cực kỳ hữu ích)
                </Label>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-blue-100">
                        <th className="border border-gray-300 p-3 text-left font-semibold">
                          Hoạt động
                        </th>
                        <th className="border border-gray-300 p-3 text-center font-semibold w-12">1</th>
                        <th className="border border-gray-300 p-3 text-center font-semibold w-12">2</th>
                        <th className="border border-gray-300 p-3 text-center font-semibold w-12">3</th>
                        <th className="border border-gray-300 p-3 text-center font-semibold w-12">4</th>
                        <th className="border border-gray-300 p-3 text-center font-semibold w-12">5</th>
                        <th className="border border-gray-300 p-3 text-left font-semibold">
                          Ghi chú
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          key: "creativity" as const,
                          label: "Hỗ trợ sáng tạo và phát triển ý tưởng thiết kế",
                        },
                        {
                          key: "simulation" as const,
                          label: "Hỗ trợ mô phỏng và kiểm tra nguyên lý kỹ thuật",
                        },
                        {
                          key: "analysis" as const,
                          label: "Hỗ trợ phân tích dữ liệu và đánh giá hiệu quả",
                        },
                        {
                          key: "presentation" as const,
                          label: "Hỗ trợ báo cáo, trình bày và trực quan hóa kết quả",
                        },
                      ].map((item) => (
                        <tr key={item.key} className="hover:bg-gray-50">
                          <td className="border border-gray-300 p-3">
                            {item.label}
                          </td>
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <td key={rating} className="border border-gray-300 p-3 text-center">
                              <input
                                type="radio"
                                name={`rating-${item.key}`}
                                value={rating}
                                checked={formData.aiEvaluation.ratings[item.key] === rating}
                                onChange={() => handleAIEvaluationChange("ratings", item.key, rating)}
                                className="w-4 h-4"
                                required
                              />
                            </td>
                          ))}
                          <td className="border border-gray-300 p-3">
                            <Input
                              value={formData.aiEvaluation.notes[item.key]}
                              onChange={(e) =>
                                handleAIEvaluationChange("notes", item.key, e.target.value)
                              }
                              placeholder="Ghi chú..."
                              className="w-full"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Nhận xét về tác động của AI:
                </Label>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      AI đã nâng cao chất lượng và hiệu quả dự án như thế nào:
                    </Label>
                    <Textarea
                      value={formData.aiEvaluation.aiImpact}
                      onChange={(e) => handleAITextChange("aiImpact", e.target.value)}
                      rows={4}
                      placeholder="Mô tả tác động tích cực của AI đối với dự án..."
                      required
                      className="resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Mô tả tác động tích cực của AI đối với dự án
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Những hạn chế hoặc khó khăn khi sử dụng AI:
                    </Label>
                    <Textarea
                      value={formData.aiEvaluation.aiLimitations}
                      onChange={(e) => handleAITextChange("aiLimitations", e.target.value)}
                      rows={4}
                      placeholder="Mô tả các hạn chế và khó khăn khi sử dụng AI..."
                      required
                      className="resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Mô tả các hạn chế và khó khăn khi sử dụng AI
                    </p>
                  </div>
                </div>
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
