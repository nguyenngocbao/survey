"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface Activity3FormData {
  // 1. Phát triển ý tưởng
  aiPrompt: {
    purpose: string
    context: string
    criteria: string
    basicShape: string
    specialFunction: string
    fullPrompt: string
  }
  ideaImages: File[]

  // 2. Dựng mô hình 3D và tạo bản vẽ 2D
  model3D: string
  model3DImages: File[]
  drawing2D: {
    front: string
    top: string
    side: string
  }

  // 3. Chuyển sang bản vẽ CAD
  cadFiles: File[]

  // 4. Sản phẩm cuối cùng
  materials: string

  // 5. Bảng tự đánh giá
  selfAssessment: {
    criteriaCompliance: { achieved: boolean; note: string }
    model3DBalance: { achieved: boolean; note: string }
    drawing2DComplete: { achieved: boolean; note: string }
    cadAccuracy: { achieved: boolean; note: string }
    designLogic: { achieved: boolean; note: string }
  }
}

export default function Activity3Form() {
  const [formData, setFormData] = useState<Activity3FormData>({
    aiPrompt: {
      purpose: "",
      context: "",
      criteria: "",
      basicShape: "",
      specialFunction: "",
      fullPrompt: "",
    },
    ideaImages: [],
    model3D: "",
    model3DImages: [],
    drawing2D: {
      front: "",
      top: "",
      side: "",
    },
    cadFiles: [],
    materials: "",
    selfAssessment: {
      criteriaCompliance: { achieved: false, note: "" },
      model3DBalance: { achieved: false, note: "" },
      drawing2DComplete: { achieved: false, note: "" },
      cadAccuracy: { achieved: false, note: "" },
      designLogic: { achieved: false, note: "" },
    },
  })

  const handlePromptChange = (
    field: keyof Activity3FormData["aiPrompt"],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      aiPrompt: {
        ...prev.aiPrompt,
        [field]: value,
      },
    }))
  }

  const handleDrawing2DChange = (
    field: keyof Activity3FormData["drawing2D"],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      drawing2D: {
        ...prev.drawing2D,
        [field]: value,
      },
    }))
  }

  const handleAssessmentChange = (
    criterion: keyof Activity3FormData["selfAssessment"],
    field: "achieved" | "note",
    value: boolean | string
  ) => {
    setFormData((prev) => ({
      ...prev,
      selfAssessment: {
        ...prev.selfAssessment,
        [criterion]: {
          ...prev.selfAssessment[criterion],
          [field]: value,
        },
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (formData.aiPrompt.fullPrompt.length < 50) {
      alert("Vui lòng nhập đầy đủ prompt AI (tối thiểu 50 ký tự)")
      return
    }

    if (formData.model3D.length < 30) {
      alert("Vui lòng mô tả mô hình 3D (tối thiểu 30 ký tự)")
      return
    }

    // Note: 2D drawing images are now file uploads, validation can be added if needed

    if (formData.materials.length < 30) {
      alert("Vui lòng mô tả nguyên vật liệu cần chuẩn bị (tối thiểu 30 ký tự)")
      return
    }

    // TODO: Submit to API
    console.log("Activity 3 data:", formData)

    alert("Đã hoàn thành Hoạt động 3!")
    window.location.href = "/group"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
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
        <Card className="p-8 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white border-0 mb-6">
          <div className="flex items-center gap-4">
            <div className="text-5xl">🗺️</div>
            <div>
              <h1 className="text-3xl font-bold">
                Hoạt động 3: Thiết kế kỳ diệu
              </h1>
            </div>
          </div>
        </Card>

        {/* Purpose Box */}
        <Card className="p-6 bg-indigo-50 border-l-4 border-indigo-500 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-3xl">🎯</span>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-lg">
                I. Mục tiêu
              </h3>
              <ul className="text-gray-700 space-y-2">
                <li>
                  • Tạo phác thảo thiết kế thuyền ban đầu đạt tiêu chí: nổi –
                  ổn định – an toàn – thân thiện môi trường.
                </li>
                <li>
                  • Ứng dụng AI (Gemini, ChatGPT, Meshy AI) để tạo chuỗi bản vẽ
                  kỹ thuật hoàn chỉnh: Ý tưởng → 3D → 2D → CAD.
                </li>
                <li>
                  • Hình thành tư duy thiết kế kỹ thuật dựa trên nguyên lý, kết
                  cấu, vật liệu đã phân tích.
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
          {/* Section 1: Phát triển ý tưởng */}
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-indigo-600 mb-4">
                1. Phát triển ý tưởng
              </h3>

              <div className="bg-indigo-50 p-4 rounded-lg space-y-3">
                <p className="font-semibold text-gray-800">
                  Prompt AI định hướng:
                </p>

                <div>
                  <Label className="text-sm font-medium">Mục đích:</Label>
                  <Input
                    value={formData.aiPrompt.purpose}
                    onChange={(e) =>
                      handlePromptChange("purpose", e.target.value)
                    }
                    placeholder="Nhập mục đích..."
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Bối cảnh:</Label>
                  <Input
                    value={formData.aiPrompt.context}
                    onChange={(e) =>
                      handlePromptChange("context", e.target.value)
                    }
                    placeholder="Nhập bối cảnh..."
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Tiêu chí:</Label>
                  <Input
                    value={formData.aiPrompt.criteria}
                    onChange={(e) =>
                      handlePromptChange("criteria", e.target.value)
                    }
                    placeholder="Nhập tiêu chí..."
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">
                    Hình dạng cơ bản:
                  </Label>
                  <Input
                    value={formData.aiPrompt.basicShape}
                    onChange={(e) =>
                      handlePromptChange("basicShape", e.target.value)
                    }
                    placeholder="Nhập hình dạng cơ bản..."
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">
                    Chức năng đặc biệt:
                  </Label>
                  <Input
                    value={formData.aiPrompt.specialFunction}
                    onChange={(e) =>
                      handlePromptChange("specialFunction", e.target.value)
                    }
                    placeholder="Nhập chức năng đặc biệt..."
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Prompt của tôi:
                </Label>
                <Textarea
                  value={formData.aiPrompt.fullPrompt}
                  onChange={(e) =>
                    handlePromptChange("fullPrompt", e.target.value)
                  }
                  rows={6}
                  placeholder="Nhập prompt đầy đủ của bạn..."
                  required
                  className="resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.aiPrompt.fullPrompt.length} / 50 ký tự tối thiểu
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Ảnh minh họa ý tưởng:
                </Label>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    if (e.target.files) {
                      setFormData((prev) => ({
                        ...prev,
                        ideaImages: Array.from(e.target.files || []),
                      }))
                    }
                  }}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Chấp nhận: JPG, PNG. Có thể tải nhiều ảnh
                </p>
              </div>
            </div>
          </Card>

          {/* Section 2: Dựng mô hình 3D và tạo bản vẽ 2D */}
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-indigo-600 mb-4">
                2. Dựng mô hình 3D và tạo bản vẽ 2D (Pha 3.2 – 15 phút)
              </h3>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Mô hình 3D:
                </Label>
                <Textarea
                  value={formData.model3D}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      model3D: e.target.value,
                    }))
                  }
                  rows={4}
                  placeholder="Mô tả mô hình 3D..."
                  required
                  className="resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.model3D.length} / 30 ký tự tối thiểu
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Tải lên ảnh mô hình 3D:
                </Label>
                <Input
                  type="file"
                  accept="image/*,.obj,.stl"
                  multiple
                  onChange={(e) => {
                    if (e.target.files) {
                      setFormData((prev) => ({
                        ...prev,
                        model3DImages: Array.from(e.target.files || []),
                      }))
                    }
                  }}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Chấp nhận: JPG, PNG, OBJ, STL
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <p className="font-semibold text-gray-800">Ảnh kỹ thuật 2D:</p>

                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Mặt đứng:
                  </Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        // Store file for front view
                        const file = e.target.files[0]
                        console.log("Front view file:", file.name)
                      }
                    }}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Tải lên ảnh mặt đứng (JPG, PNG)
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Mặt bằng:
                  </Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        // Store file for top view
                        const file = e.target.files[0]
                        console.log("Top view file:", file.name)
                      }
                    }}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Tải lên ảnh mặt bằng (JPG, PNG)
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Mặt cạnh:
                  </Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        // Store file for side view
                        const file = e.target.files[0]
                        console.log("Side view file:", file.name)
                      }
                    }}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Tải lên ảnh mặt cạnh (JPG, PNG)
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Section 3: Chuyển sang bản vẽ CAD */}
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-indigo-600 mb-4">
                3. Chuyển sang bản vẽ CAD (Pha 3.3 – 10 phút)
              </h3>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  File CAD/Hình ảnh CAD:
                </Label>
                <Input
                  type="file"
                  accept=".dwg,.dxf,.pdf,image/*"
                  multiple
                  onChange={(e) => {
                    if (e.target.files) {
                      setFormData((prev) => ({
                        ...prev,
                        cadFiles: Array.from(e.target.files || []),
                      }))
                    }
                  }}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Chấp nhận: DWG, DXF, PDF, JPG, PNG
                </p>
              </div>
            </div>
          </Card>

          {/* Section 4: Sản phẩm cuối cùng */}
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-indigo-600 mb-4">
                III. Sản phẩm cuối cùng
              </h3>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <p className="text-gray-700 font-medium mb-2">
                  Chuỗi bản vẽ hoàn chỉnh:
                </p>
                <p className="text-sm text-gray-600">
                  Ảnh ý tưởng → Mô hình 3D → 3 ảnh kỹ thuật 2D → File CAD
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Chuẩn bị cho Hoạt động 4 (Chế tạo mô hình) - Nguyên vật liệu
                  cần chuẩn bị:
                </Label>
                <Textarea
                  value={formData.materials}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      materials: e.target.value,
                    }))
                  }
                  rows={5}
                  placeholder="Liệt kê các nguyên vật liệu cần chuẩn bị..."
                  required
                  className="resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.materials.length} / 30 ký tự tối thiểu
                </p>
              </div>
            </div>
          </Card>

          {/* Section 5: Bảng tự đánh giá */}
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-indigo-600 mb-4">
                IV. Bảng tự đánh giá
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-indigo-100">
                      <th className="border border-gray-300 p-3 text-left font-semibold">
                        Tiêu chí
                      </th>
                      <th className="border border-gray-300 p-3 text-center font-semibold w-24">
                        Đạt
                      </th>
                      <th className="border border-gray-300 p-3 text-center font-semibold w-24">
                        Chưa đạt
                      </th>
                      <th className="border border-gray-300 p-3 text-left font-semibold">
                        Ghi chú
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        key: "criteriaCompliance" as const,
                        label: "Ý tưởng tuân thủ tiêu chí kỹ thuật",
                      },
                      {
                        key: "model3DBalance" as const,
                        label: "Mô hình 3D cân đối, hợp lý",
                      },
                      {
                        key: "drawing2DComplete" as const,
                        label: "Ảnh 2D đủ ba mặt chiếu",
                      },
                      {
                        key: "cadAccuracy" as const,
                        label: "Bản vẽ CAD chính xác",
                      },
                      {
                        key: "designLogic" as const,
                        label: "Hồ sơ thiết kế logic, mạch lạc",
                      },
                    ].map((item) => (
                      <tr key={item.key} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-3">
                          {item.label}
                        </td>
                        <td className="border border-gray-300 p-3 text-center">
                          <Checkbox
                            checked={
                              formData.selfAssessment[item.key].achieved
                            }
                            onCheckedChange={(checked) =>
                              handleAssessmentChange(
                                item.key,
                                "achieved",
                                checked === true
                              )
                            }
                          />
                        </td>
                        <td className="border border-gray-300 p-3 text-center">
                          <Checkbox
                            checked={
                              !formData.selfAssessment[item.key].achieved
                            }
                            onCheckedChange={(checked) =>
                              handleAssessmentChange(
                                item.key,
                                "achieved",
                                checked !== true
                              )
                            }
                          />
                        </td>
                        <td className="border border-gray-300 p-3">
                          <Input
                            value={formData.selfAssessment[item.key].note}
                            onChange={(e) =>
                              handleAssessmentChange(
                                item.key,
                                "note",
                                e.target.value
                              )
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
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-8 py-6 text-lg"
            >
              Hoàn thành hoạt động
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
