const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function createPresentation() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 }
  });

  const page = await browser.newPage();
  
  // Navigate to the app
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // Create screenshots directory
  const screenshotsDir = path.join(__dirname, '../screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const screenshots = [];

  // 1. Landing Page
  console.log('Capturing Landing Page...');
  await page.waitForSelector('.card', { timeout: 10000 });
  await page.screenshot({
    path: path.join(screenshotsDir, '01-landing-page.png'),
    fullPage: true
  });
  screenshots.push({
    title: 'UniVerse Learning Platform',
    description: 'Main landing page with dashboard selection and platform overview',
    path: '01-landing-page.png'
  });

  // 2. Student Dashboard
  console.log('Capturing Student Dashboard...');
  await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a'));
    const studentLink = links.find(link => link.href.includes('/student'));
    if (studentLink) studentLink.click();
  });
  await new Promise(resolve => setTimeout(resolve, 3000));
  await page.waitForSelector('.card', { timeout: 10000 });
  await page.screenshot({
    path: path.join(screenshotsDir, '02-student-dashboard.png'),
    fullPage: true
  });
  screenshots.push({
    title: 'Student Dashboard',
    description: 'Personal learning analytics, performance tracking, and AI-powered gap identification',
    path: '02-student-dashboard.png'
  });

  // 3. Student Dashboard - Charts Detail
  console.log('Capturing Student Dashboard charts...');
  await page.evaluate(() => {
    window.scrollTo(0, 800);
  });
  await new Promise(resolve => setTimeout(resolve, 1000));
  await page.screenshot({
    path: path.join(screenshotsDir, '03-student-charts.png'),
    fullPage: false
  });
  screenshots.push({
    title: 'Student Performance Analytics',
    description: 'Interactive charts showing performance trends and subject breakdowns',
    path: '03-student-charts.png'
  });

  // 4. Student Dashboard - Learning Gaps
  console.log('Capturing Student Learning Gaps...');
  await page.evaluate(() => {
    window.scrollTo(0, 1200);
  });
  await new Promise(resolve => setTimeout(resolve, 1000));
  await page.screenshot({
    path: path.join(screenshotsDir, '04-student-gaps.png'),
    fullPage: false
  });
  screenshots.push({
    title: 'AI Learning Gap Analysis',
    description: 'Detailed view of identified learning gaps with personalized recommendations',
    path: '04-student-gaps.png'
  });

  // 5. Teacher Dashboard
  console.log('Capturing Teacher Dashboard...');
  await page.goto('http://localhost:3000/teacher', { waitUntil: 'networkidle0' });
  await new Promise(resolve => setTimeout(resolve, 2000));
  await page.waitForSelector('.card', { timeout: 10000 });
  await page.screenshot({
    path: path.join(screenshotsDir, '05-teacher-dashboard.png'),
    fullPage: true
  });
  screenshots.push({
    title: 'Teacher Dashboard',
    description: 'Class analytics, student management, bulk assignment upload, and video recommendation system',
    path: '05-teacher-dashboard.png'
  });

  // 6. Teacher Dashboard - Students Overview
  console.log('Capturing Teacher Students Overview...');
  await page.evaluate(() => {
    window.scrollTo(0, 800);
  });
  await new Promise(resolve => setTimeout(resolve, 1000));
  await page.screenshot({
    path: path.join(screenshotsDir, '06-teacher-students.png'),
    fullPage: false
  });
  screenshots.push({
    title: 'Student Management',
    description: 'Overview of all students with performance indicators and status tracking',
    path: '06-teacher-students.png'
  });

  // 7. Teacher Dashboard - Common Gaps
  console.log('Capturing Teacher Common Gaps...');
  await page.evaluate(() => {
    window.scrollTo(0, 1200);
  });
  await new Promise(resolve => setTimeout(resolve, 1000));
  await page.screenshot({
    path: path.join(screenshotsDir, '07-teacher-gaps.png'),
    fullPage: false
  });
  screenshots.push({
    title: 'Class Learning Gaps',
    description: 'Common learning gaps across the class with video recommendation system',
    path: '07-teacher-gaps.png'
  });

  // 8. Teacher Dashboard - Video Library
  console.log('Capturing Teacher Video Library...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const videoButton = buttons.find(btn => btn.textContent.includes('Video Library'));
    if (videoButton) videoButton.click();
  });
  await new Promise(resolve => setTimeout(resolve, 2000));
  await page.screenshot({
    path: path.join(screenshotsDir, '08-teacher-videos.png'),
    fullPage: true
  });
  screenshots.push({
    title: 'Video Library',
    description: 'Educational video library with rating system and class distribution',
    path: '08-teacher-videos.png'
  });

  // 9. Parent Dashboard
  console.log('Capturing Parent Dashboard...');
  await page.goto('http://localhost:3000/parent', { waitUntil: 'networkidle0' });
  await new Promise(resolve => setTimeout(resolve, 2000));
  await page.waitForSelector('.card', { timeout: 10000 });
  await page.screenshot({
    path: path.join(screenshotsDir, '09-parent-dashboard.png'),
    fullPage: true
  });
  screenshots.push({
    title: 'Parent Dashboard',
    description: 'Child progress monitoring, performance insights, and teacher communication',
    path: '09-parent-dashboard.png'
  });

  // 10. Parent Dashboard - Children Overview
  console.log('Capturing Parent Children Overview...');
  await page.evaluate(() => {
    window.scrollTo(0, 600);
  });
  await new Promise(resolve => setTimeout(resolve, 1000));
  await page.screenshot({
    path: path.join(screenshotsDir, '10-parent-children.png'),
    fullPage: false
  });
  screenshots.push({
    title: 'Children Progress Tracking',
    description: 'Multi-child support with individual progress cards and achievements',
    path: '10-parent-children.png'
  });

  // 11. Parent Dashboard - Activities
  console.log('Capturing Parent Activities...');
  await page.evaluate(() => {
    window.scrollTo(0, 1000);
  });
  await new Promise(resolve => setTimeout(resolve, 1000));
  await page.screenshot({
    path: path.join(screenshotsDir, '11-parent-activities.png'),
    fullPage: false
  });
  screenshots.push({
    title: 'Activity Timeline',
    description: 'Real-time activity feed showing assignments, achievements, and improvements',
    path: '11-parent-activities.png'
  });

  // 12. Parent Dashboard - Teacher Messages
  console.log('Capturing Parent Teacher Messages...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const messagesButton = buttons.find(btn => btn.textContent.includes('Teacher Messages'));
    if (messagesButton) messagesButton.click();
  });
  await new Promise(resolve => setTimeout(resolve, 2000));
  await page.screenshot({
    path: path.join(screenshotsDir, '12-parent-messages.png'),
    fullPage: true
  });
  screenshots.push({
    title: 'Teacher Communication',
    description: 'Direct messaging system with teachers and meeting scheduling',
    path: '12-parent-messages.png'
  });

  await browser.close();

  // Generate HTML presentation
  const htmlContent = generateHTMLPresentation(screenshots);
  const htmlPath = path.join(__dirname, '../presentation.html');
  fs.writeFileSync(htmlPath, htmlContent);

  console.log('✅ Screenshots captured successfully!');
  console.log('📁 Screenshots saved in: screenshots/');
  console.log('📄 HTML presentation saved as: presentation.html');
  console.log('🔄 Converting to PDF...');

  // Convert HTML to PDF
  await convertToPDF(htmlPath);
}

