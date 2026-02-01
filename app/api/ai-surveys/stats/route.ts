import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import AISurvey from '@/lib/models/AISurvey'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    // Tổng số khảo sát
    const totalSurveys = await AISurvey.countDocuments({})
    const completedSurveys = await AISurvey.countDocuments({ isCompleted: true })

    // Thống kê theo cấp học
    const educationLevelStats = await AISurvey.aggregate([
      { $match: { isCompleted: true } },
      { $group: { _id: '$personalInfo.educationLevel', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])

    // Thống kê theo lớp
    const gradeStats = await AISurvey.aggregate([
      { $match: { isCompleted: true } },
      { $group: { _id: '$personalInfo.grade', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ])

    // Thống kê tần suất sử dụng AI
    const frequencyStats = await AISurvey.aggregate([
      { $match: { isCompleted: true, 'aiUsage.frequency': { $exists: true } } },
      { $group: { _id: '$aiUsage.frequency', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])

    // Thống kê mức độ phụ thuộc AI
    const dependencyStats = await AISurvey.aggregate([
      { $match: { isCompleted: true, 'aiUsage.dependencyLevel': { $exists: true } } },
      { $group: { _id: '$aiUsage.dependencyLevel', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])

    // Thống kê theo thời gian (7 ngày gần nhất)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const recentSurveys = await AISurvey.aggregate([
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
        gradeStats,
        frequencyStats,
        dependencyStats,
        recentSurveys
      }
    })

  } catch (error) {
    console.error('Error fetching AI survey stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}