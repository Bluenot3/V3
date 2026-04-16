import React, { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  isTyping?: boolean;
}

interface Step {
  id: string;
  question: string;
  options?: string[];
  requiresTextInput?: boolean;
  nextStep: (answer: string) => string | null;
}

const FLOW: Record<string, Step> = {
  start: {
    id: 'start',
    question: "Welcome to ZEN Vanguard. I'm your AI Liaison. To calibrate your neural pathways, tell me: What brought you here?",
    options: [
      "Upskill my staff",
      "I want to start a business",
      "Lost my job, pivoting to AI",
      "Add AI into my current business",
      "Just exploring"
    ],
    nextStep: () => 'models_used'
  },
  models_used: {
    id: 'models_used',
    question: "Got it. Have you interfaced with any of these models before?",
    options: [
      "ChatGPT",
      "Claude",
      "Gemini",
      "Midjourney or DALL-E",
      "None, I'm new"
    ],
    nextStep: () => 'professional'
  },
  professional: {
    id: 'professional',
    question: "Are you currently a working professional?",
    options: ["Yes", "No"],
    nextStep: (answer) => (answer === 'Yes' ? 'industry' : 'parent')
  },
  industry: {
    id: 'industry',
    question: "Excellent. Let's get specific. What industry and company do you work in?",
    requiresTextInput: true,
    nextStep: () => 'parent'
  },
  parent: {
    id: 'parent',
    question: "Lastly, are you a parent managing kids at home? (This helps us tailor your focus modules).",
    options: ["Yes, chaotic but fun", "No, just me"],
    nextStep: () => 'finish'
  },
  finish: {
    id: 'finish',
    question: "Calibration complete. Your profile is mapping. Proceeding to the main hub...",
    nextStep: () => null
  }
};

export const OnboardingChat: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStepId, setCurrentStepId] = useState<string>('start');
  const [inputText, setInputText] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAiTyping]);

  useEffect(() => {
    // Start the flow
    pushAiMessage(FLOW['start'].question);
  }, []);

  const pushAiMessage = (text: string) => {
    setIsAiTyping(true);
    setTimeout(() => {
      setIsAiTyping(false);
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'ai', text }]);
    }, 1200); // simulated typing delay
  };

  const handleUserAnswer = (answer: string) => {
    if (!answer.trim() || isAiTyping) return;

    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: answer }]);
    setInputText('');

    const step = FLOW[currentStepId];
    const nextStepId = step.nextStep(answer);

    if (nextStepId && FLOW[nextStepId]) {
      setCurrentStepId(nextStepId);
      pushAiMessage(FLOW[nextStepId].question);
      if (nextStepId === 'finish') {
        setTimeout(() => {
          handleComplete();
        }, 2500);
      }
    } else {
      setTimeout(() => {
        handleComplete();
      }, 1500);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('zen_onboarding_answered', 'true');
    onComplete();
  };

  const currentStep = FLOW[currentStepId];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-zen-navy/40 backdrop-blur-sm transition-all duration-500 p-4 sm:p-8">
      {/* Liquid Glass Pane Container */}
      <div className="relative flex flex-col w-full max-w-2xl max-h-[80vh] h-[600px] border border-zen-gold/30 bg-gradient-to-b from-[#0a1128]/90 to-[#060b18]/95 overflow-hidden shadow-2xl rounded-3xl"
           style={{
             boxShadow: '0 0 50px -10px rgba(201, 168, 76, 0.2), inset 0 0 20px rgba(201, 168, 76, 0.1)',
             backdropFilter: 'blur(20px) saturate(1.2)'
           }}>
           
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zen-gold/20 px-6 py-4 bg-white/[0.05]">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-zen-gold animate-pulse shadow-[0_0_10px_rgba(201,168,76,0.8)]" />
            <div>
                <h2 className="font-mono text-sm tracking-[0.2em] text-zen-gold uppercase m-0 leading-tight">Vanguard Init</h2>
                <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase m-0 leading-tight">New Pioneer Calibration</p>
            </div>
          </div>
          <button 
            onClick={handleComplete}
            className="text-xs font-mono text-slate-400 hover:text-white transition-colors tracking-widest uppercase px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-zen-gold/30 rounded-full"
          >
            Skip Config
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 liquid-scrollbar font-mono text-sm">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-6 py-4 relative group
                               ${msg.sender === 'user' 
                                 ? 'bg-zen-gold/10 text-zen-gold border border-zen-gold/20' 
                                 : 'bg-white/5 text-slate-200 border border-white/10'}`}>
                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                {/* Glow behind message */}
                <div className={`absolute -inset-1 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 -z-10 rounded-2xl
                                 ${msg.sender === 'user' ? 'bg-zen-gold/20' : 'bg-white/10'}`} />
              </div>
            </div>
          ))}
          
          {isAiTyping && (
            <div className="flex w-full justify-start">
              <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex gap-1.5 items-center">
                <div className="w-2 h-2 rounded-full bg-zen-gold/70 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-zen-gold/70 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-zen-gold/70 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-zen-gold/10 bg-black/20 p-6 backdrop-blur-md">
          {currentStep && !isAiTyping && currentStep.id !== 'finish' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Option Tiles */}
              {currentStep.options && (
                <div className="flex flex-wrap gap-3 mb-4 justify-center">
                  {currentStep.options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => handleUserAnswer(opt)}
                      className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-medium 
                                 hover:bg-zen-gold/20 hover:text-zen-gold hover:border-zen-gold/50 transition-all duration-300
                                 shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(201,168,76,0.2)] hover:-translate-y-0.5 text-sm"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Text Input (always available as fallback, required for specific steps) */}
              <form 
                onSubmit={(e) => { e.preventDefault(); handleUserAnswer(inputText); }}
                className="flex items-center gap-3 relative"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={currentStep.requiresTextInput ? "Type your answer..." : "Or type a custom response..."}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-zen-gold/50 focus:bg-zen-gold/5 transition-all text-sm font-mono shadow-inner"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="absolute right-2 px-4 py-2 bg-zen-gold text-[#060b18] font-bold rounded-lg disabled:opacity-30 transition-opacity hover:shadow-[0_0_15px_rgba(201,168,76,0.6)]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                  </svg>
                </button>
              </form>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
