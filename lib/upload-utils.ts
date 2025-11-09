import { PutObjectCommand } from '@aws-sdk/client-s3';
import { r2Client, R2_CONFIG } from './r2-config';

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

// Tạo tên file unique
export function generateFileName(originalName: string, studentId: string): string {
  const timestamp = Date.now();
  const extension = originalName.split('.').pop();
  const sanitizedStudentId = studentId.replace(/[^a-zA-Z0-9]/g, '');
  return `surveys/${sanitizedStudentId}/${timestamp}.${extension}`;
}

// Validate file
export function validateFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  if (file.size > R2_CONFIG.maxFileSize) {
    return { valid: false, error: `File size exceeds ${R2_CONFIG.maxFileSize / 1024 / 1024}MB limit` };
  }

  if (!R2_CONFIG.allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed' };
  }

  return { valid: true };
}

// Upload file to R2
export async function uploadToR2(
  buffer: Buffer,
  fileName: string,
  contentType: string
): Promise<UploadResult> {
  try {
    const command = new PutObjectCommand({
      Bucket: R2_CONFIG.bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000', // Cache 1 year
    });

    await r2Client.send(command);

    const publicUrl = `${R2_CONFIG.publicUrl}/${fileName}`;
    
    return {
      success: true,
      url: publicUrl,
    };
  } catch (error) {
    console.error('R2 upload error:', error);
    return {
      success: false,
      error: 'Failed to upload file to R2',
    };
  }
}

// Convert File to Buffer (for browser)
export async function fileToBuffer(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}