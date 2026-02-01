import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import connectDB from '@/lib/mongodb'
import AISurvey from '@/lib/models/AISurvey'
import TeacherSurvey from '@/lib/models/TeacherSurvey'
import GroupSurvey from '@/lib/models/GroupSurvey'
import IndividualSurvey from '@/lib/models/IndividualSurvey'
import mongoose from 'mongoose'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// Middleware to verify admin token
function verifyAdminToken(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value
  
  if (!token) {
    throw new Error('Unauthorized')
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    if (decoded.role !== 'admin') {
      throw new Error('Unauthorized')
    }
    return decoded
  } catch (error) {
    throw new Error('Unauthorized')
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify admin authentication
    verifyAdminToken(request)

    await connectDB()

    const { id } = await params
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID format' },
        { status: 400 }
      )
    }

    let survey = null
    let surveyType = type

    // If type is specified, search in that collection only
    if (type) {
      switch (type) {
        case 'ai':
          survey = await AISurvey.findById(id).lean()
          break
        case 'teacher':
          survey = await TeacherSurvey.findById(id).lean()
          break
        case 'group':
          survey = await GroupSurvey.findById(id).lean()
          break
        case 'individual':
          await connectDB()
          const individualSurvey = await mongoose.connection.db.collection('individualSurveys').findOne({ _id: new mongoose.Types.ObjectId(id) })
          survey = individualSurvey
          break
      }
    } else {
      // Search in all collections
      await connectDB()
      const searches = await Promise.all([
        AISurvey.findById(id).lean(),
        TeacherSurvey.findById(id).lean(),
        GroupSurvey.findById(id).lean(),
        mongoose.connection.db.collection('individualSurveys').findOne({ _id: new mongoose.Types.ObjectId(id) })
      ])

      if (searches[0]) {
        survey = searches[0]
        surveyType = 'ai'
      } else if (searches[1]) {
        survey = searches[1]
        surveyType = 'teacher'
      } else if (searches[2]) {
        survey = searches[2]
        surveyType = 'group'
      } else if (searches[3]) {
        survey = searches[3]
        surveyType = 'individual'
      }
    }

    if (!survey) {
      return NextResponse.json(
        { success: false, error: 'Survey not found' },
        { status: 404 }
      )
    }

    // Add type information to the survey
    const surveyWithType = {
      ...survey,
      type: surveyType,
      typeName: {
        ai: 'Khảo sát học sinh về AI',
        teacher: 'Khảo sát giáo viên về AI',
        group: 'Hoạt động nhóm',
        individual: 'Khảo sát cá nhân'
      }[surveyType as string]
    }

    return NextResponse.json({
      success: true,
      data: surveyWithType
    })

  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.error('Admin survey detail error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}