import React from 'react'
import DashboardNavbar from '@/components/DashboardNavbar'
import Link from 'next/link';
import { FaRobot, FaArrowRight, FaChartLine, FaCalendarAlt, FaBookMedical } from 'react-icons/fa';

const page = () => {
  return (
    <div className='flex flex-col w-full h-full'>
      <DashboardNavbar />
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#776AA6] to-[#9183C1] text-white p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome to Your Health Dashboard</h1>
          <p className="opacity-90 max-w-2xl">Access personalized health insights, chat with your AI assistant, and track your wellness journey all in one place.</p>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto w-full px-4 py-6 h-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Health Tools</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* AI Doctor Chat Block */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="bg-gradient-to-r from-[#776AA6] to-[#9183C1] p-4">
              <div className="flex items-center">
                <div className="bg-white p-2 rounded-full">
                  <FaRobot className="text-[#776AA6] text-xl" />
                </div>
                <h3 className="text-white font-bold ml-3 text-lg">AI Health Assistant</h3>
              </div>
            </div>
            
            <div className="p-5">
              <p className="text-gray-600 mb-4">
                Get instant medical advice and answers to your health questions from our AI-powered health assistant.
              </p>
              
              <div className="bg-[#f8f7fc] rounded-lg p-3 mb-4 border-l-4 border-[#776AA6]">
                <p className="text-sm italic text-gray-500">
                  "How can I manage my seasonal allergies without medication?"
                </p>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Available 24/7</span>
                <Link 
                  href={`/dashboard/chat/${crypto.randomUUID()}`}
                  className="flex items-center text-[#776AA6] font-medium hover:text-[#5D5384] transition-colors"
                >
                  Start Chat <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Sample data for recent activities
const recentActivities = [
  {
    icon: <FaRobot className="text-[#776AA6]" />,
    iconBg: "bg-[#f8f7fc]",
    title: "AI Health Chat",
    description: "You discussed sleep improvement strategies with your AI assistant",
    time: "Today, 10:30 AM"
  },
  {
    icon: <FaChartLine className="text-[#776AA6]" />,
    iconBg: "bg-[#f8f7fc]",
    title: "Health Insight Generated",
    description: "New insights about your exercise patterns are available",
    time: "Yesterday, 3:45 PM"
  },
  {
    icon: <FaCalendarAlt className="text-[#776AA6]" />,
    iconBg: "bg-[#f8f7fc]",
    title: "Appointment Reminder",
    description: "Your dental check-up is scheduled for next week",
    time: "2 days ago"
  }
];

// Sample data for health resources
const healthResources = [
  {
    title: "Seasonal Allergy Guide",
    description: "Learn about managing allergies naturally with our comprehensive guide",
    link: "/resources/allergies"
  },
  {
    title: "Sleep Improvement Techniques",
    description: "Evidence-based strategies to improve your sleep quality and duration",
    link: "/resources/sleep"
  },
  {
    title: "Nutrition Fundamentals",
    description: "Understanding the basics of balanced nutrition for optimal health",
    link: "/resources/nutrition"
  },
  {
    title: "Stress Management",
    description: "Effective techniques for reducing stress and improving mental wellbeing",
    link: "/resources/stress"
  }
];

export default page;