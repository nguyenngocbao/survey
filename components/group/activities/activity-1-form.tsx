"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { BackButton } from "@/components/ui/back-button"

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

  const addTableBRow = () => {
    if (formData.tableB.standardizedCriteria.length < 10) {
      setFormData((prev) => ({
        ...prev,
        tableB: {
          standardizedCriteria: [
            ...prev.tableB.standardizedCriteria,
            {
              stt: prev.tableB.standardizedCriteria.length + 1,
              technicalCriterion: "",
              description: "",
            },
          ],
        },
      }))
    }
  }

  const removeTableBRow = (index: number) => {
    if (formData.tableB.standardizedCriteria.length > 3) {
      setFormData((prev) => ({
        ...prev,
        tableB: {
          standardizedCriteria: prev.tableB.standardizedCriteria
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
      (item) => !item.criterion.trim() || !item.basis.trim()
    )
    if (incompleteTableA) {
      alert("Bảng A: Vui lòng hoàn thành tất cả các tiêu chí và cơ sở lựa chọn")
      return
    }

    // Validation for Table B
    const incompleteTableB = formData.tableB.standardizedCriteria.some(
      (item) => !item.technicalCriterion.trim() || !item.description.trim()
    )
    if (incompleteTableB) {
      alert("Bảng B: Vui lòng hoàn thành tất cả tiêu chí kỹ thuật và mô tả")
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
          {/* Table A: Initial Criteria */}
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-blue-600 mb-2">
                A. Tiêu chí ban đầu của nhóm
              </h2>
            </div>

            <div className="space-y-4">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 font-semibold text-sm text-gray-700 pb-3 border-b-2 border-gray-200">
                <div className="col-span-1 text-center">STT</div>
                <div className="col-span-5">Tiêu chí kỹ thuật</div>
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
            </div>

            <div className="space-y-4">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 font-semibold text-sm text-gray-700 pb-3 border-b-2 border-gray-200">
                <div className="col-span-1 text-center">STT</div>
                <div className="col-span-4">Tiêu chí kỹ thuật</div>
                <div className="col-span-6">Mô tả</div>
                <div className="col-span-1 text-center">Thao tác</div>
              </div>

              {/* Table Rows */}
              {formData.tableB.standardizedCriteria.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-start">
                  <div className="col-span-1 flex items-center justify-center h-10 bg-violet-100 rounded-lg text-violet-700 font-semibold">
                    {item.stt}
                  </div>
                  <div className="col-span-4">
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
                  <div className="col-span-1 flex justify-center">
                    {formData.tableB.standardizedCriteria.length > 3 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTableBRow(index)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 h-10 w-10 p-0"
                      >
                        ×
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              {/* Add Row Button */}
              {formData.tableB.standardizedCriteria.length < 10 && (
                <div className="flex justify-center pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addTableBRow}
                    className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 border-violet-300"
                  >
                    + Thêm tiêu chí
                  </Button>
                </div>
              )}
            </div>
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
