import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Survey from '@/lib/models/Survey'

export async function GET() {
  try {
    await connectDB()

    // Get all completed surveys
    const surveys = await Survey.find({ isCompleted: true })
      .sort({ submittedAt: -1 })
      .select('-__v') // Exclude version field

    if (surveys.length === 0) {
      return NextResponse.json(
        { error: 'No completed surveys found' },
        { status: 404 }
      )
    }

    // Create export data with metadata
    const exportData = {
      metadata: {
        exportDate: new Date().toISOString(),
        totalSurveys: surveys.length,
        version: '1.0',
        description: 'Student Survey Data Export'
      },
      surveys: surveys.map(survey => ({
        id: survey._id,
        personalInfo: {
          studentId: survey.personalInfo.studentId,
          fullName: survey.personalInfo.fullName,
          email: survey.personalInfo.email,
          phone: survey.personalInfo.phone,
          class: survey.personalInfo.class,
          major: survey.personalInfo.major,
          avatar: survey.personalInfo.avatar || null
        },
        academicInfo: survey.academicInfo ? {
          gpa: survey.academicInfo.gpa,
          favoriteSubjects: survey.academicInfo.favoriteSubjects,
          studyHours: survey.academicInfo.studyHours,
          learningStyle: survey.academicInfo.learningStyle,
          difficulties: survey.academicInfo.difficulties
        } : null,
        interests: survey.interests ? {
          hobbies: survey.interests.hobbies,
          sports: survey.interests.sports,
          clubs: survey.interests.clubs,
          volunteerWork: survey.interests.volunteerWork,
          leadership: survey.interests.leadership,
          photos: survey.interests.photos || []
        } : null,
        futurePlans: survey.futurePlans ? {
          careerGoals: survey.futurePlans.careerGoals,
          graduationPlan: survey.futurePlans.graduationPlan,
          furtherEducation: survey.futurePlans.furtherEducation,
          workExperience: survey.futurePlans.workExperience,
          skills: survey.futurePlans.skills
        } : null,
        completedSections: survey.completedSections,
        timestamps: {
          createdAt: survey.createdAt,
          updatedAt: survey.updatedAt,
          submittedAt: survey.submittedAt
        }
      }))
    }

    const jsonContent = JSON.stringify(exportData, null, 2)

    return new Response(jsonContent, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Disposition': `attachment; filename="khao-sat-${new Date().toISOString().split('T')[0]}.json"`,
      },
    })

  } catch (error) {
    console.error('Error exporting JSON:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}