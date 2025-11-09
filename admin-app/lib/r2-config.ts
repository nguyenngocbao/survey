import { S3Client } from '@aws-sdk/client-s3';

// Cấu hình Cloudflare R2
export const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export const R2_CONFIG = {
  bucketName: process.env.R2_BUCKET_NAME!,
  publicUrl: process.env.R2_PUBLIC_URL!, // URL công khai để truy cập file
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
};