import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-white">
      {/* Left side - Brand Panel */}
      <div className="hidden lg:flex lg:w-2/5 bg-[#f9f8fc] flex-col justify-between p-10">
        <div className="flex flex-col h-full justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/logo.png" 
              alt="First Look Logo" 
              width={32}  
              height={20} 
            />
            <span className="text-lg font-medium text-[#776BA2]">First Look</span>
          </Link>
          
          <div className="flex flex-col space-y-6">
            <h1 className="text-3xl font-semibold text-gray-800">Your AI Health Assistant</h1>
            <p className="text-base text-gray-600 leading-relaxed">
              Personalized health guidance through natural conversation, available whenever you need it.
            </p>
            
            <div className="border-l-4 border-[#776BA2] pl-4 py-2 mt-8">
              <p className="text-gray-700 text-sm">
                "First Look provides evidence-based health guidance that adapts to my needs. It's transformed how I approach my wellbeing."
              </p>
              <p className="text-gray-500 text-xs mt-2">— Sarah Johnson, Member</p>
            </div>
          </div>
          
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} First Look Health AI
          </p>
        </div>
      </div>
      
      {/* Right side - Auth Form */}
      <div className="w-full lg:w-3/5 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center mb-10">
            <Link href="/" className="flex items-center space-x-2">
              <Image 
                src="/logo.png" 
                alt="First Look Logo" 
                width={32}  
                height={20} 
              />
              <span className="text-lg font-medium text-[#776BA2]">First Look</span>
            </Link>
          </div>
          
          {/* Auth form content */}
          <div className="bg-white rounded-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
