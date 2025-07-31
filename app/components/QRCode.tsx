'use client'

import React, { useState, useEffect } from 'react'
import { X, Download, Smartphone, Globe, Copy, CheckCircle } from 'lucide-react'

interface QRCodeProps {
  isOpen: boolean
  onClose: () => void
}

export default function QRCode({ isOpen, onClose }: QRCodeProps) {
  const [copied, setCopied] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href)
    }
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const generateQRCode = (text: string) => {
    // Simple QR code generation using a service
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`
    return qrCodeUrl
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-universe-gradient rounded-xl flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Mobile Access</h2>
              <p className="text-sm text-gray-600">Scan to access on your phone</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* QR Code */}
          <div className="text-center mb-6">
            <div className="inline-block p-4 bg-gray-50 rounded-2xl">
              <img
                src={generateQRCode(currentUrl)}
                alt="QR Code"
                className="w-48 h-48 rounded-xl"
              />
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-4 mb-6">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-universe-gradient rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Open Camera App</h3>
                <p className="text-sm text-gray-600">Use your phone's camera app to scan the QR code</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-universe-gradient rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Tap the Link</h3>
                <p className="text-sm text-gray-600">Tap the notification that appears to open UniVerse</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-universe-gradient rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Start Learning</h3>
                <p className="text-sm text-gray-600">Access your dashboard and continue learning on mobile</p>
              </div>
            </div>
          </div>

          {/* URL Display */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-600 truncate">{currentUrl}</span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center space-x-2 text-universe-600 hover:text-universe-700 transition-colors flex-shrink-0"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {copied ? 'Copied!' : 'Copy'}
                </span>
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-3 bg-universe-50 rounded-xl">
              <div className="w-8 h-8 bg-universe-gradient rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-white text-xs font-bold">📱</span>
              </div>
              <h4 className="text-sm font-semibold text-gray-900">Mobile Optimized</h4>
              <p className="text-xs text-gray-600">Perfect for on-the-go learning</p>
            </div>
            <div className="text-center p-3 bg-universe-50 rounded-xl">
              <div className="w-8 h-8 bg-universe-gradient rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-white text-xs font-bold">⚡</span>
              </div>
              <h4 className="text-sm font-semibold text-gray-900">Fast Loading</h4>
              <p className="text-xs text-gray-600">Optimized for mobile networks</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={onClose}
              className="btn-primary w-full"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 