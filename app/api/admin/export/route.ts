import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import connectDB from '@/lib/mongodb'
import mongoose from 'mongoose'
import AISurvey from '@/lib/models/AISurvey'
import TeacherSurvey from '@/lib/models/TeacherSurvey'
import GroupSurvey from '@/lib/models/GroupSurvey'
import IndividualSurvey from '@/lib/models/IndividualSurvey'
import * as XLSX from 'xlsx'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// Middleware to verify admin token
function verifyAdminToken(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value
  
  if (!token) {
    throw new Error('Unauthorized')
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    if (decoded.role !== 'admin') {
      throw new Error('Unauthorized')
    }
    return decoded
  } catch (error) {
    throw new Error('Unauthorized')
  }
}

// Convert data to CSV format
function convertToCSV(data: any[], headers: string[]): string {
  const csvHeaders = headers.join(',')
  const csvRows = data.map(row => {
    return headers.map(header => {
      const value = getNestedValue(row, header)
      // Escape quotes and wrap in quotes if contains comma or quote
      if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
        return `"${value.replace(/"/g, '""')}"`
      }
      return value || ''
    }).join(',')
  })
  
  return [csvHeaders, ...csvRows].join('\n')
}

// Convert data to Excel format
function convertToExcel(data: any[]): Buffer {
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Survey Data')
  return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })
}

// Get nested object value by dot notation
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => {
    if (current && typeof current === 'object') {
      if (Array.isArray(current[key])) {
        return current[key].join('; ')
      }
      return current[key]
    }
    return ''
  }, obj)
}

// Format AI Survey data with questions and answers
function formatAISurveyData(surveys: any[]) {
  return surveys.map(survey => ({
    'Loại khảo sát': 'Khảo sát học sinh về AI',
    'ID': survey._id,
    'Ngày tạo': new Date(survey.createdAt).toLocaleString('vi-VN'),
    
    // Personal Information
    'Câu 1: Họ và tên của bạn': survey.personalInfo?.fullName || '',
    'Câu 2: Bạn hiện đang học cấp nào': survey.personalInfo?.educationLevel || '',
    'Câu 3: Trường bạn đang học': survey.personalInfo?.school || '',
    'Câu 4: Khối lớp bạn đang học': survey.personalInfo?.grade || '',
    
    // AI Usage
    'Câu 5: Tần suất sử dụng AI trong học tập': survey.aiUsage?.frequency || '',
    'Câu 6: Mục đích sử dụng AI': Array.isArray(survey.aiUsage?.purposes) ? survey.aiUsage.purposes.join('; ') : '',
    'Câu 6 - Khác': survey.aiUsage?.otherPurpose || '',
    'Câu 7: Công cụ AI thường sử dụng': Array.isArray(survey.aiUsage?.tools) ? survey.aiUsage.tools.join('; ') : '',
    'Câu 7 - Khác': survey.aiUsage?.otherTool || '',
    'Câu 8: Cảm giác khi không thể dùng AI': survey.aiUsage?.dependencyLevel || '',
    'Câu 9: Điều bất ngờ học được từ AI': survey.aiUsage?.surprisingLearning || '',
    'Câu 10: AI hiểu đúng ý bạn ở mức nào': survey.aiUsage?.aiAccuracy || '',
    'Câu 11: Khi AI trả kết quả, bạn thường làm gì': survey.aiUsage?.resultUsage || '',
    'Câu 12: AI có làm bạn lười suy nghĩ không': survey.aiUsage?.thinkingImpact || '',
    'Câu 13: Khó khăn khi sử dụng AI': Array.isArray(survey.aiUsage?.difficulties) ? survey.aiUsage.difficulties.join('; ') : '',
    'Câu 13 - Khác': survey.aiUsage?.otherDifficulty || '',
    'Câu 14: Đã được hướng dẫn sử dụng AI chưa': survey.aiUsage?.guidance || '',
    
    // Technical Projects
    'Câu 15: Hoạt động kỹ thuật đã trải nghiệm': Array.isArray(survey.technicalProjects?.experiences) ? survey.technicalProjects.experiences.join('; ') : '',
    'Câu 15 - Khác': survey.technicalProjects?.otherExperience || '',
    'Câu 16: Muốn AI hỗ trợ ở khâu nào': Array.isArray(survey.technicalProjects?.aiSupport) ? survey.technicalProjects.aiSupport.join('; ') : '',
    'Câu 16 - Khác': survey.technicalProjects?.otherSupport || '',
    'Câu 17: Sẵn sàng học AI trong kỹ thuật': survey.technicalProjects?.learningInterest || '',
    'Câu 17 - Khác': survey.technicalProjects?.otherInterest || '',
    
    'Trạng thái': survey.isCompleted ? 'Hoàn thành' : 'Chưa hoàn thành'
  }))
}

