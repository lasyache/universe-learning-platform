'use client'

import React, { useState } from 'react'
import { 
  X, 
  User, 
  GraduationCap, 
  UserCheck, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowLeft,
  CheckCircle,
  Building,
  Shield,
  AlertCircle,
  Info
} from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'login' | 'signup'
  onAuthSuccess?: (userData: any) => void
}

type UserType = 'student' | 'teacher' | 'parent' | null
type AuthStep = 'userType' | 'credentials' | 'district' | 'success'

export default function AuthModal({ isOpen, onClose, mode, onAuthSuccess }: AuthModalProps) {
  const [userType, setUserType] = useState<UserType>(null)
  const [authStep, setAuthStep] = useState<AuthStep>('userType')
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    district: '',
    school: '',
    grade: '',
    subject: '',
    verificationCode: ''
  })

  const userTypes = [
    {
      id: 'student',
      label: 'Student',
      icon: GraduationCap,
      description: 'Access learning materials and track progress'
    },
    {
      id: 'teacher',
      label: 'Teacher',
      icon: User,
      description: 'Manage classes and create content'
    },
    {
      id: 'parent',
      label: 'Parent',
      icon: UserCheck,
      description: 'Monitor children\'s learning journey'
    }
  ]

  const districts = [
    'New York City School District',
    'Los Angeles Unified School District',
    'Chicago Public Schools',
    'Miami-Dade County Public Schools',
    'Houston Independent School District',
    'Other (Please specify)'
  ]

  const grades = [
    'Kindergarten',
    '1st Grade',
    '2nd Grade',
    '3rd Grade',
    '4th Grade',
    '5th Grade',
    '6th Grade',
    '7th Grade',
    '8th Grade',
    '9th Grade',
    '10th Grade',
    '11th Grade',
    '12th Grade'
  ]

  const subjects = [
    'Mathematics',
    'Science',
    'English/Language Arts',
    'History/Social Studies',
    'Foreign Languages',
    'Physical Education',
    'Arts',
    'Computer Science',
    'Other'
  ]

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type)
    if (type === 'teacher') {
      setAuthStep('district')
    } else {
      setAuthStep('credentials')
    }
  }

  const handleGoogleAuth = () => {
    // Simulate Google authentication
    console.log(`Google ${mode} for ${userType}`)
    setAuthStep('success')
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (mode === 'signup' && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    // Simulate authentication
    console.log(`${mode} for ${userType}:`, formData)
    
    // Store user data in localStorage
    const userData = {
      type: userType,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      district: formData.district,
      school: formData.school,
      subject: formData.subject,
      grade: formData.grade,
      authenticated: true,
      timestamp: new Date().toISOString()
    }
    
    localStorage.setItem('universe_user', JSON.stringify(userData))
    
    // Call onAuthSuccess callback if provided
    if (onAuthSuccess) {
      onAuthSuccess(userData)
    }
    
    setAuthStep('success')
  }

  const handleDistrictSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.district || !formData.school || !formData.subject) {
      alert('Please fill in all required fields!')
      return
    }
    setAuthStep('credentials')
  }

  const handleClose = () => {
    setUserType(null)
    setAuthStep('userType')
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      district: '',
      school: '',
      grade: '',
      subject: '',
      verificationCode: ''
    })
    onClose()
  }

  const getDashboardUrl = () => {
    switch (userType) {
      case 'student': return '/student'
      case 'teacher': return '/teacher'
      case 'parent': return '/parent'
      default: return '/'
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-universe-gradient rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {mode === 'login' ? 'Welcome Back' : 'Join UniVerse'}
              </h2>
              <p className="text-sm text-gray-600">
                {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {authStep === 'userType' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                I am a...
              </h3>
              {userTypes.map((type) => {
                const Icon = type.icon
                return (
                  <button
                    key={type.id}
                    onClick={() => handleUserTypeSelect(type.id as UserType)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-universe-300 hover:bg-universe-50 transition-all duration-300 text-left group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-universe-gradient rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{type.label}</h4>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          {authStep === 'district' && (
            <div className="space-y-6">
              {/* Back button */}
              <button
                onClick={() => setAuthStep('userType')}
                className="flex items-center space-x-2 text-universe-600 hover:text-universe-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to user type</span>
              </button>

              {/* Security notice */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Teacher Verification Required</h4>
                    <p className="text-sm text-blue-700">
                      To ensure platform security, we require district verification for teacher accounts.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleDistrictSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    School District *
                  </label>
                  <select
                    required
                    value={formData.district}
                    onChange={(e) => setFormData({...formData, district: e.target.value})}
                    className="input-field"
                  >
                    <option value="">Select your district</option>
                    {districts.map((district, index) => (
                      <option key={index} value={district}>{district}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    School Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.school}
                    onChange={(e) => setFormData({...formData, school: e.target.value})}
                    className="input-field"
                    placeholder="Enter your school name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Subject *
                  </label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="input-field"
                  >
                    <option value="">Select your subject</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grade Level
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({...formData, grade: e.target.value})}
                    className="input-field"
                  >
                    <option value="">Select grade level</option>
                    {grades.map((grade, index) => (
                      <option key={index} value={grade}>{grade}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary"
                >
                  Continue to Account Setup
                </button>
              </form>
            </div>
          )}

          {authStep === 'credentials' && (
            <div className="space-y-6">
              {/* Back button */}
              <button
                onClick={() => userType === 'teacher' ? setAuthStep('district') : setAuthStep('userType')}
                className="flex items-center space-x-2 text-universe-600 hover:text-universe-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              {/* User type display */}
              <div className="flex items-center space-x-3 p-3 bg-universe-50 rounded-xl">
                {(() => {
                  const type = userTypes.find(t => t.id === userType)
                  const Icon = type?.icon || User
                  return (
                    <>
                      <div className="w-8 h-8 bg-universe-gradient rounded-lg flex items-center justify-center">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-900">{type?.label}</span>
                      {userType === 'teacher' && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          Verified
                        </span>
                      )}
                    </>
                  )
                })()}
              </div>

              {/* Google Auth */}
              <button
                onClick={handleGoogleAuth}
                className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-md"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="input-field"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="input-field"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="input-field pl-10"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="input-field pl-10 pr-10"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {mode === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        className="input-field pl-10 pr-10"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full btn-primary"
                >
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              <p className="text-center text-sm text-gray-600">
                {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => window.location.href = mode === 'login' ? '/signup' : '/login'}
                  className="text-universe-600 hover:text-universe-700 font-medium"
                >
                  {mode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          )}

          {authStep === 'success' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-success-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Welcome to UniVerse!
                </h3>
                <p className="text-gray-600">
                  You've successfully {mode === 'login' ? 'signed in' : 'created your account'}.
                </p>
              </div>
              <button
                onClick={() => window.location.href = getDashboardUrl()}
                className="w-full btn-primary"
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 