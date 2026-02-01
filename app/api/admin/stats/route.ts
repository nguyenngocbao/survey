import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import connectDB from '@/lib/mongodb'
import AISurvey from '@/lib/models/AISurvey'
import TeacherSurvey from '@/lib/models/TeacherSurvey'
import GroupSurvey from '@/lib/models/GroupSurvey'
import IndividualSurvey from '@/lib/models/IndividualSurvey'

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

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    verifyAdminToken(request)

    await connectDB()

    // Get current date for today's stats
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    // Get stats for all survey types
    const [aiSurveys, teacherSurveys, groupSurveys, individualSurveys] = await Promise.all([
      AISurvey.find({}),
      TeacherSurvey.find({}),
      GroupSurvey.find({}),
      IndividualSurvey.find({})
    ])

    // Calculate today's submissions
    const todayAI = await AISurvey.countDocuments({
      createdAt: { $gte: today, $lt: tomorrow }
    })
    const todayTeacher = await TeacherSurvey.countDocuments({
      createdAt: { $gte: today, $lt: tomorrow }
    })
    const todayGroup = await GroupSurvey.countDocuments({
      createdAt: { $gte: today, $lt: tomorrow }
    })
    const todayIndividual = await IndividualSurvey.countDocuments({
      createdAt: { $gte: today, $lt: tomorrow }
    })

    // Calculate stats
    const stats = {
      aiSurveys: {
        total: aiSurveys.length,
        today: todayAI,
        recent: aiSurveys.slice(-5).reverse()
      },
      teacherSurveys: {
        total: teacherSurveys.length,
        today: todayTeacher,
        recent: teacherSurveys.slice(-5).reverse()
      },
      groupSurveys: {
        total: groupSurveys.length,
        today: todayGroup,
        recent: groupSurveys.slice(-5).reverse()
      },
      individualSurveys: {
        total: individualSurveys.length,
        today: todayIndividual,
        recent: individualSurveys.slice(-5).reverse()
      },
      totals: {
        allSurveys: aiSurveys.length + teacherSurveys.length + groupSurveys.length + individualSurveys.length,
        todayTotal: todayAI + todayTeacher + todayGroup + todayIndividual
      }
    }

    return NextResponse.json({
      success: true,
      data: stats
    })

  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.error('Admin stats error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}