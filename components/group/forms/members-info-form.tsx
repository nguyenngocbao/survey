"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface Member {
  name: string;
  studentId: string;
  email: string;
  role: string;
  contribution: number;
  skills: string[];
}

interface TeamDynamics {
  communicationRating: number;
  collaborationRating: number;
  conflictResolution: string;
  meetingFrequency: string;
}

interface MembersInfoFormProps {
  onComplete: () => void;
  onCancel: () => void;
}

export function MembersInfoForm({ onComplete, onCancel }: MembersInfoFormProps) {
  const [members, setMembers] = useState<Member[]>([
    { name: '', studentId: '', email: '', role: 'member', contribution: 20, skills: [] },
    { name: '', studentId: '', email: '', role: 'member', contribution: 20, skills: [] },
    { name: '', studentId: '', email: '', role: 'member', contribution: 20, skills: [] },
    { name: '', studentId: '', email: '', role: 'member', contribution: 20, skills: [] },
    { name: '', studentId: '', email: '', role: 'member', contribution: 20, skills: [] }
  ]);
  
  const [teamDynamics, setTeamDynamics] = useState<TeamDynamics>({
    communicationRating: 3,
    collaborationRating: 3,
    conflictResolution: 'good',
    meetingFrequency: 'weekly'
  });
  
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const availableSkills = [
    'Lập trình', 'Thiết kế', 'Quản lý', 'Nghiên cứu',
    'Thuyết trình', 'Viết báo cáo', 'Teamwork', 'Leadership'
  ];

  const updateMember = (index: number, field: keyof Member, value: any) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setMembers(updatedMembers);
  };

  const toggleSkill = (memberIndex: number, skill: string) => {
    const member = members[memberIndex];
    const skills = member.skills.includes(skill)
      ? member.skills.filter(s => s !== skill)
      : [...member.skills, skill];
    updateMember(memberIndex, 'skills', skills);
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
            className={`text-2xl transition-colors ${
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
    
    // Validation - check if at least 2 members have info
    const validMembers = members.filter(m => m.name.trim() && m.studentId.trim());
    if (validMembers.length < 2) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền thông tin cho ít nhất 2 thành viên",
        variant: "destructive",
      });
      return;
    }

    // Check total contribution for valid members
    const totalContribution = validMembers.reduce((sum, m) => sum + m.contribution, 0);
    if (Math.abs(totalContribution - 100) > 5) {
      toast({
        title: "Lỗi", 
        description: `Tổng % đóng góp phải bằng 100% (hiện tại: ${totalContribution}%)`,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const groupCode = localStorage.getItem('currentGroupCode');
      if (!groupCode) {
        throw new Error('Không tìm thấy mã nhóm. Vui lòng hoàn thành thông tin nhóm trước.');
      }

      const response = await fetch('/api/group-surveys/members-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          groupCode,
          members: validMembers,
          teamDynamics,
        }),
      });

      if (response.ok) {
        toast({
          title: "Thành công!",
          description: "Đã lưu thông tin thành viên nhóm",
        });
        onComplete();
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving members info:', error);
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
        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🤝</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Thành viên nhóm</h2>
        <p className="text-gray-600">Quản lý thông tin và đánh giá hoạt động nhóm</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Member List */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold text-gray-800">
            Danh sách thành viên nhóm <span className="text-red-500">*</span>
          </Label>
          <p className="text-sm text-gray-600">Điền thông tin cho ít nhất 2 thành viên. Tổng % đóng góp phải bằng 100%.</p>
          
          <div className="space-y-4">
            {members.map((member, index) => (
              <div key={index} className="bg-emerald-50 p-4 rounded-lg border">
                <h4 className="font-medium text-gray-800 mb-3">Thành viên {index + 1}</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Họ tên</Label>
                    <Input
                      type="text"
                      placeholder="Nguyễn Văn A"
                      value={member.name}
                      onChange={(e) => updateMember(index, 'name', e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-600">MSSV</Label>
                    <Input
                      type="text"
                      placeholder="2021001234"
                      value={member.studentId}
                      onChange={(e) => updateMember(index, 'studentId', e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Vai trò</Label>
                    <Select
                      value={member.role}
                      onValueChange={(value) => updateMember(index, 'role', value)}
                      disabled={loading}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="leader">Trưởng nhóm</SelectItem>
                        <SelectItem value="member">Thành viên</SelectItem>
                        <SelectItem value="secretary">Thư ký</SelectItem>
                        <SelectItem value="treasurer">Thủ quỹ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-600">% Đóng góp</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="20"
                      value={member.contribution}
                      onChange={(e) => updateMember(index, 'contribution', parseInt(e.target.value) || 0)}
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Skills for this member */}
                <div>
                  <Label className="text-sm font-medium text-gray-600 mb-2 block">Kỹ năng</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {availableSkills.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={`skill-${index}-${skill}`}
                          checked={member.skills.includes(skill)}
                          onCheckedChange={() => toggleSkill(index, skill)}
                          disabled={loading}
                        />
                        <Label 
                          htmlFor={`skill-${index}-${skill}`}
                          className="text-sm cursor-pointer"
                        >
                          {skill}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Dynamics */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold text-gray-800">Đánh giá hoạt động nhóm</Label>
          
          <div className="bg-emerald-50 p-6 rounded-lg space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StarRating
                label="Giao tiếp trong nhóm (1-5 sao)"
                value={teamDynamics.communicationRating}
                onChange={(value) => setTeamDynamics(prev => ({ ...prev, communicationRating: value }))}
              />

              <StarRating
                label="Hợp tác làm việc (1-5 sao)"
                value={teamDynamics.collaborationRating}
                onChange={(value) => setTeamDynamics(prev => ({ ...prev, collaborationRating: value }))}
              />

              <div>
                <Label className="text-sm font-medium text-gray-600 mb-2 block">
                  Giải quyết xung đột
                </Label>
                <Select
                  value={teamDynamics.conflictResolution}
                  onValueChange={(value) => setTeamDynamics(prev => ({ ...prev, conflictResolution: value }))}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Xuất sắc</SelectItem>
                    <SelectItem value="good">Tốt</SelectItem>
                    <SelectItem value="fair">Khá</SelectItem>
                    <SelectItem value="poor">Cần cải thiện</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600 mb-2 block">
                  Tần suất họp nhóm
                </Label>
                <Select
                  value={teamDynamics.meetingFrequency}
                  onValueChange={(value) => setTeamDynamics(prev => ({ ...prev, meetingFrequency: value }))}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Hàng ngày</SelectItem>
                    <SelectItem value="weekly">Hàng tuần</SelectItem>
                    <SelectItem value="biweekly">2 tuần/lần</SelectItem>
                    <SelectItem value="monthly">Hàng tháng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
            className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
          >
            {loading ? "Đang lưu..." : "Lưu và tiếp tục"}
          </Button>
        </div>
      </form>
    </Card>
  );
}