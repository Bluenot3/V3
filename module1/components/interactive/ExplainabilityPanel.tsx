
import React, { useState } from 'react';
import type { InteractiveComponentProps } from '../../types';
import { useAuth } from '../../hooks/useAuth';

const words = ['A', 'happy', 'dog', 'in', 'a', 'park', 'with', 'a', 'red', 'ball'];
const wordInfluences: { [key: string]: number } = {
    dog: 0.95,
    park: 0.88,
    happy: 0.75,
    red: 0.92,
    ball: 0.9,
    default: 0.1
};

const ExplainabilityPanel: React.FC<InteractiveComponentProps> = ({ interactiveId }) => {
    const { user, addPoints, updateProgress } = useAuth();
    const [hoveredWord, setHoveredWord] = useState<string | null>(null);

    const hasCompleted = user?.progress.completedInteractives.includes(interactiveId);

    const handleInteraction = () => {
        if (!hasCompleted) {
            addPoints(25);
            updateProgress(interactiveId, 'interactive');
        }
    }

    return (
        <div className="my-8 p-6 bg-brand-bg rounded-2xl shadow-neumorphic-out">
            <h4 className="font-bold text-lg text-brand-text mb-2 text-center">The Word Weighing Scale</h4>
            <p className="text-center text-brand-text-light mb-6 text-sm">
                How much does the AI care about each word? Hover to weigh them.
            </p>

            <div className="flex flex-col items-center gap-8">
                {/* Sentence Display */}
                <div className="flex flex-wrap justify-center gap-2 p-6 bg-white rounded-xl shadow-inner-sm w-full border border-slate-100">
                    {words.map((word, i) => {
                        const weight = wordInfluences[word] || wordInfluences.default;
                        const isHovered = hoveredWord === word;
                        
                        return (
                            <span 
                                key={i} 
                                onMouseEnter={() => {
                                    setHoveredWord(word);
                                    handleInteraction();
                                }} 
                                onMouseLeave={() => setHoveredWord(null)}
                                className={`
                                    relative cursor-pointer px-3 py-1 rounded-lg font-medium transition-all duration-200 transform hover:-translate-y-1
                                    ${isHovered ? 'bg-brand-primary text-white shadow-md scale-110' : 'bg-slate-100 text-slate-600 hover:bg-brand-primary/10'}
                                `}
                            >
                                {word}
                                {/* Mini Bar Chart per word */}
                                <span className="absolute bottom-0 left-0 h-1 bg-brand-primary/30 rounded-full" style={{ width: `${weight * 100}%` }}></span>
                            </span>
                        );
                    })}
                </div>

                {/* Weighing Scale Visual */}
                <div className="w-full max-w-sm p-6 bg-brand-bg rounded-xl shadow-neumorphic-in flex flex-col items-center justify-center min-h-[160px] transition-all">
                    {hoveredWord ? (
                        <>
                            <p className="text-sm font-bold uppercase tracking-widest text-brand-text-light mb-2">Weight Analysis</p>
                            <h2 className="text-4xl font-black text-brand-primary mb-1">"{hoveredWord}"</h2>
                            
                            <div className="w-full bg-slate-200 h-4 rounded-full overflow-hidden mt-2 relative">
                                <div 
                                    className="bg-gradient-to-r from-brand-secondary to-brand-primary h-full transition-all duration-300" 
                                    style={{ width: `${(wordInfluences[hoveredWord] || wordInfluences.default) * 100}%` }}
                                ></div>
                            </div>
                            <p className="mt-2 font-mono text-sm text-slate-500">
                                Importance: {((wordInfluences[hoveredWord] || wordInfluences.default) * 100).toFixed(0)}%
                            </p>
                        </>
                    ) : (
                        <p className="text-brand-text-light opacity-50 font-medium">Hover over a word above to measure its impact.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExplainabilityPanel;
