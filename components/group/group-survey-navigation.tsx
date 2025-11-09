"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { GroupInfoForm } from "./forms/group-info-form";
import { MembersInfoForm } from "./forms/members-info-form";
import { ProjectActivitiesForm } from "./forms/project-activities-form";
import { EvaluationFeedbackForm } from "./forms/evaluation-feedback-form";

type FormSection = 'groupInfo' | 'members' | 'projects' | 'evaluation' | null;

export function GroupSurveyNavigation() {
  const [activeForm, setActiveForm] = useState<FormSection>(null);
  const [completedSections, setCompletedSections] = useState({
    groupInfo: false,
    members: false,
    projects: false,
    evaluation: false,
  });

  const forms = [
    {
      id: 'groupInfo' as const,
      title: 'Thông tin nhóm',
      description: 'Tên nhóm, trưởng nhóm, môn học, số thành viên',
      icon: '👥',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
    },
    {
      id: 'members' as const,
      title: 'Thành viên nhóm',
      description: 'Danh sách thành viên, vai trò, đánh giá teamwork',
      icon: '🤝',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      id: 'projects' as const,
      title: 'Dự án & Hoạt động',
      description: 'Dự án hiện tại, hoạt động nhóm, thành tích',
      icon: '📋',
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
    },
    {
      id: 'evaluation' as const,
      title: 'Đánh giá & Phản hồi',
      description: 'Đánh giá hiệu quả, phản hồi thành viên, kế hoạch',
      icon: '⭐',
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-50',
    },
  ];

  const handleFormComplete = (formId: FormSection) => {
    if (formId) {
      setCompletedSections(prev => ({
        ...prev,
        [formId]: true
      }));
      setActiveForm(null);
    }
  };

  const renderActiveForm = () => {
    switch (activeForm) {
      case 'groupInfo':
        return <GroupInfoForm onComplete={() => handleFormComplete('groupInfo')} onCancel={() => setActiveForm(null)} />;
      case 'members':
        return <MembersInfoForm onComplete={() => handleFormComplete('members')} onCancel={() => setActiveForm(null)} />;
      case 'projects':
        return <ProjectActivitiesForm onComplete={() => handleFormComplete('projects')} onCancel={() => setActiveForm(null)} />;
      case 'evaluation':
        return <EvaluationFeedbackForm onComplete={() => handleFormComplete('evaluation')} onCancel={() => setActiveForm(null)} />;
      default:
        return null;
    }
  };

  if (activeForm) {
    return renderActiveForm();
  }

  return (
    <Card className="w-full max-w-4xl mx-auto p-6 bg-white/90 backdrop-blur-sm shadow-xl border-0 animate-in fade-in-50 duration-700">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Chọn phần khảo sát nhóm</h2>
        <p className="text-gray-600">Vui lòng hoàn thành tất cả 4 phần để nộp khảo sát nhóm</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {forms.map((form) => (
          <div
            key={form.id}
            className={`relative p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
              completedSections[form.id] 
                ? 'border-green-300 bg-green-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {/* Completed badge */}
            {completedSections[form.id] && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${form.color} flex items-center justify-center text-white text-xl`}>
                {form.icon}
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {form.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {form.description}
                </p>
                
                <Button
                  onClick={() => setActiveForm(form.id)}
                  className={`w-full bg-gradient-to-r ${form.color} hover:opacity-90 text-white`}
                  disabled={completedSections[form.id]}
                >
                  {completedSections[form.id] ? 'Đã hoàn thành' : 'Bắt đầu'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit button */}
      {Object.values(completedSections).every(Boolean) && (
        <div className="mt-8 text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3"
          >
            Nộp khảo sát nhóm hoàn chỉnh 🎉
          </Button>
        </div>
      )}
    </Card>
  );
}