import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import mongoose from 'mongoose'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    
    const surveys = await mongoose.connection.db
      .collection('individualSurveys')
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray()

    return NextResponse.json({
      success: true,
      data: surveys
    })
  } catch (error) {
    console.error('Error fetching individual surveys:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch surveys' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const data = await request.json()

    const survey = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await mongoose.connection.db.collection('individualSurveys').insertOne(survey)

    return NextResponse.json({
      success: true,
      surveyId: result.insertedId
    })
  } catch (error) {
    console.error('Error creating individual survey:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create survey' },
      { status: 500 }
    )
  }
}