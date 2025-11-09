"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface AcademicInfoFormProps {
  onComplete: () => void;
  onCancel: () => void;
}

export function AcademicInfoForm({ onComplete, onCancel }: AcademicInfoFormProps) {
  const [formData, setFormData] = useState({
    gpa: '',
    favoriteSubjects: [] as string[],
    studyHours: '',
    learningStyle: '',
    difficulties: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const subjects = [
    'Toán học',
    'Lập trình',
    'Cơ sở dữ liệu',
    'Mạng máy tính',
    'Hệ điều hành',
    'Kỹ thuật phần mềm',
    'Trí tuệ nhân tạo',
    'Bảo mật thông tin',
    'Thiết kế web',
    'Mobile App',
  ];

  const learningStyles = [
    { value: 'visual', label: 'Học qua hình ảnh (Visual)' },
    { value: 'auditory', label: 'Học qua nghe (Auditory)' },
    { value: 'kinesthetic', label: 'Học qua thực hành (Kinesthetic)' },
    { value: 'reading', label: 'Học qua đọc viết (Reading/Writing)' },
  ];

  const commonDifficulties = [
    'Quản lý thời gian',
    'Tập trung học tập',
    'Hiểu bài giảng',
    'Làm bài tập nhóm',
    'Thuyết trình',
    'Lập trình',
    'Toán học',
    'Tiếng Anh',
  ];

  const handleSubjectChange = (subject: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      favoriteSubjects: checked
        ? [...prev.favoriteSubjects, subject]
        : prev.favoriteSubjects.filter(s => s !== subject)
    }));
  };

  const handleDifficultyChange = (difficulty: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      difficulties: checked
        ? [...prev.difficulties, difficulty]
        : prev.difficulties.filter(d => d !== difficulty)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.gpa || !formData.studyHours || !formData.learningStyle) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive",
      });
      return;
    }

    const gpa = parseFloat(formData.gpa);
    if (isNaN(gpa) || gpa < 0 || gpa > 4) {
      toast({
        title: "Lỗi",
        description: "GPA phải là số từ 0.0 đến 4.0",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/surveys/academic-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          gpa: gpa,
          studyHours: parseInt(formData.studyHours),
        }),
      });

      if (response.ok) {
        toast({
          title: "Thành công!",
          description: "Đã lưu thông tin học tập",
        });
        onComplete();
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving academic info:', error);
      toast({
        title: "Lỗi",
        description: "Không thể lưu thông tin. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto p-6 bg-white/90 backdrop-blur-sm">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📚</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Thông tin học tập</h2>
        <p className="text-gray-600">Chia sẻ về quá trình học tập và phong cách học của bạn</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="gpa" className="font-semibold">
              GPA hiện tại <span className="text-red-500">*</span>
            </Label>
            <Input
              id="gpa"
              type="number"
              step="0.01"
              min="0"
              max="4"
              placeholder="3.50"
              value={formData.gpa}
              onChange={(e) => setFormData(prev => ({ ...prev, gpa: e.target.value }))}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="studyHours" className="font-semibold">
              Số giờ học/ngày <span className="text-red-500">*</span>
            </Label>
            <Input
              id="studyHours"
              type="number"
              min="0"
              max="24"
              placeholder="6"
              value={formData.studyHours}
              onChange={(e) => setFormData(prev => ({ ...prev, studyHours: e.target.value }))}
              disabled={loading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="font-semibold">
            Phong cách học tập <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.learningStyle}
            onValueChange={(value) => setFormData(prev => ({ ...prev, learningStyle: value }))}
            disabled={loading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn phong cách học phù hợp với bạn" />
            </SelectTrigger>
            <SelectContent>
              {learningStyles.map((style) => (
                <SelectItem key={style.value} value={style.value}>
                  {style.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="font-semibold">Môn học yêu thích (chọn nhiều)</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {subjects.map((subject) => (
              <div key={subject} className="flex items-center space-x-2">
                <Checkbox
                  id={`subject-${subject}`}
                  checked={formData.favoriteSubjects.includes(subject)}
                  onCheckedChange={(checked) => handleSubjectChange(subject, checked as boolean)}
                  disabled={loading}
                />
                <Label
                  htmlFor={`subject-${subject}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {subject}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="font-semibold">Khó khăn trong học tập (chọn nhiều)</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {commonDifficulties.map((difficulty) => (
              <div key={difficulty} className="flex items-center space-x-2">
                <Checkbox
                  id={`difficulty-${difficulty}`}
                  checked={formData.difficulties.includes(difficulty)}
                  onCheckedChange={(checked) => handleDifficultyChange(difficulty, checked as boolean)}
                  disabled={loading}
                />
                <Label
                  htmlFor={`difficulty-${difficulty}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {difficulty}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
            className="flex-1"
          >
            Hủy
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          >
            {loading ? "Đang lưu..." : "Lưu và tiếp tục"}
          </Button>
        </div>
      </form>
    </Card>
  );
}