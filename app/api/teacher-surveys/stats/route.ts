import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import TeacherSurvey from '@/lib/models/TeacherSurvey'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    // Tổng số khảo sát
    const totalSurveys = await TeacherSurvey.countDocuments({})
    const completedSurveys = await TeacherSurvey.countDocuments({ isCompleted: true })

    // Thống kê theo cấp học
    const educationLevelStats = await TeacherSurvey.aggregate([
      { $match: { isCompleted: true } },
      { $group: { _id: '$personalInfo.educationLevel', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])

    // Thống kê theo bộ môn
    const subjectStats = await TeacherSurvey.aggregate([
      { $match: { isCompleted: true, 'personalInfo.subject': { $exists: true, $ne: 'other' } } },
      { $group: { _id: '$personalInfo.subject', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])

    // Thống kê tần suất sử dụng AI
    const frequencyStats = await TeacherSurvey.aggregate([
      { $match: { isCompleted: true, 'aiUsage.frequency': { $exists: true } } },
      { $group: { _id: '$aiUsage.frequency', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])

    // Thống kê tính cần thiết của AI
    const necessityStats = await TeacherSurvey.aggregate([
      { $match: { isCompleted: true, 'aiUsage.aiIntegrationNecessity': { $exists: true } } },
      { $group: { _id: '$aiUsage.aiIntegrationNecessity', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])

    // Thống kê sẵn sàng triển khai
    const readinessStats = await TeacherSurvey.aggregate([
      { $match: { isCompleted: true, 'aiUsage.readinessToImplement': { $exists: true } } },
      { $group: { _id: '$aiUsage.readinessToImplement', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])

    // Thống kê theo thời gian (7 ngày gần nhất)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const recentSurveys = await TeacherSurvey.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ])

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalSurveys,
          completedSurveys,
          completionRate: totalSurveys > 0 ? Math.round((completedSurveys / totalSurveys) * 100) : 0
        },
        educationLevelStats,
        subjectStats,
        frequencyStats,
        necessityStats,
        readinessStats,
        recentSurveys
      }
    })

  } catch (error) {
    console.error('Error fetching teacher survey stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}