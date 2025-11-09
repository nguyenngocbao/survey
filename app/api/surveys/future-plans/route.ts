import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Survey from '@/lib/models/Survey'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { careerGoals, graduationPlan, furtherEducation, workExperience, skills } = body

    // Validation
    if (!careerGoals || !graduationPlan) {
      return NextResponse.json(
        { error: 'Career goals and graduation plan are required' },
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

    // Update future plans info
    survey.futurePlans = {
      careerGoals,
      graduationPlan,
      furtherEducation: furtherEducation || false,
      workExperience: workExperience || false,
      skills: skills || [],
    }
    survey.completedSections.future = true

    await survey.save()

    return NextResponse.json({ 
      success: true, 
      message: 'Survey completed successfully! Thank you for participating.',
      surveyId: survey._id,
      isCompleted: survey.isCompleted
    })

  } catch (error) {
    console.error('Error saving future plans:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}