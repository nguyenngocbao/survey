"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface MultiImageUploadProps {
  label: string;
  value: string[];
  onChange: (urls: string[]) => void;
  studentId: string;
  maxImages?: number;
  maxSize?: number; // in MB
}

export function MultiImageUpload({
  label,
  value = [],
  onChange,
  studentId,
  maxImages = 8,
  maxSize = 5,
}: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    // Check if adding these files would exceed the limit
    if (value.length + files.length > maxImages) {
      toast({
        title: "Giới hạn ảnh",
        description: `Chỉ có thể upload tối đa ${maxImages} ảnh`,
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    const newUrls: string[] = [];

    try {
      for (const file of files) {
        // Validate file size
        if (file.size > maxSize * 1024 * 1024) {
          toast({
            title: "Lỗi",
            description: `File ${file.name} vượt quá ${maxSize}MB`,
            variant: "destructive",
          });
          continue;
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
          toast({
            title: "Lỗi",
            description: `File ${file.name} không phải là ảnh hợp lệ`,
            variant: "destructive",
          });
          continue;
        }

        // Upload file
        const formData = new FormData();
        formData.append('file', file);
        formData.append('studentId', studentId);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          newUrls.push(result.url);
        } else {
          if (response.status === 503) {
            toast({
              title: "Chức năng chưa sẵn sàng",
              description: "Upload ảnh chưa được cấu hình. Vui lòng liên hệ quản trị viên.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Lỗi",
              description: `Không thể upload ${file.name}`,
              variant: "destructive",
            });
          }
        }
      }

      if (newUrls.length > 0) {
        onChange([...value, ...newUrls]);
        toast({
          title: "Thành công",
          description: `Đã tải lên ${newUrls.length} ảnh`,
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải lên hình ảnh. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = (index: number) => {
    const newUrls = value.filter((_, i) => i !== index);
    onChange(newUrls);
  };

  const canUploadMore = value.length < maxImages;

  return (
    <div className="space-y-4">
      <Label className="font-semibold">
        {label} ({value.length}/{maxImages})
      </Label>
      
      {/* Upload Area */}
      {canUploadMore && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
          <div className="space-y-3">
            <div className="text-gray-500">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm">
                Chọn nhiều ảnh cùng lúc hoặc kéo thả vào đây
              </p>
              <p className="text-xs text-gray-400">
                PNG, JPG, WebP, GIF (tối đa {maxSize}MB mỗi ảnh)
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? "Đang tải lên..." : "Chọn ảnh"}
            </Button>
          </div>
        </div>
      )}

      {/* Image Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {value.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Uploaded ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border shadow-sm"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => handleRemove(index)}
                disabled={uploading}
                className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </Button>
            </div>
          ))}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}