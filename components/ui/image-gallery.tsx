'use client'

import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'

interface ImageFile {
  name: string
  url: string
  type: string
}

interface ImageGalleryProps {
  images: (ImageFile | string)[]
  title?: string
  onRemove?: (index: number) => void
  readOnly?: boolean
}

export function ImageGallery({ images, title, onRemove, readOnly = false }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  console.log('ImageGallery rendering with images:', images)

  if (!images || images.length === 0) {
    return (
      <div className="text-sm text-gray-500 italic">
        Không có hình ảnh
      </div>
    )
  }

  // Normalize images to ImageFile format
  const normalizedImages = images.map((img, index) => {
    if (typeof img === 'string') {
      return {
        name: `Image ${index + 1}`,
        url: img,
        type: 'image'
      }
    }
    return img
  })

  const slides = normalizedImages.map(file => ({
    src: file.url,
    alt: file.name,
    title: file.name
  }))

  return (
    <>
      <div className="space-y-2">
        {title && <p className="text-sm font-medium text-gray-700">{title}</p>}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {normalizedImages.map((file, index) => (
            <div key={index} className="group relative">
              <div
                onClick={() => {
                  setCurrentIndex(index)
                  setLightboxOpen(true)
                }}
                className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
              >
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-full object-cover"
                  onLoad={() => {
                    console.log('✅ Image loaded successfully:', file.url)
                  }}
                  onError={() => {
                    console.error('❌ Image failed to load:', file.url)
                  }}
                />
                
                {/* Zoom icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="opacity-0 group-hover:opacity-100 text-3xl transition-opacity drop-shadow-lg">🔍</span>
                </div>
                
                {/* Delete button - only show if not readOnly and onRemove is provided */}
                {!readOnly && onRemove && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onRemove(index)
                    }}
                    className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto"
                    title="Xóa hình này"
                    type="button"
                  >
                    ✕
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1 truncate" title={file.name}>
                {file.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox with Zoom */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={currentIndex}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 3,
          scrollToZoom: true
        }}
      />
    </>
  )
}
