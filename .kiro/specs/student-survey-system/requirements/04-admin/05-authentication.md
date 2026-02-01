# Admin Authentication - Xác thực Quản trị

## User Story

**As a** System Administrator  
**I want to** require authentication for admin panel access  
**So that** only authorized teachers/admins can view and manage survey data

## Acceptance Criteria (EARS Format)

### AC1: Login page
WHEN an unauthenticated user accesses admin routes, THE Admin_System SHALL redirect to `/login` page

### AC2: Login form
WHEN a user submits login credentials, THE Admin_System SHALL validate username and password against stored credentials

### AC3: Session management
WHEN login is successful, THE Admin_System SHALL create a secure session and redirect to dashboard

### AC4: Protected routes
WHEN an authenticated user accesses admin routes, THE Admin_System SHALL allow access and display content

### AC5: Logout
WHEN a user clicks logout, THE Admin_System SHALL destroy the session and redirect to login page

### AC6: Session expiry
WHEN a session expires after 24 hours, THE Admin_System SHALL require re-authentication

## UI/UX Requirements

### Login Page (`/login`)

#### Layout
- Centered card on gradient background
- Logo ĐHSP ở top
- Form đơn giản, clean
- Background: HCMUEBackground component

#### Form Fields

**Username**
- Type: Text input
- Placeholder: "Tên đăng nhập"
- Required: Yes
- Icon: User icon

**Password**
- Type: Password input
- Placeholder: "Mật khẩu"
- Required: Yes
- Icon: Lock icon
- Show/hide password toggle

**Remember Me**
- Type: Checkbox
- Label: "Ghi nhớ đăng nhập"
- Optional

**Submit Button**
- Text: "Đăng nhập"
- Full width
- Loading state when submitting

#### Error Messages
- "Tên đăng nhập hoặc mật khẩu không đúng"
- "Vui lòng điền đầy đủ thông tin"
- Display as toast notification

### Protected Layout

#### Header
- Logo/Title
- User info (username)
- Logout button

#### Middleware
- Check authentication on every request
- Redirect to `/login` if not authenticated
- Allow access if authenticated

## Technical Requirements

### Authentication Method

**Option 1: Simple Credentials (Current)**
```typescript
// .env.local
ADMIN_USERNAME=admin
ADMIN_PASSWORD=hashed_password
NEXTAUTH_SECRET=random-secret-key
```

**Option 2: NextAuth.js (Recommended)**
- Use NextAuth.js for session management
- Credentials provider
- JWT tokens
- Secure cookies

### Middleware (`middleware.ts`)

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('admin-token')
  const { pathname } = request.nextUrl
  
  // Allow login page
  if (pathname === '/login') {
    return NextResponse.next()
  }
  
  // Redirect to login if no token
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
}
```

### API Routes

#### POST /api/auth/login
```typescript
// Request
{
  "username": "string",
  "password": "string",
  "remember": boolean
}

// Response (Success)
{
  "success": true,
  "token": "jwt-token",
  "user": {
    "username": "string",
    "role": "admin"
  }
}

// Response (Error)
{
  "success": false,
  "error": "Invalid credentials"
}
```

#### POST /api/auth/logout
```typescript
// Response
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### GET /api/auth/session
```typescript
// Response
{
  "authenticated": boolean,
  "user": {
    "username": "string",
    "role": "admin"
  } | null
}
```

## Data Models

```typescript
interface LoginCredentials {
  username: string;
  password: string;
  remember?: boolean;
}

interface AuthSession {
  user: {
    username: string;
    role: 'admin' | 'teacher';
  };
  expires: string;
}

interface AuthToken {
  token: string;
  expiresAt: Date;
}
```

## Security Requirements

### Password Security
- Passwords MUST be hashed (bcrypt)
- Never store plain text passwords
- Minimum 8 characters
- Salt rounds: 10

### Session Security
- Use HTTP-only cookies
- Secure flag in production
- SameSite: Strict
- Session timeout: 24 hours
- Refresh token support

### CSRF Protection
- CSRF tokens for forms
- Validate origin header
- Double submit cookie pattern

### Rate Limiting
- Max 5 login attempts per 15 minutes
- Lock account after 10 failed attempts
- IP-based rate limiting

## Implementation Steps

### Phase 1: Basic Auth (Quick)
1. Create `/login` page
2. Add middleware for route protection
3. Simple username/password check
4. Cookie-based session

### Phase 2: NextAuth.js (Recommended)
1. Install NextAuth.js
2. Configure credentials provider
3. Setup JWT strategy
4. Add session management
5. Implement logout

### Phase 3: Enhanced Security
1. Add rate limiting
2. Implement CSRF protection
3. Add audit logging
4. IP whitelist (optional)

## Environment Variables

```bash
# Admin App .env.local
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
ADMIN_USERNAME=admin
ADMIN_PASSWORD=$2b$10$hashed_password_here

# Optional: IP Whitelist
ALLOWED_IPS=192.168.1.0/24,10.0.0.0/8
```

## Testing Scenarios

1. **Login Success**
   - Enter correct credentials
   - Verify redirect to dashboard
   - Verify session created

2. **Login Failure**
   - Enter wrong credentials
   - Verify error message
   - Verify no session created

3. **Protected Routes**
   - Access admin route without login
   - Verify redirect to login
   - Login and verify access granted

4. **Logout**
   - Click logout button
   - Verify redirect to login
   - Verify session destroyed

5. **Session Expiry**
   - Wait for session to expire
   - Access admin route
   - Verify redirect to login

6. **Remember Me**
   - Login with "remember me" checked
   - Close browser
   - Reopen and verify still logged in

## UI Components

### LoginForm Component
```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'

export function LoginForm() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  
  // Implementation...
}
```

### LogoutButton Component
```typescript
'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()
  
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }
  
  return (
    <Button onClick={handleLogout} variant="outline">
      Đăng xuất
    </Button>
  )
}
```

## Accessibility

- Keyboard navigation support
- Screen reader labels
- Focus management
- Error announcements
- High contrast support

## Future Enhancements

- [ ] Multi-factor authentication (MFA)
- [ ] OAuth integration (Google, Microsoft)
- [ ] Role-based access control (RBAC)
- [ ] Audit logging
- [ ] Password reset functionality
- [ ] Email verification
- [ ] Account management UI

---

**Priority**: High  
**Status**: Not Implemented  
**Estimated Time**: 1-2 days
