"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { PersonalInfoForm } from "./forms/personal-info-form";
import { AcademicInfoForm } from "./forms/academic-info-form";
import { InterestsForm } from "./forms/interests-form";
import { FuturePlansForm } from "./forms/future-plans-form";

type FormSection = 'personal' | 'perspective' | null;

export function SurveyNavigation() {
  const [activeForm, setActiveForm] = useState<FormSection>(null);
  const [completedSections, setCompletedSections] = useState({
    personal: false,
    perspective: false,
  });

  const forms = [
    {
      id: 'personal' as const,
      title: 'Thông tin cá nhân',
      description: 'Họ tên, lớp, thông tin liên hệ và thông tin cơ bản',
      icon: '📝',
      color: 'from-teal-500 to-cyan-600',
      bgColor: 'bg-teal-50',
    },
    {
      id: 'perspective' as const,
      title: 'Góc nhìn của bạn',
      description: 'Chia sẻ suy nghĩ, quan điểm và cảm nhận cá nhân',
      icon: '👁️',
      color: 'from-cyan-500 to-blue-600',
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
      case 'personal':
        return <PersonalInfoForm onComplete={() => handleFormComplete('personal')} onCancel={() => setActiveForm(null)} />;
      case 'perspective':
        return <AcademicInfoForm onComplete={() => handleFormComplete('perspective')} onCancel={() => setActiveForm(null)} />;
      default:
        return null;
    }
  };

  if (activeForm) {
    return renderActiveForm();
  }

  return (
    <Card className="w-full max-w-5xl mx-auto p-8 md:p-10 bg-white/95 backdrop-blur-sm shadow-2xl border-0 animate-in fade-in-50 duration-700 rounded-3xl">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-3">
          Chọn phần khảo sát
        </h2>
        <p className="text-gray-600 text-lg">Vui lòng hoàn thành cả 2 phần để nộp khảo sát</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {forms.map((form) => (
          <div
            key={form.id}
            className={`relative overflow-hidden p-7 rounded-2xl border-2 transition-all duration-500 hover:scale-[1.02] group ${
              completedSections[form.id] 
                ? 'border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg shadow-green-500/20' 
                : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-xl'
            }`}
          >
            {/* Decorative gradient */}
            {!completedSections[form.id] && (
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${form.color} opacity-5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
            )}

            {/* Completed badge */}
            {completedSections[form.id] && (
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-500">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}

            <div className="relative flex items-start gap-5">
              {/* Icon with enhanced effects */}
              <div className="relative flex-shrink-0">
                <div className={`absolute inset-0 bg-gradient-to-r ${form.color} rounded-xl blur-md opacity-40 group-hover:opacity-60 transition-opacity`}></div>
                <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${form.color} flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  {form.icon}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                  {form.title}
                </h3>
                <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                  {form.description}
                </p>
                
                <Button
                  onClick={() => setActiveForm(form.id)}
                  className={`w-full bg-gradient-to-r ${form.color} hover:opacity-90 text-white font-semibold py-5 shadow-lg hover:shadow-xl transition-all duration-300 ${
                    completedSections[form.id] ? 'opacity-75' : 'group-hover:scale-105'
                  }`}
                  disabled={completedSections[form.id]}
                >
                  <span className="flex items-center justify-center gap-2">
                    {completedSections[form.id] ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Đã hoàn thành
                      </>
                    ) : (
                      <>
                        Bắt đầu
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit button */}
      {Object.values(completedSections).every(Boolean) && (
        <div className="mt-10 text-center animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-6">
            <p className="text-lg font-semibold text-gray-800 mb-2">🎉 Chúc mừng!</p>
            <p className="text-gray-600">Bạn đã hoàn thành tất cả các phần. Hãy nộp khảo sát để hoàn tất.</p>
          </div>
          <Button
            size="lg"
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-12 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center gap-3">
              Nộp khảo sát hoàn chỉnh
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </Button>
        </div>
      )}
    </Card>
  );
}