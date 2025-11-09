import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import GroupSurvey from '@/lib/models/GroupSurvey'

export async function GET() {
  try {
    await connectDB()

    // Get total group surveys
    const totalGroupSurveys = await GroupSurvey.countDocuments()

    // Get completed group surveys
    const completedGroupSurveys = await GroupSurvey.countDocuments({ isCompleted: true })

    // Get in-progress group surveys
    const inProgressGroupSurveys = await GroupSurvey.countDocuments({ 
      isCompleted: false,
      'completedSections.groupInfo': true 
    })

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

    return NextResponse.json({
      totalGroupSurveys,
      completedGroupSurveys,
      inProgressGroupSurveys,
      todayGroupSubmissions,
    })

  } catch (error) {
    console.error('Error fetching group survey stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}