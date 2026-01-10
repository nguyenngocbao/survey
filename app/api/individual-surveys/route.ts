import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import IndividualSurvey from '@/lib/models/IndividualSurvey'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { personalInfo, responses } = body

    // Validation
    if (!personalInfo?.fullName || !personalInfo?.class) {
      return NextResponse.json(
        { error: 'Missing required personal information' },
        { status: 400 }
      )
    }

    if (!responses?.question1 || !responses?.question2 || !responses?.question3) {
      return NextResponse.json(
        { error: 'Missing required survey responses' },
        { status: 400 }
      )
    }

    // Create new individual survey
    const individualSurvey = new IndividualSurvey({
      personalInfo: {
        fullName: personalInfo.fullName,
        class: personalInfo.class,
      },
      responses: {
        question1: responses.question1,
        question2: responses.question2,
        question3: responses.question3,
      }
    })

    await individualSurvey.save()

    return NextResponse.json({ 
      success: true, 
      message: 'Individual survey saved successfully',
      surveyId: individualSurvey._id 
    })

  } catch (error) {
    console.error('Error saving individual survey:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    // Get all individual surveys for stats
    const surveys = await IndividualSurvey.find({})
      .select('personalInfo.fullName personalInfo.class submittedAt')
      .sort({ submittedAt: -1 })

    const totalCount = surveys.length

    return NextResponse.json({
      success: true,
      data: {
        surveys,
        totalCount,
        completedCount: totalCount,
        pendingCount: 0 // For now, we don't track pending
      }
    })

  } catch (error) {
    console.error('Error fetching individual surveys:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}