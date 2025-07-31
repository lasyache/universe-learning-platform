'use client'

import React, { useState } from 'react'
import { 
  GraduationCap, 
  TrendingUp, 
  Target, 
  BookOpen, 
  Brain,
  BarChart3,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  Award,
  Users,
  Video,
  FileText,
  Settings,
  Bell,
  Search,
  ArrowLeft,
  Star,
  Zap,
  Lightbulb,
  Upload
} from 'lucide-react'
import Link from 'next/link'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

const performanceData = [
  { month: 'Jan', score: 75 },
  { month: 'Feb', score: 82 },
  { month: 'Mar', score: 78 },
  { month: 'Apr', score: 85 },
  { month: 'May', score: 88 },
  { month: 'Jun', score: 92 },
]

const subjectData = [
  { name: 'Mathematics', value: 85, color: '#6366f1' },
  { name: 'Science', value: 78, color: '#10b981' },
  { name: 'English', value: 92, color: '#f59e0b' },
  { name: 'History', value: 70, color: '#ef4444' },
]

const recentAssignments = [
  {
    id: 1,
    title: 'Algebra Quiz',
    subject: 'Mathematics',
    dueDate: '2024-01-15',
    status: 'completed',
    score: 88,
    maxScore: 100,
  },
  {
    id: 2,
    title: 'Chemistry Lab Report',
    subject: 'Science',
    dueDate: '2024-01-18',
    status: 'pending',
    score: null,
    maxScore: 50,
  },
  {
    id: 3,
    title: 'Essay on Shakespeare',
    subject: 'English',
    dueDate: '2024-01-20',
    status: 'overdue',
    score: null,
    maxScore: 100,
  },
]

const learningGaps = [
  {
    id: 1,
    subject: 'Mathematics',
    topic: 'Quadratic Equations',
    severity: 'high',
    impact: 15,
    description: 'Struggling with solving quadratic equations using factoring method',
    recommendations: [
      'Review factoring techniques',
      'Practice with step-by-step examples',
      'Use online interactive tools'
    ]
  },
  {
    id: 2,
    subject: 'History',
    topic: 'World War II',
    severity: 'medium',
    impact: 8,
    description: 'Difficulty understanding the timeline and key events',
    recommendations: [
      'Create timeline flashcards',
      'Watch documentary videos',
      'Read simplified summaries'
    ]
  }
]

const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
  <div className="stat-card">
    <div className={`icon ${color}`}>
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
    <p className="text-sm text-gray-600 mb-2">{title}</p>
    {change && (
      <div className={`flex items-center text-sm ${change > 0 ? 'text-success-600' : 'text-danger-600'}`}>
        {change > 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingUp className="w-4 h-4 mr-1 rotate-180" />}
        {Math.abs(change)}%
      </div>
    )}
  </div>
)

