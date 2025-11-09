"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { MultiImageUpload } from "@/components/ui/multi-image-upload";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import React from "react";

interface InterestsFormProps {
  onComplete: () => void;
  onCancel: () => void;
}



export function InterestsForm({ onComplete, onCancel }: InterestsFormProps) {
  // Lấy studentId từ localStorage hoặc API
  React.useEffect(() => {
    // Giả sử chúng ta lưu studentId trong localStorage khi hoàn thành form đầu tiên
    const savedStudentId = localStorage.getItem('currentStudentId') || 'temp';
    setStudentId(savedStudentId);
  }, []);
  const [formData, setFormData] = useState({
    hobbies: [] as string[],
    sports: [] as string[],
    clubs: [] as string[],
    volunteerWork: false,
    leadership: false,
    photos: [] as string[],
  });
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const hobbiesList = [
    'Đọc sách',
    'Nghe nhạc',
    'Xem phim',
    'Chơi game',
    'Vẽ/Thiết kế',
    'Chụp ảnh',
    'Du lịch',
    'Nấu ăn',
    'Làm vườn',
    'Học ngoại ngữ',
    'Lập trình',
    'Viết blog',
  ];

  const sportsList = [
    'Bóng đá',
    'Bóng rổ',
    'Cầu lông',
    'Bóng bàn',
    'Bơi lội',
    'Chạy bộ',
    'Gym/Fitness',
    'Yoga',
    'Võ thuật',
    'Cầu lông',
    'Tennis',
    'Đạp xe',
  ];

  const clubsList = [
    'CLB Lập trình',
    'CLB Tiếng Anh',
    'CLB Nhiếp ảnh',
    'CLB Âm nhạc',
    'CLB Thể thao',
    'CLB Tình nguyện',
    'CLB Khởi nghiệp',
    'CLB Học thuật',
    'CLB Văn hóa',
    'CLB Nghệ thuật',
    'CLB Du lịch',
    'CLB Công nghệ',
  ];

  const handleArrayChange = (field: 'hobbies' | 'sports' | 'clubs', item: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked
        ? [...prev[field], item]
        : prev[field].filter(i => i !== item)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation - ít nhất phải chọn 1 sở thích
    if (formData.hobbies.length === 0) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn ít nhất một sở thích",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/surveys/interests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Thành công!",
          description: "Đã lưu thông tin sở thích và hoạt động",
        });
        onComplete();
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving interests:', error);
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
    <Card className="w-full max-w-4xl mx-auto p-6 bg-white/90 backdrop-blur-sm">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🎯</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Sở thích & Hoạt động</h2>
        <p className="text-gray-600">Chia sẻ về sở thích và các hoạt động bạn tham gia</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Hobbies */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold text-gray-800">
            Sở thích cá nhân <span className="text-red-500">*</span>
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {hobbiesList.map((hobby) => (
              <div key={hobby} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-orange-50">
                <Checkbox
                  id={`hobby-${hobby}`}
                  checked={formData.hobbies.includes(hobby)}
                  onCheckedChange={(checked) => handleArrayChange('hobbies', hobby, checked as boolean)}
                  disabled={loading}
                />
                <Label
                  htmlFor={`hobby-${hobby}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {hobby}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Sports */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold text-gray-800">
            Thể thao yêu thích
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {sportsList.map((sport) => (
              <div key={sport} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-orange-50">
                <Checkbox
                  id={`sport-${sport}`}
                  checked={formData.sports.includes(sport)}
                  onCheckedChange={(checked) => handleArrayChange('sports', sport, checked as boolean)}
                  disabled={loading}
                />
                <Label
                  htmlFor={`sport-${sport}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {sport}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Clubs */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold text-gray-800">
            Câu lạc bộ tham gia
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {clubsList.map((club) => (
              <div key={club} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-orange-50">
                <Checkbox
                  id={`club-${club}`}
                  checked={formData.clubs.includes(club)}
                  onCheckedChange={(checked) => handleArrayChange('clubs', club, checked as boolean)}
                  disabled={loading}
                />
                <Label
                  htmlFor={`club-${club}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {club}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Activities */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold text-gray-800">
            Hoạt động khác
          </Label>
          <div className="space-y-4 bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="volunteerWork" className="font-medium">
                  Tham gia hoạt động tình nguyện
                </Label>
                <p className="text-sm text-gray-600">
                  Bạn có thường xuyên tham gia các hoạt động tình nguyện không?
                </p>
              </div>
              <Switch
                id="volunteerWork"
                checked={formData.volunteerWork}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, volunteerWork: checked }))}
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="leadership" className="font-medium">
                  Có kinh nghiệm lãnh đạo
                </Label>
                <p className="text-sm text-gray-600">
                  Bạn đã từng đảm nhận vai trò lãnh đạo trong nhóm/tổ chức nào chưa?
                </p>
              </div>
              <Switch
                id="leadership"
                checked={formData.leadership}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, leadership: checked }))}
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* Photos section */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold text-gray-800">
            Ảnh hoạt động
          </Label>
          <p className="text-sm text-gray-600">
            Chia sẻ những hình ảnh về các hoạt động, sở thích của bạn (tối đa 5 ảnh)
          </p>
          <MultiImageUpload
            label="Ảnh hoạt động"
            value={formData.photos}
            onChange={(photos) => setFormData(prev => ({ ...prev, photos }))}
            studentId={studentId}
            maxImages={5}
            maxSize={3}
          />
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
            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
          >
            {loading ? "Đang lưu..." : "Lưu và tiếp tục"}
          </Button>
        </div>
      </form>
    </Card>
  );
}