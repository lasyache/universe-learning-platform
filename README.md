# UniVerse Learning Platform

An AI-powered educational analytics platform that provides comprehensive insights for students, teachers, and parents to optimize learning outcomes.

## 🚀 Features

### For Students
- **AI-powered learning gap analysis** - Identify areas of improvement
- **Personalized study recommendations** - Tailored learning plans
- **Progress tracking and insights** - Real-time performance monitoring
- **Interactive performance charts** - Visual progress representation

### For Teachers
- **Class-wide performance analytics** - Monitor entire class progress
- **Bulk assignment upload** - Efficient assignment management
- **Video recommendation system** - Share targeted learning content
- **Student progress monitoring** - Track individual student growth

### For Parents
- **Real-time progress tracking** - Monitor child's learning journey
- **Performance notifications** - Stay informed about achievements
- **Learning recommendations** - Support child's education
- **Communication with teachers** - Direct messaging system

## 💰 Pricing Plans

### Free Plan ($0/month)
- Access to all resources
- Personalized learning plan (follow student's goal and study habit)
- Progress tracking
- Communication tool (talk online)
- Grade tracking
- Ads

### Premium Plan ($25/month)
- Everything in Free
- Advanced analytics & insights on student progress
- AI grading
- Priority support for premium users
- Advanced communication tools (video conferencing)
- No ads
- Unlimited assignments
- Bulk upload features

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Authentication**: Custom implementation with localStorage

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd universe-learning-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
universe-learning-platform/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── AuthModal.tsx    # Authentication modal
│   │   ├── AuthGuard.tsx    # Route protection
│   │   └── QRCode.tsx       # Mobile QR code generator
│   ├── student/             # Student dashboard
│   ├── teacher/             # Teacher dashboard
│   ├── parent/              # Parent dashboard
│   ├── data-sync/           # Data synchronization
│   ├── demo/                # Demo video page
│   ├── features/            # Platform features
│   ├── contact/             # Contact sales page
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── public/                  # Static assets
├── tailwind.config.js       # Tailwind configuration
├── package.json             # Dependencies and scripts
└── README.md               # Project documentation
```

## 🎯 Key Features

### Authentication System
- Multi-role authentication (Student, Teacher, Parent)
- Teacher verification with district information
- Persistent login state
- Role-based access control

### Dashboard Analytics
- Interactive charts and graphs
- Real-time data visualization
- Performance tracking
- Learning gap identification

### Data Management
- Bulk assignment upload
- Platform integration
- Data synchronization
- Import/export capabilities

### Communication Tools
- In-app messaging
- Video conferencing (Premium)
- Teacher-parent communication
- Student-teacher interaction

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Email**: support@universelearning.com
- **Documentation**: [docs.universelearning.com](https://docs.universelearning.com)
- **Contact Sales**: [Contact Page](/contact)

## 🎉 Acknowledgments

- Built with Next.js and TypeScript
- Styled with Tailwind CSS
- Icons from Lucide React
- Charts powered by Recharts

---

**UniVerse Learning** - Transforming education with AI-powered analytics and insights. 