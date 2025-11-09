"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface SurveyDetailProps {
  surveyId: string;
  onClose: () => void;
}

interface DetailedSurvey {
  _id: string;
  personalInfo: {
    fullName: string;
    studentId: string;
    email: string;
    phone: string;
    class: string;
    major: string;
    avatar?: string;
  };
  academicInfo?: {
    gpa: number;
    favoriteSubjects: string[];
    studyHours: number;
    learningStyle: string;
    difficulties: string[];
  };
  interests?: {
    hobbies: string[];
    sports: string[];
    clubs: string[];
    volunteerWork: boolean;
    leadership: boolean;
    photos: string[];
  };
  futurePlans?: {
    careerGoals: string;
    graduationPlan: string;
    furtherEducation: boolean;
    workExperience: boolean;
    skills: string[];
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
  submittedAt?: string;
}

export function SurveyDetail({ surveyId, onClose }: SurveyDetailProps) {
  const [survey, setSurvey] = useState<DetailedSurvey | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSurveyDetail();
  }, [surveyId]);

  const fetchSurveyDetail = async () => {
    try {
      const response = await fetch(`/api/admin/surveys/${surveyId}`);
      const data = await response.json();

      if (data.success) {
        setSurvey(data.survey);
      } else {
        setError(data.error || 'Failed to fetch survey details');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getCompletionPercentage = () => {
    if (!survey) return 0;
    const completed = Object.values(survey.completedSections).filter(Boolean).length;
    return Math.round((completed / 4) * 100);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="w-full max-w-2xl mx-4 p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Đang tải chi tiết khảo sát...</p>
        </Card>
      </div>
    );
  }

  if (error || !survey) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="w-full max-w-2xl mx-4 p-8 text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h3 className="text-lg font-semibold mb-2">Lỗi tải dữ liệu</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={onClose}>Đóng</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {survey.personalInfo.avatar && (
              <img
                src={survey.personalInfo.avatar}
                alt="Avatar"
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {survey.personalInfo.fullName}
              </h2>
              <p className="text-gray-600">MSSV: {survey.personalInfo.studentId}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={survey.isCompleted ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}>
                  {survey.isCompleted ? "Hoàn thành" : `${getCompletionPercentage()}% hoàn thành`}
                </Badge>
              </div>
            </div>
          </div>
          <Button variant="outline" onClick={onClose}>
            ✕ Đóng
          </Button>
        </div>

        <div className="p-6 space-y-8">
          {/* Personal Info */}
          <section>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              👤 Thông tin cá nhân
              {survey.completedSections.personal && <Badge className="bg-green-100 text-green-800">✓</Badge>}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50 p-4 rounded-lg">
              <div>
                <label className="text-sm font-medium text-gray-600">Họ và tên</label>
                <p className="text-gray-800">{survey.personalInfo.fullName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">MSSV</label>
                <p className="text-gray-800">{survey.personalInfo.studentId}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="text-gray-800">{survey.personalInfo.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Số điện thoại</label>
                <p className="text-gray-800">{survey.personalInfo.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Lớp</label>
                <p className="text-gray-800">{survey.personalInfo.class}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Ngành học</label>
                <p className="text-gray-800">{survey.personalInfo.major}</p>
              </div>
            </div>
          </section>

          {/* Academic Info */}
          {survey.academicInfo && (
            <section>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                📚 Thông tin học tập
                {survey.completedSections.academic && <Badge className="bg-green-100 text-green-800">✓</Badge>}
              </h3>
              <div className="bg-green-50 p-4 rounded-lg space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">GPA</label>
                    <p className="text-2xl font-bold text-green-600">{survey.academicInfo.gpa}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Giờ học/ngày</label>
                    <p className="text-2xl font-bold text-blue-600">{survey.academicInfo.studyHours}h</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Phong cách học</label>
                    <p className="text-gray-800 capitalize">{survey.academicInfo.learningStyle}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Môn học yêu thích</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {survey.academicInfo.favoriteSubjects.map((subject, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-800">{subject}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Khó khăn trong học tập</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {survey.academicInfo.difficulties.map((difficulty, index) => (
                      <Badge key={index} className="bg-red-100 text-red-800">{difficulty}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Interests */}
          {survey.interests && (
            <section>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                🎯 Sở thích & Hoạt động
                {survey.completedSections.interests && <Badge className="bg-green-100 text-green-800">✓</Badge>}
              </h3>
              <div className="bg-orange-50 p-4 rounded-lg space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Sở thích</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {survey.interests.hobbies.map((hobby, index) => (
                      <Badge key={index} className="bg-purple-100 text-purple-800">{hobby}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Thể thao</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {survey.interests.sports.map((sport, index) => (
                      <Badge key={index} className="bg-green-100 text-green-800">{sport}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Câu lạc bộ</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {survey.interests.clubs.map((club, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-800">{club}</Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">Tình nguyện:</span>
                    <Badge className={survey.interests.volunteerWork ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                      {survey.interests.volunteerWork ? "Có" : "Không"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">Lãnh đạo:</span>
                    <Badge className={survey.interests.leadership ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                      {survey.interests.leadership ? "Có" : "Không"}
                    </Badge>
                  </div>
                </div>

                {/* Photos */}
                {survey.interests.photos && survey.interests.photos.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Ảnh hoạt động</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                      {survey.interests.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Hoạt động ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border cursor-pointer hover:opacity-80"
                          onClick={() => window.open(photo, '_blank')}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Future Plans */}
          {survey.futurePlans && (
            <section>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                🚀 Kế hoạch tương lai
                {survey.completedSections.future && <Badge className="bg-green-100 text-green-800">✓</Badge>}
              </h3>
              <div className="bg-purple-50 p-4 rounded-lg space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Mục tiêu nghề nghiệp</label>
                  <p className="text-gray-800 mt-1 p-3 bg-white rounded border">{survey.futurePlans.careerGoals}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Kế hoạch tốt nghiệp</label>
                  <p className="text-gray-800">{survey.futurePlans.graduationPlan}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">Học cao học:</span>
                    <Badge className={survey.futurePlans.furtherEducation ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                      {survey.futurePlans.furtherEducation ? "Có" : "Không"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">Đi làm ngay:</span>
                    <Badge className={survey.futurePlans.workExperience ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                      {survey.futurePlans.workExperience ? "Có" : "Không"}
                    </Badge>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Kỹ năng muốn phát triển</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {survey.futurePlans.skills.map((skill, index) => (
                      <Badge key={index} className="bg-indigo-100 text-indigo-800">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Timeline */}
          <section>
            <h3 className="text-xl font-semibold mb-4">📅 Timeline</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Tạo khảo sát:</span>
                <span className="text-gray-800">{formatDate(survey.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-600">Cập nhật cuối:</span>
                <span className="text-gray-800">{formatDate(survey.updatedAt)}</span>
              </div>
              {survey.submittedAt && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Hoàn thành:</span>
                  <span className="text-green-600 font-medium">{formatDate(survey.submittedAt)}</span>
                </div>
              )}
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
}