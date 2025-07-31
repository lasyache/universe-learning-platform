import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface LearningGap {
  subject: string
  topic: string
  severity: 'high' | 'medium' | 'low'
  impact: number
  description: string
  recommendations: string[]
}

// Simple AI analysis function (in a real app, this would use actual ML models)
function analyzeLearningGaps(studentData: any): LearningGap[] {
  const gaps: LearningGap[] = []
  
  // Analyze each subject
  studentData.subjects?.forEach((subject: any) => {
    subject.topics?.forEach((topic: any) => {
      if (topic.score < 75) {
        const severity: 'high' | 'medium' = topic.score < 70 ? 'high' : 'medium'
        const impact = Math.round((75 - topic.score) * 2)
        
        gaps.push({
          subject: subject.name,
          topic: topic.name,
          severity,
          impact,
          description: `Struggling with ${topic.name} concepts in ${subject.name}`,
          recommendations: generateRecommendations(subject.name, topic.name, topic.score)
        })
      }
    })
  })
  
  return gaps.sort((a, b) => b.impact - a.impact)
}

function generateRecommendations(subject: string, topic: string, score: number): string[] {
  const recommendations: string[] = []
  
  if (score < 70) {
    recommendations.push('Seek additional tutoring or help from teachers')
    recommendations.push('Practice with step-by-step examples')
  }
  
  if (subject === 'Mathematics') {
    recommendations.push('Use online interactive tools and calculators')
    recommendations.push('Review fundamental concepts before advanced topics')
  } else if (subject === 'History') {
    recommendations.push('Create timeline flashcards for key events')
    recommendations.push('Watch documentary videos for visual learning')
  } else if (subject === 'Science') {
    recommendations.push('Use simulation software for experiments')
    recommendations.push('Practice with real-world examples')
  } else if (subject === 'English') {
    recommendations.push('Read sample essays and analyze structure')
    recommendations.push('Practice writing with timed exercises')
  }
  
  return recommendations
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // In a real app, you would validate the data and potentially use external AI services
    const studentData = body.studentData || {}
    
    // Perform AI analysis
    const learningGaps = analyzeLearningGaps(studentData)
    
    // Calculate overall statistics
    const totalAssignments = studentData.subjects?.reduce((acc: number, subject: any) => {
      return acc + subject.topics?.reduce((topicAcc: number, topic: any) => {
        return topicAcc + (topic.assignments?.length || 0)
      }, 0)
    }, 0) || 0
    
    const averageScore = studentData.subjects?.reduce((acc: number, subject: any) => {
      return acc + subject.overall_score
    }, 0) / (studentData.subjects?.length || 1) || 0
    
    const analysis = {
      learningGaps,
      summary: {
        totalGaps: learningGaps.length,
        highPriorityGaps: learningGaps.filter((gap: any) => gap.severity === 'high').length,
        averageScore: Math.round(averageScore),
        totalAssignments,
        potentialImprovement: Math.round(learningGaps.reduce((acc: number, gap: any) => acc + gap.impact, 0))
      },
      recommendations: {
        immediate: learningGaps.slice(0, 3).map((gap: any) => 
          `Focus on ${gap.topic} in ${gap.subject}`
        ),
        longTerm: [
          'Develop consistent study habits',
          'Improve time management skills',
          'Build confidence in weak subjects'
        ]
      }
    }
    
    return NextResponse.json({
      success: true,
      analysis,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to analyze data' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Load sample data for demonstration
    const sampleDataPath = path.join(process.cwd(), 'data', 'sample-data.json')
    const sampleData = JSON.parse(fs.readFileSync(sampleDataPath, 'utf8'))
    
    const learningGaps = analyzeLearningGaps(sampleData)
    
    const analysis = {
      learningGaps,
      summary: {
        totalGaps: learningGaps.length,
        highPriorityGaps: learningGaps.filter((gap: any) => gap.severity === 'high').length,
        averageScore: 81,
        totalAssignments: 36,
        potentialImprovement: Math.round(learningGaps.reduce((acc: number, gap: any) => acc + gap.impact, 0))
      }
    }
    
    return NextResponse.json({
      success: true,
      analysis,
      sampleData: sampleData.student
    })
    
  } catch (error) {
    console.error('Error loading sample data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to load sample data' },
      { status: 500 }
    )
  }
} 