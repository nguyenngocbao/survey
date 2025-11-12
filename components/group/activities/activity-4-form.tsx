'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Activity4FormData {
  question1: {
    strengths: string
    improvements: string
  }
  question2: {
    learnings: string
  }
  question3: {
    lesson: string
    futureImprovement: string
  }
}

export default function Activity4Form() {
  const router = useRouter()
  const [formData, setFormData] = useState<Activity4FormData>({
    question1: { strengths: '', improvements: '' },
    question2: { learnings: '' },
    question3: { lesson: '', futureImprovement: '' }
  })

  const handleTextChange = (field: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const keys = field.split('.')
    if (keys.length === 2) {
      setFormData(prev => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0] as keyof Activity4FormData],
          [keys[1]]: e.target.value
        }
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (formData.question1.strengths.length < 50) {
      alert('Câu 1: Điểm mạnh phải có ít nhất 50 ký tự')
      return
    }
    
    if (formData.question1.improvements.length < 40) {
      alert('Câu 1: Điểm cần cải thiện phải có ít nhất 40 ký tự')
      return
    }
    
    if (formData.question2.learnings.length < 60) {
      alert('Câu 2: Học hỏi từ nhóm khác phải có ít nhất 60 ký tự')
      return
    }
    
    if (formData.question3.lesson.length < 40) {
      alert('Câu 3: Bài học quan trọng phải có ít nhất 40 ký tự')
      return
    }
    
    if (formData.question3.futureImprovement.length < 40) {
      alert('Câu 3: Cách cải tiến phải có ít nhất 40 ký tự')
      return
    }

    // TODO: Submit to API
    console.log('Activity 4 data:', formData)
    
    // Navigate back
    router.push('/group')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
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
          
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-8 shadow-lg">
            <div className="text-5xl mb-4">✨</div>
            <h1 className="text-3xl font-bold mb-2">Hoạt động 4: Bản vẽ toả sáng</h1>
            <p className="text-blue-100">Tìm hiểu bản vẽ phát ra ánh sáng kỳ diệu</p>
          </div>
        </div>

        {/* Instruction Box */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
          <div className="flex items-start">
            <span className="text-2xl mr-3">✨</span>
            <p className="text-gray-700">
              Hoạt động tổng kết và phản tư. Nhóm nhìn lại toàn bộ quá trình, 
              đánh giá sản phẩm và học hỏi từ các nhóm khác.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Câu 1 */}
          <Card>
            <CardHeader>
              <CardTitle>Câu 1 - Điểm mạnh & cải tiến</CardTitle>
              <CardDescription>
                <div className="space-y-1">
                  <p>Nhóm bạn nêu 1-2 điểm mạnh và 1 điểm cần cải thiện của sản phẩm cuối.</p>
                  <div className="text-sm text-gray-500 italic mt-2 space-y-1">
                    <p>• Điểm mạnh: thuyền nổi ổn định, thiết kế thẩm mỹ.</p>
                    <p>• Cải thiện: đáy thuyền hơi mỏng, cần gia cố.</p>
                  </div>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="q1-strengths">1-2 điểm mạnh của sản phẩm *</Label>
                <Textarea
                  id="q1-strengths"
                  rows={4}
                  placeholder="Nêu các điểm mạnh của thiết kế thuyền..."
                  value={formData.question1.strengths}
                  onChange={handleTextChange('question1.strengths')}
                  required
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.question1.strengths.length} / 50 ký tự tối thiểu
                </p>
              </div>
              
              <div>
                <Label htmlFor="q1-improvements">1 điểm cần cải thiện *</Label>
                <Textarea
                  id="q1-improvements"
                  rows={4}
                  placeholder="Nêu điểm cần cải thiện và cách khắc phục..."
                  value={formData.question1.improvements}
                  onChange={handleTextChange('question1.improvements')}
                  required
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.question1.improvements.length} / 40 ký tự tối thiểu
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Câu 2 */}
          <Card>
            <CardHeader>
              <CardTitle>Câu 2 - Học hỏi từ nhóm khác</CardTitle>
              <CardDescription>
                <div className="space-y-1">
                  <p>Nhóm bạn học được gì từ ý tưởng hoặc phản biện của nhóm khác?</p>
                  <p className="text-sm text-gray-500 italic mt-2">
                    Ví dụ: nhóm khác dùng vật liệu tái chế giúp thuyền nhẹ hơn → nhóm mình sẽ thử áp dụng.
                  </p>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="q2-learnings">Học hỏi từ nhóm khác *</Label>
                <Textarea
                  id="q2-learnings"
                  rows={5}
                  placeholder="Ghi lại những gì nhóm học được từ các nhóm khác..."
                  value={formData.question2.learnings}
                  onChange={handleTextChange('question2.learnings')}
                  required
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.question2.learnings.length} / 60 ký tự tối thiểu
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Câu 3 */}
          <Card>
            <CardHeader>
              <CardTitle>Câu 3 - Bài học & cải tiến cá nhân</CardTitle>
              <CardDescription>
                <div className="space-y-1">
                  <p>Nêu 1 bài học quan trọng và 1 cách cải tiến nếu làm lại.</p>
                  <p className="text-sm text-gray-500 italic mt-2">
                    Ví dụ: học cách viết prompt AI chính xác hơn để bản vẽ 3D chi tiết hơn.
                  </p>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="q3-lesson">1 bài học quan trọng nhất *</Label>
                <Textarea
                  id="q3-lesson"
                  rows={4}
                  placeholder="Bài học quan trọng nhất từ dự án này..."
                  value={formData.question3.lesson}
                  onChange={handleTextChange('question3.lesson')}
                  required
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.question3.lesson.length} / 40 ký tự tối thiểu
                </p>
              </div>
              
              <div>
                <Label htmlFor="q3-improvement">1 cách cải tiến nếu làm lại *</Label>
                <Textarea
                  id="q3-improvement"
                  rows={4}
                  placeholder="Nếu làm lại, nhóm sẽ cải tiến như thế nào..."
                  value={formData.question3.futureImprovement}
                  onChange={handleTextChange('question3.futureImprovement')}
                  required
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.question3.futureImprovement.length} / 40 ký tự tối thiểu
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              Hoàn thành hoạt động
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