const AssignmentCard = ({ assignment }: any) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'badge-success'
      case 'pending': return 'badge-warning'
      case 'overdue': return 'badge-danger'
      default: return 'badge-universe'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      case 'overdue': return <AlertCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="card-hover">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
          <p className="text-sm text-gray-600">{assignment.subject}</p>
          <p className="text-sm text-gray-500">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center space-x-3">
          {assignment.score !== null && (
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{assignment.score}/{assignment.maxScore}</p>
              <p className="text-xs text-gray-500">
                {Math.round((assignment.score / assignment.maxScore) * 100)}%
              </p>
            </div>
          )}
          <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${getStatusColor(assignment.status)}`}>
            {getStatusIcon(assignment.status)}
            <span className="capitalize">{assignment.status}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const GapCard = ({ gap }: any) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-danger-500 bg-danger-50'
      case 'medium': return 'border-warning-500 bg-warning-50'
      case 'low': return 'border-success-500 bg-success-50'
      default: return 'border-universe-500 bg-universe-50'
    }
  }

  return (
    <div className={`card border-l-4 ${getSeverityColor(gap.severity)}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{gap.topic}</h3>
          <p className="text-sm text-gray-600">{gap.subject}</p>
        </div>
        <div className="badge-universe">
          {gap.severity} Priority
        </div>
      </div>
      
      <p className="text-gray-700 mb-4">{gap.description}</p>
      
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Impact on Overall Performance</span>
          <span className="font-semibold text-gray-900">{gap.impact}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${gap.impact}%` }}
          ></div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
          <Lightbulb className="w-4 h-4 mr-2 text-universe-600" />
          AI Recommendations:
        </h4>
        <ul className="space-y-1">
          {gap.recommendations.map((rec: string, index: number) => (
            <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
              <Star className="w-4 h-4 text-universe-500 mt-0.5 flex-shrink-0" />
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const QuickActionCard = ({ title, description, icon: Icon, color, onClick }: any) => (
  <div className={`card-hover ${color} text-white`} onClick={onClick}>
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-white/90 text-sm">{description}</p>
      </div>
    </div>
  </div>
)

import AuthGuard from '../components/AuthGuard'

function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const navigation = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'gaps', label: 'Learning Gaps', icon: Brain },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'data-sync', label: 'Data Sync', icon: Upload },
  ]

  const quickActions = [
    {
      title: 'View Study Plan',
      description: 'Check your personalized study schedule',
      icon: Calendar,
      color: 'bg-universe-gradient',
      onClick: () => console.log('View Study Plan')
    },
    {
      title: 'Watch Videos',
      description: 'Access recommended learning videos',
      icon: Video,
      color: 'bg-universe-gradient-2',
      onClick: () => console.log('Watch Videos')
    },
    {
      title: 'Practice Tests',
      description: 'Take practice tests for weak areas',
      icon: Target,
      color: 'bg-universe-gradient-3',
      onClick: () => console.log('Practice Tests')
    }
  ]

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
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-universe-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-universe-500 focus:border-universe-500 bg-white/80 backdrop-blur-sm"
                />
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Bell className="w-6 h-6" />
              </button>
              <div className="w-10 h-10 bg-universe-gradient rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">S</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white/80 backdrop-blur-sm border-r border-white/20 min-h-screen sticky top-20">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-universe-gradient rounded-xl flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Student Dashboard</h2>
                <p className="text-sm text-gray-600">Welcome back, Sarah!</p>
              </div>
            </div>

            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`nav-item w-full ${activeTab === item.id ? 'active' : ''}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Overall GPA"
                  value="3.8"
                  change={+5.2}
                  icon={Award}
                  color="bg-universe-gradient"
                />
                <StatCard
                  title="Assignments Completed"
                  value="24/30"
                  change={+12}
                  icon={CheckCircle}
                  color="bg-success-500"
                />
                <StatCard
                  title="Study Hours"
                  value="156"
                  change={-3}
                  icon={BookOpen}
                  color="bg-warning-500"
                />
                <StatCard
                  title="Learning Streak"
                  value="12 days"
                  change={+2}
                  icon={Target}
                  color="bg-secondary-500"
                />
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {quickActions.map((action, index) => (
                    <QuickActionCard key={index} {...action} />
                  ))}
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trend</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Performance</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={subjectData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Assignments */}
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Assignments</h3>
                  <button className="btn-secondary">View All</button>
                </div>
                <div className="space-y-4">
                  {recentAssignments.map((assignment) => (
                    <AssignmentCard key={assignment.id} assignment={assignment} />
                  ))}
                </div>
              </div>

              {/* Learning Gaps */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Learning Gaps</h3>
                <div className="space-y-6">
                  {learningGaps.map((gap) => (
                    <GapCard key={gap.id} gap={gap} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'assignments' && (
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">All Assignments</h2>
              <p className="text-gray-600">Assignment management interface coming soon...</p>
            </div>
          )}

          {activeTab === 'gaps' && (
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Gap Analysis</h2>
              <p className="text-gray-600">Detailed gap analysis interface coming soon...</p>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Resources</h2>
              <p className="text-gray-600">Resource library interface coming soon...</p>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Progress Tracking</h2>
              <p className="text-gray-600">Progress tracking interface coming soon...</p>
            </div>
          )}

          {activeTab === 'data-sync' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Data Sync</h2>
              <p className="text-gray-600 mb-4">Sync your learning data from various platforms and upload assignments.</p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="stat-card">
                  <div className="icon bg-universe-gradient">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">24</h3>
                  <p className="text-sm text-gray-600 mb-2">Files Uploaded</p>
                </div>
                <div className="stat-card">
                  <div className="icon bg-success-500">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">3</h3>
                  <p className="text-sm text-gray-600 mb-2">Platforms Connected</p>
                </div>
                <div className="stat-card">
                  <div className="icon bg-warning-500">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">2h ago</h3>
                  <p className="text-sm text-gray-600 mb-2">Last Sync</p>
                </div>
              </div>

              {/* Connected Platforms */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Connected Platforms</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-semibold">GC</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Google Classroom</h4>
                        <p className="text-sm text-gray-600">Last sync: 2 hours ago</p>
                      </div>
                    </div>
                    <div className="badge-success">Connected</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-semibold">CL</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Canvas LMS</h4>
                        <p className="text-sm text-gray-600">Last sync: 1 day ago</p>
                      </div>
                    </div>
                    <div className="badge-success">Connected</div>
                  </div>
                </div>
              </div>

              {/* Upload Area */}
              <div className="card border-2 border-dashed border-gray-300">
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-universe-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Files</h3>
                  <p className="text-gray-600 mb-4">
                    Drag and drop files here, or click to browse
                  </p>
                  <button className="btn-primary">
                    Choose Files
                  </button>
                </div>
              </div>

              <Link href="/data-sync" className="btn-primary w-full">
                <Upload className="w-4 h-4 mr-2" />
                Go to Full Data Sync Dashboard
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default function StudentDashboardWithAuth() {
  return (
    <AuthGuard userType="student">
      <StudentDashboard />
    </AuthGuard>
  )
} 