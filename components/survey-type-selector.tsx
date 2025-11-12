"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function SurveyTypeSelector() {
  return (
    <div className="w-full max-w-7xl space-y-12">
      {/* Header */}
      <div className="text-center space-y-6 animate-in fade-in-50 slide-in-from-top-4 duration-1000">
        {/* Icon with glow effect */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
          <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-violet-600 rounded-full flex items-center justify-center shadow-2xl">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
        
        {/* Title with gradient */}
        <div className="space-y-3">
          <h1 className="text-6xl md:text-7xl font-serif italic bg-gradient-to-r from-gray-800 via-purple-800 to-gray-800 bg-clip-text text-transparent font-bold tracking-tight">
            The X-File
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-400"></div>
            <h2 className="text-xl md:text-2xl font-medium text-gray-600">
              Học sinh & Nhóm học tập
            </h2>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-400"></div>
          </div>
        </div>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
          Khám phá <span className="font-semibold text-purple-600">'tệp tin X'</span> (bí mật) chứa đựng mọi dự án và tầm nhìn.
        </p>
      </div>

      {/* Survey Type Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-300">
        
        {/* Group Survey - FIRST */}
        <Card className="relative overflow-hidden p-10 bg-white/95 backdrop-blur-sm shadow-2xl border-0 hover:shadow-purple-500/20 hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] group">
          {/* Decorative gradient overlay */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-violet-600/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
          
          <div className="relative text-center space-y-6">
            {/* Icon with enhanced effects */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
              <div className="relative w-28 h-28 bg-gradient-to-br from-purple-500 via-violet-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-3">
                Hoạt động nhóm
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                Giải mã bản đồ tập thể. Đâu là điểm chung lớn nhất?
              </p>
            </div>

            {/* Enhanced feature list */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 space-y-3 text-sm">
              <div className="flex items-center gap-3 group/item hover:translate-x-1 transition-transform">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">👥</span>
                </div>
                <span className="text-gray-700 font-medium text-left">Thông tin nhóm & thành viên</span>
              </div>
              <div className="flex items-center gap-3 group/item hover:translate-x-1 transition-transform">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">🌊</span>
                </div>
                <span className="text-gray-700 font-medium text-left">Hoạt động 1: Bí ẩn đại dương</span>
              </div>
              <div className="flex items-center gap-3 group/item hover:translate-x-1 transition-transform">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-violet-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">🔮</span>
                </div>
                <span className="text-gray-700 font-medium text-left">Hoạt động 2: Bí mật thuyền sinh tồn</span>
              </div>
              <div className="flex items-center gap-3 group/item hover:translate-x-1 transition-transform">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">🗺️</span>
                </div>
                <span className="text-gray-700 font-medium text-left">Hoạt động 3: Bản vẽ bí ẩn</span>
              </div>
              <div className="flex items-center gap-3 group/item hover:translate-x-1 transition-transform">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✨</span>
                </div>
                <span className="text-gray-700 font-medium text-left">Hoạt động 4: Bản vẽ toả sáng</span>
              </div>
            </div>

            <Button 
              onClick={() => window.location.href = '/group'}
              className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-semibold py-6 text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/50 group-hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2">
                Bắt đầu khảo sát nhóm
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Button>
          </div>
        </Card>

        {/* Individual Survey - SECOND */}
        <Card className="relative overflow-hidden p-10 bg-white/95 backdrop-blur-sm shadow-2xl border-0 hover:shadow-teal-500/20 hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] group">
          {/* Decorative gradient overlay */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-teal-500/10 to-cyan-600/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
          
          <div className="relative text-center space-y-6">
            {/* Icon with enhanced effects */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
              <div className="relative w-28 h-28 bg-gradient-to-br from-teal-500 via-cyan-500 to-teal-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-3">
                Hoạt động cá nhân
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                Mở khóa tệp tin cảm xúc. Chỉ bạn thấy góc nhìn riêng.
              </p>
            </div>

            {/* Enhanced feature list */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 space-y-3 text-sm">
              <div className="flex items-center gap-3 group/item hover:translate-x-1 transition-transform">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">📝</span>
                </div>
                <span className="text-gray-700 font-medium text-left">Thông tin cá nhân</span>
              </div>
              <div className="flex items-center gap-3 group/item hover:translate-x-1 transition-transform">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">👁️</span>
                </div>
                <span className="text-gray-700 font-medium text-left">Góc nhìn của bạn</span>
              </div>
            </div>

            <Button 
              onClick={() => window.location.href = '/individual'}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold py-6 text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-teal-500/50 group-hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2">
                Bắt đầu khảo sát cá nhân
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}