'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AuthModal from './AuthModal'

interface AuthGuardProps {
  children: React.ReactNode
  userType?: 'student' | 'teacher' | 'parent'
}

export default function AuthGuard({ children, userType }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated (this would typically check localStorage, cookies, or a session)
    const checkAuth = () => {
      // For demo purposes, we'll check if there's a user in localStorage
      const user = localStorage.getItem('universe_user')
      if (user) {
        const userData = JSON.parse(user)
        if (userType && userData.type !== userType) {
          // User type doesn't match, show auth modal
          setShowAuthModal(true)
          setAuthMode('login')
        } else {
          // User is authenticated and has correct type - automatically authenticate
          setIsAuthenticated(true)
          setShowAuthModal(false)
        }
      } else {
        // Not authenticated, show auth modal
        setShowAuthModal(true)
        setAuthMode('login')
      }
    }

    checkAuth()
  }, [userType])

  const handleAuthSuccess = (userData: any) => {
    // Store user data in localStorage
    localStorage.setItem('universe_user', JSON.stringify(userData))
    setIsAuthenticated(true)
    setShowAuthModal(false)
  }

  const handleCloseAuth = () => {
    // If user closes auth modal without logging in, redirect to home
    if (!isAuthenticated) {
      router.push('/')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-universe-50 to-secondary-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-universe-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">🔒</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-6">
            Please log in to access this dashboard
          </p>
          <button
            onClick={() => setShowAuthModal(true)}
            className="btn-primary"
          >
            Login
          </button>
        </div>

        <AuthModal
          isOpen={showAuthModal}
          mode={authMode}
          onClose={handleCloseAuth}
          onAuthSuccess={handleAuthSuccess}
        />
      </div>
    )
  }

  return <>{children}</>
} 