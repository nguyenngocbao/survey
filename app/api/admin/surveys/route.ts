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

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'all'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    let surveys: any[] = []
    let total = 0

    switch (type) {
      case 'ai':
        surveys = await AISurvey.find({})
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean()
        total = await AISurvey.countDocuments({})
        surveys = surveys.map(survey => ({
          ...survey,
          type: 'ai',
          title: 'Khảo sát học sinh về AI',
          participant: survey.personalInfo?.fullName || 'N/A'
        }))
        break

      case 'teacher':
        surveys = await TeacherSurvey.find({})
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean()
        total = await TeacherSurvey.countDocuments({})
        surveys = surveys.map(survey => ({
          ...survey,
          type: 'teacher',
          title: 'Khảo sát giáo viên về AI',
          participant: survey.personalInfo?.fullName || 'N/A'
        }))
        break

      case 'group':
        surveys = await GroupSurvey.find({})
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean()
        total = await GroupSurvey.countDocuments({})
        surveys = surveys.map(survey => ({
          ...survey,
          type: 'group',
          title: 'Hoạt động nhóm',
          participant: survey.groupName || 'N/A'
        }))
        break

      case 'individual':
        surveys = await IndividualSurvey.find({})
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean()
        total = await IndividualSurvey.countDocuments({})
        surveys = surveys.map(survey => ({
          ...survey,
          type: 'individual',
          title: 'Khảo sát cá nhân',
          participant: survey.responses?.question1?.substring(0, 50) + '...' || 'N/A'
        }))
        break

      default: // 'all'
        const [aiSurveys, teacherSurveys, groupSurveys, individualSurveys] = await Promise.all([
          AISurvey.find({}).sort({ createdAt: -1 }).lean(),
          TeacherSurvey.find({}).sort({ createdAt: -1 }).lean(),
          GroupSurvey.find({}).sort({ createdAt: -1 }).lean(),
          IndividualSurvey.find({}).sort({ createdAt: -1 }).lean()
        ])

        const allSurveys = [
          ...aiSurveys.map(s => ({ ...s, type: 'ai', title: 'Khảo sát học sinh về AI', participant: s.personalInfo?.fullName || 'N/A' })),
          ...teacherSurveys.map(s => ({ ...s, type: 'teacher', title: 'Khảo sát giáo viên về AI', participant: s.personalInfo?.fullName || 'N/A' })),
          ...groupSurveys.map(s => ({ ...s, type: 'group', title: 'Hoạt động nhóm', participant: s.groupName || 'N/A' })),
          ...individualSurveys.map(s => ({ ...s, type: 'individual', title: 'Khảo sát cá nhân', participant: s.responses?.question1?.substring(0, 50) + '...' || 'N/A' }))
        ]

        // Sort by createdAt descending
        allSurveys.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        
        total = allSurveys.length
        surveys = allSurveys.slice(skip, skip + limit)
        break
    }

    return NextResponse.json({
      success: true,
      data: {
        surveys,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    })

  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.error('Admin surveys error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}