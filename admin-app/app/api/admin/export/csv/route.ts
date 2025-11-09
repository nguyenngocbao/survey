import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Survey from '@/lib/models/Survey'

export async function GET() {
  try {
    await connectDB()

    // Get all completed surveys
    const surveys = await Survey.find({ isCompleted: true }).sort({ submittedAt: -1 })

    if (surveys.length === 0) {
      return NextResponse.json(
        { error: 'No completed surveys found' },
        { status: 404 }
      )
    }

    // Create CSV headers
    const headers = [
      'MSSV',
      'Họ tên',
      'Email',
      'Lớp',
      'Ngành',
      'GPA',
      'Giờ học/ngày',
      'Phong cách học',
      'Môn yêu thích',
      'Khó khăn học tập',
      'Sở thích',
      'Thể thao',
      'Câu lạc bộ',
      'Tình nguyện',
      'Lãnh đạo',
      'Mục tiêu nghề nghiệp',
      'Kế hoạch tốt nghiệp',
      'Học cao học',
      'Đi làm ngay',
      'Kỹ năng phát triển',
      'Ngày hoàn thành'
    ]

    // Create CSV rows
    const rows = surveys.map(survey => [
      survey.personalInfo.studentId,
      survey.personalInfo.fullName,
      survey.personalInfo.email,
      survey.personalInfo.class,
      survey.personalInfo.major,
      survey.academicInfo?.gpa || '',
      survey.academicInfo?.studyHours || '',
      survey.academicInfo?.learningStyle || '',
      survey.academicInfo?.favoriteSubjects?.join('; ') || '',
      survey.academicInfo?.difficulties?.join('; ') || '',
      survey.interests?.hobbies?.join('; ') || '',
      survey.interests?.sports?.join('; ') || '',
      survey.interests?.clubs?.join('; ') || '',
      survey.interests?.volunteerWork ? 'Có' : 'Không',
      survey.interests?.leadership ? 'Có' : 'Không',
      survey.futurePlans?.careerGoals || '',
      survey.futurePlans?.graduationPlan || '',
      survey.futurePlans?.furtherEducation ? 'Có' : 'Không',
      survey.futurePlans?.workExperience ? 'Có' : 'Không',
      survey.futurePlans?.skills?.join('; ') || '',
      survey.submittedAt ? new Date(survey.submittedAt).toLocaleDateString('vi-VN') : ''
    ])

    // Combine headers and rows
    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
      .join('\n')

    // Add BOM for UTF-8 encoding (helps with Vietnamese characters in Excel)
    const bom = '\uFEFF'
    const csvWithBom = bom + csvContent

    return new Response(csvWithBom, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="khao-sat-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    })

  } catch (error) {
    console.error('Error exporting CSV:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}