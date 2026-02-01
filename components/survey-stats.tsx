"use client";

import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface SurveyStats {
  totalSurveys: number;
  completedSurveys: number;
  inProgressSurveys: number;
  todaySubmissions: number;
}

export function SurveyStats() {
  const [stats, setStats] = useState<SurveyStats>({
    totalSurveys: 0,
    completedSurveys: 0,
    inProgressSurveys: 0,
    todaySubmissions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/surveys/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statItems = [
    {
      title: 'Tổng khảo sát',
      value: stats.totalSurveys,
      icon: '📊',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Đã hoàn thành',
      value: stats.completedSurveys,
      icon: '✅',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Đang thực hiện',
      value: stats.inProgressSurveys,
      icon: '⏳',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Hôm nay',
      value: stats.todaySubmissions,
      icon: '🎯',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <Card className="w-full max-w-5xl mx-auto p-8 md:p-10 bg-white/95 backdrop-blur-sm shadow-2xl border-0 animate-in slide-in-from-bottom-4 duration-700 rounded-3xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-xl">📈</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Thống kê khảo sát
          </h2>
        </div>
        <p className="text-gray-600 text-lg">Tổng quan về tình hình thực hiện khảo sát</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="relative inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl animate-pulse"></div>
          </div>
          <p className="text-gray-500 mt-4 font-medium">Đang tải thống kê...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statItems.map((item, index) => (
            <div
              key={index}
              className={`relative overflow-hidden p-6 rounded-2xl ${item.bgColor} border-2 border-gray-200 text-center transition-all duration-500 hover:scale-105 hover:shadow-xl group`}
            >
              {/* Decorative gradient */}
              <div className={`absolute top-0 right-0 w-20 h-20 ${item.bgColor} opacity-50 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
              
              <div className="relative">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div className={`text-4xl font-bold ${item.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  {item.value}
                </div>
                <div className="text-sm text-gray-700 font-semibold">
                  {item.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <svg className="w-4 h-4 text-blue-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="italic">Dữ liệu được cập nhật theo thời gian thực</span>
        </div>
      </div>
    </Card>
  );
}