'use client'

import React, { useState } from 'react'
import { 
  UserCheck, 
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
  MessageSquare,
  Eye,
  Download,
  Filter,
  MoreVertical,
  Play,
  Pause,
  Volume2,
  Maximize,
  Users,
  Mail,
  Phone,
  Plus
} from 'lucide-react'
import Link from 'next/link'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

const childData = [
  { month: 'Jan', performance: 78, attendance: 95 },
  { month: 'Feb', performance: 82, attendance: 92 },
  { month: 'Mar', performance: 79, attendance: 88 },
  { month: 'Apr', performance: 85, attendance: 96 },
  { month: 'May', performance: 88, attendance: 94 },
  { month: 'Jun', performance: 91, attendance: 98 },
]

const subjectPerformance = [
  { name: 'Mathematics', value: 85, color: '#6366f1' },
  { name: 'Science', value: 78, color: '#10b981' },
  { name: 'English', value: 92, color: '#f59e0b' },
  { name: 'History', value: 70, color: '#ef4444' },
]

const children = [
  {
    id: 1,
    name: 'Sarah Johnson',
    grade: '11th Grade',
    age: 16,
    school: 'Lincoln High School',
    performance: 87,
    attendance: 95,
    lastActive: '2 hours ago',
    status: 'active',
    avatar: 'SJ',
    recentAchievement: 'A+ on Algebra Quiz'
  },
  {
    id: 2,
    name: 'Michael Johnson',
    grade: '8th Grade',
    age: 13,
    school: 'Riverside Middle School',
    performance: 82,
    attendance: 88,
    lastActive: '1 day ago',
    status: 'active',
    avatar: 'MJ',
    recentAchievement: 'Science Project Winner'
  }
]

const recentAssignments = [
  {
    id: 1,
    title: 'Algebra Quiz - Chapter 5',
    subject: 'Mathematics',
    dueDate: '2024-01-15',
    status: 'completed',
    score: 88,
    maxScore: 100,
    child: 'Sarah Johnson'
  },
  {
    id: 2,
    title: 'Chemistry Lab Report',
    subject: 'Science',
    dueDate: '2024-01-18',
    status: 'pending',
    score: null,
    maxScore: 50,
    child: 'Sarah Johnson'
  },
  {
    id: 3,
    title: 'Essay on Shakespeare',
    subject: 'English',
    dueDate: '2024-01-20',
    status: 'overdue',
    score: null,
    maxScore: 100,
    child: 'Michael Johnson'
  }
]

