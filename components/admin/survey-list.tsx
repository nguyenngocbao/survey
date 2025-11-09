"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SurveyDetail } from "./survey-detail";
import { useEffect, useState } from "react";

interface Survey {
  _id: string;
  personalInfo: {
    fullName: string;
    studentId: string;
    email: string;
    class: string;
    major: string;
    avatar?: string;
  };
  completedSections: {
    personal: boolean;
    academic: boolean;
    interests: boolean;
    future: boolean;
  };
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export function SurveyList() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'completed' | 'inProgress'>('all');
  const [selectedSurveyId, setSelectedSurveyId] = useState<string | null>(null);

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const response = await fetch('/api/admin/surveys');
      if (response.ok) {
        const data = await response.json();
        setSurveys(data.surveys);
      }
    } catch (error) {
      console.error('Error fetching surveys:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSurveys = surveys.filter(survey => {
    if (filter === 'completed') return survey.isCompleted;
    if (filter === 'inProgress') return !survey.isCompleted && survey.completedSections.personal;
    return true;
  });

  const getProgressBadge = (survey: Survey) => {
    const completed = Object.values(survey.completedSections).filter(Boolean).length;
    const total = 4;
    
    if (survey.isCompleted) {
      return <Badge className="bg-green-100 text-green-800">Hoàn thành</Badge>;
    }
    
    return (
      <Badge className="bg-orange-100 text-orange-800">
        {completed}/{total} phần
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          📋 Danh sách khảo sát
        </h2>
        
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            Tất cả ({surveys.length})
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('completed')}
          >
            Hoàn thành ({surveys.filter(s => s.isCompleted).length})
          </Button>
          <Button
            variant={filter === 'inProgress' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('inProgress')}
          >
            Đang thực hiện ({surveys.filter(s => !s.isCompleted && s.completedSections.personal).length})
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Đang tải danh sách khảo sát...</p>
        </div>
      ) : filteredSurveys.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-gray-500 text-lg">Chưa có khảo sát nào</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSurveys.map((survey) => (
            <div
              key={survey._id}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-gradient-to-r from-gray-50 to-blue-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {survey.personalInfo.avatar && (
                      <img
                        src={survey.personalInfo.avatar}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                      />
                    )}
                    <h3 className="font-semibold text-lg text-gray-800">
                      {survey.personalInfo.fullName}
                    </h3>
                    {getProgressBadge(survey)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">MSSV:</span> {survey.personalInfo.studentId}
                    </div>
                    <div>
                      <span className="font-medium">Lớp:</span> {survey.personalInfo.class}
                    </div>
                    <div>
                      <span className="font-medium">Ngành:</span> {survey.personalInfo.major}
                    </div>
                  </div>
                  
                  <div className="mt-2 text-sm text-gray-500">
                    <span className="font-medium">Email:</span> {survey.personalInfo.email}
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <div className="text-right text-sm text-gray-500">
                    <div>Tạo: {formatDate(survey.createdAt)}</div>
                    <div>Cập nhật: {formatDate(survey.updatedAt)}</div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => setSelectedSurveyId(survey._id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    👁️ Xem chi tiết
                  </Button>
                </div>
              </div>
              
              {/* Progress indicators */}
              <div className="mt-4 flex gap-2">
                {Object.entries(survey.completedSections).map(([section, completed]) => {
                  const sectionNames = {
                    personal: 'Cá nhân',
                    academic: 'Học tập',
                    interests: 'Sở thích',
                    future: 'Tương lai',
                  };
                  
                  return (
                    <div
                      key={section}
                      className={`px-2 py-1 rounded text-xs ${
                        completed
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {sectionNames[section as keyof typeof sectionNames]}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Survey Detail Modal */}
      {selectedSurveyId && (
        <SurveyDetail
          surveyId={selectedSurveyId}
          onClose={() => setSelectedSurveyId(null)}
        />
      )}
    </Card>
  );
}