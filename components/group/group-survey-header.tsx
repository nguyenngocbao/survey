"use client";

export function GroupSurveyHeader() {
  return (
    <div className="w-full max-w-4xl animate-in fade-in-50 slide-in-from-top-4 duration-1000">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 text-center space-y-6 border-0">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-sm md:text-base text-gray-600 tracking-wide uppercase font-medium">
          Hệ thống khảo sát nhóm học tập
        </p>

        {/* Main heading */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-serif italic text-gray-800 text-balance">
            Khảo sát nhóm
          </h1>
          <h2 className="text-2xl md:text-3xl font-serif italic text-gray-700">
            Đánh giá hoạt động tập thể
          </h2>
        </div>

        {/* Description */}
        <div className="space-y-4 py-6 border-t border-b border-gray-200">
          <p className="text-lg text-gray-700 leading-relaxed">
            Khảo sát về hoạt động nhóm, dự án chung và hiệu quả làm việc tập thể
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Thông tin nhóm</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span>Thành viên nhóm</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Dự án & Hoạt động</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <span>Đánh giá & Phản hồi</span>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-xs text-gray-500 italic">
          Thông tin nhóm sẽ được bảo mật và chỉ sử dụng cho mục đích khảo sát
        </p>
      </div>
    </div>
  );
}