import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Survey from '@/lib/models/Survey'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { gpa, favoriteSubjects, studyHours, learningStyle, difficulties } = body

    // Validation
    if (gpa === undefined || !studyHours || !learningStyle) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // For now, we'll use the most recent survey that has personal info
    // In a real app, you'd want to track the current user's session
    const survey = await Survey.findOne({ 'completedSections.personal': true })
      .sort({ updatedAt: -1 })

    if (!survey) {
      return NextResponse.json(
        { error: 'Personal info must be completed first' },
        { status: 400 }
      )
    }

    // Update academic info
    survey.academicInfo = {
      gpa,
      favoriteSubjects: favoriteSubjects || [],
      studyHours,
      learningStyle,
      difficulties: difficulties || [],
    }
    survey.completedSections.academic = true

    await survey.save()

    return NextResponse.json({ 
      success: true, 
      message: 'Academic info saved successfully',
      surveyId: survey._id 
    })

  } catch (error) {
    console.error('Error saving academic info:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}