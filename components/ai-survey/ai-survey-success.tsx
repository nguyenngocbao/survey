'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export function AISurveySuccess() {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setShowConfetti(true)
    // Auto hide confetti after 3 seconds
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full max-w-4xl space-y-8">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <div className={`w-2 h-2 rounded-full ${
                ['bg-purple-500', 'bg-pink-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'][Math.floor(Math.random() * 5)]
              }`} />
            </div>
          ))}
        </div>
      )}

      <Card className="relative overflow-hidden p-12 md:p-16 bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-3xl">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="relative text-center space-y-8">
          {/* Success Icon */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative w-32 h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
              Cảm ơn bạn!
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Bạn đã hoàn thành khảo sát thành công!
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Chân thành cảm ơn bạn đã dành thời gian quý báu tham gia khảo sát về thực trạng sử dụng trí tuệ nhân tạo trong học tập. 
              Những chia sẻ của bạn sẽ góp phần quan trọng vào việc nghiên cứu và phát triển giáo dục hiện đại.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <div className="text-3xl font-bold text-purple-600">17</div>
              <div className="text-sm text-gray-600">Câu hỏi đã trả lời</div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-100">
              <div className="text-3xl font-bold text-pink-600">3</div>
              <div className="text-sm text-gray-600">Phần khảo sát hoàn thành</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
              <div className="text-3xl font-bold text-blue-600">100%</div>
              <div className="text-sm text-gray-600">Tiến độ hoàn thành</div>
            </div>
          </div>

          {/* Thank You Message */}
          <div className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 rounded-2xl p-8 border border-purple-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Thông tin liên hệ
            </h3>
            <div className="text-gray-600 space-y-2">
              <p><strong>Trần Kim Phương</strong> – Sinh viên thực hiện khảo sát</p>
              <p>📧 Email: trankimphuong121@gmail.com</p>
              <p>📞 Điện thoại: 0867 440 950</p>
            </div>
            <p className="text-sm text-purple-600 italic mt-4">
              Nếu có bất kỳ thắc mắc nào, xin vui lòng liên hệ qua thông tin trên
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}