function generateHTMLPresentation(screenshots) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UniVerse Learning Platform - Complete App Presentation</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .slide {
            width: 100%;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 40px;
            page-break-after: always;
        }
        
        .slide:last-child {
            page-break-after: avoid;
        }
        
        .title-slide {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
        }
        
        .title-slide h1 {
            font-size: 4rem;
            font-weight: 700;
            margin-bottom: 1rem;
            text-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        
        .title-slide p {
            font-size: 1.5rem;
            font-weight: 300;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        
        .feature-slide {
            background: white;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            align-items: center;
        }
        
        .feature-content {
            padding: 40px;
        }
        
        .feature-content h2 {
            font-size: 2.5rem;
            font-weight: 600;
            color: #1e40af;
            margin-bottom: 1rem;
        }
        
        .feature-content p {
            font-size: 1.2rem;
            color: #6b7280;
            margin-bottom: 2rem;
        }
        
        .feature-image {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        .feature-image img {
            max-width: 100%;
            max-height: 80vh;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            border: 1px solid #e5e7eb;
        }
        
        .overview-slide {
            background: white;
            text-align: center;
            padding: 60px;
        }
        
        .overview-slide h2 {
            font-size: 3rem;
            font-weight: 600;
            color: #1e40af;
            margin-bottom: 2rem;
        }
        
        .overview-slide p {
            font-size: 1.3rem;
            color: #6b7280;
            max-width: 800px;
            margin: 0 auto;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 3rem;
        }
        
        .feature-card {
            background: #f8fafc;
            padding: 30px;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
        }
        
        .feature-card h3 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #1e40af;
            margin-bottom: 1rem;
        }
        
        .feature-card p {
            color: #64748b;
            line-height: 1.6;
        }
        
        .tech-slide {
            background: white;
            padding: 60px;
        }
        
        .tech-slide h2 {
            font-size: 3rem;
            font-weight: 600;
            color: #1e40af;
            text-align: center;
            margin-bottom: 3rem;
        }
        
        .tech-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
        }
        
        .tech-item {
            background: #f1f5f9;
            padding: 25px;
            border-radius: 8px;
            text-align: center;
            border: 1px solid #e2e8f0;
        }
        
        .tech-item h3 {
            font-size: 1.3rem;
            font-weight: 600;
            color: #1e40af;
            margin-bottom: 0.5rem;
        }
        
        .tech-item p {
            color: #64748b;
            font-size: 0.9rem;
        }
        
        .dashboard-section {
            background: white;
            padding: 60px;
        }
        
        .dashboard-section h2 {
            font-size: 3rem;
            font-weight: 600;
            color: #1e40af;
            text-align: center;
            margin-bottom: 3rem;
        }
        
        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 40px;
        }
        
        .dashboard-card {
            background: #f8fafc;
            padding: 30px;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            text-align: center;
        }
        
        .dashboard-card h3 {
            font-size: 1.8rem;
            font-weight: 600;
            color: #1e40af;
            margin-bottom: 1rem;
        }
        
        .dashboard-card p {
            color: #64748b;
            line-height: 1.6;
            margin-bottom: 1.5rem;
        }
        
        .dashboard-features {
            list-style: none;
            text-align: left;
        }
        
        .dashboard-features li {
            padding: 0.5rem 0;
            color: #64748b;
            display: flex;
            align-items: center;
        }
        
        .dashboard-features li:before {
            content: "✓";
            color: #10b981;
            font-weight: bold;
            margin-right: 0.5rem;
        }
        
        @media print {
            .slide {
                page-break-after: always;
                min-height: 100vh;
            }
        }
    </style>
