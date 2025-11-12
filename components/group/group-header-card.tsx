import { Card } from "@/components/ui/card"

export function GroupHeaderCard() {
  return (
    <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-2xl border-0">
      <div className="text-center space-y-6">
        {/* Icon */}
        <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Hoạt động nhóm
          </h1>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Giải mã bản đồ tập thể. Đâu là điểm chung lớn nhất?
          </p>
        </div>

        {/* Optional Feature List */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Thông tin nhóm & thành viên</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
            <span>4 hoạt động khám phá</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>Thống kê theo thời gian thực</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
