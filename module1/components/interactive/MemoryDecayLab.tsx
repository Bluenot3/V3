
import React, { useState, useRef, useEffect } from 'react';
import type { InteractiveComponentProps } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { SendIcon } from '../icons/SendIcon';

interface Message {
    sender: 'user' | 'bot';
    text: string;
    id: number;
}

const MemoryDecayLab: React.FC<InteractiveComponentProps> = ({ interactiveId }) => {
    const { user, addPoints, updateProgress } = useAuth();
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'bot', text: "Hi! I have a very short memory (only 4 messages). Tell me your name!", id: 1 }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const hasCompleted = user?.progress.completedInteractives.includes(interactiveId);
    
    // Max capacity of 'memory'
    const CAPACITY = 4;

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim() || loading) return;
        
        const userMessage: Message = { sender: 'user', text: input, id: Date.now() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        // Simulate interaction and point scoring
        if (!hasCompleted && messages.length > 5) {
             addPoints(25);
             updateProgress(interactiveId, 'interactive');
        }

        setTimeout(() => {
            const botResponses = [
                "That's interesting! Tell me more.",
                "Wait, what were we talking about at the start?",
                "I see. Anything else?",
                "Okay, go on."
            ];
            const response = botResponses[Math.floor(Math.random() * botResponses.length)];
            const botMessage: Message = { sender: 'bot', text: response, id: Date.now() + 1 };
            setMessages(prev => [...prev, botMessage]);
            setLoading(false);
        }, 600);
    };

    // Calculate which messages are "forgotten"
    const totalMessages = messages.length;
    const forgottenCount = Math.max(0, totalMessages - CAPACITY);

    return (
        <div className="my-8 p-6 bg-brand-bg rounded-2xl shadow-neumorphic-out">
            <h4 className="font-bold text-lg text-brand-text mb-2 text-center">Memory Decay Lab</h4>
            <p className="text-center text-brand-text-light mb-4 text-sm">
                This bot only remembers the last 4 messages. Watch the old ones "fade away".
            </p>

            <div className="max-w-md mx-auto">
                <div className="h-80 p-4 bg-brand-bg rounded-xl shadow-neumorphic-in overflow-y-auto space-y-3 liquid-scrollbar relative">
                    {/* Visual Marker for Memory Cutoff */}
                    {forgottenCount > 0 && (
                        <div className="sticky top-0 w-full text-center py-2 z-10 pointer-events-none">
                            <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
                                ↑ Forgotten Zone
                            </span>
                        </div>
                    )}

                    {messages.map((msg, index) => {
                        // Calculate opacity based on distance from the end
                        // Index 0 is oldest. 
                        // If we have 6 messages, indexes 0 and 1 are forgotten.
                        const reverseIndex = totalMessages - 1 - index; // 0 for newest
                        const isForgotten = reverseIndex >= CAPACITY;
                        
                        return (
                            <div 
                                key={msg.id} 
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} transition-all duration-500`}
                                style={{ opacity: isForgotten ? 0.3 : 1, filter: isForgotten ? 'blur(1px)' : 'none' }}
                            >
                                <div className={`px-4 py-2 rounded-xl max-w-xs text-sm ${msg.sender === 'user' ? 'bg-brand-primary text-white rounded-br-none' : 'bg-white shadow-sm text-brand-text rounded-bl-none'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>

                <div className="mt-4 flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && handleSend()}
                        placeholder="Chat to push out old memories..."
                        className="flex-grow px-4 py-3 bg-brand-bg rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text shadow-neumorphic-in"
                        disabled={loading}
                    />
                    <button onClick={handleSend} disabled={loading} className="p-3 bg-brand-primary text-white rounded-full shadow-neumorphic-out disabled:opacity-50 hover:shadow-neumorphic-in transition-all active:scale-95">
                        <SendIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MemoryDecayLab;
