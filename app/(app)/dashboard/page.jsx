import React from 'react'
import DashboardNavbar from '@/components/DashboardNavbar'
import Link from 'next/link';
import { FaRobot, FaArrowRight } from 'react-icons/fa';

const page = () => {
  return (
    <div className='flex flex-col w-full h-full'>
      <DashboardNavbar />
      <div className='flex flex-col w-full h-full'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 h-full">
          {/* AI Doctor Chat Block */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
              <div className="flex items-center">
                <div className="bg-white p-2 rounded-full">
                  <FaRobot className="text-blue-500 text-xl" />
                </div>
                <h3 className="text-white font-bold ml-3 text-lg">AI Doctor Chat</h3>
              </div>
            </div>
            
            <div className="p-5">
              <p className="text-gray-600 mb-4">
                Get instant medical advice and answers to your health questions from our AI-powered doctor assistant.
              </p>
              
              <div className="bg-gray-100 rounded-lg p-3 mb-4">
                <p className="text-sm italic text-gray-500">
                  "How can I manage my seasonal allergies without medication?"
                </p>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Available 24/7</span>
                <Link 
                  href={`/dashboard/chat/${crypto.randomUUID()}`}
                  className="flex items-center text-blue-500 font-medium hover:text-blue-700 transition-colors"
                >
                  Start Chat <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* You can add more blocks here */}
        </div>
      </div>
    </div>
  )
}

export default page