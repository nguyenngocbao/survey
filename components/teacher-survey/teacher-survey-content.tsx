'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'

interface TeacherSurveyData {
  // Thông tin cơ bản
  personalInfo: {
    fullName: string
    educationLevel: string
    otherEducationLevel: string
    school: string
    subject: string
    otherSubject: string
  }
  // Sử dụng AI trong giảng dạy
  aiUsage: {
    frequency: string
    teachingPhase: string[]
    contentUsage: string[]
    surprisingLearning: string
    aiAccuracy: string
    studentThinkingImpact: string
    aiIntegrationNecessity: string
    officialTraining: string
    effectiveApproach: string
    otherEffectiveApproach: string
    importantConditions: string[]
    otherImportantCondition: string
    implementedActivities: string
    reasonsNotImplemented: string[]
    readinessToImplement: string
    desiredStudentActivities: string[]
    improvementSuggestions: string
  }
}

export function TeacherSurveyContent() {
  const [formData, setFormData] = useState<TeacherSurveyData>({
    personalInfo: {
      fullName: '',
      educationLevel: '',
      otherEducationLevel: '',
      school: '',
      subject: '',
      otherSubject: ''
    },
    aiUsage: {
      frequency: '',
      teachingPhase: [],
      contentUsage: [],
      surprisingLearning: '',
      aiAccuracy: '',
      studentThinkingImpact: '',
      aiIntegrationNecessity: '',
      officialTraining: '',
      effectiveApproach: '',
      otherEffectiveApproach: '',
      importantConditions: [],
      otherImportantCondition: '',
      implementedActivities: '',
      reasonsNotImplemented: [],
      readinessToImplement: '',
      desiredStudentActivities: [],
      improvementSuggestions: ''
    }
  })

  const handlePersonalInfoChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }))
  }

  const handleAiUsageChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      aiUsage: {
        ...prev.aiUsage,
        [field]: value
      }
    }))
  }

  const handleCheckboxChange = (field: string, option: string, checked: boolean) => {
    setFormData(prev => {
      const currentArray = (prev.aiUsage as any)[field] as string[]
      const updatedArray = checked 
        ? [...currentArray, option]
        : currentArray.filter(item => item !== option)
      
      return {
        ...prev,
        aiUsage: {
          ...prev.aiUsage,
          [field]: updatedArray
        }
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.personalInfo.fullName || !formData.personalInfo.educationLevel) {
      alert('Vui lòng điền đầy đủ thông tin cơ bản bắt buộc')
      return
    }

    // TODO: Submit to API
    console.log('Submitting teacher survey:', formData)
    alert('🎉 Cảm ơn Thầy/Cô đã hoàn thành khảo sát!')
  }

  return (
    <div className="w-full max-w-6xl space-y-8">
      <form onSubmit={handleSubmit}>
        <Card className="relative overflow-hidden p-10 md:p-12 bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-3xl">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/5 to-teal-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/5 to-emerald-600/5 rounded-full blur-3xl"></div>
          
          <div className="relative space-y-12">
            {/* Main Title */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                KHẢO SÁT GIÁO VIÊN
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                THỰC TRẠNG SỬ DỤNG TRÍ TUỆ NHÂN TẠO TRONG GIẢNG DẠY
              </h2>
              <div className="max-w-4xl mx-auto text-gray-600 leading-relaxed space-y-4">
                <p className="font-medium text-gray-700">
                  Kính gửi Quý Thầy/Cô,
                </p>
                <p>
                  Khảo sát này được thực hiện nhằm tìm hiểu thực trạng ứng dụng trí tuệ nhân tạo (AI) trong hoạt động giảng dạy, đặc biệt là trong môn Công nghệ, từ đó đề xuất các giải pháp tích hợp AI một cách hiệu quả và phù hợp với bối cảnh chuyển đổi số trong giáo dục.
                </p>
                <p>
                  Thông tin thu thập từ Thầy/Cô sẽ là nguồn dữ liệu quan trọng giúp nhóm nghiên cứu đánh giá chính xác mức độ tiếp cận, thói quen sử dụng, trải nghiệm và quan điểm của giáo viên đối với AI trong dạy học. Qua đó, góp phần xây dựng định hướng phát triển năng lực số cho đội ngũ giáo viên và học sinh trong nhà trường.
                </p>
                <p className="text-sm italic text-emerald-600 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
                  Toàn bộ câu trả lời sẽ được giữ bí mật tuyệt đối, chỉ sử dụng cho mục đích nghiên cứu khoa học, không công khai danh tính hay thông tin cá nhân dưới bất kỳ hình thức nào.
                </p>
                <p className="font-medium text-gray-700">
                  Rất mong nhận được sự hợp tác và chia sẻ chân thành từ Thầy/Cô. Trân trọng cảm ơn Thầy/Cô đã dành thời gian tham gia!
                </p>
              </div>
            </div>

            {/* Section 1: Personal Information */}
            <div className="space-y-6 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 rounded-2xl p-8 border border-emerald-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-xl">👨‍🏫</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  THÔNG TIN CƠ BẢN
                </h3>
              </div>

              <div className="space-y-6">
                {/* Question 1: Full Name */}
                <div>
                  <Label htmlFor="fullName" className="text-lg font-semibold text-gray-800 mb-3 block">
                    1. Họ và tên Thầy/Cô:
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.personalInfo.fullName}
                    onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                    placeholder="Nhập họ và tên của Thầy/Cô"
                    required
                    className="mt-1"
                  />
                </div>

                {/* Question 2: Education Level */}
                <div>
                  <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                    2. Thầy/Cô đang giảng dạy ở cấp học nào?
                  </Label>
                  <div className="space-y-2">
                    {['THCS', 'THPT', 'Cao đẳng', 'Đại học'].map((level) => (
                      <label key={level} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="educationLevel"
                          value={level}
                          checked={formData.personalInfo.educationLevel === level}
                          onChange={(e) => handlePersonalInfoChange('educationLevel', e.target.value)}
                          className="w-4 h-4 text-emerald-600"
                          required
                        />
                        <span className="text-gray-700">{level}</span>
                      </label>
                    ))}
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="educationLevel"
                        value="other"
                        checked={formData.personalInfo.educationLevel === 'other'}
                        onChange={(e) => handlePersonalInfoChange('educationLevel', e.target.value)}
                        className="w-4 h-4 text-emerald-600"
                      />
                      <span className="text-gray-700">Mục khác:</span>
                      <Input
                        value={formData.personalInfo.otherEducationLevel}
                        onChange={(e) => handlePersonalInfoChange('otherEducationLevel', e.target.value)}
                        placeholder="Nhập cấp học khác"
                        className="ml-2 flex-1"
                        disabled={formData.personalInfo.educationLevel !== 'other'}
                      />
                    </label>
                  </div>
                </div>

                {/* Question 3: School */}
                <div>
                  <Label htmlFor="school" className="text-lg font-semibold text-gray-800 mb-3 block">
                    3. Trường Thầy/Cô đang công tác:
                  </Label>
                  <Input
                    id="school"
                    value={formData.personalInfo.school}
                    onChange={(e) => handlePersonalInfoChange('school', e.target.value)}
                    placeholder="Nhập tên trường đang công tác"
                    className="mt-1"
                  />
                </div>

                {/* Question 4: Subject */}
                <div>
                  <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                    4. Bộ môn Thầy/Cô đang phụ trách:
                    <span className="text-sm font-normal text-gray-600 block mt-1">
                      Ví dụ: Công nghệ, Tin học, Vật lý, Toán, Ngữ văn...
                    </span>
                  </Label>
                  <div className="space-y-2">
                    {['Vật lý', 'Công nghệ', 'Khoa học tự nhiên', 'Tin học', 'Toán'].map((subject) => (
                      <label key={subject} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="subject"
                          value={subject}
                          checked={formData.personalInfo.subject === subject}
                          onChange={(e) => handlePersonalInfoChange('subject', e.target.value)}
                          className="w-4 h-4 text-emerald-600"
                        />
                        <span className="text-gray-700">{subject}</span>
                      </label>
                    ))}
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="subject"
                        value="other"
                        checked={formData.personalInfo.subject === 'other'}
                        onChange={(e) => handlePersonalInfoChange('subject', e.target.value)}
                        className="w-4 h-4 text-emerald-600"
                      />
                      <span className="text-gray-700">Mục khác:</span>
                      <Input
                        value={formData.personalInfo.otherSubject}
                        onChange={(e) => handlePersonalInfoChange('otherSubject', e.target.value)}
                        placeholder="Nhập bộ môn khác"
                        className="ml-2 flex-1"
                        disabled={formData.personalInfo.subject !== 'other'}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: AI Usage in Teaching */}
            <div className="space-y-6 bg-gradient-to-br from-blue-50/50 to-emerald-50/50 rounded-2xl p-8 border border-blue-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-xl">🤖</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  SỬ DỤNG AI TRONG GIẢNG DẠY
                </h3>
              </div>

              <div className="space-y-6">
                {/* Question 5: Usage Frequency */}
                <div>
                  <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                    5. Tần suất Thầy/Cô sử dụng các công cụ AI trong công việc giảng dạy:
                  </Label>
                  <div className="space-y-2">
                    {[
                      'Gần như mỗi ngày',
                      'Vài lần mỗi tuần',
                      'Thỉnh thoảng (vài lần/tháng)',
                      'Hiếm khi (dưới 1 lần/tháng)',
                      'Chưa từng sử dụng'
                    ].map((option) => (
                      <label key={option} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="frequency"
                          value={option}
                          checked={formData.aiUsage.frequency === option}
                          onChange={(e) => handleAiUsageChange('frequency', e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 6: Teaching Phase */}
                <div>
                  <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                    6. Thầy/Cô thường sử dụng AI vào giai đoạn nào của quá trình giảng dạy?
                  </Label>
                  <div className="space-y-2">
                    {[
                      'Trước khi dạy (chuẩn bị bài, thiết kế nội dung)',
                      'Trong khi dạy (gợi ý, hỗ trợ học sinh, minh họa nhanh...)',
                      'Sau khi dạy (đánh giá, phản hồi học sinh)',
                      'Trong toàn bộ quá trình',
                      'Không sử dụng'
                    ].map((phase) => (
                      <label key={phase} className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={formData.aiUsage.teachingPhase.includes(phase)}
                          onCheckedChange={(checked) => handleCheckboxChange('teachingPhase', phase, checked as boolean)}
                        />
                        <span className="text-sm text-gray-700">{phase}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 7: Content Usage */}
                <div>
                  <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                    7. Khi nhận được nội dung từ AI, Thầy/Cô thường: (Có thể chọn nhiều phương án)
                  </Label>
                  <div className="space-y-2">
                    {[
                      'Dùng nguyên văn không chỉnh sửa',
                      'Chỉnh sửa nhẹ cho phù hợp',
                      'Chỉnh sửa sâu, kết hợp chuyên môn',
                      'Tham khảo rồi tự biên soạn lại',
                      'Không sử dụng'
                    ].map((usage) => (
                      <label key={usage} className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={formData.aiUsage.contentUsage.includes(usage)}
                          onCheckedChange={(checked) => handleCheckboxChange('contentUsage', usage, checked as boolean)}
                        />
                        <span className="text-sm text-gray-700">{usage}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 8: Surprising Learning */}
                <div>
                  <Label htmlFor="surprisingLearning" className="text-lg font-semibold text-gray-800 mb-3 block">
                    8. Thầy/Cô đã từng học được điều gì bất ngờ hoặc hữu ích từ AI chưa? (Hãy chia sẻ quan điểm của Thầy/Cô nhé!)
                  </Label>
                  <Textarea
                    id="surprisingLearning"
                    rows={4}
                    value={formData.aiUsage.surprisingLearning}
                    onChange={(e) => handleAiUsageChange('surprisingLearning', e.target.value)}
                    placeholder="Chia sẻ điều bất ngờ hoặc hữu ích Thầy/Cô học được từ AI..."
                    className="mt-2"
                  />
                </div>

                {/* Question 9: AI Accuracy */}
                <div>
                  <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                    9. Khi đặt yêu cầu, AI thường hiểu đúng ý Thầy/Cô ở mức nào?
                  </Label>
                  <div className="space-y-2">
                    {[
                      'Luôn đúng',
                      'Thường đúng',
                      'Hiếm khi đúng',
                      'Hầu như không đúng',
                      'Không sử dụng'
                    ].map((option) => (
                      <label key={option} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="aiAccuracy"
                          value={option}
                          checked={formData.aiUsage.aiAccuracy === option}
                          onChange={(e) => handleAiUsageChange('aiAccuracy', e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 10: Student Thinking Impact */}
                <div>
                  <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                    10. Theo Thầy/Cô, việc sử dụng AI có làm giảm khả năng tư duy độc lập của học sinh không?
                  </Label>
                  <div className="space-y-2">
                    {[
                      'Ảnh hưởng nhiều',
                      'Ảnh hưởng ít',
                      'Hầu như không ảnh hưởng',
                      'Không rõ / Chưa có cơ sở đánh giá'
                    ].map((option) => (
                      <label key={option} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="studentThinkingImpact"
                          value={option}
                          checked={formData.aiUsage.studentThinkingImpact === option}
                          onChange={(e) => handleAiUsageChange('studentThinkingImpact', e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 11: AI Integration Necessity */}
                <div>
                  <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                    11. Theo Thầy/Cô, việc tích hợp trí tuệ nhân tạo (AI) vào chương trình học hiện nay có thật sự cần thiết không?
                  </Label>
                  <div className="space-y-2">
                    {[
                      'Rất cần thiết',
                      'Cần thiết',
                      'Không cần thiết',
                      'Hoàn toàn không cần thiết',
                      'Phân vân/Chưa rõ'
                    ].map((option) => (
                      <label key={option} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="aiIntegrationNecessity"
                          value={option}
                          checked={formData.aiUsage.aiIntegrationNecessity === option}
                          onChange={(e) => handleAiUsageChange('aiIntegrationNecessity', e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 12: Official Training */}
                <div>
                  <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                    12. Thầy/Cô đã từng được tập huấn hoặc hướng dẫn chính thức về cách ứng dụng AI trong giảng dạy chưa?
                  </Label>
                  <div className="space-y-2">
                    {[
                      'Có, đầy đủ và nhiều lần',
                      'Có, nhưng rất hạn chế',
                      'Chưa bao giờ',
                      'Không nhớ rõ'
                    ].map((option) => (
                      <label key={option} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="officialTraining"
                          value={option}
                          checked={formData.aiUsage.officialTraining === option}
                          onChange={(e) => handleAiUsageChange('officialTraining', e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 13: Effective Approach */}
                <div>
                  <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                    13. Theo Thầy/Cô, cách hiệu quả nhất để học sinh tiếp cận AI là:
                  </Label>
                  <div className="space-y-2">
                    {[
                      'Giáo viên trực tiếp hướng dẫn',
                      'Tích hợp AI trong các môn học',
                      'Áp dụng thực tế trong dự án STEM',
                      'Tự học có định hướng'
                    ].map((approach) => (
                      <label key={approach} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="effectiveApproach"
                          value={approach}
                          checked={formData.aiUsage.effectiveApproach === approach}
                          onChange={(e) => handleAiUsageChange('effectiveApproach', e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-gray-700">{approach}</span>
                      </label>
                    ))}
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="effectiveApproach"
                        value="other"
                        checked={formData.aiUsage.effectiveApproach === 'other'}
                        onChange={(e) => handleAiUsageChange('effectiveApproach', e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-700">Mục khác:</span>
                      <Input
                        value={formData.aiUsage.otherEffectiveApproach}
                        onChange={(e) => handleAiUsageChange('otherEffectiveApproach', e.target.value)}
                        placeholder="Nhập cách tiếp cận khác"
                        className="ml-2 flex-1"
                        disabled={formData.aiUsage.effectiveApproach !== 'other'}
                      />
                    </label>
                  </div>
                </div>

                {/* Question 14: Important Conditions */}
                <div>
                  <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                    14. Điều kiện quan trọng để AI được ứng dụng hiệu quả trong giáo dục là gì?
                  </Label>
                  <div className="space-y-2">
                    {[
                      'Hạ tầng công nghệ (thiết bị, mạng...)',
                      'Năng lực sử dụng AI của giáo viên',
                      'Thời lượng trong chương trình phù hợp',
                      'Chính sách hỗ trợ từ nhà trường',
                      'Tài nguyên số phù hợp giáo dục'
                    ].map((condition) => (
                      <label key={condition} className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={formData.aiUsage.importantConditions.includes(condition)}
                          onCheckedChange={(checked) => handleCheckboxChange('importantConditions', condition, checked as boolean)}
                        />
                        <span className="text-sm text-gray-700">{condition}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-3">
                    <Input
                      value={formData.aiUsage.otherImportantCondition}
                      onChange={(e) => handleAiUsageChange('otherImportantCondition', e.target.value)}
                      placeholder="Khác:"
                      className="mt-2"
                    />
                  </div>
                </div>

                {/* Question 15: Implemented Activities */}
                <div>
                  <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                    15. Thầy/Cô đã từng triển khai hoạt động dạy học có tích hợp AI chưa?
                  </Label>
                  <div className="space-y-2">
                    {[
                      'Có, thường xuyên',
                      'Có, nhưng hiếm',
                      'Chưa từng',
                      'Không rõ / chưa xác định rõ ràng'
                    ].map((option) => (
                      <label key={option} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="implementedActivities"
                          value={option}
                          checked={formData.aiUsage.implementedActivities === option}
                          onChange={(e) => handleAiUsageChange('implementedActivities', e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 16: Reasons Not Implemented */}
                <div>
                  <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                    16. Nếu chưa từng tổ chức cho học sinh sử dụng AI, lý do chính đáng là gì? (Có thể chọn nhiều phương án)
                  </Label>
                  <div className="space-y-2">
                    {[
                      'Thiếu thời gian để chuẩn bị',
                      'Chưa biết cách hướng dẫn học sinh dùng AI',
                      'Lo ngại học sinh lạm dụng/sao chép',
                      'Hạn chế về công cụ',
                      'Không nằm trong chương trình chính khóa',
                      'Chưa được tập huấn về công cụ AI'
                    ].map((reason) => (
                      <label key={reason} className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={formData.aiUsage.reasonsNotImplemented.includes(reason)}
                          onCheckedChange={(checked) => handleCheckboxChange('reasonsNotImplemented', reason, checked as boolean)}
                        />
                        <span className="text-sm text-gray-700">{reason}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 17: Readiness to Implement */}
                <div>
                  <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                    17. Nếu được tạo điều kiện (thiết bị, hướng dẫn, thời lượng,...), Thầy/Cô có sẵn sàng tổ chức hoạt động sử dụng AI cho học sinh không?
                  </Label>
                  <div className="space-y-2">
                    {[
                      'Rất sẵn sàng',
                      'Có thể',
                      'Còn e ngại',
                      'Không có nhu cầu'
                    ].map((option) => (
                      <label key={option} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="readinessToImplement"
                          value={option}
                          checked={formData.aiUsage.readinessToImplement === option}
                          onChange={(e) => handleAiUsageChange('readinessToImplement', e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 18: Desired Student Activities */}
                <div>
                  <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                    18. Thầy/Cô mong muốn học sinh sử dụng AI trong hoạt động học nào nhất?
                  </Label>
                  <div className="space-y-2">
                    {[
                      'Ôn tập/luyện tập',
                      'Làm dự án',
                      'Viết/thuyết trình',
                      'Tìm hiểu kiến thức mới',
                      'Khác'
                    ].map((activity) => (
                      <label key={activity} className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={formData.aiUsage.desiredStudentActivities.includes(activity)}
                          onCheckedChange={(checked) => handleCheckboxChange('desiredStudentActivities', activity, checked as boolean)}
                        />
                        <span className="text-sm text-gray-700">{activity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 19: Improvement Suggestions */}
                <div>
                  <Label htmlFor="improvementSuggestions" className="text-lg font-semibold text-gray-800 mb-3 block">
                    19. Theo Thầy/Cô, làm thế nào để AI trở thành công cụ hỗ trợ hiệu quả hơn trong hoạt động giáo dục? (Hãy chia sẻ quan điểm của Thầy/Cô nhé!)
                  </Label>
                  <Textarea
                    id="improvementSuggestions"
                    rows={4}
                    value={formData.aiUsage.improvementSuggestions}
                    onChange={(e) => handleAiUsageChange('improvementSuggestions', e.target.value)}
                    placeholder="Chia sẻ quan điểm của Thầy/Cô về cách cải thiện việc sử dụng AI trong giáo dục..."
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-8 text-center border-t border-gray-200">
              <Button
                type="submit"
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-12 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center gap-3">
                  Hoàn thành khảo sát
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </Button>
            </div>
          </div>
        </Card>
      </form>

      {/* Contact Information */}
      <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-xl border-0 rounded-3xl">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-bold text-gray-800">Thông tin liên hệ</h3>
          <div className="text-gray-600 space-y-2">
            <p><strong>Trần Kim Phương</strong> – Sinh viên thực hiện khảo sát</p>
            <p>📧 Email: trankimphuong121@gmail.com</p>
            <p>📞 Điện thoại: 0867 440 950</p>
          </div>
          <p className="text-sm text-emerald-600 italic">
            Mọi thắc mắc xin vui lòng liên hệ qua thông tin trên
          </p>
        </div>
      </Card>
    </div>
  )
}