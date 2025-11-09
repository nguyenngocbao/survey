"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUpload } from "@/components/ui/image-upload";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface PersonalInfoFormProps {
  onComplete: () => void;
  onCancel: () => void;
}

export function PersonalInfoForm({ onComplete, onCancel }: PersonalInfoFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    email: '',
    phone: '',
    class: '',
    major: '',
    avatar: '',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const majors = [
    'Công nghệ thông tin',
    'Kỹ thuật phần mềm',
    'Khoa học máy tính',
    'Hệ thống thông tin',
    'An toàn thông tin',
    'Trí tuệ nhân tạo',
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
    const requiredFields = ['fullName', 'studentId', 'email', 'phone', 'class', 'major'];
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
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Lỗi",
        description: "Email không hợp lệ",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/surveys/personal-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Lưu studentId để sử dụng cho các form khác
        localStorage.setItem('currentStudentId', formData.studentId);
        
        toast({
          title: "Thành công!",
          description: "Đã lưu thông tin cá nhân",
        });
        onComplete();
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving personal info:', error);
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
    <Card className="w-full max-w-2xl mx-auto p-6 bg-white/90 backdrop-blur-sm">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">👤</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Thông tin cá nhân</h2>
        <p className="text-gray-600">Vui lòng điền đầy đủ thông tin cá nhân của bạn</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="font-semibold">
              Họ và tên <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Nguyễn Văn A"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="studentId" className="font-semibold">
              Mã số sinh viên <span className="text-red-500">*</span>
            </Label>
            <Input
              id="studentId"
              type="text"
              placeholder="2021001234"
              value={formData.studentId}
              onChange={(e) => handleInputChange('studentId', e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-semibold">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="student@university.edu.vn"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="font-semibold">
              Số điện thoại <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="0123456789"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <div className="space-y-2">
            <Label htmlFor="major" className="font-semibold">
              Ngành học <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.major}
              onValueChange={(value) => handleInputChange('major', value)}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn ngành học" />
              </SelectTrigger>
              <SelectContent>
                {majors.map((major) => (
                  <SelectItem key={major} value={major}>
                    {major}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <ImageUpload
            label="Ảnh đại diện"
            value={formData.avatar}
            onChange={(url) => handleInputChange('avatar', url)}
            studentId={formData.studentId || 'temp'}
            maxSize={2}
          />
          <p className="text-xs text-gray-500">
            Tải lên ảnh đại diện của bạn (không bắt buộc)
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
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            {loading ? "Đang lưu..." : "Lưu và tiếp tục"}
          </Button>
        </div>
      </form>
    </Card>
  );
}