import { NextRequest, NextResponse } from 'next/server'
import { uploadToR2 } from '@/lib/r2'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Check if it's single file or multiple files
    const file = formData.get('file') as File | null
    const files = formData.getAll('files') as File[]
    
    // Single file upload
    if (file && !files.length) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const url = await uploadToR2(buffer, file.name, file.type)

      return NextResponse.json({
        success: true,
        url: url
      })
    }
    
    // Multiple files upload
    if (files && files.length > 0) {
      const uploadedUrls: string[] = []

      for (const file of files) {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const url = await uploadToR2(buffer, file.name, file.type)
        uploadedUrls.push(url)
      }

      return NextResponse.json({
        success: true,
        urls: uploadedUrls
      })
    }
    
    // No files provided
    return NextResponse.json(
      { success: false, error: 'No file provided' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { success: false, error: 'Upload failed' },
      { status: 500 }
    )
  }
}
