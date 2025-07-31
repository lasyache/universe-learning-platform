'use client'

import React from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  BookOpen,
  BarChart3,
  Award
} from 'lucide-react'
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
  { name: 'Mathematics', value: 85, color: '#3b82f6' },
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

const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
  <div className="card">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {change && (
          <div className={`flex items-center text-sm ${change > 0 ? 'text-success-600' : 'text-danger-600'}`}>
            {change > 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
)

const AssignmentCard = ({ assignment }: any) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-success-600 bg-success-50'
      case 'pending': return 'text-warning-600 bg-warning-50'
      case 'overdue': return 'text-danger-600 bg-danger-50'
      default: return 'text-gray-600 bg-gray-50'
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
    <div className="card hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{assignment.title}</h3>
          <p className="text-sm text-gray-600">{assignment.subject}</p>
          <p className="text-sm text-gray-500">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center space-x-3">
          {assignment.score !== null && (
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{assignment.score}/{assignment.maxScore}</p>
              <p className="text-xs text-gray-500">
                {Math.round((assignment.score / assignment.maxScore) * 100)}%
              </p>
            </div>
          )}
          <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(assignment.status)}`}>
            {getStatusIcon(assignment.status)}
            <span className="capitalize">{assignment.status}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Overall GPA"
          value="3.8"
          change={+5.2}
          icon={Award}
          color="bg-primary-500"
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
          color="bg-purple-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Performance */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
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

      {/* Learning Insights */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Learning Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-success-50 rounded-lg border border-success-200">
            <h4 className="font-medium text-success-800 mb-2">Strengths</h4>
            <ul className="text-sm text-success-700 space-y-1">
              <li>• Excellent performance in Mathematics</li>
              <li>• Strong analytical thinking skills</li>
              <li>• Consistent study habits</li>
            </ul>
          </div>
          <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
            <h4 className="font-medium text-warning-800 mb-2">Areas for Improvement</h4>
            <ul className="text-sm text-warning-700 space-y-1">
              <li>• History concepts need review</li>
              <li>• Time management for assignments</li>
              <li>• Essay writing structure</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 