'use client'

import React, { useState } from 'react'
import { 
  GraduationCap, 
  Users, 
  UserCheck, 
  Brain, 
  TrendingUp, 
  Target,
  ArrowRight,
  Star,
  Shield,
  Zap,
  Smartphone,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'
import AuthModal from './components/AuthModal'
import QRCode from './components/QRCode'

const DashboardCard = ({ 
  title, 
  description, 
  icon: Icon, 
  href, 
  gradient, 
  features 
}: {
  title: string
  description: string
  icon: any
  href: string
  gradient: string
  features: string[]
}) => (
  <Link href={href}>
    <div className={`card-hover group ${gradient} text-white relative overflow-hidden`}>
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
      <div className="relative z-10">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-white/90">{description}</p>
          </div>
        </div>
        
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2 text-white/90">
              <Star className="w-4 h-4 text-yellow-300" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        <div className="flex items-center justify-between">
          <span className="text-white/80 text-sm">Click to access</span>
          <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </div>
  </Link>
)

const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon, 
  color 
}: {
  title: string
  description: string
  icon: any
  color: string
}) => (
  <Link href="/features" className="card text-center group hover:scale-105 transition-all duration-300 cursor-pointer">
    <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="w-8 h-8 text-white" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 mb-2">{description}</p>
    <div className="text-universe-600 font-medium text-sm">
      Click to learn more →
    </div>
  </Link>
)

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview')
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'signup' }>({
    isOpen: false,
    mode: 'login'
  })
  const [qrModal, setQrModal] = useState(false)

  const getDashboardUrl = (userType: string) => {
    switch (userType) {
      case 'student': return '/student'
      case 'teacher': return '/teacher'
      case 'parent': return '/parent'
      default: return '/'
    }
  }

  const handleAuthSuccess = (userData: any) => {
    // Close the auth modal
    setAuthModal({ isOpen: false, mode: 'login' })
    
    // Redirect to the appropriate dashboard based on user type
    const dashboardUrl = getDashboardUrl(userData.type)
    window.location.href = dashboardUrl
  }

  const dashboards = [
    {
      title: 'Student Dashboard',
      description: 'Personal learning analytics and gap identification',
      icon: GraduationCap,
      href: '/student',
      gradient: 'bg-universe-gradient',
      features: [
        'AI-powered learning gap analysis',
        'Personalized study recommendations',
        'Progress tracking and insights',
        'Interactive performance charts'
      ]
    },
    {
      title: 'Teacher Dashboard',
      description: 'Class analytics and student management',
      icon: Users,
      href: '/teacher',
      gradient: 'bg-universe-gradient-2',
      features: [
        'Class-wide performance analytics',
        'Bulk assignment upload',
        'Video recommendation system',
        'Student progress monitoring'
      ]
    },
    {
      title: 'Parent Dashboard',
      description: 'Child progress monitoring and insights',
      icon: UserCheck,
      href: '/parent',
      gradient: 'bg-universe-gradient-3',
      features: [
        'Real-time progress tracking',
        'Performance notifications',
        'Learning recommendations',
        'Communication with teachers'
      ]
    }
  ]

  const features = [
    {
      title: 'AI-Powered Analytics',
      description: 'Advanced algorithms identify learning gaps and provide personalized insights',
      icon: Brain,
      color: 'bg-universe-gradient'
    },
    {
      title: 'Real-time Tracking',
      description: 'Monitor progress in real-time with interactive charts and visualizations',
      icon: TrendingUp,
      color: 'bg-success-500'
    },
    {
      title: 'Personalized Learning',
      description: 'Tailored recommendations and study plans based on individual needs',
      icon: Target,
      color: 'bg-warning-500'
    },
    {
      title: 'Secure Platform',
      description: 'Enterprise-grade security with FERPA and COPPA compliance',
      icon: Shield,
      color: 'bg-danger-500'
    },
    {
      title: 'Instant Insights',
      description: 'Get immediate feedback and actionable recommendations',
      icon: Zap,
      color: 'bg-secondary-500'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass-effect border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-universe-gradient rounded-2xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-universe-gradient bg-clip-text text-transparent">
                  UniVerse Learning
                </h1>
                <p className="text-sm text-gray-600">AI-Powered Educational Analytics</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setQrModal(true)}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                title="Mobile Access"
              >
                <Smartphone className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setAuthModal({ isOpen: true, mode: 'login' })}
                className="btn-secondary"
              >
                Login
              </button>
              <button 
                onClick={() => setAuthModal({ isOpen: true, mode: 'signup' })}
                className="btn-primary"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-universe-gradient bg-clip-text text-transparent">
              Transform
            </span>
            <br />
            <span className="text-gray-900">Education with AI</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            UniVerse Learning provides comprehensive analytics for students, teachers, and parents. 
            Identify learning gaps, track progress, and optimize educational outcomes with AI-powered insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#dashboards" className="btn-primary text-lg px-8 py-4">
              View Dashboards
            </Link>
            <Link href="/demo" className="btn-secondary text-lg px-8 py-4">
              Watch Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Dashboard Selection */}
      <section id="dashboards" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Dashboard</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Access the right tools for your role in the educational ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {dashboards.map((dashboard, index) => (
              <DashboardCard key={index} {...dashboard} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Platform Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful tools designed to enhance learning outcomes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start free and upgrade as you grow. All plans include our core AI-powered analytics.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 relative">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  $0
                  <span className="text-lg font-normal text-gray-600">/month</span>
                </div>
                <p className="text-gray-600">Perfect for getting started</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0" />
                  <span className="text-gray-700">Access to all resources</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0" />
                  <span className="text-gray-700">Personalized learning plan</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0" />
                  <span className="text-gray-700">Progress tracking</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0" />
                  <span className="text-gray-700">Communication tool (talk online)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0" />
                  <span className="text-gray-700">Grade tracking</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 text-gray-400 flex-shrink-0">•</div>
                  <span className="text-gray-500">Ads</span>
                </li>
              </ul>
              
              <button 
                onClick={() => setAuthModal({ isOpen: true, mode: 'signup' })}
                className="w-full btn-secondary"
              >
                Get Started Free
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-universe-500 p-8 relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-universe-gradient text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  $25
                  <span className="text-lg font-normal text-gray-600">/month</span>
                </div>
                <p className="text-gray-600">For serious learners and educators</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0" />
                  <span className="text-gray-700">Everything in Free</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0" />
                  <span className="text-gray-700">Advanced analytics & insights on student progress</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0" />
                  <span className="text-gray-700">AI grading</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0" />
                  <span className="text-gray-700">Priority support for premium users</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0" />
                  <span className="text-gray-700">Advanced communication tools (video conferencing)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0" />
                  <span className="text-gray-700">No ads</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0" />
                  <span className="text-gray-700">Unlimited assignments</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0" />
                  <span className="text-gray-700">Bulk upload features</span>
                </li>
              </ul>
              
              <button 
                onClick={() => setAuthModal({ isOpen: true, mode: 'signup' })}
                className="w-full btn-primary"
              >
                Start Premium Plan
              </button>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">All plans include a 14-day free trial. No credit card required.</p>
            <Link href="/contact" className="text-universe-600 hover:text-universe-700 font-semibold">
              Need a custom plan? Contact us →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-universe-gradient">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Learning?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of educators and students already using UniVerse Learning
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setAuthModal({ isOpen: true, mode: 'signup' })}
              className="bg-white text-universe-700 font-semibold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300"
            >
              Start Free Trial
            </button>
            <Link href="/contact" className="border-2 border-white text-white font-semibold py-4 px-8 rounded-xl hover:bg-white hover:text-universe-700 transition-all duration-300 inline-block">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-universe-gradient rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold">UniVerse Learning</span>
              </div>
              <p className="text-gray-400">
                Transforming education with AI-powered analytics and insights.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/student" className="hover:text-white transition-colors">Student Dashboard</Link></li>
                <li><Link href="/teacher" className="hover:text-white transition-colors">Teacher Dashboard</Link></li>
                <li><Link href="/parent" className="hover:text-white transition-colors">Parent Dashboard</Link></li>
                <li><Link href="/data-sync" className="hover:text-white transition-colors">Data Sync</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FERPA Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 UniVerse Learning. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        mode={authModal.mode}
        onClose={() => setAuthModal({ isOpen: false, mode: 'login' })}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* QR Code Modal */}
      <QRCode
        isOpen={qrModal}
        onClose={() => setQrModal(false)}
      />
    </div>
  )
} 