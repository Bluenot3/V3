
import React, { useState } from 'react';
import type { InteractiveComponentProps } from '../../types';
import { useAuth } from '../../hooks/useAuth';

const TokenVisualizer: React.FC<InteractiveComponentProps> = ({ interactiveId }) => {
    const { user, addPoints, updateProgress } = useAuth();
    const [text, setText] = useState('Artificial Intelligence is amazing');
    const [tokens, setTokens] = useState<{ str: string, id: number, color: string }[]>([]);
    
    const colors = ['bg-red-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-purple-200', 'bg-orange-200'];

    const hasCompleted = user?.progress.completedInteractives.includes(interactiveId);

    const handleTokenize = () => {
        // Simple mock tokenizer: split by space, but handle some suffixes to simulate sub-word tokenization
        const words = text.split(/(\s+)/).filter(e => e.trim().length > 0);
        
        const newTokens = words.flatMap(word => {
            if (word.length > 5 && !word.includes(' ')) {
                // Mock subword split
                const part1 = word.substring(0, Math.ceil(word.length / 2));
                const part2 = word.substring(Math.ceil(word.length / 2));
                return [part1, part2];
            }
            return [word];
        }).map((t, i) => ({
            str: t,
            id: Math.floor(Math.random() * 50000), // Random token ID
            color: colors[i % colors.length]
        }));

        setTokens(newTokens);
        
        if (!hasCompleted) {
            addPoints(10);
            updateProgress(interactiveId, 'interactive');
        }
    };

    return (
        <div className="my-8 p-6 bg-brand-bg rounded-2xl shadow-neumorphic-out">
            <h4 className="font-bold text-lg text-brand-text mb-2 text-center">How Computers "Read": Tokenizer</h4>
            <p className="text-center text-brand-text-light mb-6 text-sm">AI doesn't read words; it reads numbers. Type a sentence to see it broken down.</p>

            <div className="flex gap-2 mb-6">
                <input 
                    type="text" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)}
                    className="flex-grow px-4 py-2 rounded-lg shadow-neumorphic-in bg-brand-bg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
                <button 
                    onClick={handleTokenize}
                    className="bg-brand-primary text-white font-bold px-6 py-2 rounded-lg shadow-neumorphic-out hover:shadow-neumorphic-in transition-all"
                >
                    Tokenize
                </button>
            </div>

            {tokens.length > 0 && (
                <div className="flex flex-wrap gap-3 justify-center">
                    {tokens.map((token, i) => (
                        <div key={i} className="flex flex-col items-center animate-icon-pop" style={{ animationDelay: `${i * 100}ms` }}>
                            <div className={`${token.color} px-3 py-2 rounded-md shadow-sm border border-black/5 font-mono text-sm font-bold text-brand-text mb-1`}>
                                {token.str}
                            </div>
                            <div className="text-xs text-slate-400 font-mono">
                                ID: {token.id}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TokenVisualizer;
