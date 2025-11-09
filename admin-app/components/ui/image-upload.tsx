"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  studentId: string;
  required?: boolean;
  maxSize?: number; // in MB
}

export function ImageUpload({
  label,
  value,
  onChange,
  studentId,
  required = false,
  maxSize = 5,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "Lỗi",
        description: `Kích thước file không được vượt quá ${maxSize}MB`,
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Lỗi",
        description: "Chỉ chấp nhận file ảnh (JPEG, PNG, WebP, GIF)",
        variant: "destructive",
      });
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('studentId', studentId);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        onChange(result.url);
        toast({
          title: "Thành công",
          description: "Đã tải lên hình ảnh",
        });
      } else {
        if (response.status === 503) {
          toast({
            title: "Chức năng chưa sẵn sàng",
            description: "Upload ảnh chưa được cấu hình. Vui lòng liên hệ quản trị viên.",
            variant: "destructive",
          });
        } else {
          throw new Error(result.error || 'Upload failed');
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải lên hình ảnh. Vui lòng thử lại.",
        variant: "destructive",
      });
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <Label className="font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
        {preview ? (
          <div className="space-y-3">
            <div className="relative inline-block">
              <img
                src={preview}
                alt="Preview"
                className="max-w-full max-h-48 rounded-lg shadow-md"
              />
            </div>
            <div className="flex gap-2 justify-center">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                Thay đổi
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRemove}
                disabled={uploading}
              >
                Xóa
              </Button>
            </div>
          </div>
        ) : (
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
                Nhấp để chọn ảnh hoặc kéo thả vào đây
              </p>
              <p className="text-xs text-gray-400">
                PNG, JPG, WebP, GIF (tối đa {maxSize}MB)
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
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}