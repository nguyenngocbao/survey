import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import mongoose from 'mongoose'

// Define schema directly in API to avoid caching issues
const GroupInfoSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  groupCode: { type: String, required: true },
  leaderName: { type: String, required: true },
  memberCount: { type: Number, required: true },
  class: { type: String, required: true },
  subject: { type: String, required: true },
  groupAvatar: { type: String, default: '' },
})

const GroupSurveySchema = new mongoose.Schema({
  groupInfo: GroupInfoSchema,
  membersInfo: { type: mongoose.Schema.Types.Mixed },
  projectActivities: { type: mongoose.Schema.Types.Mixed },
  evaluationFeedback: { type: mongoose.Schema.Types.Mixed },
  activity1: { type: mongoose.Schema.Types.Mixed },
  activity2: { type: mongoose.Schema.Types.Mixed },
  activity3: { type: mongoose.Schema.Types.Mixed },
  activity4: { type: mongoose.Schema.Types.Mixed },
  completedSections: {
    groupInfo: { type: Boolean, default: false },
    members: { type: Boolean, default: false },
    projects: { type: Boolean, default: false },
    evaluation: { type: Boolean, default: false },
  },
  isCompleted: { type: Boolean, default: false },
  submittedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

// Force delete and recreate model to avoid caching
if (mongoose.models.GroupSurvey) {
  delete mongoose.models.GroupSurvey
}

const GroupSurvey = mongoose.model('GroupSurvey', GroupSurveySchema)

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { groupName, leaderName, memberCount, class: className, subject, groupAvatar } = body

    // Validation
    if (!groupName || !leaderName || !memberCount || !className || !subject) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if group survey already exists for this group name
    let groupSurvey = await GroupSurvey.findOne({ 'groupInfo.groupName': groupName })

    if (groupSurvey) {
      // Update existing group survey
      groupSurvey.groupInfo = {
        groupName,
        groupCode: groupName,
        leaderName,
        memberCount,
        class: className,
        subject,
        groupAvatar: groupAvatar || '',
      }
      groupSurvey.completedSections.groupInfo = true
    } else {
      // Create new group survey
      groupSurvey = new GroupSurvey({
        groupInfo: {
          groupName,
          groupCode: groupName,
          leaderName,
          memberCount,
          class: className,
          subject,
          groupAvatar: groupAvatar || '',
        },
        completedSections: {
          groupInfo: true,
          members: false,
          projects: false,
          evaluation: false,
        }
      })
    }

    await groupSurvey.save()

    return NextResponse.json({ 
      success: true, 
      message: 'Group info saved successfully',
      groupSurveyId: groupSurvey._id 
    })

  } catch (error) {
    console.error('Error saving group info:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}