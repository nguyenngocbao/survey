import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Survey from '@/lib/models/Survey'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { fullName, studentId, email, phone, class: className, major, avatar } = body

    // Validation
    if (!fullName || !studentId || !email || !phone || !className || !major) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if survey already exists for this student
    let survey = await Survey.findOne({ 'personalInfo.studentId': studentId })

    if (survey) {
      // Update existing survey
      survey.personalInfo = {
        fullName,
        studentId,
        email,
        phone,
        class: className,
        major,
        avatar: avatar || '',
      }
      survey.completedSections.personal = true
    } else {
      // Create new survey
      survey = new Survey({
        personalInfo: {
          fullName,
          studentId,
          email,
          phone,
          class: className,
          major,
          avatar: avatar || '',
        },
        completedSections: {
          personal: true,
          academic: false,
          interests: false,
          future: false,
        }
      })
    }

    await survey.save()

    return NextResponse.json({ 
      success: true, 
      message: 'Personal info saved successfully',
      surveyId: survey._id 
    })

  } catch (error) {
    console.error('Error saving personal info:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}