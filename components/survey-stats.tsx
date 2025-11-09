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
    <Card className="w-full max-w-4xl mx-auto p-6 bg-white/90 backdrop-blur-sm shadow-xl border-0 animate-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">📈 Thống kê khảo sát</h2>
        <p className="text-sm text-gray-600">Tổng quan về tình hình thực hiện khảo sát</p>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500 mt-2">Đang tải thống kê...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statItems.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${item.bgColor} border border-gray-200 text-center transition-transform hover:scale-105`}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className={`text-2xl font-bold ${item.color} mb-1`}>
                {item.value}
              </div>
              <div className="text-xs text-gray-600 font-medium">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500 italic">
          Dữ liệu được cập nhật theo thời gian thực
        </p>
      </div>
    </Card>
  );
}