</head>
<body>
    <!-- Title Slide -->
    <div class="slide title-slide">
        <h1>UniVerse Learning Platform</h1>
        <p>AI-Powered Educational Analytics Platform</p>
        <p style="font-size: 1.2rem; margin-top: 2rem;">Complete App Presentation - Student, Teacher & Parent Dashboards</p>
    </div>

    <!-- Overview Slide -->
    <div class="slide overview-slide">
        <h2>Platform Overview</h2>
        <p style="font-size: 1.3rem; color: #6b7280; max-width: 800px; margin: 0 auto;">
            UniVerse Learning is a comprehensive educational platform that connects students, teachers, and parents through AI-powered analytics, 
            providing personalized insights and actionable recommendations to improve learning outcomes.
        </p>
        
        <div class="features-grid">
            <div class="feature-card">
                <h3>🎓 Student Dashboard</h3>
                <p>Personal learning analytics with AI-powered gap identification and personalized study recommendations</p>
            </div>
            <div class="feature-card">
                <h3>👨‍🏫 Teacher Dashboard</h3>
                <p>Class analytics, student management, bulk assignment upload, and video recommendation system</p>
            </div>
            <div class="feature-card">
                <h3>👨‍👩‍👧‍👦 Parent Dashboard</h3>
                <p>Child progress monitoring, performance insights, and direct communication with teachers</p>
            </div>
        </div>
    </div>

    <!-- Dashboard Sections -->
    <div class="slide dashboard-section">
        <h2>Three Integrated Dashboards</h2>
        <div class="dashboard-grid">
            <div class="dashboard-card">
                <h3>Student Dashboard</h3>
                <p>Empowers students with personalized learning insights and AI-driven recommendations</p>
                <ul class="dashboard-features">
                    <li>Real-time performance tracking</li>
                    <li>AI-powered learning gap analysis</li>
                    <li>Personalized study recommendations</li>
                    <li>Interactive performance charts</li>
                    <li>Assignment management</li>
                    <li>Progress visualization</li>
                </ul>
            </div>
            <div class="dashboard-card">
                <h3>Teacher Dashboard</h3>
                <p>Provides teachers with comprehensive class analytics and student management tools</p>
                <ul class="dashboard-features">
                    <li>Class-wide performance analytics</li>
                    <li>Individual student tracking</li>
                    <li>Bulk assignment upload</li>
                    <li>Video recommendation system</li>
                    <li>Learning gap identification</li>
                    <li>Communication tools</li>
                </ul>
            </div>
            <div class="dashboard-card">
                <h3>Parent Dashboard</h3>
                <p>Enables parents to monitor their children's progress and communicate with teachers</p>
                <ul class="dashboard-features">
                    <li>Multi-child support</li>
                    <li>Real-time progress tracking</li>
                    <li>Performance notifications</li>
                    <li>Teacher communication</li>
                    <li>Learning insights</li>
                    <li>Meeting scheduling</li>
                </ul>
            </div>
        </div>
    </div>

    <!-- Feature Slides -->
    ${screenshots.map((screenshot, index) => `
    <div class="slide feature-slide">
        <div class="feature-content">
            <h2>${screenshot.title}</h2>
            <p>${screenshot.description}</p>
        </div>
        <div class="feature-image">
            <img src="screenshots/${screenshot.path}" alt="${screenshot.title}">
        </div>
    </div>
    `).join('')}

    <!-- Technology Stack -->
    <div class="slide tech-slide">
        <h2>Technology Stack</h2>
        <div class="tech-grid">
            <div class="tech-item">
                <h3>Next.js 14</h3>
                <p>React framework with App Router</p>
            </div>
            <div class="tech-item">
                <h3>TypeScript</h3>
                <p>Type-safe development</p>
            </div>
            <div class="tech-item">
                <h3>Tailwind CSS</h3>
                <p>Utility-first styling</p>
            </div>
            <div class="tech-item">
                <h3>Recharts</h3>
                <p>Data visualization</p>
            </div>
            <div class="tech-item">
                <h3>Lucide React</h3>
                <p>Modern icon library</p>
            </div>
            <div class="tech-item">
                <h3>Framer Motion</h3>
                <p>Animations & interactions</p>
            </div>
            <div class="tech-item">
                <h3>React Hook Form</h3>
                <p>Form management</p>
            </div>
            <div class="tech-item">
                <h3>Puppeteer</h3>
                <p>PDF generation</p>
            </div>
        </div>
    </div>

    <!-- Conclusion Slide -->
    <div class="slide title-slide">
        <h1>Thank You!</h1>
        <p>UniVerse Learning Platform - Transforming Education with AI</p>
        <p style="font-size: 1.2rem; margin-top: 2rem;">Ready for deployment and further development</p>
    </div>
</body>
</html>
  `;
}

async function convertToPDF(htmlPath) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
  
  await page.pdf({
    path: path.join(__dirname, '../UniVerse-Learning-Platform-Presentation.pdf'),
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0.5in',
      right: '0.5in',
      bottom: '0.5in',
      left: '0.5in'
    }
  });
  
  await browser.close();
  
  console.log('✅ PDF presentation created: UniVerse-Learning-Platform-Presentation.pdf');
}

// Run the script
createPresentation().catch(console.error); 