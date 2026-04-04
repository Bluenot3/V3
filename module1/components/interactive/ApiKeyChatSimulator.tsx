import React, { useState, useRef, useEffect } from 'react';
import type { InteractiveComponentProps } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { UserIcon } from '../icons/UserIcon';
import { KeyIcon } from '../icons/KeyIcon';
import { LockIcon } from '../icons/LockIcon';
import { BrainIcon } from '../icons/BrainIcon';
import { ErrorIcon } from '../icons/ErrorIcon';

interface ChatMessage {
  id: number;
  sender: 'user' | 'bot' | 'system';
  text?: string;
  imageUrl?: string;
  isLoading?: boolean;
}

interface Preset {
  prompt: string;
  responseText: string | null;
  responseImage: string | null;
}

const presets: Preset[] = [
  {
    prompt: "Describe a futuristic city where nature and technology coexist.",
    responseText: "Bioluminescent vines climb chrome skyscrapers, their light pulsing in sync with the city's data streams. Flying vehicles shaped like manta rays glide silently between buildings, while citizens walk through parks where robotic animals roam freely.",
    responseImage: null
  },
  {
    prompt: "Generate an image of a 'cybernetic philosopher cat' pondering the universe.",
    responseText: null,
    responseImage: "https://storage.googleapis.com/aistudio-marketplace/project-b841f4f14704439a9335d11889895a09/releases/v0TfOaM/assets/cybernetic_cat.png"
  },
  {
    prompt: "Write a short poem about a digital ghost.",
    responseText: "In circuits deep, where memories sleep,\nA phantom trace, a promise to keep.\nNo form to hold, no voice to call,\nJust data streams, beyond the wall.\nA digital ghost, in the machine's cold heart,\nA silent echo, a work of art.",
    responseImage: null
  },
];


