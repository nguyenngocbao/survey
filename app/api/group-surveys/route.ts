import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import GroupSurvey from '@/lib/models/GroupSurvey'

export async function GET(request: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const page = parseInt(searchParams.get('page') || '1')
    const skip = (page - 1) * limit

    // Get group surveys with pagination
    const surveys = await GroupSurvey.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('groupInfo activity1 activity2 activity3 activity4 createdAt')

    // Get total count for pagination
    const total = await GroupSurvey.countDocuments()

    return NextResponse.json({
      success: true,
      data: surveys,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching group surveys:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()

    const body = await request.json()
    
    const survey = new GroupSurvey(body)
    await survey.save()

    return NextResponse.json({
      success: true,
      data: survey
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating group survey:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}