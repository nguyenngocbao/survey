"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface MemberEvaluation {
  memberName: string;
  ratings: {
    participation: number;
    reliability: number;
    creativity: number;
    leadership: number;
  };
  feedback: string;
}

interface EvaluationFeedbackFormProps {
  onComplete: () => void;
  onCancel: () => void;
}

export function EvaluationFeedbackForm({ onComplete, onCancel }: EvaluationFeedbackFormProps) {
  const [groupPerformance, setGroupPerformance] = useState({
    overallRating: 3,
    strengths: [] as string[],
    weaknesses: [] as string[],
    improvementAreas: [] as string[]
  });

  const [memberEvaluations, setMemberEvaluations] = useState<MemberEvaluation[]>([
    {
      memberName: '',
      ratings: { participation: 3, reliability: 3, creativity: 3, leadership: 3 },
      feedback: ''
    }
  ]);

  const [futurePlans, setFuturePlans] = useState({
    continueWorking: false,
    nextProject: '',
    skillsToImprove: [] as string[],
    recommendChanges: ''
  });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const strengthOptions = [
    'Giao tiếp tốt', 'Phân công rõ ràng', 'Hỗ trợ lẫn nhau', 'Sáng tạo',
    'Kỹ thuật tốt', 'Quản lý thời gian', 'Giải quyết vấn đề', 'Teamwork'
  ];

  const weaknessOptions = [
    'Giao tiếp kém', 'Phân công không rõ', 'Thiếu hỗ trợ', 'Ít sáng tạo',
    'Kỹ thuật yếu', 'Quản lý thời gian kém', 'Khó giải quyết vấn đề', 'Làm việc cá nhân'
  ];

  const improvementOptions = [
    'Kỹ năng kỹ thuật', 'Giao tiếp', 'Quản lý thời gian', 'Leadership',
    'Teamwork', 'Giải quyết vấn đề', 'Sáng tạo', 'Thuyết trình'
  ];

  const skillsToImproveOptions = [
    'Lập trình', 'Thiết kế', 'Quản lý dự án', 'Giao tiếp',
    'Thuyết trình', 'Viết báo cáo', 'Teamwork', 'Leadership'
  ];

  const addMemberEvaluation = () => {
    setMemberEvaluations([...memberEvaluations, {
      memberName: '',
      ratings: { participation: 3, reliability: 3, creativity: 3, leadership: 3 },
      feedback: ''
    }]);
  };

  const updateMemberEvaluation = (index: number, field: string, value: any) => {
    const updated = [...memberEvaluations];
    if (field.startsWith('ratings.')) {
      const ratingField = field.split('.')[1];
      updated[index].ratings = { ...updated[index].ratings, [ratingField]: value };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setMemberEvaluations(updated);
  };

  const removeMemberEvaluation = (index: number) => {
    if (memberEvaluations.length > 1) {
      setMemberEvaluations(memberEvaluations.filter((_, i) => i !== index));
    }
  };

  const toggleArrayItem = (array: string[], item: string, setter: (arr: string[]) => void) => {
    if (array.includes(item)) {
      setter(array.filter(i => i !== item));
    } else {
      setter([...array, item]);
    }
  };

  const StarRating = ({ value, onChange, label }: { value: number; onChange: (value: number) => void; label: string }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-600">{label}</Label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`text-xl transition-colors ${
              star <= value ? 'text-yellow-400' : 'text-gray-300'
            } hover:text-yellow-400`}
          >
            ⭐
          </button>
        ))}
      </div>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const validMemberEvaluations = memberEvaluations.filter(m => m.memberName.trim());
    
    setLoading(true);
    try {
      const groupCode = localStorage.getItem('currentGroupCode');
      if (!groupCode) {
        throw new Error('Không tìm thấy mã nhóm. Vui lòng hoàn thành thông tin nhóm trước.');
      }

      const response = await fetch('/api/group-surveys/evaluation-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          groupCode,
          groupPerformance,
          memberEvaluations: validMemberEvaluations,
          futurePlans,
        }),
      });

      if (response.ok) {
        toast({
          title: "🎉 Hoàn thành!",
          description: "Đã hoàn thành khảo sát nhóm! Cảm ơn bạn đã tham gia.",
        });
        onComplete();
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving evaluation feedback:', error);
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
    <Card className="w-full max-w-5xl mx-auto p-6 bg-white/90 backdrop-blur-sm">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⭐</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Đánh giá & Phản hồi</h2>
        <p className="text-gray-600">Đánh giá hiệu quả làm việc nhóm và lên kế hoạch tương lai</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Group Performance */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold text-gray-800">Đánh giá hiệu quả nhóm</Label>
          
          <div className="bg-cyan-50 p-6 rounded-lg space-y-6">
            <StarRating
              label="Đánh giá tổng thể về nhóm (1-5 sao)"
              value={groupPerformance.overallRating}
              onChange={(value) => setGroupPerformance(prev => ({ ...prev, overallRating: value }))}
            />

            <div>
              <Label className="text-sm font-medium text-gray-600 mb-3 block">Điểm mạnh của nhóm</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {strengthOptions.map((strength) => (
                  <div key={strength} className="flex items-center space-x-2">
                    <Checkbox
                      id={`strength-${strength}`}
                      checked={groupPerformance.strengths.includes(strength)}
                      onCheckedChange={() => toggleArrayItem(
                        groupPerformance.strengths, 
                        strength, 
                        (arr) => setGroupPerformance(prev => ({ ...prev, strengths: arr }))
                      )}
                      disabled={loading}
                    />
                    <Label htmlFor={`strength-${strength}`} className="text-sm cursor-pointer">
                      {strength}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-600 mb-3 block">Điểm cần cải thiện</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {weaknessOptions.map((weakness) => (
                  <div key={weakness} className="flex items-center space-x-2">
                    <Checkbox
                      id={`weakness-${weakness}`}
                      checked={groupPerformance.weaknesses.includes(weakness)}
                      onCheckedChange={() => toggleArrayItem(
                        groupPerformance.weaknesses, 
                        weakness, 
                        (arr) => setGroupPerformance(prev => ({ ...prev, weaknesses: arr }))
                      )}
                      disabled={loading}
                    />
                    <Label htmlFor={`weakness-${weakness}`} className="text-sm cursor-pointer">
                      {weakness}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-600 mb-3 block">Lĩnh vực cần cải thiện</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {improvementOptions.map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <Checkbox
                      id={`improvement-${area}`}
                      checked={groupPerformance.improvementAreas.includes(area)}
                      onCheckedChange={() => toggleArrayItem(
                        groupPerformance.improvementAreas, 
                        area, 
                        (arr) => setGroupPerformance(prev => ({ ...prev, improvementAreas: arr }))
                      )}
                      disabled={loading}
                    />
                    <Label htmlFor={`improvement-${area}`} className="text-sm cursor-pointer">
                      {area}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Member Evaluations */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-lg font-semibold text-gray-800">Đánh giá từng thành viên</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addMemberEvaluation}
              disabled={loading}
            >
              + Thêm thành viên
            </Button>
          </div>
          
          <div className="space-y-4">
            {memberEvaluations.map((member, index) => (
              <div key={index} className="bg-cyan-50 p-6 rounded-lg border">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-800">Đánh giá thành viên {index + 1}</h4>
                  {memberEvaluations.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMemberEvaluation(index)}
                      disabled={loading}
                    >
                      ✕
                    </Button>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Tên thành viên</Label>
                    <Input
                      type="text"
                      placeholder="Nguyễn Văn B"
                      value={member.memberName}
                      onChange={(e) => updateMemberEvaluation(index, 'memberName', e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <StarRating
                      label="Tham gia hoạt động (1-5 sao)"
                      value={member.ratings.participation}
                      onChange={(value) => updateMemberEvaluation(index, 'ratings.participation', value)}
                    />
                    
                    <StarRating
                      label="Độ tin cậy (1-5 sao)"
                      value={member.ratings.reliability}
                      onChange={(value) => updateMemberEvaluation(index, 'ratings.reliability', value)}
                    />
                    
                    <StarRating
                      label="Tính sáng tạo (1-5 sao)"
                      value={member.ratings.creativity}
                      onChange={(value) => updateMemberEvaluation(index, 'ratings.creativity', value)}
                    />
                    
                    <StarRating
                      label="Khả năng lãnh đạo (1-5 sao)"
                      value={member.ratings.leadership}
                      onChange={(value) => updateMemberEvaluation(index, 'ratings.leadership', value)}
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-600">Nhận xét chi tiết</Label>
                    <Textarea
                      placeholder="Nhận xét về thành viên này..."
                      value={member.feedback}
                      onChange={(e) => updateMemberEvaluation(index, 'feedback', e.target.value)}
                      disabled={loading}
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Plans */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold text-gray-800">Kế hoạch tương lai</Label>
          
          <div className="bg-cyan-50 p-6 rounded-lg space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="continueWorking"
                checked={futurePlans.continueWorking}
                onCheckedChange={(checked) => setFuturePlans(prev => ({ ...prev, continueWorking: !!checked }))}
                disabled={loading}
              />
              <Label htmlFor="continueWorking" className="cursor-pointer">
                Nhóm sẽ tiếp tục làm việc cùng nhau trong tương lai
              </Label>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-600">Dự án tiếp theo</Label>
              <Input
                type="text"
                placeholder="Mobile App, Website thương mại điện tử..."
                value={futurePlans.nextProject}
                onChange={(e) => setFuturePlans(prev => ({ ...prev, nextProject: e.target.value }))}
                disabled={loading}
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-600 mb-3 block">Kỹ năng cần cải thiện</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {skillsToImproveOptions.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={`skill-improve-${skill}`}
                      checked={futurePlans.skillsToImprove.includes(skill)}
                      onCheckedChange={() => toggleArrayItem(
                        futurePlans.skillsToImprove, 
                        skill, 
                        (arr) => setFuturePlans(prev => ({ ...prev, skillsToImprove: arr }))
                      )}
                      disabled={loading}
                    />
                    <Label htmlFor={`skill-improve-${skill}`} className="text-sm cursor-pointer">
                      {skill}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-600">Đề xuất thay đổi quy trình làm việc</Label>
              <Textarea
                placeholder="Đề xuất cải thiện quy trình, phương pháp làm việc nhóm..."
                value={futurePlans.recommendChanges}
                onChange={(e) => setFuturePlans(prev => ({ ...prev, recommendChanges: e.target.value }))}
                disabled={loading}
                rows={3}
              />
            </div>
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
            className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700"
          >
            {loading ? "Đang lưu..." : "🎉 Hoàn thành khảo sát nhóm"}
          </Button>
        </div>
      </form>
    </Card>
  );
}