import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import GroupSurvey from '@/lib/models/GroupSurvey'

export async function GET() {
  try {
    await connectDB()

    // Get total group surveys
    const totalGroupSurveys = await GroupSurvey.countDocuments()

    // Get today's group submissions
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const todayGroupSubmissions = await GroupSurvey.countDocuments({
      createdAt: {
        $gte: today,
        $lt: tomorrow
      }
    })

    // Get recent surveys for display
    const recentSurveys = await GroupSurvey.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('groupInfo.groupName groupInfo.leaderName createdAt')

    return NextResponse.json({
      success: true,
      data: {
        total: totalGroupSurveys,
        today: todayGroupSubmissions,
        recent: recentSurveys
      }
    })

  } catch (error) {
    console.error('Error fetching group survey stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}