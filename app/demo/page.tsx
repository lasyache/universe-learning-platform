'use client'

import React, { useState, useRef } from 'react'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  ArrowLeft,
  Users,
  BookOpen,
  Brain,
  TrendingUp,
  CheckCircle,
  Star,
  SkipBack,
  SkipForward,
  Settings,
  Download
} from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: Users,
    title: 'Multi-User Support',
    description: 'Seamless experience for students, teachers, and parents'
  },
  {
    icon: Brain,
    title: 'AI-Powered Learning',
    description: 'Intelligent gap analysis and personalized recommendations'
  },
  {
    icon: BookOpen,
    title: 'Rich Content Library',
    description: 'Access to comprehensive learning materials and resources'
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Real-time analytics and performance monitoring'
  }
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Math Teacher',
    content: 'UniVerse has transformed how I teach. The gap analysis helps me identify exactly where students need help.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Student',
    content: 'I love how personalized the learning experience is. It feels like the platform knows exactly what I need.',
    rating: 5
  },
  {
    name: 'Lisa Rodriguez',
    role: 'Parent',
    content: 'As a parent, I can easily track my child\'s progress and understand their learning journey.',
    rating: 5
  }
]

const demoChapters = [
  { time: 0, title: 'Introduction', description: 'Welcome to UniVerse Learning Platform' },
  { time: 30, title: 'Student Dashboard', description: 'Personal learning analytics and gap identification' },
  { time: 90, title: 'Teacher Dashboard', description: 'Class analytics and student management' },
  { time: 150, title: 'Parent Dashboard', description: 'Child progress monitoring and insights' },
  { time: 210, title: 'AI Analytics', description: 'Learning gap analysis and recommendations' },
  { time: 270, title: 'Data Sync', description: 'Bulk upload and platform integration' },
  { time: 330, title: 'Conclusion', description: 'Getting started with UniVerse' }
]

export default function Demo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [showControls, setShowControls] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setVolume(newVolume)
    }
  }

  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const getCurrentChapter = () => {
    return demoChapters.reduce((current, chapter) => {
      return currentTime >= chapter.time ? chapter : current
    })
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
            See UniVerse in Action
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch our comprehensive demo to discover how UniVerse Learning Platform 
            revolutionizes education for students, teachers, and parents.
          </p>
        </div>

        {/* Video Player */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
            <video
              ref={videoRef}
              className="w-full h-auto"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onMouseMove={() => setShowControls(true)}
              onMouseLeave={() => setTimeout(() => setShowControls(false), 3000)}
            >
              <source src="/demo-video.mp4" type="video/mp4" />
              <source src="/demo-video.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
            
            {/* Video Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
            
            {/* Current Chapter Display */}
            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
              {getCurrentChapter().title}
            </div>
            
            {/* Custom Video Controls */}
            <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
              {/* Progress Bar */}
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-white/30 rounded-full appearance-none cursor-pointer slider"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Play/Pause */}
                <button
                  onClick={handlePlayPause}
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-1" />
                  )}
                </button>
                
                {/* Skip Back/Forward */}
                <button
                  onClick={() => skipTime(-10)}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <SkipBack className="w-5 h-5 text-white" />
                </button>
                
                <button
                  onClick={() => skipTime(10)}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <SkipForward className="w-5 h-5 text-white" />
                </button>
                
                {/* Time Display */}
                <span className="text-white text-sm font-medium">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
                
                {/* Volume Control */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleMute}
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5 text-white" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-white" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-2 bg-white/30 rounded-full appearance-none cursor-pointer slider"
                  />
                </div>
                
                {/* Fullscreen */}
                <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors ml-auto">
                  <Maximize className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Chapter Navigation */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Demo Chapters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {demoChapters.map((chapter, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = chapter.time
                    }
                  }}
                  className={`p-3 rounded-xl text-left transition-all ${
                    currentTime >= chapter.time && currentTime < (demoChapters[index + 1]?.time || duration)
                      ? 'bg-universe-gradient text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <div className="text-sm font-medium">{formatTime(chapter.time)}</div>
                  <div className="font-semibold">{chapter.title}</div>
                  <div className="text-xs opacity-80">{chapter.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="card text-center">
                <div className="w-16 h-16 bg-universe-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="card bg-universe-gradient text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Learning?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of educators and students already using UniVerse
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="btn-secondary bg-white text-universe-700 hover:bg-gray-50">
                Get Started Free
              </Link>
              <Link href="/student" className="btn-secondary bg-white/20 text-white hover:bg-white/30">
                Try Student Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #6366f1;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #6366f1;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  )
} 