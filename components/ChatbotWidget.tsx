"use client";

import { useState } from "react";

interface ChatbotWidgetProps {
  hfSpaceUrl?: string;
}

const ChatbotWidget = ({ hfSpaceUrl = "https://imagimaniac-ratik-portfolio-bot.hf.space" }: ChatbotWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleIframeError = () => {
    setShowFallback(true);
  };

  return (
    <>
      {/* Ask Me Button - Always Visible */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <svg 
                    className="w-10 h-10 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                    />
                    <circle cx="17" cy="7" r="3" fill="#39FF14" stroke="none" />
                  </svg>
                </div>
                {/* Online indicator */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-gray-900 flex items-center justify-center">
                  <span className="text-xs">👋</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Meet Pratik&apos;s Twin 🤖
                </h3>
                <p className="text-gray-400">
                  Get instant answers about Pratik&apos;s experience
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 mb-6 leading-relaxed">
              Have questions? Pratik&apos;s AI twin knows everything about his work, skills, and achievements. 
              Just ask! It&apos;s like having a conversation with Pratik himself.
            </p>

            {/* Features */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-gray-800/50 rounded-xl p-3 text-center">
                <div className="text-2xl mb-1">⚡</div>
                <div className="text-xs text-gray-400">Instant Response</div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-3 text-center">
                <div className="text-2xl mb-1">🧠</div>
                <div className="text-xs text-gray-400">Knows Everything</div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-3 text-center">
                <div className="text-2xl mb-1">💬</div>
                <div className="text-xs text-gray-400">Natural Chat</div>
              </div>
            </div>

            {/* Ask Me Button */}
            <button
              onClick={toggleChat}
              className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-lg">Ask Me About Pratik</span>
            </button>
          </div>
        </div>
      </section>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={toggleChat}
          />
          
          {/* Modal */}
          <div className="relative w-full max-w-4xl h-[600px] bg-gray-900 rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700/50 flex items-center justify-between px-6 z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <h4 className="text-white font-bold">Pratik&apos;s Twin</h4>
                  <p className="text-xs text-gray-400">Online • Ready to chat</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Iframe Container */}
            <div className="w-full h-full pt-16">
              {showFallback ? (
                <FallbackChat onClose={toggleChat} />
              ) : (
                <iframe
                  src={hfSpaceUrl}
                  className="w-full h-full border-0"
                  title="Chat with Pratik's Twin"
                  onError={handleIframeError}
                  allow="microphone; camera"
                />
              )}
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900 to-transparent flex items-center justify-center">
              <p className="text-xs text-gray-500">
                Powered by Hugging Face Spaces • Pratik&apos;s AI Assistant
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Fallback chat when iframe fails
const FallbackChat = ({ onClose }: { onClose: () => void }) => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 p-8">
    <div className="text-center max-w-md">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-4xl">
        🤖
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">
        Chat is loading...
      </h3>
      <p className="text-gray-400 mb-6">
        In the meantime, here&apos;s how you can reach Pratik directly:
      </p>
      
      <div className="space-y-4">
        <a 
          href="mailto:pghagawane175@gmail.com"
          className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 rounded-xl text-white transition-colors"
        >
          <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>pghagawane175@gmail.com</span>
        </a>
        
        <a 
          href="tel:+918237742096"
          className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 rounded-xl text-white transition-colors"
        >
          <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>+91 8237742096</span>
        </a>
        
        <a 
          href="https://linkedin.com/in/imagimaniac"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 rounded-xl text-white transition-colors"
        >
          <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          <span>LinkedIn</span>
        </a>
      </div>
      
      <button
        onClick={onClose}
        className="mt-6 text-gray-500 hover:text-white text-sm transition-colors"
      >
        Close
      </button>
    </div>
  </div>
);

export default ChatbotWidget;
