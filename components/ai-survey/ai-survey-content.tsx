'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'

interface AISurveyData {
  // PHẦN 1: THÔNG TIN CƠ BẢN
  personalInfo: {
    fullName: string
    educationLevel: string
    school: string
    grade: string
  }
  // PHẦN 2: KHẢO SÁT VỀ SỬ DỤNG AI TRONG HỌC TẬP
  aiUsage: {
    frequency: string
    purposes: string[]
    otherPurpose: string
    tools: string[]
    otherTool: string
    dependencyLevel: string
    surprisingLearning: string
    aiAccuracy: string
    resultUsage: string
    thinkingImpact: string
    difficulties: string[]
    otherDifficulty: string
    guidance: string
  }
  // PHẦN 3: KHẢO SÁT VỀ SỬ DỤNG AI TRONG DỰ ÁN KĨ THUẬT
  technicalProjects: {
    experiences: string[]
    otherExperience: string
    aiSupport: string[]
    otherSupport: string
    learningInterest: string
    otherInterest: string
  }
}

export function AISurveyContent() {
  const [formData, setFormData] = useState<AISurveyData>({
    personalInfo: {
      fullName: '',
      educationLevel: '',
      school: '',
      grade: ''
    },
    aiUsage: {
      frequency: '',
      purposes: [],
      otherPurpose: '',
      tools: [],
      otherTool: '',
      dependencyLevel: '',
      surprisingLearning: '',
      aiAccuracy: '',
      resultUsage: '',
      thinkingImpact: '',
      difficulties: [],
      otherDifficulty: '',
      guidance: ''
    },
    technicalProjects: {
      experiences: [],
      otherExperience: '',
      aiSupport: [],
      otherSupport: '',
      learningInterest: '',
      otherInterest: ''
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

  const handleSectionChange = (section: keyof Omit<AISurveyData, 'personalInfo'>, field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const handleCheckboxChange = (section: keyof Omit<AISurveyData, 'personalInfo'>, field: string, option: string, checked: boolean) => {
    setFormData(prev => {
      const currentArray = (prev[section] as any)[field] as string[]
      const updatedArray = checked 
        ? [...currentArray, option]
        : currentArray.filter(item => item !== option)
      
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: updatedArray
        }
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.personalInfo.fullName || !formData.personalInfo.educationLevel || !formData.personalInfo.grade) {
      alert('Vui lòng điền đầy đủ thông tin cơ bản bắt buộc')
      return
    }

    // TODO: Submit to API
    console.log('Submitting AI survey:', formData)
    alert('🎉 Cảm ơn bạn đã hoàn thành khảo sát về AI!')
  }

  return (
    <div className="w-full max-w-6xl space-y-8">
      <form onSubmit={handleSubmit}>
        <Card className="relative overflow-hidden p-10 md:p-12 bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-3xl">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/5 to-pink-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/5 to-purple-600/5 rounded-full blur-3xl"></div>
          
          <div className="relative space-y-12">
            {/* Main Title */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                KHẢO SÁT HỌC SINH
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                THỰC TRẠNG SỬ DỤNG TRÍ TUỆ NHÂN TẠO TRONG HỌC TẬP
              </h2>
              <div className="max-w-4xl mx-auto text-gray-600 leading-relaxed space-y-3">
                <p>
                  Chào bạn, khảo sát này được thực hiện nhằm tìm hiểu cách học sinh, sinh viên đang sử dụng trí tuệ nhân tạo (AI) trong học tập, qua đó làm cơ sở đề xuất các giải pháp tích hợp hiệu quả hơn vào môn Công nghệ và các hoạt động giáo dục trong trường học.
                </p>
                <p>
                  Nhóm tác giả mong muốn lắng nghe những chia sẻ chân thật của bạn về việc tiếp cận AI, thói quen sử dụng, trải nghiệm cá nhân và suy nghĩ của bạn khi đồng hành cùng các công cụ trí tuệ nhân tạo trong học tập.
                </p>
                <p className="text-sm italic text-purple-600">
                  Tất cả thông tin bạn cung cấp sẽ được bảo mật tuyệt đối, chỉ sử dụng cho mục đích nghiên cứu học thuật.
                </p>
              </div>
            </div>

            {/* Section 1: Personal Information */}
            <div className="space-y-6 bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-2xl p-8 border border-purple-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-xl">👤</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  PHẦN 1: THÔNG TIN CƠ BẢN
                </h3>
              </div>

              <div className="space-y-6">
                {/* Question 1: Full Name */}
                <div>
                  <Label htmlFor="fullName" className="text-lg font-semibold text-gray-800 mb-3 block">
                    1. Họ và tên của bạn:
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.personalInfo.fullName}
                    onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                    placeholder="Nhập họ và tên của bạn"
                    required
                    className="mt-1"
                  />
                </div>

                {/* Question 2: Education Level */}
                <div>
                  <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                    2. Bạn hiện đang học cấp nào
                  </Label>
                  <div className="flex gap-6">
                    {['THCS', 'THPT'].map((level) => (
                      <label key={level} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="educationLevel"
                          value={level}
                          checked={formData.personalInfo.educationLevel === level}
                          onChange={(e) => handlePersonalInfoChange('educationLevel', e.target.value)}
                          className="w-4 h-4 text-purple-600"
                          required
                        />
                        <span className="text-gray-700">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 3: School */}
                <div>
                  <Label htmlFor="school" className="text-lg font-semibold text-gray-800 mb-3 block">
                    3. Trường bạn đang học:
                  </Label>
                  <Input
                    id="school"
                    value={formData.personalInfo.school}
                    onChange={(e) => handlePersonalInfoChange('school', e.target.value)}
                    placeholder="Nhập tên trường của bạn"
                    className="mt-1"
                  />
                </div>

                {/* Question 4: Grade */}
                <div>
                  <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                    4. Khối lớp bạn đang học
                  </Label>
                  <div className="grid grid-cols-4 gap-3">
                    {['6', '7', '8', '9', '10', '11', '12'].map((grade) => (
                      <label key={grade} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="grade"
                          value={grade}
                          checked={formData.personalInfo.grade === grade}
                          onChange={(e) => handlePersonalInfoChange('grade', e.target.value)}
                          className="w-4 h-4 text-purple-600"
                          required
                        />
                        <span className="text-gray-700">{grade}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: AI Usage in Learning */}
            <div className="space-y-6 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl p-8 border border-blue-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-xl">🧠</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  PHẦN 2: KHẢO SÁT VỀ SỬ DỤNG AI TRONG HỌC TẬP
                </h3>
              </div>

              <div className="space-y-6">
                {/* Question 5: Usage Frequency */}
                <div>
                  <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                    5. Tần suất bạn sử dụng các công cụ AI trong học tập
                  </Label>
                  <div className="space-y-2">
                    {[
                      'Gần như mỗi ngày',
                      'Vài lần mỗi tuần',
                      'Thỉnh thoảng (vài lần mỗi tháng)',
                      'Hiếm khi (ít hơn 1 lần/tháng)',
                      'Mình chưa từng dùng'
                    ].map((option) => (
                      <label key={option} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="frequency"
                          value={option}
                          checked={formData.aiUsage.frequency === option}
                          onChange={(e) => handleSectionChange('aiUsage', 'frequency', e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 6: Usage Purposes */}
                <div>
                  <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                    6. Khi dùng AI, bạn thường sử dụng cho những việc nào? (Có thể chọn nhiều phương án)
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      'Tìm thông tin / giải thích kiến thức',
                      'Làm bài tập',
                      'Viết báo cáo',
                      'Làm slide, hình ảnh, video',
                      'Quản lý thời gian / lập kế hoạch học tập',
                      'Thiết kế bản vẽ, mô hình',
                      'Lập trình, viết code',
                      'Sáng tác nội dung giải trí',
                      'Dịch, luyện nói / viết tiếng Anh',
                      'Không dùng'
                    ].map((purpose) => (
                      <label key={purpose} className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={formData.aiUsage.purposes.includes(purpose)}
                          onCheckedChange={(checked) => handleCheckboxChange('aiUsage', 'purposes', purpose, checked as boolean)}
                        />
                        <span className="text-sm text-gray-700">{purpose}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-3">
                    <Input
                      value={formData.aiUsage.otherPurpose}
                      onChange={(e) => handleSectionChange('aiUsage', 'otherPurpose', e.target.value)}
                      placeholder="Mục khác:"
                      className="mt-2"
                    />
                  </div>
                </div>

                {/* Question 7: AI Tools */}
                <div>
                  <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                    7. Bạn thường sử dụng công cụ AI nào?
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      'ChatGPT',
                      'Google Gemini',
                      'Claude',
                      'Bing Chat',
                      'Midjourney',
                      'DALL-E',
                      'Canva AI',
                      'Grammarly',
                      'DeepL',
                      'Quillbot'
                    ].map((tool) => (
                      <label key={tool} className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={formData.aiUsage.tools.includes(tool)}
                          onCheckedChange={(checked) => handleCheckboxChange('aiUsage', 'tools', tool, checked as boolean)}
                        />
                        <span className="text-sm text-gray-700">{tool}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-3">
                    <Input
                      value={formData.aiUsage.otherTool}
                      onChange={(e) => handleSectionChange('aiUsage', 'otherTool', e.target.value)}
                      placeholder="Mục khác:"
                      className="mt-2"
                    />
                  </div>
                </div>

                {/* Question 8: Dependency Level */}
                <div>
                  <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                    8. Nếu hôm nay bạn không thể dùng AI trong học tập, bạn sẽ cảm thấy thế nào?
                  </Label>
                  <div className="space-y-2">
                    {[
                      'Không vấn đề gì, mình học bình thường',
                      'Hơi bất tiện nhưng vẫn xoay sở được',
                      'Khá lúng túng, ảnh hưởng tiến độ',
                      'Rất khó khăn, mình phụ thuộc vào AI'
                    ].map((option) => (
                      <label key={option} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="dependencyLevel"
                          value={option}
                          checked={formData.aiUsage.dependencyLevel === option}
                          onChange={(e) => handleSectionChange('aiUsage', 'dependencyLevel', e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 9: Surprising Learning */}
                <div>
                  <Label htmlFor="surprisingLearning" className="text-lg font-semibold text-gray-800 mb-3 block">
                    9. Bạn đã từng học được điều gì bất ngờ từ AI chưa? (Hãy chia sẻ quan điểm của bạn nhé!)
                  </Label>
                  <Textarea
                    id="surprisingLearning"
                    rows={4}
                    value={formData.aiUsage.surprisingLearning}
                    onChange={(e) => handleSectionChange('aiUsage', 'surprisingLearning', e.target.value)}
                    placeholder="Chia sẻ điều bất ngờ bạn học được từ AI..."
                    className="mt-2"
                  />
                </div>

                {/* Question 10: AI Accuracy */}
                <div>
                  <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                    10. Khi bạn đặt câu hỏi, AI thường hiểu đúng ý bạn không?
                  </Label>
                  <div className="space-y-2">
                    {[
                      'Gần như luôn đúng',
                      'Thường đúng',
                      'Hiếm khi đúng',
                      'Hầu như không đúng',
                      'Không dùng'
                    ].map((option) => (
                      <label key={option} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="aiAccuracy"
                          value={option}
                          checked={formData.aiUsage.aiAccuracy === option}
                          onChange={(e) => handleSectionChange('aiUsage', 'aiAccuracy', e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 11: Result Usage */}
                <div>
                  <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                    11. Khi AI trả kết quả, bạn thường làm gì?
                  </Label>
                  <div className="space-y-2">
                    {[
                      'Dùng luôn không chỉnh sửa',
                      'Chỉnh nhẹ cho hợp ý mình',
                      'Chỉnh sửa sâu, thêm nội dung cá nhân',
                      'Tham khảo rồi tự làm lại',
                      'Không dùng vì không tin tưởng'
                    ].map((option) => (
                      <label key={option} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="resultUsage"
                          value={option}
                          checked={formData.aiUsage.resultUsage === option}
                          onChange={(e) => handleSectionChange('aiUsage', 'resultUsage', e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 12: Thinking Impact */}
                <div>
                  <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                    12. Theo bạn, việc dùng AI có làm bạn lười suy nghĩ hơn không?
                  </Label>
                  <div className="space-y-2">
                    {[
                      'Có, mình nhận ra điều đó khá rõ',
                      'Có ảnh hưởng nhẹ, nhưng mình vẫn chủ động suy nghĩ',
                      'Không ảnh hưởng',
                      'Không rõ / Chưa cảm nhận được'
                    ].map((option) => (
                      <label key={option} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="thinkingImpact"
                          value={option}
                          checked={formData.aiUsage.thinkingImpact === option}
                          onChange={(e) => handleSectionChange('aiUsage', 'thinkingImpact', e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 13: Difficulties */}
                <div>
                  <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                    13. Bạn gặp những khó khăn gì khi sử dụng AI trong học tập
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      'Không biết cách đặt câu hỏi hiệu quả',
                      'Thông tin AI cung cấp không chính xác',
                      'Phụ thuộc quá nhiều vào AI',
                      'Lo ngại về đạo đức học thuật',
                      'Khó kiểm soát chất lượng kết quả',
                      'Mất khả năng tư duy độc lập',
                      'Không hiểu cách AI hoạt động',
                      'Kết quả không phù hợp với yêu cầu',
                      'Ngôn ngữ tiếng Việt hạn chế',
                      'Chi phí sử dụng cao'
                    ].map((difficulty) => (
                      <label key={difficulty} className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={formData.aiUsage.difficulties.includes(difficulty)}
                          onCheckedChange={(checked) => handleCheckboxChange('aiUsage', 'difficulties', difficulty, checked as boolean)}
                        />
                        <span className="text-sm text-gray-700">{difficulty}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-3">
                    <Input
                      value={formData.aiUsage.otherDifficulty}
                      onChange={(e) => handleSectionChange('aiUsage', 'otherDifficulty', e.target.value)}
                      placeholder="Khó khăn khác:"
                      className="mt-2"
                    />
                  </div>
                </div>

                {/* Question 14: Guidance */}
                <div>
                  <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                    14. Bạn đã từng được thầy cô hoặc người có chuyên môn hướng dẫn cách sử dụng AI trong học tập chưa?
                  </Label>
                  <div className="space-y-2">
                    {[
                      'Có, nhiều lần',
                      'Có, nhưng rất ít',
                      'Chưa bao giờ',
                      'Không rõ'
                    ].map((option) => (
                      <label key={option} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="guidance"
                          value={option}
                          checked={formData.aiUsage.guidance === option}
                          onChange={(e) => handleSectionChange('aiUsage', 'guidance', e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: AI in Technical Projects */}
            <div className="space-y-6 bg-gradient-to-br from-green-50/50 to-blue-50/50 rounded-2xl p-8 border border-green-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-xl">⚙️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  PHẦN 3: KHẢO SÁT VỀ SỬ DỤNG AI TRONG DỰ ÁN KĨ THUẬT
                </h3>
              </div>

              <div className="space-y-6">
                {/* Question 15: Technical Experiences */}
                <div>
                  <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                    15. Bạn đã từng được học và trải nghiệm các hoạt động kĩ thuật nào sau đây?
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      'Vẽ bản vẽ kĩ thuật',
                      'Vẽ bản vẽ nhà đơn giản',
                      'Vẽ sơ đồ, lắp đặt mạch điện',
                      'Thiết kế, lắp ráp sản phẩm đồ dùng',
                      'Thiết kế, lắp ráp mạch điện tử',
                      'Lắp ráp và lập trình robot',
                      'Vẽ và thiết kế bằng máy tính',
                      'Sử dụng công cụ trí tuệ nhân tạo (AI) hỗ trợ thiết kế'
                    ].map((experience) => (
                      <label key={experience} className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={formData.technicalProjects.experiences.includes(experience)}
                          onCheckedChange={(checked) => handleCheckboxChange('technicalProjects', 'experiences', experience, checked as boolean)}
                        />
                        <span className="text-sm text-gray-700">{experience}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-3">
                    <Input
                      value={formData.technicalProjects.otherExperience}
                      onChange={(e) => handleSectionChange('technicalProjects', 'otherExperience', e.target.value)}
                      placeholder="Mục khác:"
                      className="mt-2"
                    />
                  </div>
                </div>

                {/* Question 16: AI Support */}
                <div>
                  <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                    16. Khi thực hiện hoạt động kĩ thuật, bạn muốn AI hỗ trợ ở khâu nào?
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      'Gợi ý ý tưởng',
                      'Thiết kế bản vẽ, mô hình',
                      'Tìm tài liệu',
                      'Viết báo cáo / slide',
                      'Cả quá trình',
                      'Chưa rõ'
                    ].map((support) => (
                      <label key={support} className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={formData.technicalProjects.aiSupport.includes(support)}
                          onCheckedChange={(checked) => handleCheckboxChange('technicalProjects', 'aiSupport', support, checked as boolean)}
                        />
                        <span className="text-sm text-gray-700">{support}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-3">
                    <Input
                      value={formData.technicalProjects.otherSupport}
                      onChange={(e) => handleSectionChange('technicalProjects', 'otherSupport', e.target.value)}
                      placeholder="Mục khác:"
                      className="mt-2"
                    />
                  </div>
                </div>

                {/* Question 17: Learning Interest */}
                <div>
                  <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                    17. Nếu có lớp học về cách ứng dụng AI trong kĩ thuật, bạn sẽ:
                  </Label>
                  <div className="space-y-2">
                    {[
                      'Rất muốn tham gia',
                      'Muốn học nếu dễ hiểu',
                      'Không quan tâm lắm',
                      'Mình nghĩ mình biết đủ rồi'
                    ].map((option) => (
                      <label key={option} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="learningInterest"
                          value={option}
                          checked={formData.technicalProjects.learningInterest === option}
                          onChange={(e) => handleSectionChange('technicalProjects', 'learningInterest', e.target.value)}
                          className="w-4 h-4 text-green-600"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-3">
                    <Input
                      value={formData.technicalProjects.otherInterest}
                      onChange={(e) => handleSectionChange('technicalProjects', 'otherInterest', e.target.value)}
                      placeholder="Mục khác:"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-8 text-center border-t border-gray-200">
              <Button
                type="submit"
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-12 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
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
          <p className="text-sm text-purple-600 italic">
            Mọi thắc mắc xin vui lòng liên hệ qua thông tin trên
          </p>
        </div>
      </Card>
    </div>
  )
}