"use client";

export function SurveyHeader() {
  return (
    <div className="w-full max-w-4xl animate-in fade-in-50 slide-in-from-top-4 duration-1000">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 text-center space-y-6 border-0">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-sm md:text-base text-gray-600 tracking-wide uppercase font-medium">
          Hệ thống khảo sát học sinh
        </p>

        {/* Main heading */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-serif italic text-gray-800 text-balance">
            Hồ sơ điện tử
          </h1>
          <h2 className="text-2xl md:text-3xl font-serif italic text-gray-700">
            Khảo sát nhóm học sinh
          </h2>
        </div>

        {/* Description */}
        <div className="space-y-4 py-6 border-t border-b border-gray-200">
          <p className="text-lg text-gray-700 leading-relaxed">
            Vui lòng điền đầy đủ thông tin vào 4 phần khảo sát bên dưới
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Thông tin cá nhân</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Thông tin học tập</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Sở thích & Hoạt động</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Kế hoạch tương lai</span>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-xs text-gray-500 italic">
          Thông tin của bạn sẽ được bảo mật và chỉ sử dụng cho mục đích khảo sát
        </p>
        
        {/* Admin link */}
        <div className="pt-4">
          <a
            href="/admin"
            className="text-xs text-blue-600 hover:text-blue-800 underline"
          >
            🔧 Trang quản trị (dành cho giáo viên)
          </a>
        </div>
      </div>
    </div>
  );
}