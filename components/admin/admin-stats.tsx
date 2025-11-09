"use client";

import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface AdminStats {
  totalSurveys: number;
  completedSurveys: number;
  inProgressSurveys: number;
  todaySubmissions: number;
  completionRate: number;
}

export function AdminStats() {
  const [stats, setStats] = useState<AdminStats>({
    totalSurveys: 0,
    completedSurveys: 0,
    inProgressSurveys: 0,
    todaySubmissions: 0,
    completionRate: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching admin stats:', error);
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
      change: '+12%',
    },
    {
      title: 'Hoàn thành',
      value: stats.completedSurveys,
      icon: '✅',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: `${stats.completionRate.toFixed(1)}%`,
    },
    {
      title: 'Đang thực hiện',
      value: stats.inProgressSurveys,
      icon: '⏳',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: 'Active',
    },
    {
      title: 'Hôm nay',
      value: stats.todaySubmissions,
      icon: '🎯',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: 'New',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item, index) => (
        <Card key={index} className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                {item.title}
              </p>
              <p className={`text-3xl font-bold ${item.color} mb-1`}>
                {loading ? '...' : item.value}
              </p>
              <p className="text-xs text-gray-500">
                {item.change}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg ${item.bgColor} flex items-center justify-center text-xl`}>
              {item.icon}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}