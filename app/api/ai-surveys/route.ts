import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import AISurvey from '@/lib/models/AISurvey'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { personalInfo, aiUsage, technicalProjects } = body

    // Validation
    if (!personalInfo?.fullName || !personalInfo?.educationLevel || !personalInfo?.grade) {
      return NextResponse.json(
        { error: 'Missing required personal information fields' },
        { status: 400 }
      )
    }

    // Create new AI survey
    const aiSurvey = new AISurvey({
      personalInfo,
      aiUsage,
      technicalProjects,
    })

    await aiSurvey.save()

    return NextResponse.json({ 
      success: true, 
      message: 'AI survey submitted successfully',
      surveyId: aiSurvey._id 
    })

  } catch (error) {
    console.error('Error saving AI survey:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const surveys = await AISurvey.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await AISurvey.countDocuments({})

    return NextResponse.json({
      success: true,
      data: surveys,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching AI surveys:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}