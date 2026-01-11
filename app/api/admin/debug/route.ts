import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value
  
  let decoded = null
  let error = null
  
  if (token) {
    try {
      decoded = jwt.verify(token, JWT_SECRET)
    } catch (e: any) {
      error = e.message
    }
  }
  
  return NextResponse.json({
    hasToken: !!token,
    token: token ? token.substring(0, 50) + '...' : null,
    decoded,
    error,
    jwtSecret: JWT_SECRET.substring(0, 10) + '...',
    timestamp: new Date().toISOString()
  })
}