const learningGaps = [
  {
    id: 1,
    child: 'Sarah Johnson',
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
    child: 'Michael Johnson',
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

const teacherCommunications = [
  {
    id: 1,
    teacher: 'Ms. Rodriguez',
    subject: 'Mathematics',
    child: 'Sarah Johnson',
    message: 'Sarah is doing excellent work in algebra. She shows great problem-solving skills.',
    date: '2024-01-14',
    type: 'positive',
    read: true
  },
  {
    id: 2,
    teacher: 'Mr. Chen',
    subject: 'Science',
    child: 'Michael Johnson',
    message: 'Michael needs to improve his lab report writing. I recommend extra practice.',
    date: '2024-01-13',
    type: 'concern',
    read: false
  },
  {
    id: 3,
    teacher: 'Mrs. Thompson',
    subject: 'English',
    child: 'Sarah Johnson',
    message: 'Sarah\'s essay was outstanding! She demonstrates excellent critical thinking.',
    date: '2024-01-12',
    type: 'positive',
    read: true
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
    relevance: 95,
    child: 'Sarah Johnson'
  },
  {
    id: 2,
    title: 'World War II Timeline',
    duration: '18:22',
    views: '1.8K',
    rating: 4.6,
    thumbnail: 'https://via.placeholder.com/300x200',
    topic: 'World War II',
    relevance: 88,
    child: 'Michael Johnson'
  },
  {
    id: 3,
    title: 'Essay Writing Tips',
    duration: '15:45',
    views: '3.2K',
    rating: 4.9,
    thumbnail: 'https://via.placeholder.com/300x200',
    topic: 'Essay Writing',
    relevance: 92,
    child: 'Michael Johnson'
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

const ChildCard = ({ child }: any) => {
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
          <span className="text-white font-semibold">{child.avatar}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{child.name}</h3>
          <p className="text-sm text-gray-600">{child.grade} • {child.school}</p>
          <p className="text-sm text-gray-500">Performance: {child.performance}% • Attendance: {child.attendance}%</p>
          <p className="text-sm text-universe-600 font-medium">{child.recentAchievement}</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(child.status)}`}>
            {child.status}
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
          <p className="text-sm text-gray-600">{assignment.subject} • {assignment.child}</p>
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
        <p className="text-sm text-gray-600 mb-2">{video.topic} • {video.child}</p>
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
          <p className="text-sm text-gray-600">{gap.child} • {gap.subject}</p>
        </div>
        <div className="badge-universe">
          {gap.severity} Priority
        </div>
      </div>
      
      <p className="text-gray-700 mb-4">{gap.description}</p>
      
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Impact on Performance</span>
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
          How You Can Help:
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

const CommunicationCard = ({ communication }: any) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'positive': return 'border-success-500 bg-success-50'
      case 'concern': return 'border-warning-500 bg-warning-50'
      case 'urgent': return 'border-danger-500 bg-danger-50'
      default: return 'border-universe-500 bg-universe-50'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'positive': return <CheckCircle className="w-4 h-4 text-success-600" />
      case 'concern': return <AlertCircle className="w-4 h-4 text-warning-600" />
      case 'urgent': return <AlertCircle className="w-4 h-4 text-danger-600" />
      default: return <MessageSquare className="w-4 h-4 text-universe-600" />
    }
  }

  return (
    <div className={`card border-l-4 ${getTypeColor(communication.type)}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          {getTypeIcon(communication.type)}
          <div>
            <h3 className="font-semibold text-gray-900">{communication.teacher}</h3>
            <p className="text-sm text-gray-600">{communication.subject} • {communication.child}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!communication.read && (
            <div className="w-2 h-2 bg-universe-500 rounded-full"></div>
          )}
          <span className="text-xs text-gray-500">{new Date(communication.date).toLocaleDateString()}</span>
        </div>
      </div>
      <p className="text-gray-700 mb-3">{communication.message}</p>
      <div className="flex space-x-2">
        <button className="btn-secondary text-sm">
          <Mail className="w-4 h-4 mr-2" />
          Reply
        </button>
        <button className="btn-secondary text-sm">
          <Phone className="w-4 h-4 mr-2" />
          Call
        </button>
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

function ParentDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const navigation = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'children', label: 'Children', icon: Users },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'gaps', label: 'Learning Gaps', icon: Brain },
    { id: 'videos', label: 'Learning Videos', icon: Video },
    { id: 'communications', label: 'Teacher Messages', icon: MessageSquare },
  ]

  const quickActions = [
    {
      title: 'Contact Teacher',
      description: 'Send message to teachers',
      icon: MessageSquare,
      color: 'bg-universe-gradient',
      onClick: () => console.log('Contact Teacher')
    },
    {
      title: 'Schedule Meeting',
      description: 'Book parent-teacher conference',
      icon: Calendar,
      color: 'bg-universe-gradient-2',
      onClick: () => console.log('Schedule Meeting')
    },
    {
      title: 'Download Report',
      description: 'Get detailed progress report',
      icon: Download,
      color: 'bg-universe-gradient-3',
      onClick: () => console.log('Download Report')
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
                  placeholder="Search children, assignments..."
                  className="pl-10 pr-4 py-2 border border-universe-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-universe-500 focus:border-universe-500 bg-white/80 backdrop-blur-sm"
                />
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Bell className="w-6 h-6" />
              </button>
              <div className="w-10 h-10 bg-universe-gradient rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">P</span>
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
                <UserCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Parent Dashboard</h2>
                <p className="text-sm text-gray-600">Welcome back, Mrs. Johnson!</p>
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
                  title="Average Performance"
                  value="84.5%"
                  change={+2.3}
                  icon={Award}
                  color="bg-universe-gradient"
                />
                <StatCard
                  title="Children"
                  value="2"
                  change={null}
                  icon={Users}
                  color="bg-success-500"
                />
                <StatCard
                  title="Assignments Due"
                  value="5"
                  change={-2}
                  icon={FileText}
                  color="bg-warning-500"
                />
                <StatCard
                  title="Unread Messages"
                  value="1"
                  change={+1}
                  icon={MessageSquare}
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trend</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={childData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="performance" stroke="#6366f1" strokeWidth={3} />
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

              {/* Children Overview */}
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Your Children</h3>
                  <button className="btn-secondary">View All</button>
                </div>
                <div className="space-y-4">
                  {children.map((child) => (
                    <ChildCard key={child.id} child={child} />
                  ))}
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

          {activeTab === 'children' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Your Children</h2>
                <div className="flex items-center space-x-4">
                  <button className="btn-secondary">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </button>
                  <button className="btn-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Child
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {children.map((child) => (
                  <ChildCard key={child.id} child={child} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'assignments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Assignments</h2>
                <button className="btn-secondary">
                  <Download className="w-4 h-4 mr-2" />
                  Export
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
                <h2 className="text-2xl font-bold text-gray-900">Learning Videos</h2>
                <button className="btn-secondary">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter by Child
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'communications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Teacher Communications</h2>
                <button className="btn-primary">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  New Message
                </button>
              </div>
              <div className="space-y-4">
                {teacherCommunications.map((communication) => (
                  <CommunicationCard key={communication.id} communication={communication} />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default function ParentDashboardWithAuth() {
  return (
    <AuthGuard userType="parent">
      <ParentDashboard />
    </AuthGuard>
  )
} 