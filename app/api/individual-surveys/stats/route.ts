import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import mongoose from 'mongoose'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    // Get total count
    const total = await mongoose.connection.db.collection('individualSurveys').countDocuments()
    
    // Get today's count
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    const todayCount = await mongoose.connection.db.collection('individualSurveys').countDocuments({
      createdAt: {
        $gte: today,
        $lt: tomorrow
      }
    })
    
    // Get recent surveys
    const recent = await mongoose.connection.db
      .collection('individualSurveys')
      .find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray()

    return NextResponse.json({
      success: true,
      data: {
        totalCount: total,
        completedCount: total, // All individual surveys are considered completed
        pendingCount: 0,
        recent
      }
    })
  } catch (error) {
    console.error('Error fetching individual survey stats:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}