'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface Activity3FormData {
  question1: {
    description: string
    imageUrl?: string
  }
  question2: {
    prompt3D: string
    prompt2D: string
    promptCAD: string
  }
  question3: {
    drawing3DUrl: string
    strengths: string
    improvements: string
  }
  question4: {
    drawing2DUrl: string
    cadFileUrl: string
    analysis: string
  }
  question5: {
    finalDesignUrl: string
    evaluation: string
  }
}

export default function Activity3Form() {
  const router = useRouter()
  const [formData, setFormData] = useState<Activity3FormData>({
    question1: { description: '', imageUrl: '' },
    question2: { prompt3D: '', prompt2D: '', promptCAD: '' },
    question3: { drawing3DUrl: '', strengths: '', improvements: '' },
    question4: { drawing2DUrl: '', cadFileUrl: '', analysis: '' },
    question5: { finalDesignUrl: '', evaluation: '' }
  })

  const [fileNames, setFileNames] = useState({
    q1Image: '',
    q3Drawing: '',
    q4Drawing2D: '',
    q4CAD: '',
    q5Final: ''
  })

  const handleFileUpload = (field: string, fileNameKey: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileNames(prev => ({ ...prev, [fileNameKey]: file.name }))
      // In production, upload to server and get URL
      const fakeUrl = URL.createObjectURL(file)
      const keys = field.split('.')
      if (keys.length === 2) {
        setFormData(prev => ({
          ...prev,
          [keys[0]]: {
            ...prev[keys[0] as keyof Activity3FormData],
            [keys[1]]: fakeUrl
          }
        }))
      }
    }
  }

  const handleTextChange = (field: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const keys = field.split('.')
    if (keys.length === 2) {
      setFormData(prev => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0] as keyof Activity3FormData],
          [keys[1]]: e.target.value
        }
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (formData.question1.description.length < 100) {
      alert('Câu 1: Mô tả phải có ít nhất 100 ký tự')
      return
    }
    
    if (!formData.question2.prompt3D || !formData.question2.prompt2D || !formData.question2.promptCAD) {
      alert('Câu 2: Vui lòng điền đầy đủ 3 prompts')
      return
    }
    
    if (!formData.question3.drawing3DUrl || !formData.question3.strengths || !formData.question3.improvements) {
      alert('Câu 3: Vui lòng hoàn thành đầy đủ')
      return
    }
    
    if (!formData.question4.drawing2DUrl || !formData.question4.cadFileUrl || formData.question4.analysis.length < 80) {
      alert('Câu 4: Vui lòng hoàn thành đầy đủ (phân tích tối thiểu 80 ký tự)')
      return
    }
    
    if (!formData.question5.finalDesignUrl || formData.question5.evaluation.length < 150) {
      alert('Câu 5: Vui lòng hoàn thành đầy đủ (đánh giá tối thiểu 150 ký tự)')
      return
    }

    // TODO: Submit to API
    console.log('Activity 3 data:', formData)
    
    // Navigate back
    router.push('/group')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push('/group')}
            className="mb-4"
          >
            ← Quay lại
          </Button>
          
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg p-8 shadow-lg">
            <div className="text-5xl mb-4">🗺️</div>
            <h1 className="text-3xl font-bold mb-2">Hoạt động 3: Bản vẽ bí ẩn</h1>
            <p className="text-indigo-100">Khám phá bản vẽ chứa đựng những bí mật</p>
          </div>
        </div>

        {/* Instruction Box */}
        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-6 rounded">
          <div className="flex items-start">
            <span className="text-2xl mr-3">🗺️</span>
            <p className="text-gray-700">
              Hoạt động theo nhóm 3-5 học sinh. Sử dụng AI hỗ trợ tạo bản vẽ 3D, 2D, CAD. 
              Chèn hình minh họa và lưu file để chuẩn bị chế tạo.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Câu 1 */}
          <Card>
            <CardHeader>
              <CardTitle>Câu 1 - Chốt ý tưởng cuối cùng</CardTitle>
              <CardDescription>
                <div className="space-y-1">
                  <p>Chọn ý tưởng nhóm để phát triển bản vẽ kỹ thuật.</p>
                  <p>Mô tả hình dáng, vật liệu, nguyên lý nổi, ưu điểm.</p>
                  <p className="text-sm text-gray-500 italic mt-2">
                    Ví dụ: đáy cong, thân rộng, gỗ + chai nhựa, nổi tốt, ổn định.
                  </p>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="q1-description">Mô tả ý tưởng *</Label>
                <Textarea
                  id="q1-description"
                  rows={6}
                  placeholder="Hình dáng, vật liệu, nguyên lý nổi, ưu điểm..."
                  value={formData.question1.description}
                  onChange={handleTextChange('question1.description')}
                  required
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.question1.description.length} / 100 ký tự tối thiểu
                </p>
              </div>
              
              <div>
                <Label htmlFor="q1-image">Upload hình minh họa (tùy chọn)</Label>
                <Input
                  id="q1-image"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload('question1.imageUrl', 'q1Image')}
                  className="mt-1"
                />
                {fileNames.q1Image && (
                  <p className="text-sm text-green-600 mt-1">✓ {fileNames.q1Image}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Câu 2 */}
          <Card>
            <CardHeader>
              <CardTitle>Câu 2 - Lập kế hoạch AI</CardTitle>
              <CardDescription>
                <div className="space-y-1">
                  <p>Xác định 3 bản vẽ: 3D, 2D, CAD.</p>
                  <p>Viết prompt AI ngắn gọn, rõ ràng.</p>
                  <div className="text-sm text-gray-500 italic mt-2 space-y-1">
                    <p>• 3D: "Thuyền đáy cong, thân rộng, vật liệu gỗ + chai nhựa, nổi tốt."</p>
                    <p>• 2D: "Chi tiết kích thước các bộ phận."</p>
                    <p>• CAD: "File CAD chuẩn kỹ thuật."</p>
                  </div>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="q2-prompt3d">Prompt tạo bản vẽ 3D *</Label>
                <Textarea
                  id="q2-prompt3d"
                  rows={3}
                  placeholder="Mô tả chi tiết cho AI tạo bản vẽ 3D..."
                  value={formData.question2.prompt3D}
                  onChange={handleTextChange('question2.prompt3D')}
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="q2-prompt2d">Prompt tạo bản vẽ 2D *</Label>
                <Textarea
                  id="q2-prompt2d"
                  rows={3}
                  placeholder="Mô tả chi tiết cho AI tạo bản vẽ 2D..."
                  value={formData.question2.prompt2D}
                  onChange={handleTextChange('question2.prompt2D')}
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="q2-promptcad">Prompt tạo file CAD *</Label>
                <Textarea
                  id="q2-promptcad"
                  rows={3}
                  placeholder="Mô tả chi tiết cho AI tạo file CAD..."
                  value={formData.question2.promptCAD}
                  onChange={handleTextChange('question2.promptCAD')}
                  required
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Câu 3 */}
          <Card>
            <CardHeader>
              <CardTitle>Câu 3 - Tạo và đánh giá bản vẽ 3D</CardTitle>
              <CardDescription>
                <div className="space-y-1">
                  <p>Tạo bản vẽ 3D bằng AI hoặc công cụ khác.</p>
                  <p>Chèn hình minh họa.</p>
                  <p>Ghi điểm mạnh & cần cải thiện.</p>
                  <p className="text-sm text-gray-500 italic mt-2">
                    Ví dụ: mô hình trực quan nhưng kích thước chưa chuẩn.
                  </p>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="q3-drawing">Upload bản vẽ 3D *</Label>
                <Input
                  id="q3-drawing"
                  type="file"
                  accept="image/*,.pdf,.obj,.stl"
                  onChange={handleFileUpload('question3.drawing3DUrl', 'q3Drawing')}
                  required
                  className="mt-1"
                />
                {fileNames.q3Drawing && (
                  <p className="text-sm text-green-600 mt-1">✓ {fileNames.q3Drawing}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="q3-strengths">Điểm mạnh của bản vẽ 3D *</Label>
                <Textarea
                  id="q3-strengths"
                  rows={3}
                  placeholder="Ghi các điểm mạnh..."
                  value={formData.question3.strengths}
                  onChange={handleTextChange('question3.strengths')}
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="q3-improvements">Điểm cần cải thiện *</Label>
                <Textarea
                  id="q3-improvements"
                  rows={3}
                  placeholder="Ghi các điểm cần cải thiện..."
                  value={formData.question3.improvements}
                  onChange={handleTextChange('question3.improvements')}
                  required
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Câu 4 */}
          <Card>
            <CardHeader>
              <CardTitle>Câu 4 - Tạo bản vẽ 2D & CAD</CardTitle>
              <CardDescription>
                <div className="space-y-1">
                  <p>Dựa trên 3D, tạo 2D & CAD.</p>
                  <p>Chèn hình/file, ghi điểm khác biệt & điều chỉnh.</p>
                  <p className="text-sm text-gray-500 italic mt-2">
                    Ví dụ: 2D có kích thước chuẩn, CAD chuẩn kỹ thuật.
                  </p>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="q4-drawing2d">Upload bản vẽ 2D *</Label>
                <Input
                  id="q4-drawing2d"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload('question4.drawing2DUrl', 'q4Drawing2D')}
                  required
                  className="mt-1"
                />
                {fileNames.q4Drawing2D && (
                  <p className="text-sm text-green-600 mt-1">✓ {fileNames.q4Drawing2D}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="q4-cad">Upload file CAD *</Label>
                <Input
                  id="q4-cad"
                  type="file"
                  accept=".dwg,.dxf,.pdf,.step,.iges"
                  onChange={handleFileUpload('question4.cadFileUrl', 'q4CAD')}
                  required
                  className="mt-1"
                />
                {fileNames.q4CAD && (
                  <p className="text-sm text-green-600 mt-1">✓ {fileNames.q4CAD}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="q4-analysis">So sánh 2D, CAD với 3D - Điểm khác biệt và điều chỉnh *</Label>
                <Textarea
                  id="q4-analysis"
                  rows={5}
                  placeholder="Ghi các điểm khác biệt và điều chỉnh đã thực hiện..."
                  value={formData.question4.analysis}
                  onChange={handleTextChange('question4.analysis')}
                  required
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.question4.analysis.length} / 80 ký tự tối thiểu
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Câu 5 */}
          <Card>
            <CardHeader>
              <CardTitle>Câu 5 - Chốt bản thiết kế cuối & phản biện</CardTitle>
              <CardDescription>
                <div className="space-y-1">
                  <p>So sánh với nhóm khác, chọn bản cuối cùng.</p>
                  <p>Giải thích tại sao khả thi, an toàn, thẩm mỹ, đề xuất cải thiện.</p>
                  <p className="text-sm text-gray-500 italic mt-2">
                    Ví dụ: đáy thuyền dày hơn để chống rò nước.
                  </p>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="q5-final">Upload bản vẽ thiết kế cuối cùng *</Label>
                <Input
                  id="q5-final"
                  type="file"
                  accept="image/*,.pdf,.dwg,.dxf"
                  onChange={handleFileUpload('question5.finalDesignUrl', 'q5Final')}
                  required
                  className="mt-1"
                />
                {fileNames.q5Final && (
                  <p className="text-sm text-green-600 mt-1">✓ {fileNames.q5Final}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="q5-evaluation">
                  Tại sao thiết kế này khả thi, an toàn, thẩm mỹ? Đề xuất cải thiện? *
                </Label>
                <Textarea
                  id="q5-evaluation"
                  rows={8}
                  placeholder="Nhóm giải thích và đề xuất cải thiện..."
                  value={formData.question5.evaluation}
                  onChange={handleTextChange('question5.evaluation')}
                  required
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.question5.evaluation.length} / 150 ký tự tối thiểu
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700"
            >
              Hoàn thành hoạt động
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
