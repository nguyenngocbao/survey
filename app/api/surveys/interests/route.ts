import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Survey from '@/lib/models/Survey'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { hobbies, sports, clubs, volunteerWork, leadership, photos } = body

    // Validation
    if (!hobbies || hobbies.length === 0) {
      return NextResponse.json(
        { error: 'At least one hobby must be selected' },
        { status: 400 }
      )
    }

    // Find the most recent survey that has personal info
    const survey = await Survey.findOne({ 'completedSections.personal': true })
      .sort({ updatedAt: -1 })

    if (!survey) {
      return NextResponse.json(
        { error: 'Personal info must be completed first' },
        { status: 400 }
      )
    }

    // Update interests info
    survey.interests = {
      hobbies,
      sports: sports || [],
      clubs: clubs || [],
      volunteerWork: volunteerWork || false,
      leadership: leadership || false,
      photos: photos || [],
    }
    survey.completedSections.interests = true

    await survey.save()

    return NextResponse.json({ 
      success: true, 
      message: 'Interests info saved successfully',
      surveyId: survey._id 
    })

  } catch (error) {
    console.error('Error saving interests:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}