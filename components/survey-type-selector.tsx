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
          Hệ thống khảo sát
        </h1>
        <h2 className="text-2xl md:text-3xl font-serif italic text-gray-700">
          Học sinh & Nhóm học tập
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Chọn loại khảo sát phù hợp với mục đích của bạn. Khảo sát cá nhân để tìm hiểu bản thân, 
          khảo sát nhóm để đánh giá hoạt động tập thể.
        </p>
      </div>

      {/* Survey Type Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-300">
        
        {/* Individual Survey */}
        <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-2xl border-0 hover:shadow-3xl transition-all duration-300 hover:scale-105 group">
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Khảo sát cá nhân
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Khảo sát về thông tin cá nhân, học tập, sở thích và kế hoạch tương lai của từng học sinh
              </p>
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Thông tin cá nhân & học tập</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                <span>Sở thích & hoạt động cá nhân</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Kế hoạch nghề nghiệp tương lai</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span>Upload ảnh cá nhân & hoạt động</span>
              </div>
            </div>

            <Button 
              onClick={() => window.location.href = '/individual'}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-4 text-lg transition-all duration-300"
            >
              Bắt đầu khảo sát cá nhân
            </Button>
          </div>
        </Card>

        {/* Group Survey */}
        <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-2xl border-0 hover:shadow-3xl transition-all duration-300 hover:scale-105 group">
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Khảo sát nhóm
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Khảo sát về hoạt động nhóm, dự án chung, đánh giá thành viên và hiệu quả làm việc nhóm
              </p>
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Thông tin nhóm & thành viên</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>Dự án & hoạt động nhóm</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Đánh giá hiệu quả làm việc</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>Ảnh hoạt động & thành tích nhóm</span>
              </div>
            </div>

            <Button 
              onClick={() => window.location.href = '/group'}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-4 text-lg transition-all duration-300"
            >
              Bắt đầu khảo sát nhóm
            </Button>
          </div>
        </Card>
      </div>

      {/* Admin Link */}
      <div className="text-center animate-in fade-in-50 duration-700 delay-500">
        <a
          href="/admin"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Trang quản trị (dành cho giáo viên)
        </a>
      </div>
    </div>
  );
}