// Format Teacher Survey data with questions and answers
function formatTeacherSurveyData(surveys: any[]) {
  return surveys.map(survey => ({
    'Loại khảo sát': 'Khảo sát giáo viên về AI',
    'ID': survey._id,
    'Ngày tạo': new Date(survey.createdAt).toLocaleString('vi-VN'),
    
    // Personal Information
    'Câu 1: Họ và tên Thầy/Cô': survey.personalInfo?.fullName || '',
    'Câu 2: Cấp học đang giảng dạy': survey.personalInfo?.educationLevel === 'other' ? survey.personalInfo?.otherEducationLevel : survey.personalInfo?.educationLevel || '',
    'Câu 3: Trường đang công tác': survey.personalInfo?.school || '',
    'Câu 4: Bộ môn phụ trách': survey.personalInfo?.subject === 'other' ? survey.personalInfo?.otherSubject : survey.personalInfo?.subject || '',
    
    // AI Usage in Teaching
    'Câu 5: Tần suất sử dụng AI trong giảng dạy': survey.aiUsage?.frequency || '',
    'Câu 6: Giai đoạn sử dụng AI': Array.isArray(survey.aiUsage?.teachingPhase) ? survey.aiUsage.teachingPhase.join('; ') : '',
    'Câu 7: Cách sử dụng nội dung từ AI': Array.isArray(survey.aiUsage?.contentUsage) ? survey.aiUsage.contentUsage.join('; ') : '',
    'Câu 8: Điều bất ngờ học được từ AI': survey.aiUsage?.surprisingLearning || '',
    'Câu 9: AI hiểu đúng ý Thầy/Cô ở mức nào': survey.aiUsage?.aiAccuracy || '',
    'Câu 10: AI có làm giảm tư duy độc lập của học sinh': survey.aiUsage?.studentThinkingImpact || '',
    'Câu 11: Tích hợp AI vào chương trình có cần thiết': survey.aiUsage?.aiIntegrationNecessity || '',
    'Câu 12: Đã được tập huấn về AI chưa': survey.aiUsage?.officialTraining || '',
    'Câu 13: Cách hiệu quả để học sinh tiếp cận AI': survey.aiUsage?.effectiveApproach === 'other' ? survey.aiUsage?.otherEffectiveApproach : survey.aiUsage?.effectiveApproach || '',
    'Câu 14: Điều kiện quan trọng để AI hiệu quả': Array.isArray(survey.aiUsage?.importantConditions) ? survey.aiUsage.importantConditions.join('; ') : '',
    'Câu 14 - Khác': survey.aiUsage?.otherImportantCondition || '',
    'Câu 15: Đã triển khai hoạt động tích hợp AI': survey.aiUsage?.implementedActivities || '',
    'Câu 16: Lý do chưa tổ chức sử dụng AI': Array.isArray(survey.aiUsage?.reasonsNotImplemented) ? survey.aiUsage.reasonsNotImplemented.join('; ') : '',
    'Câu 17: Sẵn sàng tổ chức hoạt động AI': survey.aiUsage?.readinessToImplement || '',
    'Câu 18: Mong muốn học sinh sử dụng AI trong hoạt động nào': Array.isArray(survey.aiUsage?.desiredStudentActivities) ? survey.aiUsage.desiredStudentActivities.join('; ') : '',
    'Câu 19: Đề xuất cải thiện AI trong giáo dục': survey.aiUsage?.improvementSuggestions || '',
    
    'Trạng thái': survey.isCompleted ? 'Hoàn thành' : 'Chưa hoàn thành'
  }))
}

// Format Individual Survey data with questions and answers
function formatIndividualSurveyData(surveys: any[]) {
  return surveys.map(survey => ({
    'Loại khảo sát': 'Khảo sát cá nhân',
    'ID': survey._id,
    'Ngày tạo': new Date(survey.createdAt).toLocaleString('vi-VN'),
    
    // Personal Information
    'Họ và tên': survey.personalInfo?.fullName || '',
    'Lớp': survey.personalInfo?.class || '',
    
    // Survey Questions
    'Câu 1: Khoảng khắc ấn tượng nhất - Khoảng khắc nào khiến bạn ấn tượng nhất và nó giúp bạn hiểu gì hơn về AI hoặc thiết kế kỹ thuật?': survey.responses?.question1 || '',
    'Câu 2: Điểm tiến bộ nhất - Sau buổi học, bạn cảm thấy mình tiến bộ nhất ở điểm nào? Vì sao?': survey.responses?.question2 || '',
    'Câu 3: Đề xuất cải tiến - Nếu cải tiến buổi học tiếp theo, bạn muốn thêm hoặc thay đổi điều gì để học hiệu quả hơn?': survey.responses?.question3 || ''
  }))
}

