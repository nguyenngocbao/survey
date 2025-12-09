"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

interface Activity1FormData {
  tableA: {
    initialCriteria: Array<{
      stt: number
      criterion: string
      basis: string
    }>
  }
  tableB: {
    standardizedCriteria: Array<{
      stt: number
      technicalCriterion: string
      description: string
    }>
  }
}

export function Activity1Form() {
  const [formData, setFormData] = useState<Activity1FormData>({
    tableA: {
      initialCriteria: Array(5)
        .fill(null)
        .map((_, index) => ({
          stt: index + 1,
          criterion: "",
          basis: "",
        })),
    },
    tableB: {
      standardizedCriteria: Array(7)
        .fill(null)
        .map((_, index) => ({
          stt: index + 1,
          technicalCriterion: "",
          description: "",
        })),
    },
  })

  const handleTableAChange = (
    index: number,
    field: "criterion" | "basis",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      tableA: {
        initialCriteria: prev.tableA.initialCriteria.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      },
    }))
  }

  const handleTableBChange = (
    index: number,
    field: "technicalCriterion" | "description",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      tableB: {
        standardizedCriteria: prev.tableB.standardizedCriteria.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      },
    }))
  }

  const addTableARow = () => {
    if (formData.tableA.initialCriteria.length < 7) {
      setFormData((prev) => ({
        ...prev,
        tableA: {
          initialCriteria: [
            ...prev.tableA.initialCriteria,
            {
              stt: prev.tableA.initialCriteria.length + 1,
              criterion: "",
              basis: "",
            },
          ],
        },
      }))
    }
  }

  const removeTableARow = (index: number) => {
    if (formData.tableA.initialCriteria.length > 3) {
      setFormData((prev) => ({
        ...prev,
        tableA: {
          initialCriteria: prev.tableA.initialCriteria
            .filter((_, i) => i !== index)
            .map((item, i) => ({ ...item, stt: i + 1 })),
        },
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation for Table A
    const incompleteTableA = formData.tableA.initialCriteria.some(
      (item) => item.criterion.length < 10 || item.basis.length < 20
    )
    if (incompleteTableA) {
      alert("Bảng A: Vui lòng hoàn thành tất cả các tiêu chí và cơ sở lựa chọn")
      return
    }

    // Validation for Table B
    const incompleteTableB = formData.tableB.standardizedCriteria.some(
      (item) =>
        item.technicalCriterion.length < 10 || item.description.length < 30
    )
    if (incompleteTableB) {
      alert("Bảng B: Vui lòng hoàn thành tất cả 7 tiêu chí kỹ thuật và mô tả")
      return
    }

    // TODO: Submit to API
    console.log("Activity 1 data:", formData)

    alert("Đã hoàn thành Hoạt động 1!")
    window.location.href = "/group"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
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

        {/* Purpose Box */}
        <Card className="p-6 bg-blue-50 border-l-4 border-blue-500 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-3xl">🎯</span>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-lg">
                Mục đích sử dụng
              </h3>
              <ul className="text-gray-700 space-y-2">
                <li>
                  • Nhận diện vấn đề thực tiễn trong bối cảnh mùa nước nổi
                </li>
                <li>
                  • Xây dựng hệ tiêu chí thiết kế dựa trên phân tích rủi ro và
                  yêu cầu kỹ thuật
                </li>
                <li>
                  • Chuẩn hóa tiêu chí theo định hướng năng lực thiết kế kỹ
                  thuật
                </li>
                <li>
                  • Tạo cơ sở đánh giá sản phẩm xuyên suốt các hoạt động sau
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Process Box */}
        <Card className="p-6 bg-violet-50 border-l-4 border-violet-500 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-3xl">📋</span>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-lg">
                Quy trình thực hiện
              </h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Quan sát video/ảnh tình huống và liệt kê rủi ro</li>
                <li>• Đề xuất tiêu chí thiết kế ban đầu</li>
                <li>
                  • Tham gia trò chơi 'Đấu trường Từ khóa' để nhận diện tiêu
                  chí chuẩn
                </li>
                <li>
                  • So sánh - điều chỉnh - thống nhất bộ tiêu chí kỹ thuật
                </li>
              </ul>
            </div>
          </div>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Table A: Initial Criteria */}
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-blue-600 mb-2">
                A. Tiêu chí ban đầu của nhóm
              </h2>
              <p className="text-gray-600">
                Nhóm đề xuất các tiêu chí thiết kế ban đầu dựa trên quan sát và
                phân tích
              </p>
            </div>

            <div className="space-y-4">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 font-semibold text-sm text-gray-700 pb-3 border-b-2 border-gray-200">
                <div className="col-span-1 text-center">STT</div>
                <div className="col-span-5">Tiêu chí đề xuất</div>
                <div className="col-span-5">Cơ sở lựa chọn</div>
                <div className="col-span-1 text-center">Thao tác</div>
              </div>

              {/* Table Rows */}
              {formData.tableA.initialCriteria.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-start">
                  <div className="col-span-1 flex items-center justify-center h-10 bg-blue-100 rounded-lg text-blue-700 font-semibold">
                    {item.stt}
                  </div>
                  <div className="col-span-5">
                    <Input
                      placeholder="Nhập tiêu chí thiết kế..."
                      value={item.criterion}
                      onChange={(e) =>
                        handleTableAChange(index, "criterion", e.target.value)
                      }
                      required
                      className="h-10"
                    />
                  </div>
                  <div className="col-span-5">
                    <Input
                      placeholder="Giải thích tại sao chọn tiêu chí này..."
                      value={item.basis}
                      onChange={(e) =>
                        handleTableAChange(index, "basis", e.target.value)
                      }
                      required
                      className="h-10"
                    />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    {formData.tableA.initialCriteria.length > 3 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTableARow(index)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 h-10 w-10 p-0"
                      >
                        ×
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              {/* Add Row Button */}
              {formData.tableA.initialCriteria.length < 7 && (
                <div className="flex justify-center pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addTableARow}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-300"
                  >
                    + Thêm tiêu chí
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Table B: Standardized Criteria */}
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-violet-600 mb-2">
                B. Bộ tiêu chí thống nhất của lớp (phiên bản chính thức)
              </h2>
              <p className="text-gray-600">
                Sau khi tham gia 'Đấu trường Từ khóa' và thảo luận, nhóm ghi
                lại bộ tiêu chí chuẩn hóa
              </p>
            </div>

            <div className="space-y-4">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 font-semibold text-sm text-gray-700 pb-3 border-b-2 border-gray-200">
                <div className="col-span-1 text-center">STT</div>
                <div className="col-span-5">Tiêu chí kỹ thuật</div>
                <div className="col-span-6">Mô tả</div>
              </div>

              {/* Table Rows */}
              {formData.tableB.standardizedCriteria.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-start">
                  <div className="col-span-1 flex items-center justify-center h-10 bg-violet-100 rounded-lg text-violet-700 font-semibold">
                    {item.stt}
                  </div>
                  <div className="col-span-5">
                    <Input
                      placeholder="Tiêu chí kỹ thuật chuẩn..."
                      value={item.technicalCriterion}
                      onChange={(e) =>
                        handleTableBChange(
                          index,
                          "technicalCriterion",
                          e.target.value
                        )
                      }
                      required
                      className="h-10"
                    />
                  </div>
                  <div className="col-span-6">
                    <Textarea
                      rows={2}
                      placeholder="Mô tả chi tiết tiêu chí..."
                      value={item.description}
                      onChange={(e) =>
                        handleTableBChange(index, "description", e.target.value)
                      }
                      required
                      className="resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Note Box */}
            <Card className="p-4 bg-yellow-50 border-l-4 border-yellow-400 mt-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <p className="text-gray-700">
                  Bộ tiêu chí này sẽ được sử dụng để đánh giá thiết kế thuyền
                  trong các hoạt động tiếp theo
                </p>
              </div>
            </Card>
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
