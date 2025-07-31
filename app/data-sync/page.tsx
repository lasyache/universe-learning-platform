'use client'

import React, { useState } from 'react'
import AuthGuard from '../components/AuthGuard'
import { 
  Upload, 
  Database, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Download,
  Trash2,
  RefreshCw,
  Settings,
  Bell,
  Search,
  ArrowLeft,
  Star,
  Zap,
  Lightbulb,
  Cloud,
  Link as LinkIcon,
  ExternalLink,
  Calendar,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'

const supportedFormats = [
  { name: 'CSV', icon: FileText, description: 'Comma-separated values', color: 'text-green-600' },
  { name: 'Excel', icon: FileText, description: 'Microsoft Excel files', color: 'text-blue-600' },
  { name: 'JSON', icon: FileText, description: 'JavaScript Object Notation', color: 'text-yellow-600' },
  { name: 'PDF', icon: FileText, description: 'Portable Document Format', color: 'text-red-600' },
]

const connectedPlatforms = [
  {
    id: 1,
    name: 'Google Classroom',
    status: 'connected',
    lastSync: '2 hours ago',
    icon: 'GC',
    color: 'bg-blue-500',
    dataTypes: ['Assignments', 'Grades', 'Attendance']
  },
  {
    id: 2,
    name: 'Canvas LMS',
    status: 'connected',
    lastSync: '1 day ago',
    icon: 'CL',
    color: 'bg-green-500',
    dataTypes: ['Courses', 'Assignments', 'Discussions']
  },
  {
    id: 3,
    name: 'Blackboard',
    status: 'disconnected',
    lastSync: 'Never',
    icon: 'BB',
    color: 'bg-gray-400',
    dataTypes: ['Courses', 'Grades', 'Content']
  },
  {
    id: 4,
    name: 'Moodle',
    status: 'pending',
    lastSync: '3 days ago',
    icon: 'ML',
    color: 'bg-orange-500',
    dataTypes: ['Modules', 'Quizzes', 'Forums']
  }
]

const importHistory = [
  {
    id: 1,
    fileName: 'math_assignments_jan2024.csv',
    platform: 'Google Classroom',
    status: 'completed',
    records: 156,
    date: '2024-01-15',
    size: '2.3 MB'
  },
  {
    id: 2,
    fileName: 'science_grades_q1.xlsx',
    platform: 'Canvas LMS',
    status: 'completed',
    records: 89,
    date: '2024-01-14',
    size: '1.8 MB'
  },
  {
    id: 3,
    fileName: 'english_essays.json',
    platform: 'Manual Upload',
    status: 'failed',
    records: 0,
    date: '2024-01-13',
    size: '4.1 MB',
    error: 'Invalid JSON format'
  },
  {
    id: 4,
    fileName: 'history_quizzes.pdf',
    platform: 'Manual Upload',
    status: 'processing',
    records: 45,
    date: '2024-01-12',
    size: '3.2 MB'
  }
]

const syncStats = [
  {
    title: 'Total Records',
    value: '2,847',
    change: '+156',
    icon: Database,
    color: 'bg-universe-gradient'
  },
  {
    title: 'Connected Platforms',
    value: '2/4',
    change: '+1',
    icon: LinkIcon,
    color: 'bg-success-500'
  },
  {
    title: 'Last Sync',
    value: '2h ago',
    change: null,
    icon: RefreshCw,
    color: 'bg-warning-500'
  },
  {
    title: 'Data Quality',
    value: '98%',
    change: '+2%',
    icon: CheckCircle,
    color: 'bg-secondary-500'
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
      <div className="flex items-center text-sm text-success-600">
        <Zap className="w-4 h-4 mr-1" />
        {change}
      </div>
    )}
  </div>
)

const PlatformCard = ({ platform }: any) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'badge-success'
      case 'disconnected': return 'badge-danger'
      case 'pending': return 'badge-warning'
      default: return 'badge-universe'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4" />
      case 'disconnected': return <AlertCircle className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="card-hover">
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 ${platform.color} rounded-xl flex items-center justify-center`}>
          <span className="text-white font-semibold">{platform.icon}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{platform.name}</h3>
          <p className="text-sm text-gray-600">Last sync: {platform.lastSync}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {platform.dataTypes.map((type: string, index: number) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {type}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${getStatusColor(platform.status)}`}>
            {getStatusIcon(platform.status)}
            <span className="capitalize">{platform.status}</span>
          </div>
          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