// Format Group Survey data with questions and answers
function formatGroupSurveyData(surveys: any[]) {
  return surveys.map(survey => {
    const result: any = {
      'Loại khảo sát': 'Hoạt động nhóm',
      'ID': survey._id,
      'Ngày tạo': new Date(survey.createdAt).toLocaleString('vi-VN'),
      
      // Group Information
      'Tên nhóm': survey.groupName || survey.groupInfo?.groupName || '',
      'Trưởng nhóm': survey.groupInfo?.leaderName || '',
      'Số thành viên': survey.groupInfo?.memberCount || '',
      'Lớp': survey.groupInfo?.class || '',
      'Môn học': survey.groupInfo?.subject || '',
      'Mã nhóm': survey.groupInfo?.groupCode || '',
      
      // Activity Status
      'Hoạt động 1 - Bí ẩn dòng nước': survey.activity1 ? 'Đã hoàn thành' : 'Chưa hoàn thành',
      'Hoạt động 2 - Bí mật thuyền sinh tồn': survey.activity2 ? 'Đã hoàn thành' : 'Chưa hoàn thành',
      'Hoạt động 3 - Bản vẽ bí ẩn': survey.activity3 ? 'Đã hoàn thành' : 'Chưa hoàn thành',
      'Hoạt động 4 - Bản vẽ toả sáng': survey.activity4 ? 'Đã hoàn thành' : 'Chưa hoàn thành'
    }

    // Activity 1 Details
    if (survey.activity1) {
      result['HĐ1 - Số tiêu chí ban đầu'] = survey.activity1.tableA?.initialCriteria?.length || 0
      result['HĐ1 - Số tiêu chí kỹ thuật'] = survey.activity1.tableB?.standardizedCriteria?.length || 0
    }

    // Activity 2 Details
    if (survey.activity2) {
      result['HĐ2 - Câu 1: Mô tả tình huống'] = survey.activity2.question1 || ''
      result['HĐ2 - Câu 2: Phân tích vấn đề'] = survey.activity2.question2 || ''
      result['HĐ2 - Câu 3: Giải pháp đề xuất'] = survey.activity2.question3 || ''
      result['HĐ2 - Số bước thiết kế AI'] = Array.isArray(survey.activity2.question4) ? survey.activity2.question4.length : 0
    }

    // Activity 3 Details
    if (survey.activity3) {
      result['HĐ3 - Mục đích và bối cảnh'] = survey.activity3.section1?.purposeContext || ''
      result['HĐ3 - Tiêu chí và chức năng'] = survey.activity3.section1?.criteriaFunction || ''
      result['HĐ3 - Prompt và hình ảnh'] = survey.activity3.section1?.promptAndImage || ''
      result['HĐ3 - Số file ý tưởng'] = survey.activity3.section1?.ideaImages?.length || 0
      result['HĐ3 - Số file mô hình 3D'] = survey.activity3.section2?.model3DImages?.length || 0
      result['HĐ3 - Số file vẽ kỹ thuật 2D'] = survey.activity3.section2?.technical2DImages?.length || 0
      result['HĐ3 - Số file CAD'] = survey.activity3.section3?.cadFiles?.length || 0
      
      if (survey.activity3.selfAssessment) {
        result['HĐ3 - Tự đánh giá: Tuân thủ tiêu chí'] = survey.activity3.selfAssessment.criteriaCompliance?.achieved ? 'Đạt' : 'Chưa đạt'
        result['HĐ3 - Tự đánh giá: Cân bằng mô hình 3D'] = survey.activity3.selfAssessment.model3DBalance?.achieved ? 'Đạt' : 'Chưa đạt'
        result['HĐ3 - Tự đánh giá: Hoàn thiện bản vẽ 2D'] = survey.activity3.selfAssessment.drawing2DComplete?.achieved ? 'Đạt' : 'Chưa đạt'
        result['HĐ3 - Tự đánh giá: Độ chính xác CAD'] = survey.activity3.selfAssessment.cadAccuracy?.achieved ? 'Đạt' : 'Chưa đạt'
      }
    }

    // Activity 4 Details
    if (survey.activity4) {
      result['HĐ4 - Tự đánh giá: Điểm mạnh'] = survey.activity4.selfEvaluation?.strengths || ''
      result['HĐ4 - Tự đánh giá: Điểm yếu'] = survey.activity4.selfEvaluation?.weaknesses || ''
      result['HĐ4 - Đánh giá đồng đẳng: Điểm mạnh'] = survey.activity4.peerEvaluation?.strengths || ''
      result['HĐ4 - Đánh giá đồng đẳng: Điểm yếu'] = survey.activity4.peerEvaluation?.weaknesses || ''
      
      if (survey.activity4.aiEvaluation?.ratings) {
        result['HĐ4 - AI đánh giá: Sáng tạo'] = `${survey.activity4.aiEvaluation.ratings.creativity || 0}/5`
        result['HĐ4 - AI đánh giá: Mô phỏng'] = `${survey.activity4.aiEvaluation.ratings.simulation || 0}/5`
        result['HĐ4 - AI đánh giá: Phân tích'] = `${survey.activity4.aiEvaluation.ratings.analysis || 0}/5`
        result['HĐ4 - AI đánh giá: Trình bày'] = `${survey.activity4.aiEvaluation.ratings.presentation || 0}/5`
        
        const totalScore = Object.values(survey.activity4.aiEvaluation.ratings).reduce((a: any, b: any) => Number(a) + Number(b), 0)
        result['HĐ4 - AI đánh giá: Tổng điểm'] = `${totalScore}/20`
      }
      
      result['HĐ4 - Tác động của AI'] = survey.activity4.aiEvaluation?.aiImpact || ''
      result['HĐ4 - Hạn chế của AI'] = survey.activity4.aiEvaluation?.aiLimitations || ''
    }

    return result
  })
}

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    verifyAdminToken(request)

    await connectDB()

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'all'
    const format = searchParams.get('format') || 'json'

    let allData: any[] = []
    let filename = `khao-sat-${new Date().toISOString().split('T')[0]}`

    // Fetch data based on type
    switch (type) {
      case 'ai':
        const aiSurveys = await AISurvey.find({}).lean()
        allData = formatAISurveyData(aiSurveys)
        filename += '-hoc-sinh'
        break

      case 'teacher':
        const teacherSurveys = await TeacherSurvey.find({}).lean()
        allData = formatTeacherSurveyData(teacherSurveys)
        filename += '-giao-vien'
        break

      case 'group':
        const groupSurveys = await GroupSurvey.find({}).lean()
        allData = formatGroupSurveyData(groupSurveys)
        filename += '-nhom'
        break

      case 'individual':
        await connectDB()
        const individualSurveys = await mongoose.connection.db.collection('individualSurveys').find({}).toArray()
        allData = formatIndividualSurveyData(individualSurveys)
        filename += '-ca-nhan'
        break

      default: // 'all'
        await connectDB()
        const [aiData, teacherData, groupData, individualData] = await Promise.all([
          AISurvey.find({}).lean(),
          TeacherSurvey.find({}).lean(),
          GroupSurvey.find({}).lean(),
          mongoose.connection.db.collection('individualSurveys').find({}).toArray()
        ])

        allData = [
          ...formatAISurveyData(aiData),
          ...formatTeacherSurveyData(teacherData),
          ...formatGroupSurveyData(groupData),
          ...formatIndividualSurveyData(individualData)
        ]
        filename += '-tat-ca'
        break
    }

    // Sort by creation date
    allData.sort((a, b) => new Date(b['Ngày tạo']).getTime() - new Date(a['Ngày tạo']).getTime())

    if (format === 'csv') {
      // Generate CSV
      const headers = Object.keys(allData[0] || {})
      const csvContent = convertToCSV(allData, headers)
      
      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="${filename}.csv"`,
        },
      })
    } else if (format === 'excel') {
      // Generate Excel
      const excelBuffer = convertToExcel(allData)
      
      return new NextResponse(excelBuffer, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename="${filename}.xlsx"`,
        },
      })
    } else {
      // Generate JSON
      const jsonContent = JSON.stringify({
        exportDate: new Date().toISOString(),
        totalRecords: allData.length,
        type: type,
        data: allData
      }, null, 2)

      return new NextResponse(jsonContent, {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="${filename}.json"`,
        },
      })
    }

  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.error('Admin export error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}