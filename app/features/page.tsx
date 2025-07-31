'use client'

import React from 'react'
import { 
  ArrowLeft,
  Brain,
  TrendingUp,
  Target,
  Shield,
  Zap,
  Users,
  BookOpen,
  FileText,
  Video,
  BarChart3,
  CheckCircle,
  Star,
  Lock,
  Globe,
  Smartphone,
  Cloud,
  Database,
  Cpu,
  Eye
} from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analytics',
    description: 'Advanced machine learning algorithms that identify learning gaps and provide personalized insights',
    details: [
      'Intelligent pattern recognition in student performance',
      'Predictive analytics for learning outcomes',
      'Natural language processing for assignment analysis',
      'Adaptive learning path recommendations',
      'Real-time cognitive load assessment'
    ],
    color: 'bg-universe-gradient'
  },
  {
    icon: TrendingUp,
    title: 'Real-time Tracking',
    description: 'Monitor progress in real-time with interactive charts and visualizations',
    details: [
      'Live performance dashboards',
      'Interactive progress charts',
      'Instant grade updates',
      'Attendance tracking',
      'Study time analytics'
    ],
    color: 'bg-success-500'
  },
  {
    icon: Target,
    title: 'Personalized Learning',
    description: 'Tailored recommendations and study plans based on individual needs',
    details: [
      'Custom learning paths',
      'Adaptive difficulty levels',
      'Personalized study schedules',
      'Individual goal setting',
      'Progress-based recommendations'
    ],
    color: 'bg-warning-500'
  },
  {
    icon: Shield,
    title: 'Secure Platform',
    description: 'Enterprise-grade security with FERPA and COPPA compliance',
    details: [
      'End-to-end encryption',
      'FERPA compliance',
      'COPPA compliance',
      'Regular security audits',
      'Data privacy controls'
    ],
    color: 'bg-danger-500'
  },
  {
    icon: Zap,
    title: 'Instant Insights',
    description: 'Get immediate feedback and actionable recommendations',
    details: [
      'Real-time notifications',
      'Instant performance feedback',
      'Quick action recommendations',
      'Automated alerts',
      'Smart reminders'
    ],
    color: 'bg-secondary-500'
  },
  {
    icon: Users,
    title: 'Multi-User Support',
    description: 'Seamless experience for students, teachers, and parents',
    details: [
      'Role-based access control',
      'Family account linking',
      'Teacher-student communication',
      'Parent monitoring tools',
      'Collaborative learning features'
    ],
    color: 'bg-universe-gradient-2'
  },
  {
    icon: BookOpen,
    title: 'Rich Content Library',
    description: 'Access to comprehensive learning materials and resources',
    details: [
      'Curated educational content',
      'Interactive lessons',
      'Video tutorials',
      'Practice exercises',
      'Assessment materials'
    ],
    color: 'bg-universe-gradient-3'
  },
  {
    icon: FileText,
    title: 'Assignment Management',
    description: 'Comprehensive tools for creating, tracking, and grading assignments',
    details: [
      'Bulk assignment upload',
      'Automated grading',
      'Plagiarism detection',
      'Rubric creation',
      'Submission tracking'
    ],
    color: 'bg-success-600'
  },
  {
    icon: Video,
    title: 'Video Integration',
    description: 'Seamless video content creation and sharing capabilities',
    details: [
      'Video lesson creation',
      'Screen recording tools',
      'Video annotation',
      'Interactive video quizzes',
      'Video analytics'
    ],
    color: 'bg-warning-600'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Comprehensive data analysis and reporting tools',
    details: [
      'Custom report generation',
      'Data visualization',
      'Trend analysis',
      'Comparative analytics',
      'Export capabilities'
    ],
    color: 'bg-danger-600'
  }
]

const FeatureCard = ({ feature }: { feature: any }) => {
  const Icon = feature.icon
  
  return (
    <div className="card hover:scale-105 transition-all duration-300">
      <div className="flex items-start space-x-4">
        <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
          <p className="text-gray-600 mb-4">{feature.description}</p>
          <ul className="space-y-2">
            {feature.details.map((detail: string, index: number) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

const stats = [
  {
    value: '99.9%',
    label: 'Uptime',
    icon: Cloud
  },
  {
    value: '256-bit',
    label: 'Encryption',
    icon: Lock
  },
  {
    value: '50+',
    label: 'Integrations',
    icon: Database
  },
  {
    value: '24/7',
    label: 'Support',
    icon: Users
  }
]

export default function Features() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass-effect border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-universe-gradient rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">F</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Platform Features
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the powerful tools and capabilities that make UniVerse Learning 
            the ultimate educational analytics platform for students, teachers, and parents.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="card text-center">
                <div className="w-12 h-12 bg-universe-gradient rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Features Grid */}
        <div className="space-y-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="card bg-universe-gradient text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Experience These Features?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start your free trial and see how UniVerse Learning can transform your educational experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="btn-secondary bg-white text-universe-700 hover:bg-gray-50">
                Start Free Trial
              </Link>
              <Link href="/demo" className="btn-secondary bg-white/20 text-white hover:bg-white/30">
                Watch Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 