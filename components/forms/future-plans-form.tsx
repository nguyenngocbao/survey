"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface FuturePlansFormProps {
  onComplete: () => void;
  onCancel: () => void;
}

export function FuturePlansForm({ onComplete, onCancel }: FuturePlansFormProps) {
  const [formData, setFormData] = useState({
    careerGoals: '',
    graduationPlan: '',
    furtherEducation: false,
    workExperience: false,
    skills: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const graduationPlans = [
    'Tốt nghiệp đúng hạn (4 năm)',
    'Tốt nghiệp sớm (3.5 năm)',
    'Tốt nghiệp muộn (4.5-5 năm)',
    'Chưa chắc chắn',
  ];

  const skillsList = [
    'Lập trình Web',
    'Lập trình Mobile',
    'Cơ sở dữ liệu',
    'Machine Learning/AI',
    'DevOps',
    'UI/UX Design',
    'Quản lý dự án',
    'Tiếng Anh',
    'Giao tiếp',
    'Làm việc nhóm',
    'Thuyết trình',
    'Tư duy logic',
  ];

  const handleSkillChange = (skill: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      skills: checked
        ? [...prev.skills, skill]
        : prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.careerGoals.trim() || !formData.graduationPlan) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/surveys/future-plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Thành công!",
          description: "Đã hoàn thành khảo sát! Cảm ơn bạn đã tham gia.",
        });
        onComplete();
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving future plans:', error);
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
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🚀</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Kế hoạch tương lai</h2>
        <p className="text-gray-600">Chia sẻ về mục tiêu và kế hoạch phát triển của bạn</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="careerGoals" className="font-semibold">
            Mục tiêu nghề nghiệp <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="careerGoals"
            placeholder="Ví dụ: Trở thành một Full-stack Developer tại công ty công nghệ lớn, phát triển các ứng dụng web hiện đại..."
            value={formData.careerGoals}
            onChange={(e) => setFormData(prev => ({ ...prev, careerGoals: e.target.value }))}
            disabled={loading}
            rows={4}
            className="resize-none"
          />
          <p className="text-xs text-gray-500">
            Mô tả chi tiết về công việc mơ ước, vị trí bạn muốn đạt được trong 3-5 năm tới
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="graduationPlan" className="font-semibold">
            Kế hoạch tốt nghiệp <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.graduationPlan}
            onValueChange={(value) => setFormData(prev => ({ ...prev, graduationPlan: value }))}
            disabled={loading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn kế hoạch tốt nghiệp của bạn" />
            </SelectTrigger>
            <SelectContent>
              {graduationPlans.map((plan) => (
                <SelectItem key={plan} value={plan}>
                  {plan}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label className="text-lg font-semibold text-gray-800">
            Kế hoạch sau tốt nghiệp
          </Label>
          <div className="space-y-4 bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="furtherEducation" className="font-medium">
                  Học lên cao học/thạc sĩ
                </Label>
                <p className="text-sm text-gray-600">
                  Bạn có dự định tiếp tục học lên bậc cao hơn không?
                </p>
              </div>
              <Switch
                id="furtherEducation"
                checked={formData.furtherEducation}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, furtherEducation: checked }))}
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="workExperience" className="font-medium">
                  Đi làm ngay sau tốt nghiệp
                </Label>
                <p className="text-sm text-gray-600">
                  Bạn có muốn tìm việc làm ngay sau khi tốt nghiệp không?
                </p>
              </div>
              <Switch
                id="workExperience"
                checked={formData.workExperience}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, workExperience: checked }))}
                disabled={loading}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-lg font-semibold text-gray-800">
            Kỹ năng muốn phát triển
          </Label>
          <p className="text-sm text-gray-600">
            Chọn những kỹ năng bạn muốn tập trung phát triển trong thời gian tới
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {skillsList.map((skill) => (
              <div key={skill} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-purple-50">
                <Checkbox
                  id={`skill-${skill}`}
                  checked={formData.skills.includes(skill)}
                  onCheckedChange={(checked) => handleSkillChange(skill, checked as boolean)}
                  disabled={loading}
                />
                <Label
                  htmlFor={`skill-${skill}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {skill}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🎯</span>
            <Label className="font-semibold text-gray-800">Lời nhắn cuối</Label>
          </div>
          <p className="text-sm text-gray-600">
            Cảm ơn bạn đã dành thời gian hoàn thành khảo sát này! Thông tin của bạn sẽ giúp chúng tôi 
            hiểu rõ hơn về nhu cầu và mong muốn của sinh viên để cải thiện chương trình đào tạo.
          </p>
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
            className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
          >
            {loading ? "Đang hoàn thành..." : "Hoàn thành khảo sát 🎉"}
          </Button>
        </div>
      </form>
    </Card>
  );
}