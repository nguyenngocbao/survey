"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { PersonalInfoForm } from "./forms/personal-info-form";
import { AcademicInfoForm } from "./forms/academic-info-form";
import { InterestsForm } from "./forms/interests-form";
import { FuturePlansForm } from "./forms/future-plans-form";

type FormSection = 'personal' | 'academic' | 'interests' | 'future' | null;

export function SurveyNavigation() {
  const [activeForm, setActiveForm] = useState<FormSection>(null);
  const [completedSections, setCompletedSections] = useState({
    personal: false,
    academic: false,
    interests: false,
    future: false,
  });

  const forms = [
    {
      id: 'personal' as const,
      title: 'Thông tin cá nhân',
      description: 'Họ tên, MSSV, lớp, ngành học',
      icon: '👤',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'academic' as const,
      title: 'Thông tin học tập',
      description: 'GPA, môn học yêu thích, phong cách học',
      icon: '📚',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
    },
    {
      id: 'interests' as const,
      title: 'Sở thích & Hoạt động',
      description: 'Sở thích, thể thao, câu lạc bộ',
      icon: '🎯',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      id: 'future' as const,
      title: 'Kế hoạch tương lai',
      description: 'Mục tiêu nghề nghiệp, kế hoạch học tập',
      icon: '🚀',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
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
      case 'personal':
        return <PersonalInfoForm onComplete={() => handleFormComplete('personal')} onCancel={() => setActiveForm(null)} />;
      case 'academic':
        return <AcademicInfoForm onComplete={() => handleFormComplete('academic')} onCancel={() => setActiveForm(null)} />;
      case 'interests':
        return <InterestsForm onComplete={() => handleFormComplete('interests')} onCancel={() => setActiveForm(null)} />;
      case 'future':
        return <FuturePlansForm onComplete={() => handleFormComplete('future')} onCancel={() => setActiveForm(null)} />;
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
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Chọn phần khảo sát</h2>
        <p className="text-gray-600">Vui lòng hoàn thành tất cả 4 phần để nộp khảo sát</p>
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
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-3"
          >
            Nộp khảo sát hoàn chỉnh 🎉
          </Button>
        </div>
      )}
    </Card>
  );
}