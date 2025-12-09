'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface CriterionRow {
  criterion: string
  basis: string
}

interface StandardCriterionRow {
  technicalCriterion: string
  description: string
}

interface Activity1FormData {
  tableA: CriterionRow[]
  tableB: StandardCriterionRow[]
}

export default function Activity1FormNew() {
  const router = useRouter()
  const [formData, setFormData] = useState<Activity1FormData>({
    tableA: [
      { criterion: '', basis: '' },
      { criterion: '', basis: '' },
      { criterion: '', basis: '' }
    ],
    tableB: Array(7).fill(null).map(() => ({ technicalCriterion: '', description: '' }))
  })

  const addTableARow = () => {
    if (formData.tableA.length < 7) {
      setFormData(prev => ({
        ...prev,
        tableA: [...prev.tableA, { criterion: '', basis: '' }]
      }))
    }
  }

  const removeTableARow = (index: number) => {
    if (formData.tableA.length > 3) {
      setFormData(prev => ({
        ...prev,
        tableA: prev.tableA.filter((_, i) => i !== index)
      }))
    }
  }

  const updateTableA = (index: number, field: 'criterion' | 'basis', value: string) => {
    setFormData(prev => ({
      ...prev,
      tableA: prev.tableA.map((row, i) => 
        i === index ? { ...row, [field]: value } : row
      )
    }))
  }

  const updateTableB = (index: number, field: 'technicalCriterion' | 'description', value: string) => {
    setFormData(prev => ({
      ...prev,
      tableB: prev.tableB.map((row, i) => 
        i === index ? { ...row, [field]: value } : row
      )
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate Table A
    for (let i = 0; i < formData.tableA.length; i++) {
      const row = formData.tableA[i]
      if (!row.criterion || row.criterion.length < 10) {
        alert(`Bảng A - Hàng ${i + 1}: Tiêu chí phải có ít nhất 10 ký tự`)
        return
      }
      if (!row.basis || row.basis.length < 20) {
        alert(`Bảng A - Hàng ${i + 1}: Cơ sở lựa chọn phải có ít nhất 20 ký tự`)
        return
      }
    }

    // Validate Table B
    for (let i = 0; i < formData.tableB.length; i++) {
      const row = formData.tableB[i]
      if (!row.technicalCriterion || row.technicalCriterion.length < 10) {
        alert(`Bảng B - Hàng ${i + 1}: Tiêu chí kỹ thuật phải có ít nhất 10 ký tự`)
        return
      }
      if (!row.description || row.description.length < 30) {
        alert(`Bảng B - Hàng ${i + 1}: Mô tả phải có ít nhất 30 ký tự`)
        return
      }
    }

    // TODO: Submit to API
    console.log('Activity 1 data:', formData)
    alert('✅ Đã hoàn thành hoạt động 1!')
    router.push('/group')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push('/group')}
            className="mb-4"
          >
            ← Quay lại
          </Button>
          
          <div className="bg-gradient-to-r from-violet-500 to-violet-600 text-white rounded-lg p-8 shadow-lg">
            <div className="text-5xl mb-4">🌊</div>
            <h1 className="text-3xl font-bold mb-2">Hoạt động 1: Bí ẩn đại dương</h1>
            <p className="text-violet-100 mb-2">Phiếu học tập số 1</p>
            <p className="text-sm text-violet-200">
              XÁC LẬP TIÊU CHÍ KỸ THUẬT CHO THIẾT KẾ THUYỀN MINI AN TOÀN MÙA NƯỚC NỔI
            </p>
          </div>
        </div>

        {/* Purpose Box */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6 rounded-lg">
          <div className="flex items-start gap-3">
            <span className="text-3xl">🎯</span>
            <div className="space-y-2">
              <h3 className="font-bold text-gray-800 text-lg mb-3">1. Mục đích sử dụng</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Nhận diện vấn đề thực tiễn trong bối cảnh mùa nước nổi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Xây dựng hệ tiêu chí thiết kế dựa trên phân tích rủi ro và yêu cầu kỹ thuật</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Chuẩn hóa tiêu chí theo định hướng năng lực thiết kế kỹ thuật</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Tạo cơ sở đánh giá sản phẩm xuyên suốt các hoạt động sau</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Process Box */}
        <div className="bg-violet-50 border-l-4 border-violet-500 p-6 mb-8 rounded-lg">
          <div className="flex items-start gap-3">
            <span className="text-3xl">📋</span>
            <div className="space-y-2">
              <h3 className="font-bold text-gray-800 text-lg mb-3">2. Quy trình thực hiện của học sinh</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-violet-500 mt-1">•</span>
                  <span>Quan sát video/ảnh tình huống và liệt kê rủi ro</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-500 mt-1">•</span>
                  <span>Đề xuất tiêu chí thiết kế ban đầu</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-500 mt-1">•</span>
                  <span>Tham gia trò chơi 'Đấu trường Từ khóa' để nhận diện tiêu chí chuẩn</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-500 mt-1">•</span>
                  <span>So sánh - điều chỉnh - thống nhất bộ tiêu chí kỹ thuật</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Table A */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">A. Tiêu chí ban đầu của nhóm</CardTitle>
              <CardDescription>
                Nhóm đề xuất các tiêu chí thiết kế ban đầu dựa trên quan sát và phân tích
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-violet-100">
                      <th className="border border-gray-300 p-3 text-center w-20">STT</th>
                      <th className="border border-gray-300 p-3 text-left">Tiêu chí đề xuất</th>
                      <th className="border border-gray-300 p-3 text-left">Cơ sở lựa chọn</th>
                      <th className="border border-gray-300 p-3 text-center w-20">Xóa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.tableA.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-3 text-center font-semibold">
                          {index + 1}
                        </td>
                        <td className="border border-gray-300 p-3">
                          <Input
                            value={row.criterion}
                            onChange={(e) => updateTableA(index, 'criterion', e.target.value)}
                            placeholder="Nhập tiêu chí thiết kế..."
                            required
                            className="border-0 focus:ring-2 focus:ring-violet-500"
                          />
                        </td>
                        <td className="border border-gray-300 p-3">
                          <Input
                            value={row.basis}
                            onChange={(e) => updateTableA(index, 'basis', e.target.value)}
                            placeholder="Giải thích tại sao chọn tiêu chí này..."
                            required
                            className="border-0 focus:ring-2 focus:ring-violet-500"
                          />
                        </td>
                        <td className="border border-gray-300 p-3 text-center">
                          <button
                            type="button"
                            onClick={() => removeTableARow(index)}
                            disabled={formData.tableA.length <= 3}
                            className="text-red-600 hover:text-red-800 disabled:text-gray-400 disabled:cursor-not-allowed"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <Button
                  type="button"
                  onClick={addTableARow}
                  disabled={formData.tableA.length >= 7}
                  variant="outline"
                  className="border-violet-300 text-violet-600 hover:bg-violet-50"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Thêm tiêu chí
                </Button>
                <span className="text-sm text-gray-500">
                  {formData.tableA.length} / 7 tiêu chí (tối thiểu 3)
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Table B */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">B. Bộ tiêu chí thống nhất của lớp (phiên bản chính thức)</CardTitle>
              <CardDescription>
                Sau khi tham gia 'Đấu trường Từ khóa' và thảo luận, nhóm ghi lại bộ tiêu chí chuẩn hóa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-violet-100">
                      <th className="border border-gray-300 p-3 text-center w-20">STT</th>
                      <th className="border border-gray-300 p-3 text-left">Tiêu chí kỹ thuật</th>
                      <th className="border border-gray-300 p-3 text-left">Mô tả</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.tableB.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-3 text-center font-semibold">
                          {index + 1}
                        </td>
                        <td className="border border-gray-300 p-3">
                          <Input
                            value={row.technicalCriterion}
                            onChange={(e) => updateTableB(index, 'technicalCriterion', e.target.value)}
                            placeholder="Tiêu chí kỹ thuật chuẩn..."
                            required
                            className="border-0 focus:ring-2 focus:ring-violet-500"
                          />
                        </td>
                        <td className="border border-gray-300 p-3">
                          <Textarea
                            value={row.description}
                            onChange={(e) => updateTableB(index, 'description', e.target.value)}
                            placeholder="Mô tả chi tiết tiêu chí..."
                            required
                            rows={2}
                            className="border-0 focus:ring-2 focus:ring-violet-500 resize-none"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Note Box */}
              <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <div className="flex items-start gap-2">
                  <span className="text-xl">💡</span>
                  <p className="text-sm text-gray-700">
                    Bộ tiêu chí này sẽ được sử dụng để đánh giá thiết kế thuyền trong các hoạt động tiếp theo
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              size="lg"
              className="bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700"
            >
              Hoàn thành hoạt động
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
