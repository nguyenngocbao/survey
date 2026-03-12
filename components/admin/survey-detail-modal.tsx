'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { ImageGallery } from '@/components/ui/image-gallery'

interface SurveyDetailModalProps {
  isOpen: boolean
  onClose: () => void
  surveyId: string
  surveyType: string
}

export function SurveyDetailModal({ isOpen, onClose, surveyId, surveyType }: SurveyDetailModalProps) {
  const [survey, setSurvey] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen && surveyId) {
      loadSurveyDetail()
    }
  }, [isOpen, surveyId])

  const loadSurveyDetail = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/surveys/${surveyId}?type=${surveyType}`)
      const result = await response.json()

      if (result.success) {
        setSurvey(result.data)
      } else {
        console.error('Failed to load survey:', result.error)
      }
    } catch (error) {
      console.error('Error loading survey detail:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN')
  }

  // AI Survey View Component
  const AISurveyView = ({ data }: { data: any }) => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
          KHẢO SÁT HỌC SINH
        </h1>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          THỰC TRẠNG SỬ DỤNG TRÍ TUỆ NHÂN TẠO TRONG HỌC TẬP
        </h2>
      </div>

      {/* Section 1: Personal Information */}
      <div className="space-y-6 bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-2xl p-6 border border-purple-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
            <span className="text-lg">👤</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800">PHẦN 1: THÔNG TIN CƠ BẢN</h3>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-base font-semibold text-gray-800">1. Họ và tên của bạn:</Label>
            <Input value={data.personalInfo?.fullName || ''} readOnly className="mt-1 bg-gray-50" />
          </div>
          <div>
            <Label className="text-base font-semibold text-gray-800">2. Bạn hiện đang học cấp nào:</Label>
            <div className="mt-2 p-3 bg-gray-50 rounded border">
              <span className="text-gray-800">{data.personalInfo?.educationLevel || 'Chưa có dữ liệu'}</span>
            </div>
          </div>
          <div>
            <Label className="text-base font-semibold text-gray-800">3. Trường bạn đang học:</Label>
            <Input value={data.personalInfo?.school || ''} readOnly className="mt-1 bg-gray-50" />
          </div>
          <div>
            <Label className="text-base font-semibold text-gray-800">4. Khối lớp bạn đang học:</Label>
            <div className="mt-2 p-3 bg-gray-50 rounded border">
              <span className="text-gray-800">{data.personalInfo?.grade || 'Chưa có dữ liệu'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: AI Usage */}
      <div className="space-y-6 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-lg">🧠</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800">PHẦN 2: KHẢO SÁT VỀ SỬ DỤNG AI TRONG HỌC TẬP</h3>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-base font-semibold text-gray-800">5. Tần suất bạn sử dụng các công cụ AI trong học tập:</Label>
            <div className="mt-2 p-3 bg-gray-50 rounded border">
              <span className="text-gray-800">{data.aiUsage?.frequency || 'Chưa có dữ liệu'}</span>
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold text-gray-800">6. Khi dùng AI, bạn thường sử dụng cho những việc nào?</Label>
            <div className="mt-2 space-y-2">
              {data.aiUsage?.purposes?.map((purpose: string, index: number) => (
                <Badge key={index} variant="secondary" className="mr-2 mb-1">{purpose}</Badge>
              ))}
              {data.aiUsage?.otherPurpose && (
                <div className="mt-2">
                  <span className="text-sm text-gray-600">Khác: </span>
                  <span className="text-gray-800">{data.aiUsage.otherPurpose}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold text-gray-800">7. Bạn thường sử dụng công cụ AI nào?</Label>
            <div className="mt-2 space-y-2">
              {data.aiUsage?.tools?.map((tool: string, index: number) => (
                <Badge key={index} variant="outline" className="mr-2 mb-1">{tool}</Badge>
              ))}
              {data.aiUsage?.otherTool && (
                <div className="mt-2">
                  <span className="text-sm text-gray-600">Khác: </span>
                  <span className="text-gray-800">{data.aiUsage.otherTool}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold text-gray-800">8. Nếu hôm nay bạn không thể dùng AI trong học tập, bạn sẽ cảm thấy thế nào?</Label>
            <div className="mt-2 p-3 bg-gray-50 rounded border">
              <span className="text-gray-800">{data.aiUsage?.dependencyLevel || 'Chưa có dữ liệu'}</span>
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold text-gray-800">9. Bạn đã từng học được điều gì bất ngờ từ AI chưa?</Label>
            <Textarea value={data.aiUsage?.surprisingLearning || ''} readOnly className="mt-1 bg-gray-50" rows={3} />
          </div>

          <div>
            <Label className="text-base font-semibold text-gray-800">10. Khi bạn đặt câu hỏi, AI thường hiểu đúng ý bạn không?</Label>
            <div className="mt-2 p-3 bg-gray-50 rounded border">
              <span className="text-gray-800">{data.aiUsage?.aiAccuracy || 'Chưa có dữ liệu'}</span>
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold text-gray-800">11. Khi AI trả kết quả, bạn thường làm gì?</Label>
            <div className="mt-2 p-3 bg-gray-50 rounded border">
              <span className="text-gray-800">{data.aiUsage?.resultUsage || 'Chưa có dữ liệu'}</span>
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold text-gray-800">12. Theo bạn, việc dùng AI có làm bạn lười suy nghĩ hơn không?</Label>
            <div className="mt-2 p-3 bg-gray-50 rounded border">
              <span className="text-gray-800">{data.aiUsage?.thinkingImpact || 'Chưa có dữ liệu'}</span>
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold text-gray-800">13. Bạn gặp những khó khăn gì khi sử dụng AI trong học tập:</Label>
            <div className="mt-2 space-y-2">
              {data.aiUsage?.difficulties?.map((difficulty: string, index: number) => (
                <Badge key={index} variant="secondary" className="mr-2 mb-1 bg-red-100 text-red-800 border-red-200">{difficulty}</Badge>
              ))}
              {data.aiUsage?.otherDifficulty && (
                <div className="mt-2">
                  <span className="text-sm text-gray-600">Khác: </span>
                  <span className="text-gray-800">{data.aiUsage.otherDifficulty}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold text-gray-800">14. Bạn đã từng được thầy cô hoặc người có chuyên môn hướng dẫn cách sử dụng AI trong học tập chưa?</Label>
            <div className="mt-2 p-3 bg-gray-50 rounded border">
              <span className="text-gray-800">{data.aiUsage?.guidance || 'Chưa có dữ liệu'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Technical Projects */}
      <div className="space-y-6 bg-gradient-to-br from-green-50/50 to-blue-50/50 rounded-2xl p-6 border border-green-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-lg">⚙️</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800">PHẦN 3: KHẢO SÁT VỀ SỬ DỤNG AI TRONG DỰ ÁN KĨ THUẬT</h3>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-base font-semibold text-gray-800">15. Bạn đã từng được học và trải nghiệm các hoạt động kĩ thuật nào sau đây?</Label>
            <div className="mt-2 space-y-2">
              {data.technicalProjects?.experiences?.map((experience: string, index: number) => (
                <Badge key={index} variant="secondary" className="mr-2 mb-1">{experience}</Badge>
              ))}
              {data.technicalProjects?.otherExperience && (
                <div className="mt-2">
                  <span className="text-sm text-gray-600">Khác: </span>
                  <span className="text-gray-800">{data.technicalProjects.otherExperience}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold text-gray-800">16. Khi thực hiện hoạt động kĩ thuật, bạn muốn AI hỗ trợ ở khâu nào?</Label>
            <div className="mt-2 space-y-2">
              {data.technicalProjects?.aiSupport?.map((support: string, index: number) => (
                <Badge key={index} variant="outline" className="mr-2 mb-1">{support}</Badge>
              ))}
              {data.technicalProjects?.otherSupport && (
                <div className="mt-2">
                  <span className="text-sm text-gray-600">Khác: </span>
                  <span className="text-gray-800">{data.technicalProjects.otherSupport}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold text-gray-800">17. Nếu có lớp học về cách ứng dụng AI trong kĩ thuật, bạn sẽ:</Label>
            <div className="mt-2 p-3 bg-gray-50 rounded border">
              <span className="text-gray-800">{data.technicalProjects?.learningInterest || 'Chưa có dữ liệu'}</span>
            </div>
            {data.technicalProjects?.otherInterest && (
              <div className="mt-2">
                <span className="text-sm text-gray-600">Khác: </span>
                <span className="text-gray-800">{data.technicalProjects.otherInterest}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  // Teacher Survey View Component
  const TeacherSurveyView = ({ data }: { data: any }) => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
          KHẢO SÁT GIÁO VIÊN
        </h1>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          THỰC TRẠNG SỬ DỤNG TRÍ TUỆ NHÂN TẠO TRONG GIẢNG DẠY
        </h2>
      </div>

      {/* Personal Information */}
      <div className="space-y-6 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 rounded-2xl p-6 border border-emerald-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
            <span className="text-lg">👨‍🏫</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800">THÔNG TIN CƠ BẢN</h3>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-base font-semibold text-gray-800">1. Họ và tên Thầy/Cô:</Label>
            <Input value={data.personalInfo?.fullName || ''} readOnly className="mt-1 bg-gray-50" />
          </div>
          <div>
            <Label className="text-base font-semibold text-gray-800">2. Thầy/Cô đang giảng dạy ở cấp học nào?</Label>
            <div className="mt-2 p-3 bg-gray-50 rounded border">
              <span className="text-gray-800">
                {data.personalInfo?.educationLevel === 'other' 
                  ? data.personalInfo?.otherEducationLevel 
                  : data.personalInfo?.educationLevel || 'Chưa có dữ liệu'}
              </span>
            </div>
          </div>
          <div>
            <Label className="text-base font-semibold text-gray-800">3. Trường Thầy/Cô đang công tác:</Label>
            <Input value={data.personalInfo?.school || ''} readOnly className="mt-1 bg-gray-50" />
          </div>
          <div>
            <Label className="text-base font-semibold text-gray-800">4. Bộ môn Thầy/Cô đang phụ trách:</Label>
            <div className="mt-2 p-3 bg-gray-50 rounded border">
              <span className="text-gray-800">
                {data.personalInfo?.subject === 'other' 
                  ? data.personalInfo?.otherSubject 
                  : data.personalInfo?.subject || 'Chưa có dữ liệu'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Usage in Teaching */}
      <div className="space-y-6 bg-gradient-to-br from-blue-50/50 to-emerald-50/50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-lg">🤖</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800">SỬ DỤNG AI TRONG GIẢNG DẠY</h3>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-base font-semibold text-gray-800">5. Tần suất Thầy/Cô sử dụng các công cụ AI trong công việc giảng dạy:</Label>
            <div className="mt-2 p-3 bg-gray-50 rounded border">
              <span className="text-gray-800">{data.aiUsage?.frequency || 'Chưa có dữ liệu'}</span>
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold text-gray-800">6. Thầy/Cô thường sử dụng AI vào giai đoạn nào của quá trình giảng dạy?</Label>
            <div className="mt-2 space-y-2">
              {data.aiUsage?.teachingPhase?.map((phase: string, index: number) => (
                <Badge key={index} variant="secondary" className="mr-2 mb-1">{phase}</Badge>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold text-gray-800">7. Khi nhận được nội dung từ AI, Thầy/Cô thường:</Label>
            <div className="mt-2 space-y-2">
              {data.aiUsage?.contentUsage?.map((usage: string, index: number) => (
                <Badge key={index} variant="outline" className="mr-2 mb-1">{usage}</Badge>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold text-gray-800">8. Thầy/Cô đã từng học được điều gì bất ngờ hoặc hữu ích từ AI chưa?</Label>
            <Textarea value={data.aiUsage?.surprisingLearning || ''} readOnly className="mt-1 bg-gray-50" rows={3} />
          </div>

          <div>
            <Label className="text-base font-semibold text-gray-800">9. Khi đặt yêu cầu, AI thường hiểu đúng ý Thầy/Cô ở mức nào?</Label>
            <div className="mt-2 p-3 bg-gray-50 rounded border">
              <span className="text-gray-800">{data.aiUsage?.aiAccuracy || 'Chưa có dữ liệu'}</span>
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold text-gray-800">10. Theo Thầy/Cô, việc sử dụng AI có làm giảm khả năng tư duy độc lập của học sinh không?</Label>
            <div className="mt-2 p-3 bg-gray-50 rounded border">
              <span className="text-gray-800">{data.aiUsage?.studentThinkingImpact || 'Chưa có dữ liệu'}</span>
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold text-gray-800">11. Theo Thầy/Cô, việc tích hợp trí tuệ nhân tạo (AI) vào chương trình học hiện nay có thật sự cần thiết không?</Label>
            <div className="mt-2 p-3 bg-gray-50 rounded border">
              <span className="text-gray-800">{data.aiUsage?.aiIntegrationNecessity || 'Chưa có dữ liệu'}</span>
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold text-gray-800">12. Thầy/Cô đã từng được tập huấn hoặc hướng dẫn chính thức về cách ứng dụng AI trong giảng dạy chưa?</Label>
            <div className="mt-2 p-3 bg-gray-50 rounded border">
              <span className="text-gray-800">{data.aiUsage?.officialTraining || 'Chưa có dữ liệu'}</span>
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold text-gray-800">13. Theo Thầy/Cô, cách hiệu quả nhất để học sinh tiếp cận AI là:</Label>
            <div className="mt-2 p-3 bg-gray-50 rounded border">
              <span className="text-gray-800">
                {data.aiUsage?.effectiveApproach === 'other' 
                  ? data.aiUsage?.otherEffectiveApproach 
                  : data.aiUsage?.effectiveApproach || 'Chưa có dữ liệu'}
              </span>
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold text-gray-800">14. Điều kiện quan trọng để AI được ứng dụng hiệu quả trong giáo dục là gì?</Label>
            <div className="mt-2 space-y-2">
              {data.aiUsage?.importantConditions?.map((condition: string, index: number) => (
                <Badge key={index} variant="secondary" className="mr-2 mb-1">{condition}</Badge>
              ))}
              {data.aiUsage?.otherImportantCondition && (
                <div className="mt-2">
                  <span className="text-sm text-gray-600">Khác: </span>
                  <span className="text-gray-800">{data.aiUsage.otherImportantCondition}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold text-gray-800">15. Thầy/Cô đã từng triển khai hoạt động dạy học có tích hợp AI chưa?</Label>
            <div className="mt-2 p-3 bg-gray-50 rounded border">
              <span className="text-gray-800">{data.aiUsage?.implementedActivities || 'Chưa có dữ liệu'}</span>
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold text-gray-800">16. Nếu chưa từng tổ chức cho học sinh sử dụng AI, lý do chính đáng là gì?</Label>
            <div className="mt-2 space-y-2">
              {data.aiUsage?.reasonsNotImplemented?.map((reason: string, index: number) => (
                <Badge key={index} variant="outline" className="mr-2 mb-1">{reason}</Badge>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold text-gray-800">17. Nếu được tạo điều kiện (thiết bị, hướng dẫn, thời lượng,...), Thầy/Cô có sẵn sàng tổ chức hoạt động sử dụng AI cho học sinh không?</Label>
            <div className="mt-2 p-3 bg-gray-50 rounded border">
              <span className="text-gray-800">{data.aiUsage?.readinessToImplement || 'Chưa có dữ liệu'}</span>
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold text-gray-800">18. Thầy/Cô mong muốn học sinh sử dụng AI trong hoạt động học nào nhất?</Label>
            <div className="mt-2 space-y-2">
              {data.aiUsage?.desiredStudentActivities?.map((activity: string, index: number) => (
                <Badge key={index} variant="secondary" className="mr-2 mb-1">{activity}</Badge>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold text-gray-800">19. Theo Thầy/Cô, làm thế nào để AI trở thành công cụ hỗ trợ hiệu quả hơn trong hoạt động giáo dục?</Label>
            <Textarea value={data.aiUsage?.improvementSuggestions || ''} readOnly className="mt-1 bg-gray-50" rows={3} />
          </div>
        </div>
      </div>
    </div>
  )

  // Individual Survey View Component
  const IndividualSurveyView = ({ data }: { data: any }) => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
          Hoạt động cá nhân
        </h2>
        <p className="text-lg text-gray-600">Mở khóa tệp tin cảm xúc. Chỉ bạn thấy góc nhìn riêng.</p>
      </div>

      {/* Personal Info */}
      <div className="space-y-6 bg-gradient-to-br from-teal-50/50 to-cyan-50/50 rounded-2xl p-6 border border-teal-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
            <span className="text-lg">📝</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800">Phần 1: Thông tin cá nhân</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-base font-semibold text-gray-800">Họ và tên:</Label>
            <Input value={data.personalInfo?.fullName || ''} readOnly className="mt-1 bg-gray-50" />
          </div>
          <div>
            <Label className="text-base font-semibold text-gray-800">Lớp:</Label>
            <Input value={data.personalInfo?.class || ''} readOnly className="mt-1 bg-gray-50" />
          </div>
        </div>
      </div>

      {/* Survey Questions */}
      <div className="space-y-6 bg-gradient-to-br from-cyan-50/50 to-blue-50/50 rounded-2xl p-6 border border-cyan-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-lg">💭</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800">Phần 2: Câu hỏi khảo sát</h3>
        </div>

        <div className="space-y-6">
          <div className="bg-white/70 rounded-xl p-6 border border-cyan-100">
            <Label className="text-base font-semibold text-gray-800 flex items-center gap-2">
              <span className="text-cyan-600">1</span>
              Khoảnh khắc ấn tượng nhất
            </Label>
            <p className="text-gray-600 mt-1 mb-3">
              Khoảnh khắc nào khiến bạn ấn tượng nhất và nó giúp bạn hiểu gì hơn về AI hoặc thiết kế kỹ thuật?
            </p>
            <Textarea value={data.responses?.question1 || ''} readOnly className="bg-gray-50" rows={4} />
          </div>

          <div className="bg-white/70 rounded-xl p-6 border border-cyan-100">
            <Label className="text-base font-semibold text-gray-800 flex items-center gap-2">
              <span className="text-cyan-600">2</span>
              Điểm tiến bộ nhất
            </Label>
            <p className="text-gray-600 mt-1 mb-3">
              Sau buổi học, bạn cảm thấy mình tiến bộ nhất ở điểm nào? Vì sao?
            </p>
            <Textarea value={data.responses?.question2 || ''} readOnly className="bg-gray-50" rows={4} />
          </div>

          <div className="bg-white/70 rounded-xl p-6 border border-cyan-100">
            <Label className="text-base font-semibold text-gray-800 flex items-center gap-2">
              <span className="text-cyan-600">3</span>
              Đề xuất cải tiến
            </Label>
            <p className="text-gray-600 mt-1 mb-3">
              Nếu cải tiến buổi học tiếp theo, bạn muốn thêm hoặc thay đổi điều gì để học hiệu quả hơn?
            </p>
            <Textarea value={data.responses?.question3 || ''} readOnly className="bg-gray-50" rows={4} />
          </div>
        </div>
      </div>
    </div>
  )

  // Group Survey View Component
  const GroupSurveyView = ({ data }: { data: any }) => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
          Hoạt động nhóm
        </h2>
        <p className="text-lg text-gray-600">Khám phá sức mạnh của sự hợp tác và AI</p>
      </div>

      {/* Group Info */}
      <div className="space-y-6 bg-gradient-to-br from-violet-50/50 to-purple-50/50 rounded-2xl p-6 border border-violet-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-lg">👥</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800">Thông tin nhóm</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-base font-semibold text-gray-800">Tên nhóm:</Label>
            <Input value={data.groupName || data.groupInfo?.groupName || ''} readOnly className="mt-1 bg-gray-50" />
          </div>
          <div>
            <Label className="text-base font-semibold text-gray-800">Trưởng nhóm:</Label>
            <Input value={data.groupInfo?.leaderName || ''} readOnly className="mt-1 bg-gray-50" />
          </div>
          <div>
            <Label className="text-base font-semibold text-gray-800">Số thành viên:</Label>
            <Input value={data.groupInfo?.memberCount || ''} readOnly className="mt-1 bg-gray-50" />
          </div>
          <div>
            <Label className="text-base font-semibold text-gray-800">Lớp:</Label>
            <Input value={data.groupInfo?.class || ''} readOnly className="mt-1 bg-gray-50" />
          </div>
          <div>
            <Label className="text-base font-semibold text-gray-800">Môn học:</Label>
            <Input value={data.groupInfo?.subject || ''} readOnly className="mt-1 bg-gray-50" />
          </div>
          <div>
            <Label className="text-base font-semibold text-gray-800">Mã nhóm:</Label>
            <Input value={data.groupInfo?.groupCode || ''} readOnly className="mt-1 bg-gray-50" />
          </div>
        </div>
      </div>

      {/* Activity Progress */}
      <div className="bg-gradient-to-br from-gray-50/50 to-slate-50/50 rounded-2xl p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Tiến độ hoạt động</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${data.activity1 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
              {data.activity1 ? '✓' : '○'}
            </div>
            <p className="font-medium">Hoạt động 1</p>
            <p className="text-sm text-gray-500">Bí ẩn dòng nước</p>
          </div>
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${data.activity2 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
              {data.activity2 ? '✓' : '○'}
            </div>
            <p className="font-medium">Hoạt động 2</p>
            <p className="text-sm text-gray-500">Khám phá thủy lực</p>
          </div>
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${data.activity3 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
              {data.activity3 ? '✓' : '○'}
            </div>
            <p className="font-medium">Hoạt động 3</p>
            <p className="text-sm text-gray-500">Thiết kế kỳ diệu</p>
          </div>
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${data.activity4 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
              {data.activity4 ? '✓' : '○'}
            </div>
            <p className="font-medium">Hoạt động 4</p>
            <p className="text-sm text-gray-500">Bản vẽ toả sáng</p>
          </div>
        </div>
      </div>

      {/* Activity 1 Details */}
      {data.activity1 && (
        <div className="space-y-6 bg-gradient-to-br from-purple-50/50 to-violet-50/50 rounded-2xl p-6 border border-purple-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
              <span className="text-lg">🌊</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800">Hoạt động 1: Bí ẩn dòng nước</h3>
          </div>

          {/* Idea Prompt */}
          {data.activity1.ideaPrompt && (
            <div className="bg-white/70 rounded-xl p-6 border border-purple-100">
              <Label className="text-base font-semibold text-purple-800 mb-3 block">💡 Ý tưởng Prompt</Label>
              <Textarea value={data.activity1.ideaPrompt} readOnly className="bg-gray-50" rows={6} />
            </div>
          )}

          {/* 3D Images */}
          {data.activity1.images3D && data.activity1.images3D.length > 0 && (
            <div className="bg-white/70 rounded-xl p-6 border border-purple-100">
              <Label className="text-base font-semibold text-purple-800 mb-3 block">📸 Hình ảnh 3D - Meshy AI</Label>
              <ImageGallery images={data.activity1.images3D} readOnly />
            </div>
          )}

          {/* Front View Images */}
          {data.activity1.frontViewImages && data.activity1.frontViewImages.length > 0 && (
            <div className="bg-white/70 rounded-xl p-6 border border-blue-100">
              <Label className="text-base font-semibold text-blue-800 mb-3 block">📐 Hình chiếu đứng</Label>
              <ImageGallery images={data.activity1.frontViewImages} readOnly />
            </div>
          )}

          {/* Top View Images */}
          {data.activity1.topViewImages && data.activity1.topViewImages.length > 0 && (
            <div className="bg-white/70 rounded-xl p-6 border border-green-100">
              <Label className="text-base font-semibold text-green-800 mb-3 block">📏 Hình chiếu bằng</Label>
              <ImageGallery images={data.activity1.topViewImages} readOnly />
            </div>
          )}

          {/* Side View Images */}
          {data.activity1.sideViewImages && data.activity1.sideViewImages.length > 0 && (
            <div className="bg-white/70 rounded-xl p-6 border border-orange-100">
              <Label className="text-base font-semibold text-orange-800 mb-3 block">📊 Hình chiếu cạnh</Label>
              <ImageGallery images={data.activity1.sideViewImages} readOnly />
            </div>
          )}
        </div>
      )}

      {/* Activity 2 Details */}
      {data.activity2 && (
        <div className="space-y-6 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-lg">🔮</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800">Hoạt động 2: Bí mật thuyền sinh tồn</h3>
          </div>

          <div className="space-y-4">
            {data.activity2.question1 && (
              <div className="bg-white/70 rounded-xl p-6 border border-blue-100">
                <Label className="text-base font-semibold text-blue-800">Câu 1: Mô tả tình huống</Label>
                <Textarea value={data.activity2.question1} readOnly className="mt-2 bg-gray-50" rows={3} />
              </div>
            )}

            {data.activity2.question2 && (
              <div className="bg-white/70 rounded-xl p-6 border border-blue-100">
                <Label className="text-base font-semibold text-blue-800">Câu 2: Phân tích vấn đề</Label>
                <Textarea value={data.activity2.question2} readOnly className="mt-2 bg-gray-50" rows={3} />
              </div>
            )}

            {data.activity2.question3 && (
              <div className="bg-white/70 rounded-xl p-6 border border-blue-100">
                <Label className="text-base font-semibold text-blue-800">Câu 3: Giải pháp đề xuất</Label>
                <Textarea value={data.activity2.question3} readOnly className="mt-2 bg-gray-50" rows={3} />
              </div>
            )}

            {data.activity2.question4 && Array.isArray(data.activity2.question4) && (
              <div className="bg-white/70 rounded-xl p-6 border border-blue-100">
                <Label className="text-base font-semibold text-blue-800 mb-4 block">Câu 4: Bảng thiết kế với AI</Label>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-blue-200">
                    <thead>
                      <tr className="bg-blue-100">
                        <th className="border border-blue-200 p-3 text-left">Bước thiết kế</th>
                        <th className="border border-blue-200 p-3 text-left">Công cụ AI</th>
                        <th className="border border-blue-200 p-3 text-left">Cách sử dụng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.activity2.question4.map((item: any, index: number) => (
                        <tr key={index} className="hover:bg-blue-50">
                          <td className="border border-blue-200 p-3">{item.step}</td>
                          <td className="border border-blue-200 p-3">{item.aiTool}</td>
                          <td className="border border-blue-200 p-3">{item.usage}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Activity 3 Details */}
      {data.activity3 && (
        <div className="space-y-6 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-2xl p-6 border border-indigo-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-lg">🗺️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800">Hoạt động 3: Bản vẽ bí ẩn</h3>
          </div>

          {/* Section 1 */}
          {data.activity3.section1 && (
            <div className="bg-white/70 rounded-xl p-6 border border-indigo-100">
              <h4 className="text-lg font-semibold text-indigo-800 mb-4">Phần 1: Ý tưởng thiết kế</h4>
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-semibold text-gray-800">Mục đích và bối cảnh:</Label>
                  <Textarea value={data.activity3.section1.purposeContext || ''} readOnly className="mt-2 bg-gray-50" rows={2} />
                </div>
                <div>
                  <Label className="text-base font-semibold text-gray-800">Tiêu chí và chức năng:</Label>
                  <Textarea value={data.activity3.section1.criteriaFunction || ''} readOnly className="mt-2 bg-gray-50" rows={2} />
                </div>
                <div>
                  <Label className="text-base font-semibold text-gray-800">Prompt và hình ảnh:</Label>
                  <Textarea value={data.activity3.section1.promptAndImage || ''} readOnly className="mt-2 bg-gray-50" rows={2} />
                </div>
                {data.activity3.section1.ideaImages && data.activity3.section1.ideaImages.length > 0 && (
                  <div>
                    <Label className="text-base font-semibold text-gray-800 mb-3 block">Hình ảnh ý tưởng:</Label>
                    <ImageGallery images={data.activity3.section1.ideaImages} readOnly />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Section 2 */}
          {data.activity3.section2 && (
            <div className="bg-white/70 rounded-xl p-6 border border-indigo-100">
              <h4 className="text-lg font-semibold text-indigo-800 mb-4">Phần 2: Mô hình và bản vẽ</h4>
              <div className="space-y-6">
                {data.activity3.section2.model3DImages && data.activity3.section2.model3DImages.length > 0 && (
                  <div>
                    <Label className="text-base font-semibold text-gray-800 mb-3 block">Ảnh mô hình 3D:</Label>
                    <ImageGallery images={data.activity3.section2.model3DImages} readOnly />
                  </div>
                )}
                {data.activity3.section2.technical2DImages && data.activity3.section2.technical2DImages.length > 0 && (
                  <div>
                    <Label className="text-base font-semibold text-gray-800 mb-3 block">Ảnh vẽ kỹ thuật 2D:</Label>
                    <ImageGallery images={data.activity3.section2.technical2DImages} readOnly />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Section 3 */}
          {data.activity3.section3 && (
            <div className="bg-white/70 rounded-xl p-6 border border-indigo-100">
              <h4 className="text-lg font-semibold text-indigo-800 mb-4">Phần 3: File CAD</h4>
              {data.activity3.section3.cadFiles && data.activity3.section3.cadFiles.length > 0 && (
                <div>
                  <Label className="text-base font-semibold text-gray-800 mb-3 block">File CAD:</Label>
                  <ImageGallery images={data.activity3.section3.cadFiles} readOnly />
                </div>
              )}
            </div>
          )}

          {/* Self Assessment */}
          {data.activity3.selfAssessment && (
            <div className="bg-white/70 rounded-xl p-6 border border-indigo-100">
              <h4 className="text-lg font-semibold text-indigo-800 mb-4">Tự đánh giá</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(data.activity3.selfAssessment).map(([key, value]: [string, any]) => {
                  const labels: { [key: string]: string } = {
                    criteriaCompliance: 'Tuân thủ tiêu chí',
                    model3DBalance: 'Cân bằng mô hình 3D',
                    drawing2DComplete: 'Hoàn thiện bản vẽ 2D',
                    cadAccuracy: 'Độ chính xác CAD'
                  }
                  return (
                    <div key={key} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${value.achieved ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {value.achieved ? '✓' : '✗'}
                      </div>
                      <span className="text-gray-800">{labels[key] || key}</span>
                      {value.note && <span className="text-sm text-gray-500">({value.note})</span>}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Activity 4 Details */}
      {data.activity4 && (
        <div className="space-y-6 bg-gradient-to-br from-violet-50/50 to-pink-50/50 rounded-2xl p-6 border border-violet-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-lg">✨</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800">Hoạt động 4: Bản vẽ toả sáng</h3>
          </div>

          {/* Self Evaluation */}
          {data.activity4.selfEvaluation && (
            <div className="bg-white/70 rounded-xl p-6 border border-violet-100">
              <h4 className="text-lg font-semibold text-violet-800 mb-4">Tự đánh giá</h4>
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-semibold text-gray-800">Điểm mạnh:</Label>
                  <Textarea value={data.activity4.selfEvaluation.strengths || ''} readOnly className="mt-2 bg-gray-50" rows={2} />
                </div>
                <div>
                  <Label className="text-base font-semibold text-gray-800">Điểm yếu:</Label>
                  <Textarea value={data.activity4.selfEvaluation.weaknesses || ''} readOnly className="mt-2 bg-gray-50" rows={2} />
                </div>
                {data.activity4.selfEvaluation.improvements && (
                  <div>
                    <Label className="text-base font-semibold text-gray-800">Cải tiến:</Label>
                    <div className="mt-2 space-y-2">
                      {data.activity4.selfEvaluation.improvements.map((item: any, index: number) => (
                        <div key={index} className="p-3 bg-gray-50 rounded border">
                          <span className="font-medium text-violet-600">{item.id}.</span> {item.improvement}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Peer Evaluation */}
          {data.activity4.peerEvaluation && (
            <div className="bg-white/70 rounded-xl p-6 border border-violet-100">
              <h4 className="text-lg font-semibold text-violet-800 mb-4">Đánh giá đồng đẳng</h4>
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-semibold text-gray-800">Điểm mạnh:</Label>
                  <Textarea value={data.activity4.peerEvaluation.strengths || ''} readOnly className="mt-2 bg-gray-50" rows={2} />
                </div>
                <div>
                  <Label className="text-base font-semibold text-gray-800">Điểm yếu:</Label>
                  <Textarea value={data.activity4.peerEvaluation.weaknesses || ''} readOnly className="mt-2 bg-gray-50" rows={2} />
                </div>
                {data.activity4.peerEvaluation.improvements && (
                  <div>
                    <Label className="text-base font-semibold text-gray-800">Cải tiến:</Label>
                    <div className="mt-2 space-y-2">
                      {data.activity4.peerEvaluation.improvements.map((item: any, index: number) => (
                        <div key={index} className="p-3 bg-gray-50 rounded border">
                          <span className="font-medium text-violet-600">{item.id}.</span> {item.improvement}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* AI Evaluation */}
          {data.activity4.aiEvaluation && (
            <div className="bg-white/70 rounded-xl p-6 border border-violet-100">
              <h4 className="text-lg font-semibold text-violet-800 mb-4">Đánh giá AI</h4>
              <div className="space-y-4">
                {data.activity4.aiEvaluation.ratings && (
                  <div>
                    <Label className="text-base font-semibold text-gray-800 mb-3 block">Điểm số:</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(data.activity4.aiEvaluation.ratings).map(([key, value]: [string, any]) => {
                        const labels: { [key: string]: string } = {
                          creativity: 'Sáng tạo',
                          simulation: 'Mô phỏng',
                          analysis: 'Phân tích',
                          presentation: 'Trình bày'
                        }
                        return (
                          <div key={key} className="text-center p-3 bg-violet-50 rounded-lg">
                            <div className="text-2xl font-bold text-violet-600">{value}/5</div>
                            <div className="text-sm text-gray-600">{labels[key] || key}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
                
                {data.activity4.aiEvaluation.notes && (
                  <div>
                    <Label className="text-base font-semibold text-gray-800 mb-3 block">Ghi chú:</Label>
                    <div className="space-y-2">
                      {Object.entries(data.activity4.aiEvaluation.notes).map(([key, value]: [string, any]) => {
                        const labels: { [key: string]: string } = {
                          creativity: 'Sáng tạo',
                          simulation: 'Mô phỏng',
                          analysis: 'Phân tích',
                          presentation: 'Trình bày'
                        }
                        if (value) {
                          return (
                            <div key={key} className="p-3 bg-gray-50 rounded border">
                              <span className="font-medium text-violet-600">{labels[key] || key}:</span> {value}
                            </div>
                          )
                        }
                        return null
                      })}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-base font-semibold text-gray-800">Tác động của AI:</Label>
                    <Textarea value={data.activity4.aiEvaluation.aiImpact || ''} readOnly className="mt-2 bg-gray-50" rows={3} />
                  </div>
                  <div>
                    <Label className="text-base font-semibold text-gray-800">Hạn chế của AI:</Label>
                    <Textarea value={data.activity4.aiEvaluation.aiLimitations || ''} readOnly className="mt-2 bg-gray-50" rows={3} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )

  const renderSurveyContent = () => {
    if (!survey) return null

    switch (survey.type) {
      case 'ai':
        return <AISurveyView data={survey} />
      case 'teacher':
        return <TeacherSurveyView data={survey} />
      case 'individual':
        return <IndividualSurveyView data={survey} />
      case 'group':
        return <GroupSurveyView data={survey} />
      default:
        return <div className="text-center py-8 text-gray-600">Loại khảo sát không được hỗ trợ</div>
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Chi tiết khảo sát</h2>
              {survey && (
                <p className="text-blue-100 mt-1">
                  {survey.type === 'ai' && 'Khảo sát học sinh về AI'}
                  {survey.type === 'teacher' && 'Khảo sát giáo viên về AI'}
                  {survey.type === 'individual' && 'Hoạt động cá nhân'}
                  {survey.type === 'group' && 'Hoạt động nhóm'}
                </p>
              )}
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              className="text-white hover:bg-white/20"
            >
              ✕
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Đang tải chi tiết...</p>
            </div>
          ) : survey ? (
            <div className="space-y-6">
              {/* Survey Content */}
              {renderSurveyContent()}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">❌</div>
              <p className="text-gray-600">Không thể tải chi tiết khảo sát</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}