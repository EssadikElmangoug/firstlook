import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex flex-col items-center justify-center flex-grow px-4 py-12 md:py-24">
        {/* Hero Section */}
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Your <span className="text-[#776BA2]">First Look</span> at AI-Powered Health Companion
            </h1>
            <p className="text-xl text-gray-600">
              Meet your 24/7 personal health assistant that listens, learns, and guides you toward your wellness goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup" className="cursor-pointer">
                <button className="px-6 py-3 bg-[#776BA2] text-white font-medium rounded-md hover:bg-[#665a91] transition-colors shadow-sm w-full sm:w-auto">
                  Meet Your Health Assistant
                </button>
              </Link>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl">
            <Image 
              src="/health-assistant.jpg" 
              alt="AI Health Assistant Interface" 
              fill
              style={{ objectFit: 'cover' }}
              priority
              className="rounded-lg"
            />
          </div>
        </div>
        
        {/* Features Section */}
        <div className="max-w-6xl w-full mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Your AI Health Companion</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#f8f7fc] rounded-full flex items-center justify-center mb-4">
                  <span className="text-[#776BA2] text-xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Conversation Section */}
        <div className="max-w-6xl w-full mx-auto mb-20 bg-[#f8f7fc] p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Conversations That Transform Health</h2>
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-[#f0eef8] rounded-lg p-3 max-w-[80%]">
                  <p className="text-gray-800">I've been feeling tired lately, even after 8 hours of sleep. Any suggestions?</p>
                </div>
              </div>
              <div className="flex items-start justify-end">
                <div className="bg-[#776BA2] text-white rounded-lg p-3 max-w-[80%]">
                  <p>I understand how frustrating that can be. Let's look at a few factors that might be affecting your sleep quality:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Your recent sleep patterns show interrupted sleep between 2-3 AM</li>
                    <li>Your evening screen time has increased by 45 minutes</li>
                    <li>Caffeine consumption is happening later in the day</li>
                  </ul>
                  <p className="mt-2">Would you like me to suggest a personalized evening routine to improve your sleep quality?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* How It Works Section */}
        <div className="max-w-6xl w-full mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">How Your AI Health Assistant Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-[#f8f7fc] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 z-10 relative">
                  <span className="text-[#776BA2] font-bold text-xl">{index + 1}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute top-8 left-1/2 w-full h-0.5 bg-[#e0dcf0] -z-10 hidden md:block"></div>
                )}
                <h3 className="text-lg font-semibold text-center mb-2">{step.title}</h3>
                <p className="text-gray-600 text-center">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Testimonials Section */}
        <div className="max-w-6xl w-full mx-auto mb-20 bg-[#f8f7fc] p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Health Conversations That Matter</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      width={48} 
                      height={48}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.achievement}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* AI Assistant Capabilities Section */}
        <div className="max-w-6xl w-full mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Your AI Health Assistant Can:</h2>
              <ul className="space-y-4">
                {aiCapabilities.map((capability, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#776BA2] mr-3 text-xl">✓</span>
                    <span className="text-gray-700">{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden shadow-xl order-1 md:order-2">
              <Image 
                src="/ai-assistant.jpg" 
                alt="AI Health Assistant" 
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="max-w-4xl w-full mx-auto text-center bg-[#776BA2] text-white p-12 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Start Talking to Your Health Assistant Today</h2>
          <p className="text-xl mb-8 opacity-90">Experience the future of personalized health guidance through natural conversation.</p>
          <Link href="/signup" className="cursor-pointer">
            <button className="px-8 py-3 bg-white text-[#776BA2] font-medium rounded-md hover:bg-gray-100 transition-colors shadow-sm">
              Get Started Free
            </button>
          </Link>
          <p className="mt-4 text-sm opacity-80">No credit card required. 14-day free trial.</p>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-50 ">
        <div className="max-w-6xl mx-auto px-4">
          <div className="pt-8 border-t border-gray-200 text-center text-gray-500">
            <p className="mb-2">© {new Date().getFullYear()} First Look Health AI. All rights reserved.</p>
            <p className="text-xs">First Look is not a medical device and is not intended to diagnose, treat, cure, or prevent any disease.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

// Sample data
const features = [
  {
    icon: "💬",
    title: "Natural Conversations",
    description: "Talk to your AI health assistant just like you would with a human health coach, using natural language and questions."
  },
  {
    icon: "🧠",
    title: "Personalized Guidance",
    description: "Receive health advice tailored specifically to your unique body, preferences, and goals through ongoing conversations."
  },
  {
    icon: "🔄",
    title: "Continuous Learning",
    description: "Your AI assistant remembers your history and learns from every interaction to provide increasingly relevant guidance."
  }
];

const steps = [
  {
    title: "Chat",
    description: "Start a conversation about your health goals or concerns in natural language."
  },
  {
    title: "Listen",
    description: "Your AI assistant listens and understands your unique situation and needs."
  },
  {
    title: "Guide",
    description: "Receive personalized guidance, suggestions, and answers to your questions."
  },
  {
    title: "Evolve",
    description: "Your assistant learns from each conversation to provide better support over time."
  }
];

const testimonials = [
  {
    name: "Emma Rodriguez",
    achievement: "Managing diabetes with confidence",
    avatar: "/avatars/avatar1.jpg",
    quote: "Having my AI health assistant available 24/7 to answer questions about my blood sugar levels and diet has given me confidence I never had before. It's like having a knowledgeable friend always ready to help."
  },
  {
    name: "David Chen",
    achievement: "Overcame chronic insomnia",
    avatar: "/avatars/avatar2.jpg",
    quote: "I was skeptical at first, but the personalized sleep recommendations and being able to discuss my concerns anytime made all the difference. My assistant suggested small changes I'd never considered before."
  }
];

const aiCapabilities = [
  "Answer your health questions with evidence-based information",
  "Help you understand lab results and health metrics",
  "Provide personalized nutrition and meal suggestions",
  "Guide you through appropriate exercise routines",
  "Offer stress management and mindfulness techniques",
  "Help track medications and supplement schedules",
  "Remind you about health appointments and screenings"
];
