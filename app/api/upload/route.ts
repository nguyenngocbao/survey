import { NextRequest, NextResponse } from 'next/server';
import { validateFile, generateFileName, uploadToR2, fileToBuffer } from '@/lib/upload-utils';

export async function POST(request: NextRequest) {
  try {
    // Check if R2 is configured
    if (!process.env.R2_ACCOUNT_ID || !process.env.R2_ACCESS_KEY_ID) {
      return NextResponse.json(
        { error: 'Image upload is not configured. Please setup Cloudflare R2.' },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const studentId = formData.get('studentId') as string;

    if (!file || !studentId) {
      return NextResponse.json(
        { error: 'File and studentId are required' },
        { status: 400 }
      );
    }

    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = await fileToBuffer(file);
    
    // Generate unique filename
    const fileName = generateFileName(file.name, studentId);
    
    // Upload to R2
    const uploadResult = await uploadToR2(buffer, fileName, file.type);
    
    if (!uploadResult.success) {
      return NextResponse.json(
        { error: uploadResult.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: uploadResult.url,
      fileName: fileName,
    });

  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}