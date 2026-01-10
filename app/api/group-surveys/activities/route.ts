import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import GroupSurvey from '@/lib/models/GroupSurvey'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { groupName, activityNumber, activityData } = body

    // Validation
    if (!groupName || !activityNumber || !activityData) {
      return NextResponse.json(
        { error: 'Missing required fields: groupName, activityNumber, activityData' },
        { status: 400 }
      )
    }

    // Find existing group survey by group name
    let groupSurvey = await GroupSurvey.findOne({ 'groupInfo.groupName': groupName })

    if (!groupSurvey) {
      return NextResponse.json(
        { error: 'Group not found. Please complete group info first.' },
        { status: 404 }
      )
    }

    // Update the specific activity data
    switch (activityNumber) {
      case 1:
        groupSurvey.activity1 = activityData
        break
      case 2:
        groupSurvey.activity2 = activityData
        break
      case 3:
        groupSurvey.activity3 = activityData
        break
      case 4:
        groupSurvey.activity4 = activityData
        break
      default:
        return NextResponse.json(
          { error: 'Invalid activity number. Must be 1, 2, 3, or 4.' },
          { status: 400 }
        )
    }

    await groupSurvey.save()

    return NextResponse.json({ 
      success: true, 
      message: `Activity ${activityNumber} saved successfully`,
      groupSurveyId: groupSurvey._id 
    })

  } catch (error) {
    console.error('Error saving activity data:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const groupName = searchParams.get('groupName')
    const activityNumber = searchParams.get('activityNumber')

    if (!groupName) {
      return NextResponse.json(
        { error: 'Missing groupName parameter' },
        { status: 400 }
      )
    }

    // Find group survey by group name
    const groupSurvey = await GroupSurvey.findOne({ 'groupInfo.groupName': groupName })

    if (!groupSurvey) {
      return NextResponse.json(
        { error: 'Group not found' },
        { status: 404 }
      )
    }

    // If specific activity requested, return only that activity
    if (activityNumber) {
      const activityNum = parseInt(activityNumber)
      let activityData = null
      
      switch (activityNum) {
        case 1:
          activityData = groupSurvey.activity1
          break
        case 2:
          activityData = groupSurvey.activity2
          break
        case 3:
          activityData = groupSurvey.activity3
          break
        case 4:
          activityData = groupSurvey.activity4
          break
        default:
          return NextResponse.json(
            { error: 'Invalid activity number. Must be 1, 2, 3, or 4.' },
            { status: 400 }
          )
      }

      return NextResponse.json({
        success: true,
        data: {
          groupInfo: groupSurvey.groupInfo,
          activityData
        }
      })
    }

    // Return full group survey data
    return NextResponse.json({
      success: true,
      data: {
        groupInfo: groupSurvey.groupInfo,
        activity1: groupSurvey.activity1,
        activity2: groupSurvey.activity2,
        activity3: groupSurvey.activity3,
        activity4: groupSurvey.activity4,
        completedSections: groupSurvey.completedSections,
        isCompleted: groupSurvey.isCompleted,
        createdAt: groupSurvey.createdAt,
        updatedAt: groupSurvey.updatedAt
      }
    })

  } catch (error) {
    console.error('Error fetching group data:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}