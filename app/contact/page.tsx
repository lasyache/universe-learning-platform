'use client'

import React, { useState } from 'react'
import { 
  ArrowLeft,
  Phone,
  Mail,
  MessageSquare,
  Users,
  Building,
  Globe,
  Clock,
  CheckCircle,
  Star,
  DollarSign,
  Award,
  Shield,
  Zap,
  BookOpen,
  Brain,
  TrendingUp,
  Target
} from 'lucide-react'
import Link from 'next/link'

const pricingPlans = [
  {
    name: 'Starter',
    price: '$99',
    period: '/month',
    description: 'Perfect for small schools and individual educators',
    features: [
      'Up to 100 students',
      'Basic analytics',
      'Email support',
      'Standard integrations',
      'Mobile access'
    ],
    popular: false
  },
  {
    name: 'Professional',
    price: '$299',
    period: '/month',
    description: 'Ideal for growing educational institutions',
    features: [
      'Up to 500 students',
      'Advanced analytics',
      'Priority support',
      'All integrations',
      'Custom branding',
      'API access'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large districts and universities',
    features: [
      'Unlimited students',
      'Custom analytics',
      'Dedicated support',
      'White-label solution',
      'On-premise deployment',
      'Custom integrations'
    ],
    popular: false
  }
]

const salesTeam = [
  {
    name: 'Sarah Johnson',
    role: 'Senior Sales Manager',
    email: 'sarah.johnson@universe-learning.com',
    phone: '+1 (555) 123-4567',
    avatar: 'SJ',
    specialties: ['K-12 Schools', 'Districts', 'Implementation']
  },
  {
    name: 'Michael Chen',
    role: 'Enterprise Sales Director',
    email: 'michael.chen@universe-learning.com',
    phone: '+1 (555) 234-5678',
    avatar: 'MC',
    specialties: ['Universities', 'Large Districts', 'Custom Solutions']
  },
  {
    name: 'Lisa Rodriguez',
    role: 'Education Consultant',
    email: 'lisa.rodriguez@universe-learning.com',
    phone: '+1 (555) 345-6789',
    avatar: 'LR',
    specialties: ['Training', 'Onboarding', 'Best Practices']
  }
]

const contactMethods = [
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Speak directly with our sales team',
    action: '+1 (555) 123-4567',
    color: 'bg-success-500'
  },
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Get detailed information and quotes',
    action: 'sales@universe-learning.com',
    color: 'bg-universe-gradient'
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Chat with our team in real-time',
    action: 'Start Chat',
    color: 'bg-warning-500'
  }
]

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
    students: '',
    message: ''
  })

  const [selectedPlan, setSelectedPlan] = useState('Professional')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    console.log('Contact form submitted:', formData)
    alert('Thank you for your interest! Our sales team will contact you within 24 hours.')
  }

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
                <span className="text-white font-semibold">U</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Contact Sales
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your educational institution? Our sales team is here to help 
            you find the perfect solution for your needs.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon
            return (
              <div key={index} className="card text-center">
                <div className={`w-16 h-16 ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                <div className="text-universe-600 font-semibold">{method.action}</div>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
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
                    Last Name *
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="input-field"
                    placeholder="john@school.edu"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="input-field"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({...formData, organization: e.target.value})}
                    className="input-field"
                    placeholder="School District"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Role *
                  </label>
                  <select
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="input-field"
                  >
                    <option value="">Select your role</option>
                    <option value="administrator">Administrator</option>
                    <option value="principal">Principal</option>
                    <option value="teacher">Teacher</option>
                    <option value="it-director">IT Director</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Students
                </label>
                <select
                  value={formData.students}
                  onChange={(e) => setFormData({...formData, students: e.target.value})}
                  className="input-field"
                >
                  <option value="">Select range</option>
                  <option value="1-100">1-100 students</option>
                  <option value="101-500">101-500 students</option>
                  <option value="501-1000">501-1,000 students</option>
                  <option value="1000+">1,000+ students</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="input-field"
                  rows={4}
                  placeholder="Tell us about your needs and how we can help..."
                />
              </div>

              <button type="submit" className="w-full btn-primary">
                Send Message
              </button>
            </form>
          </div>

          {/* Sales Team */}
          <div className="space-y-8">
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Sales Team</h2>
              <div className="space-y-6">
                {salesTeam.map((member, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-universe-gradient rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">{member.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{member.role}</p>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-600">{member.email}</p>
                        <p className="text-gray-600">{member.phone}</p>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-gray-500">Specialties:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {member.specialties.map((specialty, idx) => (
                            <span key={idx} className="text-xs bg-universe-100 text-universe-700 px-2 py-1 rounded">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Preview */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pricing Plans</h2>
              <div className="space-y-4">
                {pricingPlans.map((plan, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedPlan === plan.name 
                        ? 'border-universe-500 bg-universe-50' 
                        : 'border-gray-200 hover:border-universe-300'
                    }`}
                    onClick={() => setSelectedPlan(plan.name)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                      {plan.popular && (
                        <span className="text-xs bg-universe-500 text-white px-2 py-1 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline space-x-1 mb-2">
                      <span className="text-2xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                    <ul className="space-y-1">
                      {plan.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-success-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="card bg-universe-gradient text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of educational institutions already using UniVerse Learning
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