const ApiKeyChatSimulator: React.FC<InteractiveComponentProps> = ({ interactiveId }) => {
    const { user, addPoints, updateProgress } = useAuth();
    const hasCompleted = user?.progress.completedInteractives.includes(interactiveId);

    const [noApiMessages, setNoApiMessages] = useState<ChatMessage[]>([{id: 1, sender: 'system', text: 'Ready'}]);
    const [withApiMessages, setWithApiMessages] = useState<ChatMessage[]>([{id: 1, sender: 'system', text: 'Ready'}]);
    const [isAnimatingKey, setIsAnimatingKey] = useState(false);

    const intervalRef = useRef<number | null>(null);
    const noApiEndRef = useRef<HTMLDivElement>(null);
    const withApiEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => { noApiEndRef.current?.scrollIntoView({ behavior: 'smooth' })}, [noApiMessages]);
    useEffect(() => { withApiEndRef.current?.scrollIntoView({ behavior: 'smooth' })}, [withApiMessages]);
    
    // Cleanup interval on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const handlePresetClick = (preset: Preset) => {
        if (isAnimatingKey) return;
        
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        setIsAnimatingKey(true);
        if (!hasCompleted) {
            addPoints(15);
            updateProgress(interactiveId, 'interactive');
        }
        
        const userMessageId = Date.now();
        const botMessageId = userMessageId + 1;
        const userMessage = { id: userMessageId, sender: 'user' as const, text: preset.prompt };
        const loadingMessage = { id: botMessageId, sender: 'bot' as const, isLoading: true };

        setNoApiMessages(prev => [...prev, userMessage]);
        setWithApiMessages(prev => [...prev, userMessage, loadingMessage]);

        setTimeout(() => {
             const errorMsg = { id: Date.now(), sender: 'system' as const, text: 'Authentication Failed. No API Key provided.' };
             setNoApiMessages(prev => [...prev, errorMsg]);
        }, 800);

        setTimeout(() => {
            setWithApiMessages(prev => prev.map(msg => 
                msg.id === botMessageId
                ? { ...msg, isLoading: false, text: preset.responseText ? '' : undefined, imageUrl: preset.responseImage || undefined }
                : msg
            ));

            if (preset.responseText) {
                let i = 0;
                const fullText = preset.responseText;
                intervalRef.current = window.setInterval(() => {
                    i++;
                    const currentText = fullText.substring(0, i);
                    const cursor = i < fullText.length ? '▋' : '';
                    
                    setWithApiMessages(prev => prev.map(msg => 
                        msg.id === botMessageId ? { ...msg, text: currentText + cursor } : msg
                    ));

                    if (i >= fullText.length) {
                        clearInterval(intervalRef.current!);
                        intervalRef.current = null;
                        setWithApiMessages(prev => prev.map(msg => 
                            msg.id === botMessageId ? { ...msg, text: fullText } : msg
                        ));
                    }
                }, 25);
            }
        }, 1500);

        setTimeout(() => {
            setIsAnimatingKey(false);
        }, 3500);
    };

    const ChatWindow: React.FC<{title: string, messages: ChatMessage[], endRef: React.RefObject<HTMLDivElement>}> = ({ title, messages, endRef }) => (
        <div className="flex-1 min-w-0">
            <h4 className="font-bold text-center text-brand-text mb-2">{title}</h4>
            <div className="h-72 p-3 bg-brand-bg rounded-lg shadow-neumorphic-in overflow-y-auto space-y-3 liquid-scrollbar">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex items-start gap-2 animate-slide-in-up ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                        {msg.sender === 'bot' && <div className="w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-xs flex-shrink-0">Z</div>}
                        <div className={`px-3 py-2 rounded-lg max-w-xs text-sm break-words ${
                            msg.sender === 'user' ? 'bg-brand-primary text-white' : 
                            msg.sender === 'system' ? 'bg-red-100 text-red-700 font-semibold' :
                            'bg-white shadow-soft-lg text-brand-text'
                        }`}>
                            {msg.isLoading ? (
                                <p className="animate-pulse">Thinking...</p>
                            ) : (
                                <>
                                    {msg.text && <p>{msg.text}</p>}
                                    {msg.imageUrl && (
                                        <img
                                            src={msg.imageUrl}
                                            alt="Generated by AI"
                                            className="rounded-md mt-2 animate-fade-in"
                                        />
                                    )}
                                </>
                            )}
                        </div>
                        {msg.sender === 'user' && <UserIcon />}
                    </div>
                ))}
                <div ref={endRef} />
            </div>
        </div>
    );

    return (
        <div className="my-8 p-6 bg-brand-bg rounded-2xl shadow-neumorphic-out">
            <h4 className="font-bold text-lg text-brand-text mb-4 text-center">API Key Simulation</h4>
            
            <div className="p-4 bg-brand-bg rounded-lg shadow-neumorphic-in mb-6 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 text-sm font-semibold">
                    <UserIcon /> <span>User Prompt</span>
                </div>
                <div className="w-0.5 h-6 bg-brand-shadow-dark/50"></div>
                <div className="relative p-3 rounded-full shadow-neumorphic-out">
                    <LockIcon className={`w-8 h-8 transition-colors duration-500 ${isAnimatingKey ? 'text-pale-green' : 'text-red-500'}`} isLocked={!isAnimatingKey} />
                     <div className={`absolute -bottom-4 -right-10 transition-all duration-700 ease-in-out ${isAnimatingKey ? 'translate-x-[-20px] opacity-100' : 'translate-x-0 opacity-0'}`}>
                        <KeyIcon className="w-7 h-7 text-pale-yellow -rotate-45" />
                    </div>
                </div>
                <div className="flex justify-around w-full">
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-xs font-bold text-red-500">NO KEY</p>
                        <div className="w-0.5 h-6 bg-red-500/30"></div>
                        <ErrorIcon className="w-8 h-8 text-red-500"/>
                        <p className="text-sm font-semibold text-red-500">Request Failed</p>
                    </div>
                     <div className="flex flex-col items-center gap-2">
                        <p className="text-xs font-bold text-pale-green">WITH KEY</p>
                         <div className={`w-0.5 h-6 bg-pale-green/30 transition-all duration-500 delay-500 ${isAnimatingKey ? 'scale-y-100' : 'scale-y-0'}`} style={{transformOrigin: 'top'}}></div>
                        <BrainIcon className={`w-8 h-8 text-pale-green transition-opacity duration-300 delay-1000 ${isAnimatingKey ? 'opacity-100' : 'opacity-20'}`} />
                        <p className={`text-sm font-semibold text-pale-green transition-opacity duration-300 delay-1000 ${isAnimatingKey ? 'opacity-100' : 'opacity-20'}`}>Access Granted</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                <ChatWindow title="Without API Key" messages={noApiMessages} endRef={noApiEndRef} />
                <ChatWindow title="With API Key" messages={withApiMessages} endRef={withApiEndRef} />
            </div>

            <div className="mt-6">
                 <h4 className="font-bold text-center text-brand-text mb-3">Preset Prompts</h4>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {presets.map((p, i) => (
                        <button 
                            key={i}
                            onClick={() => handlePresetClick(p)}
                            disabled={isAnimatingKey}
                            className="p-3 text-sm text-left rounded-lg shadow-neumorphic-out hover:shadow-neumorphic-in disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {p.prompt}
                        </button>
                    ))}
                 </div>
            </div>

        </div>
    );
};

export default ApiKeyChatSimulator;