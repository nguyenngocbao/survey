"use client";

export function SurveyHeader() {
  return (
    <div className="w-full max-w-5xl animate-in fade-in-50 slide-in-from-top-4 duration-1000">
      <div className="relative overflow-hidden bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 md:p-14 text-center space-y-8 border-0">
        {/* Decorative gradient overlay */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-500/10 to-cyan-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-purple-600/10 rounded-full blur-3xl"></div>
        
        <div className="relative">
          {/* Icon with glow effect */}
          <div className="flex justify-center mb-6">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full blur-xl opacity-40 animate-pulse"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-teal-500 via-cyan-500 to-teal-600 rounded-full flex items-center justify-center shadow-xl">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Subtitle */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-teal-400"></div>
            <p className="text-sm md:text-base text-gray-600 tracking-wider uppercase font-semibold">
              Hệ thống khảo sát học sinh
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-teal-400"></div>
          </div>

          {/* Main heading */}
          <div className="space-y-3 mb-8">
            <h1 className="text-5xl md:text-6xl font-serif italic bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent font-bold tracking-tight">
              Hồ sơ điện tử
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-gray-700">
              Khảo sát cá nhân
            </h2>
          </div>

          {/* Description */}
          <div className="space-y-6 py-8">
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-light">
              Vui lòng điền đầy đủ thông tin vào <span className="font-semibold text-teal-600">4 phần khảo sát</span> bên dưới
            </p>
            
            {/* Enhanced feature list */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200 hover:scale-105 transition-transform">
                <div className="text-2xl mb-2">👤</div>
                <div className="text-xs font-semibold text-blue-700 mb-1">Phần 1</div>
                <div className="text-sm text-gray-700 font-medium">Thông tin cá nhân</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200 hover:scale-105 transition-transform">
                <div className="text-2xl mb-2">📚</div>
                <div className="text-xs font-semibold text-green-700 mb-1">Phần 2</div>
                <div className="text-sm text-gray-700 font-medium">Thông tin học tập</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200 hover:scale-105 transition-transform">
                <div className="text-2xl mb-2">🎯</div>
                <div className="text-xs font-semibold text-orange-700 mb-1">Phần 3</div>
                <div className="text-sm text-gray-700 font-medium">Sở thích & Hoạt động</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200 hover:scale-105 transition-transform">
                <div className="text-2xl mb-2">🚀</div>
                <div className="text-xs font-semibold text-purple-700 mb-1">Phần 4</div>
                <div className="text-sm text-gray-700 font-medium">Kế hoạch tương lai</div>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-3">
              <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="italic">Thông tin của bạn sẽ được bảo mật và chỉ sử dụng cho mục đích khảo sát</span>
            </div>
            
            {/* Admin link */}
            <a
              href="/admin"
              className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium"
            >
              <span>🔧</span>
              <span>Trang quản trị (dành cho giáo viên)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}