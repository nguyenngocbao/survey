"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiImageUpload } from "@/components/ui/multi-image-upload";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface Activity {
  name: string;
  type: string;
  date: string;
  duration: number;
  participants: string[];
}

interface ProjectActivitiesFormProps {
  onComplete: () => void;
  onCancel: () => void;
}

export function ProjectActivitiesForm({ onComplete, onCancel }: ProjectActivitiesFormProps) {
  const [currentProject, setCurrentProject] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'planning',
    progress: 0
  });

  const [activities, setActivities] = useState<Activity[]>([
    { name: '', type: 'meeting', date: '', duration: 60, participants: [] }
  ]);

  const [achievements, setAchievements] = useState<string[]>(['']);
  const [challenges, setChallenges] = useState<string[]>(['']);
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const activityTypes = [
    { value: 'meeting', label: 'Họp nhóm' },
    { value: 'research', label: 'Nghiên cứu' },
    { value: 'development', label: 'Phát triển' },
    { value: 'presentation', label: 'Thuyết trình' },
    { value: 'other', label: 'Khác' }
  ];

  const projectStatuses = [
    { value: 'planning', label: 'Lên kế hoạch' },
    { value: 'in-progress', label: 'Đang thực hiện' },
    { value: 'completed', label: 'Hoàn thành' },
    { value: 'on-hold', label: 'Tạm dừng' }
  ];

  const addActivity = () => {
    setActivities([...activities, { name: '', type: 'meeting', date: '', duration: 60, participants: [] }]);
  };

  const updateActivity = (index: number, field: keyof Activity, value: any) => {
    const updatedActivities = [...activities];
    updatedActivities[index] = { ...updatedActivities[index], [field]: value };
    setActivities(updatedActivities);
  };

  const removeActivity = (index: number) => {
    if (activities.length > 1) {
      setActivities(activities.filter((_, i) => i !== index));
    }
  };

  const addAchievement = () => {
    setAchievements([...achievements, '']);
  };

  const updateAchievement = (index: number, value: string) => {
    const updated = [...achievements];
    updated[index] = value;
    setAchievements(updated);
  };

  const removeAchievement = (index: number) => {
    if (achievements.length > 1) {
      setAchievements(achievements.filter((_, i) => i !== index));
    }
  };

  const addChallenge = () => {
    setChallenges([...challenges, '']);
  };

  const updateChallenge = (index: number, value: string) => {
    const updated = [...challenges];
    updated[index] = value;
    setChallenges(updated);
  };

  const removeChallenge = (index: number) => {
    if (challenges.length > 1) {
      setChallenges(challenges.filter((_, i) => i !== index));
    }
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!currentProject.title.trim() || !currentProject.description.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền tên và mô tả dự án",
        variant: "destructive",
      });
      return;
    }

    // Filter out empty activities
    const validActivities = activities.filter(a => a.name.trim());
    const validAchievements = achievements.filter(a => a.trim());
    const validChallenges = challenges.filter(c => c.trim());

    setLoading(true);
    try {
      const groupCode = localStorage.getItem('currentGroupCode');
      if (!groupCode) {
        throw new Error('Không tìm thấy mã nhóm. Vui lòng hoàn thành thông tin nhóm trước.');
      }

      const response = await fetch('/api/group-surveys/project-activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          groupCode,
          currentProject,
          activities: validActivities,
          achievements: validAchievements,
          challenges: validChallenges,
          photos,
        }),
      });

      if (response.ok) {
        toast({
          title: "Thành công!",
          description: "Đã lưu thông tin dự án và hoạt động",
        });
        onComplete();
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving project activities:', error);
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
        <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📋</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Dự án & Hoạt động</h2>
        <p className="text-gray-600">Thông tin về dự án hiện tại và hoạt động của nhóm</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Current Project */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold text-gray-800">
            Dự án hiện tại <span className="text-red-500">*</span>
          </Label>
          
          <div className="bg-teal-50 p-6 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Tên dự án</Label>
                <Input
                  type="text"
                  placeholder="Website bán hàng online"
                  value={currentProject.title}
                  onChange={(e) => setCurrentProject(prev => ({ ...prev, title: e.target.value }))}
                  disabled={loading}
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-600">Trạng thái</Label>
                <Select
                  value={currentProject.status}
                  onValueChange={(value) => setCurrentProject(prev => ({ ...prev, status: value }))}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {projectStatuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-600">Mô tả dự án</Label>
              <Textarea
                placeholder="Mô tả chi tiết về dự án, mục tiêu và phạm vi..."
                value={currentProject.description}
                onChange={(e) => setCurrentProject(prev => ({ ...prev, description: e.target.value }))}
                disabled={loading}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Ngày bắt đầu</Label>
                <Input
                  type="date"
                  value={currentProject.startDate}
                  onChange={(e) => setCurrentProject(prev => ({ ...prev, startDate: e.target.value }))}
                  disabled={loading}
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-600">Ngày kết thúc</Label>
                <Input
                  type="date"
                  value={currentProject.endDate}
                  onChange={(e) => setCurrentProject(prev => ({ ...prev, endDate: e.target.value }))}
                  disabled={loading}
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-600">Tiến độ (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="75"
                  value={currentProject.progress}
                  onChange={(e) => setCurrentProject(prev => ({ ...prev, progress: parseInt(e.target.value) || 0 }))}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Activities */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-lg font-semibold text-gray-800">Hoạt động nhóm</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addActivity}
              disabled={loading}
            >
              + Thêm hoạt động
            </Button>
          </div>
          
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="bg-teal-50 p-4 rounded-lg border">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-800">Hoạt động {index + 1}</h4>
                  {activities.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeActivity(index)}
                      disabled={loading}
                    >
                      ✕
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Tên hoạt động</Label>
                    <Input
                      type="text"
                      placeholder="Họp nhóm tuần 1"
                      value={activity.name}
                      onChange={(e) => updateActivity(index, 'name', e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Loại hoạt động</Label>
                    <Select
                      value={activity.type}
                      onValueChange={(value) => updateActivity(index, 'type', value)}
                      disabled={loading}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {activityTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Ngày thực hiện</Label>
                    <Input
                      type="date"
                      value={activity.date}
                      onChange={(e) => updateActivity(index, 'date', e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Thời gian (phút)</Label>
                    <Input
                      type="number"
                      min="0"
                      placeholder="60"
                      value={activity.duration}
                      onChange={(e) => updateActivity(index, 'duration', parseInt(e.target.value) || 0)}
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-lg font-semibold text-gray-800">Thành tích đạt được</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addAchievement}
              disabled={loading}
            >
              + Thêm thành tích
            </Button>
          </div>
          
          <div className="space-y-2">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Hoàn thành UI design"
                  value={achievement}
                  onChange={(e) => updateAchievement(index, e.target.value)}
                  disabled={loading}
                  className="flex-1"
                />
                {achievements.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAchievement(index)}
                    disabled={loading}
                  >
                    ✕
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Challenges */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-lg font-semibold text-gray-800">Khó khăn gặp phải</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addChallenge}
              disabled={loading}
            >
              + Thêm khó khăn
            </Button>
          </div>
          
          <div className="space-y-2">
            {challenges.map((challenge, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Khó khăn về database"
                  value={challenge}
                  onChange={(e) => updateChallenge(index, e.target.value)}
                  disabled={loading}
                  className="flex-1"
                />
                {challenges.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeChallenge(index)}
                    disabled={loading}
                  >
                    ✕
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Photos */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold text-gray-800">Ảnh hoạt động nhóm</Label>
          <p className="text-sm text-gray-600">Upload tối đa 8 ảnh về quá trình làm việc, demo, hoạt động nhóm</p>
          
          <div className="bg-teal-50 p-4 rounded-lg">
            <MultiImageUpload
              label="Ảnh hoạt động nhóm"
              value={photos}
              onChange={setPhotos}
              studentId={localStorage.getItem('currentGroupCode') || 'temp'}
              maxImages={8}
              maxSize={5}
            />
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
            className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
          >
            {loading ? "Đang lưu..." : "Lưu và tiếp tục"}
          </Button>
        </div>
      </form>
    </Card>
  );
}