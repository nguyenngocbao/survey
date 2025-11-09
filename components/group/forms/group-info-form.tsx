"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUpload } from "@/components/ui/image-upload";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface GroupInfoFormProps {
  onComplete: () => void;
  onCancel: () => void;
}

export function GroupInfoForm({ onComplete, onCancel }: GroupInfoFormProps) {
  const [formData, setFormData] = useState({
    groupName: '',
    groupCode: '',
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    memberCount: '',
    class: '',
    subject: '',
    groupAvatar: '',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const subjects = [
    'Lập trình Web',
    'Cơ sở dữ liệu',
    'Mạng máy tính',
    'Kỹ thuật phần mềm',
    'Trí tuệ nhân tạo',
    'Bảo mật thông tin',
    'Hệ điều hành',
    'Cấu trúc dữ liệu',
    'Toán rời rạc',
    'Khác',
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const requiredFields = ['groupName', 'groupCode', 'leaderName', 'leaderEmail', 'leaderPhone', 'memberCount', 'class', 'subject'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData].trim());
    
    if (missingFields.length > 0) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ tất cả thông tin",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.leaderEmail)) {
      toast({
        title: "Lỗi",
        description: "Email không hợp lệ",
        variant: "destructive",
      });
      return;
    }

    // Member count validation
    const memberCount = parseInt(formData.memberCount);
    if (isNaN(memberCount) || memberCount < 2 || memberCount > 10) {
      toast({
        title: "Lỗi",
        description: "Số thành viên phải từ 2 đến 10 người",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/group-surveys/group-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          memberCount: memberCount,
        }),
      });

      if (response.ok) {
        // Lưu groupCode để sử dụng cho các form khác
        localStorage.setItem('currentGroupCode', formData.groupCode);
        
        toast({
          title: "Thành công!",
          description: "Đã lưu thông tin nhóm",
        });
        onComplete();
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving group info:', error);
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
          <span className="text-2xl">👥</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Thông tin nhóm</h2>
        <p className="text-gray-600">Vui lòng điền thông tin cơ bản về nhóm học tập</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="groupName" className="font-semibold">
              Tên nhóm <span className="text-red-500">*</span>
            </Label>
            <Input
              id="groupName"
              type="text"
              placeholder="Nhóm Lập trình Web"
              value={formData.groupName}
              onChange={(e) => handleInputChange('groupName', e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="groupCode" className="font-semibold">
              Mã nhóm <span className="text-red-500">*</span>
            </Label>
            <Input
              id="groupCode"
              type="text"
              placeholder="GROUP001"
              value={formData.groupCode}
              onChange={(e) => handleInputChange('groupCode', e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="leaderName" className="font-semibold">
              Tên trưởng nhóm <span className="text-red-500">*</span>
            </Label>
            <Input
              id="leaderName"
              type="text"
              placeholder="Nguyễn Văn A"
              value={formData.leaderName}
              onChange={(e) => handleInputChange('leaderName', e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="leaderEmail" className="font-semibold">
              Email trưởng nhóm <span className="text-red-500">*</span>
            </Label>
            <Input
              id="leaderEmail"
              type="email"
              placeholder="leader@university.edu.vn"
              value={formData.leaderEmail}
              onChange={(e) => handleInputChange('leaderEmail', e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="leaderPhone" className="font-semibold">
              SĐT trưởng nhóm <span className="text-red-500">*</span>
            </Label>
            <Input
              id="leaderPhone"
              type="tel"
              placeholder="0123456789"
              value={formData.leaderPhone}
              onChange={(e) => handleInputChange('leaderPhone', e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="memberCount" className="font-semibold">
              Số thành viên <span className="text-red-500">*</span>
            </Label>
            <Input
              id="memberCount"
              type="number"
              min="2"
              max="10"
              placeholder="5"
              value={formData.memberCount}
              onChange={(e) => handleInputChange('memberCount', e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="class" className="font-semibold">
              Lớp <span className="text-red-500">*</span>
            </Label>
            <Input
              id="class"
              type="text"
              placeholder="CNTT01-K65"
              value={formData.class}
              onChange={(e) => handleInputChange('class', e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject" className="font-semibold">
            Môn học <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.subject}
            onValueChange={(value) => handleInputChange('subject', value)}
            disabled={loading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn môn học" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <ImageUpload
            label="Ảnh đại diện nhóm"
            value={formData.groupAvatar}
            onChange={(url) => handleInputChange('groupAvatar', url)}
            studentId={formData.groupCode || 'temp'}
            maxSize={3}
          />
          <p className="text-xs text-gray-500">
            Tải lên ảnh đại diện của nhóm (không bắt buộc)
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
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          >
            {loading ? "Đang lưu..." : "Lưu và tiếp tục"}
          </Button>
        </div>
      </form>
    </Card>
  );
}