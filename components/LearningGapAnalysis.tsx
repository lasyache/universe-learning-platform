'use client'

import React, { useState } from 'react'
import { 
  Brain, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  BarChart3,
  PieChart as PieChartIcon
} from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

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
  },
  {
    id: 3,
    subject: 'English',
    topic: 'Essay Structure',
    severity: 'low',
    impact: 5,
    description: 'Need improvement in organizing essay paragraphs',
    recommendations: [
      'Practice outline creation',
      'Review transition words',
      'Study sample essays'
    ]
  }
]

const skillBreakdown = [
  { name: 'Critical Thinking', value: 85, color: '#3b82f6' },
  { name: 'Problem Solving', value: 78, color: '#10b981' },
  { name: 'Communication', value: 92, color: '#f59e0b' },
  { name: 'Time Management', value: 65, color: '#ef4444' },
  { name: 'Research Skills', value: 88, color: '#8b5cf6' },
]

const GapCard = ({ gap }: any) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-danger-600 bg-danger-50 border-danger-200'
      case 'medium': return 'text-warning-600 bg-warning-50 border-warning-200'
      case 'low': return 'text-success-600 bg-success-50 border-success-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-5 h-5" />
      case 'medium': return <Clock className="w-5 h-5" />
      case 'low': return <CheckCircle className="w-5 h-5" />
      default: return <Clock className="w-5 h-5" />
    }
  }

  return (
    <div className="card border-l-4 border-l-primary-500">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{gap.topic}</h3>
          <p className="text-sm text-gray-600">{gap.subject}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 ${getSeverityColor(gap.severity)}`}>
          {getSeverityIcon(gap.severity)}
          <span className="capitalize">{gap.severity} Priority</span>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4">{gap.description}</p>
      
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Impact on Overall Performance</span>
          <span className="font-medium text-gray-900">{gap.impact}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${gap.impact}%` }}
          ></div>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-2">AI Recommendations:</h4>
        <ul className="space-y-1">
          {gap.recommendations.map((rec: string, index) => (
            <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
              <Lightbulb className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const RecommendationCard = ({ title, description, icon: Icon, action }: any) => (
  <div className="card hover:shadow-md transition-shadow duration-200">
    <div className="flex items-start space-x-4">
      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-primary-600" />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        <button className="btn-primary text-sm">Start Learning</button>
      </div>
    </div>
  </div>
)

export default function LearningGapAnalysis() {
  const [selectedGap, setSelectedGap] = useState<number | null>(null)

  const recommendations = [
    {
      title: 'Personalized Study Plan',
      description: 'AI-generated study schedule based on your learning gaps',
      icon: Target,
      action: 'Create Plan'
    },
    {
      title: 'Practice Exercises',
      description: 'Targeted practice problems for identified weak areas',
      icon: BookOpen,
      action: 'Start Practice'
    },
    {
      title: 'Video Tutorials',
      description: 'Curated video content to address specific topics',
      icon: TrendingUp,
      action: 'Watch Videos'
    }
  ]

  return (
    <div className="space-y-6">
      {/* AI Analysis Header */}
      <div className="card bg-gradient-to-r from-primary-50 to-purple-50 border-primary-200">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">AI Learning Gap Analysis</h2>
            <p className="text-gray-600">Based on your recent performance data, here are the areas that need attention</p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="w-12 h-12 bg-danger-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <AlertTriangle className="w-6 h-6 text-danger-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">3</h3>
          <p className="text-sm text-gray-600">Learning Gaps Identified</p>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Target className="w-6 h-6 text-warning-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">28%</h3>
          <p className="text-sm text-gray-600">Performance Impact</p>
        </div>
        <div className="card text-center">
          <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-success-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">15%</h3>
          <p className="text-sm text-gray-600">Potential Improvement</p>
        </div>
      </div>

      {/* Learning Gaps */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Identified Learning Gaps</h3>
        <div className="space-y-6">
          {learningGaps.map((gap) => (
            <GapCard key={gap.id} gap={gap} />
          ))}
        </div>
      </div>

      {/* Skill Breakdown Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={skillBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {skillBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h3>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <RecommendationCard key={index} {...rec} />
            ))}
          </div>
        </div>
      </div>

      {/* Action Plan */}
      <div className="card bg-gradient-to-r from-success-50 to-primary-50 border-success-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Action Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">This Week:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-success-600" />
                <span>Complete 3 practice sets on quadratic equations</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-success-600" />
                <span>Watch 2 video tutorials on WWII timeline</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-success-600" />
                <span>Write 1 practice essay with proper structure</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Next Week:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-warning-600" />
                <span>Take assessment tests for all subjects</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-warning-600" />
                <span>Review and revise weak areas</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-warning-600" />
                <span>Schedule tutoring sessions if needed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 
