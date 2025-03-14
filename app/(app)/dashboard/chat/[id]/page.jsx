"use client";

import { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaRobot, FaUser, FaSpinner } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

export default function ChatPage({ params }) {
  const { id } = params;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Load chat history when component mounts
  useEffect(() => {
    const fetchChatHistory = async () => {
      setIsChatLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deepseek/chats/${id}`, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        });

        if (!response.ok) {
          throw new Error('Failed to load chat history');
        }

        const data = await response.json();
        
        if (data.messages && data.messages.length > 0) {
          // Format messages with timestamps
          const formattedMessages = data.messages.map((msg, index) => ({
            id: index + 1,
            role: msg.role,
            content: msg.content,
            timestamp: new Date(msg.timestamp || Date.now())
          }));
          setMessages(formattedMessages);
        } else {
          // If no messages, set default welcome message
          setMessages([{
            id: 1,
            role: 'assistant',
            content: 'Hello, I\'m your AI health assistant. I can provide general health information and guidance. How may I assist you today?',
            timestamp: new Date()
          }]);
        }
      } catch (error) {
        console.error('Error loading chat history:', error);
        // Set default message on error
        setMessages([{
          id: 1,
          role: 'assistant',
          content: 'Hello, I\'m your AI health assistant. I can provide general health information and guidance. How may I assist you today?',
          timestamp: new Date()
        }]);
      } finally {
        setIsChatLoading(false);
      }
    };

    fetchChatHistory();
  }, [id]);

  // Auto-scroll to bottom when messages change or typing status changes
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Focus textarea on component mount and after loading
  useEffect(() => {
    if (!isChatLoading && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isChatLoading]);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  }, [input]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Show typing indicator immediately
    setIsTyping(true);
    setIsLoading(true);

    try {
      // Get AI response
      const response = await getAIResponse(input, id);
      
      setIsTyping(false); // Hide typing indicator before showing response
      
      const aiResponse = {
        id: messages.length + 2,
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: messages.length + 2,
        role: 'assistant',
        content: 'I apologize, but I\'m experiencing technical difficulties at the moment. Please try again later or contact technical support if the issue persists.',
        timestamp: new Date()
      }]);
    } finally {
      if (isTyping) setIsTyping(false);
      setIsLoading(false);
    }
  };

  // Handle Enter key to submit (Shift+Enter for new line)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Professional AI responses
  const getAIResponse = async (query, id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/deepseek/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({ query, chatId: id })
      });

      if (!response.ok) throw new Error('Failed to get response');
      
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error('API error:', error);
      // For development/testing, simulate a delay and return a fallback response
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("I apologize, but I couldn't process your request at this time. Please try again later.");
        }, 1000);
      });
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Loading state while fetching chat history
  if (isChatLoading) {
    return (
      <div className="flex flex-col h-[calc(100vh-60px)] items-center justify-center bg-gray-50">
        <div className="text-center">
          <FaSpinner className="animate-spin text-[#776AA6] text-4xl mx-auto mb-4" />
          <p className="text-gray-600">Loading conversation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-60px)]">
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user' 
                    ? 'bg-[#776AA6] text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 shadow-md rounded-tl-none border-l-4 border-[#776AA6]'
                }`}
              >
                <div className="flex items-center mb-1">
                  {message.role === 'assistant' ? (
                    <FaRobot className="mr-2 text-[#776AA6]" />
                  ) : (
                    <FaUser className="mr-2 text-white" />
                  )}
                  <span className={`text-xs ${message.role === 'user' ? 'text-purple-100' : 'text-gray-500'}`}>
                    {message.role === 'assistant' ? 'AI Health Assistant' : 'You'} • {formatTime(message.timestamp)}
                  </span>
                </div>
                
                {message.role === 'assistant' ? (
                  <div className="markdown-content">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{message.content}</p>
                )}
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-white text-gray-800 rounded-lg rounded-tl-none p-3 shadow-md max-w-[80%] border-l-4 border-[#776AA6]">
                <div className="flex items-center">
                  <FaRobot className="mr-2 text-[#776AA6]" />
                  <span className="text-xs text-gray-500">AI Health Assistant</span>
                </div>
                <div className="flex items-center mt-2">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto relative">
          <form onSubmit={handleSubmit}>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your health question here..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 min-h-[60px] max-h-[150px] resize-none focus:outline-none focus:ring-2 focus:ring-[#776AA6]"
              disabled={isLoading || isTyping}
              rows={1}
            />
            <button
              type="submit"
              className="absolute bottom-[30px] right-3 text-[#776AA6] hover:text-[#5D5384] disabled:text-gray-400 bg-transparent p-1 rounded-full hover:bg-purple-50 transition-colors"
              disabled={isLoading || isTyping || !input.trim()}
            >
              {isLoading || isTyping ? 
                <FaSpinner className="animate-spin w-5 h-5" /> : 
                <FaPaperPlane className="w-5 h-5" />
              }
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-1 ml-1">Press Enter to send, Shift+Enter for new line</p>
        </div>
      </div>

      {/* CSS for typing indicator and markdown styling */}
      <style jsx>{`
        .typing-indicator {
          display: flex;
          align-items: center;
        }
        
        .typing-indicator span {
          height: 8px;
          width: 8px;
          margin: 0 2px;
          background-color: #776AA6;
          border-radius: 50%;
          display: inline-block;
          opacity: 0.6;
        }
        
        .typing-indicator span:nth-child(1) {
          animation: bounce 1.2s infinite 0.2s;
        }
        
        .typing-indicator span:nth-child(2) {
          animation: bounce 1.2s infinite 0.4s;
        }
        
        .typing-indicator span:nth-child(3) {
          animation: bounce 1.2s infinite 0.6s;
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        
        /* Markdown styling */
        :global(.markdown-content) {
          line-height: 1.6;
        }
        
        :global(.markdown-content h1) {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem;
          color: #333;
        }
        
        :global(.markdown-content h2) {
          font-size: 1.3rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem;
          color: #333;
        }
        
        :global(.markdown-content h3) {
          font-size: 1.1rem;
          font-weight: bold;
          margin: 0.8rem 0 0.4rem;
          color: #333;
        }
        
        :global(.markdown-content p) {
          margin-bottom: 0.8rem;
        }
        
        :global(.markdown-content ul, .markdown-content ol) {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }
        
        :global(.markdown-content li) {
          margin-bottom: 0.3rem;
        }
        
        :global(.markdown-content a) {
          color: #776AA6;
          text-decoration: underline;
        }
        
        :global(.markdown-content blockquote) {
          border-left: 3px solid #776AA6;
          padding-left: 1rem;
          margin-left: 0;
          margin-right: 0;
          font-style: italic;
          color: #555;
        }
        
        :global(.markdown-content code) {
          background-color: #f0f0f0;
          padding: 0.2rem 0.4rem;
          border-radius: 3px;
          font-family: monospace;
          font-size: 0.9em;
        }
        
        :global(.markdown-content pre) {
          background-color: #f5f5f5;
          padding: 1rem;
          border-radius: 5px;
          overflow-x: auto;
          margin: 1rem 0;
        }
        
        :global(.markdown-content pre code) {
          background-color: transparent;
          padding: 0;
        }
        
        :global(.markdown-content hr) {
          border: 0;
          border-top: 1px solid #ddd;
          margin: 1.5rem 0;
        }
      `}</style>
    </div>
  );
}
