import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import GroupSurvey from '@/lib/models/GroupSurvey'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { groupName, groupCode, leaderName, leaderEmail, leaderPhone, memberCount, class: className, subject, groupAvatar } = body

    // Validation
    if (!groupName || !groupCode || !leaderName || !leaderEmail || !leaderPhone || !memberCount || !className || !subject) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if group survey already exists for this group code
    let groupSurvey = await GroupSurvey.findOne({ 'groupInfo.groupCode': groupCode })

    if (groupSurvey) {
      // Update existing group survey
      groupSurvey.groupInfo = {
        groupName,
        groupCode,
        leaderName,
        leaderEmail,
        leaderPhone,
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
          groupCode,
          leaderName,
          leaderEmail,
          leaderPhone,
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