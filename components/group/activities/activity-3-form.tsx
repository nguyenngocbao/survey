"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { BackButton } from "@/components/ui/back-button"
import { useNotification } from "@/components/ui/notification-popup"

interface Activity3FormData {
  // 1. Phát triển ý tưởng
  section1: {
    purposeContext: string
    criteriaFunction: string
    promptAndImage: string
    ideaImages: File[]
  }

  // 2. Dựng mô hình 3D và tạo bản vẽ 2D
  section2: {
    model3DImages: File[]
    technical2DImages: File[]
  }

  // 3. Chuyển sang bản vẽ CAD
  section3: {
    cadFiles: File[]
  }

  // 4. Bảng tự đánh giá
  selfAssessment: {
    criteriaCompliance: { achieved: boolean; note: string }
    model3DBalance: { achieved: boolean; note: string }
    drawing2DComplete: { achieved: boolean; note: string }
    cadAccuracy: { achieved: boolean; note: string }
  }
}

export default function Activity3Form() {
  const [formData, setFormData] = useState<Activity3FormData>({
    section1: {
      purposeContext: "",
      criteriaFunction: "",
      promptAndImage: "",
      ideaImages: [],
    },
    section2: {
      model3DImages: [],
      technical2DImages: [],
    },
    section3: {
      cadFiles: [],
    },
    selfAssessment: {
      criteriaCompliance: { achieved: false, note: "" },
      model3DBalance: { achieved: false, note: "" },
      drawing2DComplete: { achieved: false, note: "" },
      cadAccuracy: { achieved: false, note: "" },
    },
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
        const response = await fetch(`/api/group-surveys/activities?groupName=${encodeURIComponent(storedGroupName)}&activityNumber=3`)
        
        if (response.ok) {
          const result = await response.json()
          if (result.success && result.data.activityData) {
            // Note: File inputs cannot be pre-populated for security reasons
            // Only load text data, not file data
            const loadedData = result.data.activityData
            setFormData({
              ...loadedData,
              section1: {
                ...loadedData.section1,
                ideaImages: [], // Reset file arrays
              },
              section2: {
                model3DImages: [],
                technical2DImages: [],
              },
              section3: {
                cadFiles: [],
              },
            })
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    )
  }

  const handleSection1Change = (
    field: keyof Activity3FormData["section1"],
    value: string | File[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      section1: {
        ...prev.section1,
        [field]: value,
      },
    }))
  }

  const handleSection2Change = (
    field: keyof Activity3FormData["section2"],
    value: File[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      section2: {
        ...prev.section2,
        [field]: value,
      },
    }))
  }

  const handleSection3Change = (
    field: keyof Activity3FormData["section3"],
    value: File[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      section3: {
        ...prev.section3,
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
    if (!formData.section1.purposeContext.trim()) {
      showError("Vui lòng nhập mục đích & bối cảnh", 'Thiếu thông tin')
      return
    }

    if (!formData.section1.criteriaFunction.trim()) {
      showError("Vui lòng nhập tiêu chí & chức năng", 'Thiếu thông tin')
      return
    }

    if (!formData.section1.promptAndImage.trim()) {
      showError("Vui lòng nhập prompt và minh họa", 'Thiếu thông tin')
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
          activityNumber: 3,
          activityData: formData
        }),
      })

      const result = await response.json()

      if (result.success) {
        showSuccess("Đã hoàn thành Hoạt động 3!", 'Thành công')
        setTimeout(() => {
          window.location.href = "/group"
        }, 2000)
      } else {
        showError(`Lỗi: ${result.error}`, 'Lỗi lưu dữ liệu')
      }
    } catch (error) {
      console.error('Error submitting activity 3:', error)
      showError('Có lỗi xảy ra khi lưu dữ liệu. Vui lòng thử lại.', 'Lỗi hệ thống')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back Button */}
        <BackButton href="/group" />

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



        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Phát triển ý tưởng */}
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-indigo-600 mb-4">
                1. Phát triển ý tưởng
              </h3>

              <div className="bg-indigo-50 p-4 rounded-lg space-y-4">
                <p className="font-semibold text-gray-800">
                  Prompt AI định hướng
                </p>

                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Mục đích & bối cảnh:
                  </Label>
                  <Textarea
                    value={formData.section1.purposeContext}
                    onChange={(e) =>
                      handleSection1Change("purposeContext", e.target.value)
                    }
                    rows={3}
                    placeholder="Nhập mục đích và bối cảnh thiết kế..."
                    required
                    className="resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Nhập mục đích và bối cảnh thiết kế
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Tiêu chí & chức năng:
                  </Label>
                  <Textarea
                    value={formData.section1.criteriaFunction}
                    onChange={(e) =>
                      handleSection1Change("criteriaFunction", e.target.value)
                    }
                    rows={3}
                    placeholder="Nhập tiêu chí và chức năng thiết kế..."
                    required
                    className="resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Nhập tiêu chí và chức năng thiết kế
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Prompt và minh họa (Soạn prompt AI và kèm hình ảnh ý tưởng):
                  </Label>
                  <Textarea
                    value={formData.section1.promptAndImage}
                    onChange={(e) =>
                      handleSection1Change("promptAndImage", e.target.value)
                    }
                    rows={4}
                    placeholder="Nhập prompt AI đầy đủ và mô tả hình ảnh ý tưởng..."
                    required
                    className="resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Nhập prompt AI đầy đủ và mô tả hình ảnh ý tưởng
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Tải lên hình ảnh ý tưởng:
                  </Label>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      if (e.target.files) {
                        handleSection1Change("ideaImages", Array.from(e.target.files))
                      }
                    }}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Chấp nhận: JPG, PNG. Có thể tải nhiều ảnh
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Section 2: Dựng mô hình 3D và tạo bản vẽ 2D */}
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-indigo-600 mb-4">
                2. Dựng mô hình 3D và tạo bản vẽ 2D
              </h3>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Ảnh mô hình 3D
                </Label>
                <Input
                  type="file"
                  accept="image/*,.obj,.stl"
                  multiple
                  onChange={(e) => {
                    if (e.target.files) {
                      handleSection2Change("model3DImages", Array.from(e.target.files))
                    }
                  }}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Chấp nhận: JPG, PNG, OBJ, STL
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Ảnh kỹ thuật 2D (Gồm bản vẽ mặt đứng, mặt bằng, mặt cạnh)
                </Label>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    if (e.target.files) {
                      handleSection2Change("technical2DImages", Array.from(e.target.files))
                    }
                  }}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Tải lên 3 ảnh: mặt đứng, mặt bằng, mặt cạnh (JPG, PNG)
                </p>
              </div>
            </div>
          </Card>

          {/* Section 3: Chuyển sang bản vẽ CAD */}
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-indigo-600 mb-4">
                3. Chuyển sang bản vẽ CAD
              </h3>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  File CAD/Hình ảnh CAD
                </Label>
                <Input
                  type="file"
                  accept=".dwg,.dxf,.pdf,image/*"
                  multiple
                  onChange={(e) => {
                    if (e.target.files) {
                      handleSection3Change("cadFiles", Array.from(e.target.files))
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

          {/* Section 4: Bảng tự đánh giá */}
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-indigo-600 mb-4">
                4. Bảng tự đánh giá
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
                        label: "Ý tưởng tuân thủ tiêu chí đánh giá",
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
      <NotificationComponent />
    </div>
  )
}
