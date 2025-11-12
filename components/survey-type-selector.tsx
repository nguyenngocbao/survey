"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function SurveyTypeSelector() {
  return (
    <div className="w-full max-w-6xl space-y-8">
      {/* Header */}
      <div className="text-center space-y-4 animate-in fade-in-50 slide-in-from-top-4 duration-1000">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-serif italic text-gray-800 text-balance">
          The X-File
        </h1>
        <h2 className="text-2xl md:text-3xl font-serif italic text-gray-700">
          Học sinh & Nhóm học tập
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Khám phá 'tệp tin X' (bí mật) chứa đựng mọi dự án và tầm nhìn.
        </p>
      </div>

      {/* Survey Type Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-300">
        
        {/* Group Survey - FIRST */}
        <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-2xl border-0 hover:shadow-3xl transition-all duration-300 hover:scale-105 group">
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Hoạt động nhóm
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Giải mã bản đồ tập thể. Đâu là điểm chung lớn nhất?
              </p>
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Thông tin nhóm & thành viên</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                <span>Hoạt động 1: Bí ẩn đại dương</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Hoạt động 2: Bí mật huyền sinh tồn</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-violet-300 rounded-full"></div>
                <span>Hoạt động 3: Dòng chảy thời gian</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-violet-200 rounded-full"></div>
                <span>Hoạt động 4: Con đường tơ lụa</span>
              </div>
            </div>

            <Button 
              onClick={() => window.location.href = '/group'}
              className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-semibold py-4 text-lg transition-all duration-300"
            >
              Bắt đầu khảo sát nhóm
            </Button>
          </div>
        </Card>

        {/* Individual Survey - SECOND */}
        <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-2xl border-0 hover:shadow-3xl transition-all duration-300 hover:scale-105 group">
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Hoạt động cá nhân
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Mở khóa tệp tin cảm xúc. Chỉ bạn thấy góc nhìn riêng.
              </p>
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span>Thông tin cá nhân</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                <span>Góc nhìn của bạn</span>
              </div>
            </div>

            <Button 
              onClick={() => window.location.href = '/individual'}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold py-4 text-lg transition-all duration-300"
            >
              Bắt đầu khảo sát cá nhân
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}