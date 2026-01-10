import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import IndividualSurvey from '@/lib/models/IndividualSurvey'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    // Get survey statistics
    const totalCount = await IndividualSurvey.countDocuments()
    
    // Get recent surveys (last 10)
    const recentSurveys = await IndividualSurvey.find({})
      .select('personalInfo.fullName personalInfo.class submittedAt')
      .sort({ submittedAt: -1 })
      .limit(10)

    // Get surveys by class
    const surveysByClass = await IndividualSurvey.aggregate([
      {
        $group: {
          _id: '$personalInfo.class',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ])

    // Get surveys by date (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    
    const surveysByDate = await IndividualSurvey.aggregate([
      {
        $match: {
          submittedAt: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$submittedAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ])

    return NextResponse.json({
      success: true,
      data: {
        totalCount,
        completedCount: totalCount,
        pendingCount: 0,
        recentSurveys,
        surveysByClass,
        surveysByDate
      }
    })

  } catch (error) {
    console.error('Error fetching individual survey stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}