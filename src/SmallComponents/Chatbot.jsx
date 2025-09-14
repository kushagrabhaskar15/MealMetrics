import React, { useState } from 'react';

const Chatbot = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatHistory, setChatHistory] = useState([{ role: "model", parts: [{ text: "Hello! I am your AI cooking assistant. I can help you with recipes, nutrition, and cooking tips. What can I do for you?" }] }]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Exponential backoff logic
  const handleSendChat = async () => {
    if (!chatInput.trim()) return;

    const newChatHistory = [...chatHistory, { role: "user", parts: [{ text: chatInput }] }];
    setChatHistory(newChatHistory);
    setChatInput('');
    setIsChatLoading(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const payload = {
      contents: newChatHistory,
    };

    const maxRetries = 3;
    let retryCount = 0;
    let success = false;
    let responseText = "Sorry, I couldn't get a response. Please try again.";

    while (retryCount < maxRetries && !success) {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const result = await response.json();
          responseText = result?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't get a response. Please try again.";
          success = true;
        } else {
          throw new Error(`API error: ${response.status}`);
        }
      } catch (error) {
        console.error("Gemini API Error:", error);
        retryCount++;
        const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff: 2s, 4s, 8s
        if (retryCount < maxRetries) {
          console.log(`Retrying in ${delay / 1000} seconds...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        } else {
          console.error("Max retries exceeded.");
        }
      }
    }

    setChatHistory(prev => [...prev, { role: "model", parts: [{ text: responseText }] }]);
    setIsChatLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="bg-purple-600 text-white rounded-full p-4 shadow-lg hover:bg-purple-700 transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      </button>
      {showChatbot && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden">
          <div className="bg-purple-600 text-white p-4 font-bold">AI Cooking Assistant</div>
          <div className="flex-grow p-4 overflow-y-auto space-y-4">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    msg.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {msg.parts[0].text}
                </div>
              </div>
            ))}
            {isChatLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2">
                  <span className="animate-pulse">Typing...</span>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-gray-200 flex items-center gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
              placeholder="Ask me anything..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none"
            />
            <button
              onClick={handleSendChat}
              disabled={isChatLoading}
              className="bg-purple-600 text-white rounded-full p-2 hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l.668-.277A6.471 6.471 0 0110 15.556v-2.92a.5.5 0 011 0v2.921a6.47 6.47 0 015.956 3.12l.668.277a1 1 0 001.17-1.409l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
