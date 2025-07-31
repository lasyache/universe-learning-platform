'use client'

import React, { useState } from 'react'
import { 
  Users, 
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
  Video,
  FileText,
  Settings,
  Bell,
  Search,
  ArrowLeft,
  Star,
  Zap,
  Lightbulb,
  Upload,
  Download,
  Plus,
  Eye,
  MessageSquare,
  Filter,
  MoreVertical,
  Play,
  Pause,
  Volume2,
  Maximize
} from 'lucide-react'
import Link from 'next/link'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

const classData = [
  { month: 'Jan', average: 78, assignments: 12 },
  { month: 'Feb', average: 82, assignments: 15 },
  { month: 'Mar', average: 79, assignments: 18 },
  { month: 'Apr', average: 85, assignments: 14 },
  { month: 'May', average: 88, assignments: 16 },
  { month: 'Jun', average: 91, assignments: 20 },
]

const subjectPerformance = [
  { name: 'Algebra', value: 85, color: '#6366f1' },
  { name: 'Geometry', value: 78, color: '#10b981' },
  { name: 'Calculus', value: 92, color: '#f59e0b' },
  { name: 'Statistics', value: 76, color: '#ef4444' },
]

const students = [
  {
    id: 1,
    name: 'Sarah Johnson',
    grade: 'A-',
    performance: 87,
    attendance: 95,
    lastActive: '2 hours ago',
    status: 'active',
    avatar: 'SJ'
  },
  {
    id: 2,
    name: 'Michael Chen',
    grade: 'B+',
    performance: 82,
    attendance: 88,
    lastActive: '1 day ago',
    status: 'active',
    avatar: 'MC'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    grade: 'A',
    performance: 94,
    attendance: 100,
    lastActive: '3 hours ago',
    status: 'active',
    avatar: 'ER'
  },
  {
    id: 4,
    name: 'David Kim',
    grade: 'C+',
    performance: 72,
    attendance: 75,
    lastActive: '5 days ago',
    status: 'struggling',
    avatar: 'DK'
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    grade: 'B',
    performance: 79,
    attendance: 92,
    lastActive: '1 day ago',
    status: 'active',
    avatar: 'LT'
  }
]

const recentAssignments = [
  {
    id: 1,
    title: 'Algebra Quiz - Chapter 5',
    subject: 'Mathematics',
    dueDate: '2024-01-15',
    submissions: 24,
    totalStudents: 28,
    averageScore: 84,
    status: 'graded'
  },
  {
    id: 2,
    title: 'Geometry Project',
    subject: 'Mathematics',
    dueDate: '2024-01-20',
    submissions: 18,
    totalStudents: 28,
    averageScore: null,
    status: 'pending'
  },
  {
    id: 3,
    title: 'Calculus Homework',
    subject: 'Mathematics',
    dueDate: '2024-01-18',
    submissions: 26,
    totalStudents: 28,
    averageScore: 91,
    status: 'graded'
  }
]

const learningGaps = [
  {
    id: 1,
    topic: 'Quadratic Equations',
    affectedStudents: 8,
    severity: 'high',
    impact: 15,
    description: 'Students struggling with factoring quadratic equations',
    recommendations: [
      'Review factoring techniques with visual aids',
      'Provide step-by-step practice problems',
      'Use interactive online tools'
    ]
  },
  {
    id: 2,
    topic: 'Trigonometric Functions',
    affectedStudents: 5,
    severity: 'medium',
    impact: 10,
    description: 'Difficulty understanding sine, cosine, and tangent relationships',
    recommendations: [
      'Use real-world examples and applications',
      'Create interactive demonstrations',
      'Provide additional practice worksheets'
    ]
  }
]

const recommendedVideos = [
  {
    id: 1,
    title: 'Understanding Quadratic Equations',
    duration: '12:34',
    views: '2.5K',
    rating: 4.8,
    thumbnail: 'https://via.placeholder.com/300x200',
    topic: 'Quadratic Equations',
    relevance: 95
  },
  {
    id: 2,
    title: 'Trigonometry Basics',
    duration: '18:22',
    views: '1.8K',
    rating: 4.6,
    thumbnail: 'https://via.placeholder.com/300x200',
    topic: 'Trigonometric Functions',
    relevance: 88
  },
  {
    id: 3,
    title: 'Factoring Techniques',
    duration: '15:45',
    views: '3.2K',
    rating: 4.9,
    thumbnail: 'https://via.placeholder.com/300x200',
    topic: 'Quadratic Equations',
    relevance: 92
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

const StudentCard = ({ student }: any) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'badge-success'
      case 'struggling': return 'badge-warning'
      case 'inactive': return 'badge-danger'
      default: return 'badge-universe'
    }
  }

  return (
    <div className="card-hover">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-universe-gradient rounded-full flex items-center justify-center">
          <span className="text-white font-semibold">{student.avatar}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{student.name}</h3>
          <p className="text-sm text-gray-600">Grade: {student.grade} • Performance: {student.performance}%</p>
          <p className="text-sm text-gray-500">Attendance: {student.attendance}% • Last active: {student.lastActive}</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(student.status)}`}>
            {student.status}
          </div>
          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

const AssignmentCard = ({ assignment }: any) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'graded': return 'badge-success'
      case 'pending': return 'badge-warning'
      case 'overdue': return 'badge-danger'
      default: return 'badge-universe'
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
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">{assignment.submissions}/{assignment.totalStudents}</p>
            <p className="text-xs text-gray-500">Submissions</p>
          </div>
          {assignment.averageScore && (
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{assignment.averageScore}%</p>
              <p className="text-xs text-gray-500">Average</p>
            </div>
          )}
          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(assignment.status)}`}>
            {assignment.status}
          </div>
        </div>
      </div>
    </div>
  )
}

