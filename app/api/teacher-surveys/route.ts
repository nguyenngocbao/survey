import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import TeacherSurvey from '@/lib/models/TeacherSurvey'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { personalInfo, aiUsage } = body

    // Validation
    if (!personalInfo?.fullName || !personalInfo?.educationLevel) {
      return NextResponse.json(
        { error: 'Missing required personal information fields' },
        { status: 400 }
      )
    }

    // Create new teacher survey
    const teacherSurvey = new TeacherSurvey({
      personalInfo,
      aiUsage,
    })

    await teacherSurvey.save()

    return NextResponse.json({ 
      success: true, 
      message: 'Teacher survey submitted successfully',
      surveyId: teacherSurvey._id 
    })

  } catch (error) {
    console.error('Error saving teacher survey:', error)
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

    const surveys = await TeacherSurvey.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await TeacherSurvey.countDocuments({})

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
    console.error('Error fetching teacher surveys:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}