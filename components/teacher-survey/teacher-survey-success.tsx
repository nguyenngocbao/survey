'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export function TeacherSurveySuccess() {
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
                ['bg-emerald-500', 'bg-teal-500', 'bg-blue-500', 'bg-green-500', 'bg-cyan-500'][Math.floor(Math.random() * 5)]
              }`} />
            </div>
          ))}
        </div>
      )}

      <Card className="relative overflow-hidden p-12 md:p-16 bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-3xl">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-emerald-600/10 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="relative text-center space-y-8">
          {/* Success Icon */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative w-32 h-32 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent animate-pulse">
              Cảm ơn Thầy/Cô!
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Thầy/Cô đã hoàn thành khảo sát thành công!
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Trân trọng cảm ơn Thầy/Cô đã dành thời gian quý báu tham gia khảo sát về thực trạng sử dụng trí tuệ nhân tạo trong giảng dạy. 
              Những chia sẻ quý báu của Thầy/Cô sẽ góp phần quan trọng vào việc phát triển giáo dục hiện đại và tương lai.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
              <div className="text-3xl font-bold text-emerald-600">19</div>
              <div className="text-sm text-gray-600">Câu hỏi đã trả lời</div>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 border border-teal-100">
              <div className="text-3xl font-bold text-teal-600">2</div>
              <div className="text-sm text-gray-600">Phần khảo sát hoàn thành</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-6 border border-blue-100">
              <div className="text-3xl font-bold text-blue-600">100%</div>
              <div className="text-sm text-gray-600">Tiến độ hoàn thành</div>
            </div>
          </div>

          {/* Thank You Message */}
          <div className="bg-gradient-to-br from-emerald-50/50 to-teal-50/50 rounded-2xl p-8 border border-emerald-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Thông tin liên hệ
            </h3>
            <div className="text-gray-600 space-y-2">
              <p><strong>Trần Kim Phương</strong> – Sinh viên thực hiện khảo sát</p>
              <p>📧 Email: trankimphuong121@gmail.com</p>
              <p>📞 Điện thoại: 0867 440 950</p>
            </div>
            <p className="text-sm text-emerald-600 italic mt-4">
              Nếu có bất kỳ thắc mắc nào, xin vui lòng liên hệ qua thông tin trên
            </p>
          </div>

          {/* Special Message for Teachers */}
          <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 rounded-2xl p-6 border border-amber-100">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-2xl">👨‍🏫</span>
              <h3 className="text-lg font-bold text-gray-800">Lời cảm ơn đặc biệt</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Với vai trò là người định hướng tương lai cho thế hệ trẻ, sự tham gia của Thầy/Cô trong nghiên cứu này có ý nghĩa vô cùng quan trọng. 
              Chúng tôi tin rằng những kinh nghiệm và quan điểm của Thầy/Cô sẽ giúp xây dựng một hệ thống giáo dục tích hợp AI hiệu quả hơn.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}