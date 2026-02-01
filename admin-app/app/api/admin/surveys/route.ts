import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Survey from '@/lib/models/Survey'

export async function GET() {
  try {
    await connectDB()

    // Get all surveys with personal info (at least started)
    const surveys = await Survey.find({ 'completedSections.personal': true })
      .sort({ updatedAt: -1 })
      .select({
        personalInfo: 1,
        completedSections: 1,
        isCompleted: 1,
        createdAt: 1,
        updatedAt: 1,
      })

    return NextResponse.json({
      success: true,
      surveys,
      total: surveys.length,
    })

  } catch (error) {
    console.error('Error fetching surveys:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}