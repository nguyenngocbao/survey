import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Admin credentials - trong production nên lưu trong database
const ADMIN_CREDENTIALS = {
  username: 'admin',
  // Password: admin123 (hashed)
  passwordHash: '$2b$10$PRaWF2caA20rNVrToY815uNN24.I9u3zKiJuSfMzMLV8.7Vzgjxay'
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng điền đầy đủ thông tin' },
        { status: 400 }
      )
    }

    // Check username
    if (username !== ADMIN_CREDENTIALS.username) {
      return NextResponse.json(
        { success: false, error: 'Tên đăng nhập hoặc mật khẩu không đúng' },
        { status: 401 }
      )
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, ADMIN_CREDENTIALS.passwordHash)
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: 'Tên đăng nhập hoặc mật khẩu không đúng' },
        { status: 401 }
      )
    }

    // Create JWT token
    const token = jwt.sign(
      { username, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    // Create response with cookie
    const response = NextResponse.json({
      success: true,
      message: 'Đăng nhập thành công',
      user: { username, role: 'admin' }
    })

    // Set HTTP-only cookie
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 // 24 hours
    })

    return response

  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { success: false, error: 'Lỗi hệ thống' },
      { status: 500 }
    )
  }
}

// Logout endpoint
export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: 'Đăng xuất thành công'
  })

  // Clear cookie
  response.cookies.delete('admin-token')

  return response
}