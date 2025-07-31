'use client'

import React, { useState } from 'react'
import { 
  Upload, 
  Download, 
  Database, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Settings,
  RefreshCw,
  ExternalLink,
  Plus,
  Trash2
} from 'lucide-react'

const supportedFormats = [
  { name: 'CSV', description: 'Comma-separated values', icon: FileText },
  { name: 'Excel', description: 'Microsoft Excel files', icon: FileText },
  { name: 'JSON', description: 'JavaScript Object Notation', icon: FileText },
  { name: 'PDF', description: 'Portable Document Format', icon: FileText },
]

const dataSources = [
  {
    id: 1,
    name: 'Google Classroom',
    type: 'LMS',
    status: 'connected',
    lastSync: '2024-01-15T10:30:00Z',
    assignments: 24,
    tests: 8,
  },
  {
    id: 2,
    name: 'Canvas LMS',
    type: 'LMS',
    status: 'disconnected',
    lastSync: null,
    assignments: 0,
    tests: 0,
  },
  {
    id: 3,
    name: 'Manual Upload',
    type: 'File',
    status: 'connected',
    lastSync: '2024-01-14T15:45:00Z',
    assignments: 12,
    tests: 3,
  },
]

const recentImports = [
  {
    id: 1,
    filename: 'math_assignments.csv',
    source: 'Google Classroom',
    status: 'completed',
    records: 15,
    importedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    filename: 'science_tests.xlsx',
    source: 'Manual Upload',
    status: 'processing',
    records: 8,
    importedAt: '2024-01-15T09:15:00Z',
  },
  {
    id: 3,
    filename: 'english_essays.pdf',
    source: 'Manual Upload',
    status: 'failed',
    records: 0,
    importedAt: '2024-01-14T16:20:00Z',
    error: 'Invalid file format'
  },
]

const DataSourceCard = ({ source }: any) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-success-600 bg-success-50'
      case 'disconnected': return 'text-gray-600 bg-gray-50'
      case 'error': return 'text-danger-600 bg-danger-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4" />
      case 'disconnected': return <AlertCircle className="w-4 h-4" />
      case 'error': return <AlertCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <Database className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{source.name}</h3>
            <p className="text-sm text-gray-600">{source.type}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 ${getStatusColor(source.status)}`}>
          {getStatusIcon(source.status)}
          <span className="capitalize">{source.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{source.assignments}</p>
          <p className="text-sm text-gray-600">Assignments</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{source.tests}</p>
          <p className="text-sm text-gray-600">Tests</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <span>Last sync:</span>
        <span>
          {source.lastSync 
            ? new Date(source.lastSync).toLocaleDateString()
            : 'Never'
          }
        </span>
      </div>

      <div className="flex space-x-2">
        {source.status === 'connected' ? (
          <>
            <button className="btn-secondary flex-1 text-sm">Sync Now</button>
            <button className="btn-secondary text-sm px-3">
              <Settings className="w-4 h-4" />
            </button>
          </>
        ) : (
          <button className="btn-primary flex-1 text-sm">Connect</button>
        )}
      </div>
    </div>
  )
}

const ImportCard = ({ importItem }: any) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-success-600 bg-success-50'
      case 'processing': return 'text-warning-600 bg-warning-50'
      case 'failed': return 'text-danger-600 bg-danger-50'
      default: return 'text-gray-600 bg-gray-50'
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
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{importItem.filename}</h3>
          <p className="text-sm text-gray-600">{importItem.source}</p>
          <p className="text-sm text-gray-500">
            {new Date(importItem.importedAt).toLocaleString()}
          </p>
          {importItem.error && (
            <p className="text-sm text-danger-600 mt-1">{importItem.error}</p>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{importItem.records} records</p>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(importItem.status)}`}>
            {getStatusIcon(importItem.status)}
            <span className="capitalize">{importItem.status}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DataSync() {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-gradient-to-r from-primary-50 to-purple-50 border-primary-200">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
            <Upload className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Data Sync & Import</h2>
            <p className="text-gray-600">Connect your learning platforms and import test/assignment data</p>
          </div>
        </div>
      </div>

      {/* File Upload Area */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Files</h3>
        
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
            dragActive 
              ? 'border-primary-500 bg-primary-50' 
              : 'border-gray-300 hover:border-primary-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">
            Drop files here or click to browse
          </p>
          <p className="text-gray-600 mb-4">
            Support for CSV, Excel, JSON, and PDF files
          </p>
          
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileSelect}
            accept=".csv,.xlsx,.xls,.json,.pdf"
          />
          <label htmlFor="file-upload" className="btn-primary cursor-pointer">
            Choose Files
          </label>
        </div>

        {selectedFile && (
          <div className="mt-4 p-4 bg-success-50 rounded-lg border border-success-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-success-600" />
                <div>
                  <p className="font-medium text-success-900">{selectedFile.name}</p>
                  <p className="text-sm text-success-700">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button className="btn-primary text-sm">Import Now</button>
            </div>
          </div>
        )}
      </div>

      {/* Supported Formats */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Supported Formats</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {supportedFormats.map((format) => {
            const Icon = format.icon
            return (
              <div key={format.name} className="p-4 border border-gray-200 rounded-lg text-center">
                <Icon className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <h4 className="font-medium text-gray-900">{format.name}</h4>
                <p className="text-sm text-gray-600">{format.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Data Sources */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Connected Data Sources</h3>
          <button className="btn-secondary">
            <Plus className="w-4 h-4 mr-2" />
            Add Source
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataSources.map((source) => (
            <DataSourceCard key={source.id} source={source} />
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
          {recentImports.map((importItem) => (
            <ImportCard key={importItem.id} importItem={importItem} />
          ))}
        </div>
      </div>

      {/* Sync Status */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sync Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-success-50 rounded-lg border border-success-200">
            <CheckCircle className="w-8 h-8 text-success-600 mx-auto mb-2" />
            <h4 className="font-medium text-success-900">All Systems Connected</h4>
            <p className="text-sm text-success-700">Last sync: 2 hours ago</p>
          </div>
          <div className="text-center p-4 bg-warning-50 rounded-lg border border-warning-200">
            <RefreshCw className="w-8 h-8 text-warning-600 mx-auto mb-2" />
            <h4 className="font-medium text-warning-900">Processing Data</h4>
            <p className="text-sm text-warning-700">1 file being processed</p>
          </div>
          <div className="text-center p-4 bg-primary-50 rounded-lg border border-primary-200">
            <Database className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <h4 className="font-medium text-primary-900">Total Records</h4>
            <p className="text-sm text-primary-700">1,247 items synced</p>
          </div>
        </div>
      </div>
    </div>
  )
} 