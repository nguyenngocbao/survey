"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface NotificationPopupProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  confirmText?: string
  onConfirm?: () => void
  cancelText?: string
  onCancel?: () => void
}

export function NotificationPopup({
  isOpen,
  onClose,
  title,
  message,
  type = 'info',
  confirmText = 'OK',
  onConfirm,
  cancelText,
  onCancel
}: NotificationPopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 150)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isVisible) return null

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    } else {
      onClose()
    }
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      onClose()
    }
  }

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          icon: '✅',
          bgColor: 'from-green-500 to-emerald-600',
          borderColor: 'border-green-200',
          textColor: 'text-green-800'
        }
      case 'error':
        return {
          icon: '❌',
          bgColor: 'from-red-500 to-red-600',
          borderColor: 'border-red-200',
          textColor: 'text-red-800'
        }
      case 'warning':
        return {
          icon: '⚠️',
          bgColor: 'from-yellow-500 to-orange-600',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-800'
        }
      default:
        return {
          icon: 'ℹ️',
          bgColor: 'from-blue-500 to-blue-600',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800'
        }
    }
  }

  const styles = getTypeStyles()

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity duration-150 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl transform transition-all duration-150 ${isOpen ? 'scale-100' : 'scale-95'}`}>
        <div className="space-y-4">
          {/* Header */}
          <div className="text-center">
            <div className={`w-16 h-16 bg-gradient-to-r ${styles.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
              <span className="text-2xl">{styles.icon}</span>
            </div>
            {title && (
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {title}
              </h3>
            )}
          </div>

          {/* Message */}
          <div className={`bg-gray-50 rounded-xl p-4 border-2 ${styles.borderColor}`}>
            <p className={`text-center ${styles.textColor} font-medium leading-relaxed`}>
              {message}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            {cancelText && (
              <Button
                onClick={handleCancel}
                variant="outline"
                className="flex-1"
              >
                {cancelText}
              </Button>
            )}
            <Button
              onClick={handleConfirm}
              className={`${cancelText ? 'flex-1' : 'w-full'} bg-gradient-to-r ${styles.bgColor} hover:opacity-90 text-white`}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hook để sử dụng notification dễ dàng hơn
export function useNotification() {
  const [notification, setNotification] = useState<{
    isOpen: boolean
    title?: string
    message: string
    type?: 'success' | 'error' | 'warning' | 'info'
    confirmText?: string
    onConfirm?: () => void
    cancelText?: string
    onCancel?: () => void
  }>({
    isOpen: false,
    message: ''
  })

  const showNotification = (options: {
    title?: string
    message: string
    type?: 'success' | 'error' | 'warning' | 'info'
    confirmText?: string
    onConfirm?: () => void
    cancelText?: string
    onCancel?: () => void
  }) => {
    setNotification({
      isOpen: true,
      ...options
    })
  }

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isOpen: false }))
  }

  const showSuccess = (message: string, title?: string) => {
    showNotification({ message, title, type: 'success' })
  }

  const showError = (message: string, title?: string) => {
    showNotification({ message, title, type: 'error' })
  }

  const showWarning = (message: string, title?: string) => {
    showNotification({ message, title, type: 'warning' })
  }

  const showInfo = (message: string, title?: string) => {
    showNotification({ message, title, type: 'info' })
  }

  const showConfirm = (message: string, onConfirm: () => void, title?: string) => {
    showNotification({
      message,
      title,
      type: 'warning',
      confirmText: 'Xác nhận',
      cancelText: 'Hủy',
      onConfirm,
      onCancel: hideNotification
    })
  }

  return {
    notification,
    showNotification,
    hideNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm,
    NotificationComponent: () => (
      <NotificationPopup
        {...notification}
        onClose={hideNotification}
      />
    )
  }
}