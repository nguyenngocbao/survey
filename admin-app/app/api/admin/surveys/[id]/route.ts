import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Survey from '@/lib/models/Survey'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id: surveyId } = await params

    // Get survey by ID
    const survey = await Survey.findById(surveyId)

    if (!survey) {
      return NextResponse.json(
        { error: 'Survey not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      survey,
    })

  } catch (error) {
    console.error('Error fetching survey details:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}