const ImportCard = ({ importItem }: any) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'badge-success'
      case 'processing': return 'badge-warning'
      case 'failed': return 'badge-danger'
      default: return 'badge-universe'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'processing': return <RefreshCw className="w-4 h-4 animate-spin" />
      case 'failed': return <AlertCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="card-hover">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{importItem.fileName}</h3>
          <p className="text-sm text-gray-600">{importItem.platform}</p>
          <div className="flex items-center space-x-4 mt-2">
            <span className="text-sm text-gray-500">{importItem.records} records</span>
            <span className="text-sm text-gray-500">{importItem.size}</span>
            <span className="text-sm text-gray-500">{new Date(importItem.date).toLocaleDateString()}</span>
          </div>
          {importItem.error && (
            <p className="text-sm text-red-600 mt-1">{importItem.error}</p>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${getStatusColor(importItem.status)}`}>
            {getStatusIcon(importItem.status)}
            <span className="capitalize">{importItem.status}</span>
          </div>
          <div className="flex space-x-1">
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Download className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const UploadArea = () => {
  const [isDragOver, setIsDragOver] = useState(false)

  return (
    <div className={`card border-2 border-dashed transition-colors duration-300 ${
      isDragOver ? 'border-universe-500 bg-universe-50' : 'border-gray-300'
    }`}>
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-universe-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Upload className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Files</h3>
        <p className="text-gray-600 mb-6">
          Drag and drop files here, or click to browse
        </p>
        <button className="btn-primary">
          Choose Files
        </button>
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-3">Supported formats:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {supportedFormats.map((format, index) => (
              <div key={index} className="flex items-center space-x-1 text-sm text-gray-600">
                <format.icon className={`w-4 h-4 ${format.color}`} />
                <span>{format.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DataSync() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <AuthGuard currentPath="/data-sync">
      <DataSyncContent activeTab={activeTab} setActiveTab={setActiveTab} />
    </AuthGuard>
  )
}

function DataSyncContent({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {

  const navigation = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'upload', label: 'File Upload', icon: Upload },
    { id: 'platforms', label: 'Platforms', icon: LinkIcon },
    { id: 'history', label: 'Import History', icon: Clock },
    { id: 'settings', label: 'Settings', icon: Settings },
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
                  placeholder="Search imports..."
                  className="pl-10 pr-4 py-2 border border-universe-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-universe-500 focus:border-universe-500 bg-white/80 backdrop-blur-sm"
                />
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Bell className="w-6 h-6" />
              </button>
              <div className="w-10 h-10 bg-universe-gradient rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">D</span>
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
                <Upload className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Data Sync</h2>
                <p className="text-sm text-gray-600">Import & manage data</p>
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
                {syncStats.map((stat, index) => (
                  <StatCard key={index} {...stat} />
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card-hover bg-universe-gradient text-white">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <Upload className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Upload Files</h3>
                      <p className="text-white/90 text-sm">Import data from files</p>
                    </div>
                  </div>
                </div>
                <div className="card-hover bg-universe-gradient-2 text-white">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                             <LinkIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Connect Platform</h3>
                      <p className="text-white/90 text-sm">Link external platforms</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connected Platforms */}
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Connected Platforms</h3>
                  <button className="btn-secondary">Add Platform</button>
                </div>
                <div className="space-y-4">
                  {connectedPlatforms.map((platform) => (
                    <PlatformCard key={platform.id} platform={platform} />
                  ))}
                </div>
              </div>

              {/* Recent Imports */}
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Imports</h3>
                  <button className="btn-secondary">View All</button>
                </div>
                <div className="space-y-4">
                  {importHistory.slice(0, 3).map((importItem) => (
                    <ImportCard key={importItem.id} importItem={importItem} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">File Upload</h2>
              <UploadArea />
              
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Guidelines</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-success-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Supported Formats</h4>
                      <p className="text-sm text-gray-600">CSV, Excel (.xlsx, .xls), JSON, and PDF files</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-success-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">File Size Limit</h4>
                      <p className="text-sm text-gray-600">Maximum 50MB per file</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-success-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Data Validation</h4>
                      <p className="text-sm text-gray-600">Automatic validation and error checking</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'platforms' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Platform Integrations</h2>
                <button className="btn-primary">
                                     <LinkIcon className="w-4 h-4 mr-2" />
                  Add Platform
                </button>
              </div>
              <div className="space-y-4">
                {connectedPlatforms.map((platform) => (
                  <PlatformCard key={platform.id} platform={platform} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Import History</h2>
              <div className="space-y-4">
                {importHistory.map((importItem) => (
                  <ImportCard key={importItem.id} importItem={importItem} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Sync Settings</h2>
              <p className="text-gray-600">Settings interface coming soon...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
} 