import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Survey from '@/lib/models/Survey'

export async function GET() {
  try {
    await connectDB()

    // Get total surveys
    const totalSurveys = await Survey.countDocuments()

    // Get completed surveys
    const completedSurveys = await Survey.countDocuments({ isCompleted: true })

    // Get in-progress surveys
    const inProgressSurveys = await Survey.countDocuments({ 
      isCompleted: false,
      'completedSections.personal': true 
    })

    // Get today's submissions
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const todaySubmissions = await Survey.countDocuments({
      createdAt: {
        $gte: today,
        $lt: tomorrow
      }
    })

    // Calculate completion rate
    const completionRate = totalSurveys > 0 ? (completedSurveys / totalSurveys) * 100 : 0

    return NextResponse.json({
      totalSurveys,
      completedSurveys,
      inProgressSurveys,
      todaySubmissions,
      completionRate,
    })

  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}