const VideoCard = ({ video }: any) => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="card-hover">
      <div className="relative mb-4">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-32 object-cover rounded-xl"
        />
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors rounded-xl"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 text-white" />
          ) : (
            <Play className="w-8 h-8 text-white ml-1" />
          )}
        </button>
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">{video.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{video.topic}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <span>{video.views} views</span>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>{video.rating}</span>
            </div>
          </div>
          <span className="text-universe-600 font-medium">{video.relevance}% relevant</span>
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
          <p className="text-sm text-gray-600">{gap.affectedStudents} students affected</p>
        </div>
        <div className="badge-universe">
          {gap.severity} Priority
        </div>
      </div>
      
      <p className="text-gray-700 mb-4">{gap.description}</p>
      
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Impact on Class Performance</span>
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

function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const navigation = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'gaps', label: 'Learning Gaps', icon: Brain },
    { id: 'videos', label: 'Video Library', icon: Video },
    { id: 'data-sync', label: 'Data Sync', icon: Upload },
  ]

  const quickActions = [
    {
      title: 'Upload Assignments',
      description: 'Bulk upload student assignments',
      icon: Upload,
      color: 'bg-universe-gradient',
      onClick: () => console.log('Upload Assignments')
    },
    {
      title: 'Create Video',
      description: 'Record instructional videos',
      icon: Video,
      color: 'bg-universe-gradient-2',
      onClick: () => console.log('Create Video')
    },
    {
      title: 'Send Messages',
      description: 'Communicate with students',
      icon: MessageSquare,
      color: 'bg-universe-gradient-3',
      onClick: () => console.log('Send Messages')
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
                  placeholder="Search students, assignments..."
                  className="pl-10 pr-4 py-2 border border-universe-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-universe-500 focus:border-universe-500 bg-white/80 backdrop-blur-sm"
                />
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Bell className="w-6 h-6" />
              </button>
              <div className="w-10 h-10 bg-universe-gradient rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">T</span>
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
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Teacher Dashboard</h2>
                <p className="text-sm text-gray-600">Welcome back, Ms. Johnson!</p>
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
                  title="Class Average"
                  value="85.2%"
                  change={+3.1}
                  icon={Award}
                  color="bg-universe-gradient"
                />
                <StatCard
                  title="Active Students"
                  value="28/30"
                  change={+2}
                  icon={Users}
                  color="bg-success-500"
                />
                <StatCard
                  title="Assignments"
                  value="24"
                  change={+5}
                  icon={FileText}
                  color="bg-warning-500"
                />
                <StatCard
                  title="Learning Gaps"
                  value="3"
                  change={-1}
                  icon={Brain}
                  color="bg-danger-500"
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Class Performance Trend</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={classData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="average" stroke="#6366f1" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Performance</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={subjectPerformance}>
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

          {activeTab === 'students' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Students</h2>
                <div className="flex items-center space-x-4">
                  <button className="btn-secondary">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </button>
                  <button className="btn-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Student
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {students.map((student) => (
                  <StudentCard key={student.id} student={student} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'assignments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Assignments</h2>
                <button className="btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Assignment
                </button>
              </div>
              <div className="space-y-4">
                {recentAssignments.map((assignment) => (
                  <AssignmentCard key={assignment.id} assignment={assignment} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'gaps' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Learning Gap Analysis</h2>
              <div className="space-y-6">
                {learningGaps.map((gap) => (
                  <GapCard key={gap.id} gap={gap} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'videos' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Video Library</h2>
                <button className="btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Video
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'data-sync' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Data Sync</h2>
              <p className="text-gray-600 mb-4">Sync your class data and upload assignments in bulk.</p>
              <Link href="/data-sync" className="btn-primary">
                <Upload className="w-4 h-4 mr-2" />
                Go to Data Sync
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default function TeacherDashboardWithAuth() {
  return (
    <AuthGuard userType="teacher">
      <TeacherDashboard />
    </AuthGuard>
  )
} 