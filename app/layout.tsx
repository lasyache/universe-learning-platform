import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ServiceWorker from './components/ServiceWorker'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UniVerse Learning Platform',
  description: 'AI-powered educational analytics platform with Student, Teacher, and Parent dashboards',
  keywords: ['education', 'ai', 'learning', 'analytics', 'student', 'teacher', 'parent', 'dashboard'],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'UniVerse Learning'
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#4f46e5',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-universe-50 via-white to-secondary-50">
          {children}
        </div>
        <ServiceWorker />
      </body>
    </html>
  )
} 