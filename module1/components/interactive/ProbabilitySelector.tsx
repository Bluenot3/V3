
import React, { useState } from 'react';
import type { InteractiveComponentProps } from '../../types';
import { useAuth } from '../../hooks/useAuth';

const ProbabilitySelector: React.FC<InteractiveComponentProps> = ({ interactiveId }) => {
    const { user, addPoints, updateProgress } = useAuth();
    const [sentence, setSentence] = useState('The quick brown fox jumps over the');
    const [options, setOptions] = useState([
        { word: 'lazy', prob: 65, color: 'bg-green-500' },
        { word: 'fence', prob: 20, color: 'bg-yellow-500' },
        { word: 'moon', prob: 5, color: 'bg-red-500' },
        { word: 'puddle', prob: 10, color: 'bg-blue-500' }
    ]);
    const [round, setRound] = useState(1);

    const hasCompleted = user?.progress.completedInteractives.includes(interactiveId);

    const handleSelect = (word: string) => {
        setSentence(prev => `${prev} ${word}`);
        
        // Mock next round logic
        if (round === 1) {
            setOptions([
                { word: 'dog', prob: 80, color: 'bg-green-500' },
                { word: 'cat', prob: 10, color: 'bg-blue-500' },
                { word: 'log', prob: 5, color: 'bg-yellow-500' },
                { word: 'universe', prob: 1, color: 'bg-red-500' }
            ]);
            setRound(2);
        } else {
            setSentence(prev => `${prev}.`);
            setOptions([]); // End game
            if (!hasCompleted) {
                addPoints(15);
                updateProgress(interactiveId, 'interactive');
            }
        }
    };

    const handleReset = () => {
        setSentence('The quick brown fox jumps over the');
        setOptions([
            { word: 'lazy', prob: 65, color: 'bg-green-500' },
            { word: 'fence', prob: 20, color: 'bg-yellow-500' },
            { word: 'moon', prob: 5, color: 'bg-red-500' },
            { word: 'puddle', prob: 10, color: 'bg-blue-500' }
        ]);
        setRound(1);
    }

    return (
        <div className="my-8 p-6 bg-brand-bg rounded-2xl shadow-neumorphic-out">
            <h4 className="font-bold text-lg text-brand-text mb-2 text-center">Prediction Engine: Guess the Next Word</h4>
            <p className="text-center text-brand-text-light mb-6 text-sm">AI works by calculating the probability of the next word. Play as the AI.</p>

            <div className="p-4 bg-white rounded-xl shadow-inner-sm text-center text-xl font-medium text-brand-text mb-6 border border-slate-100 min-h-[60px] flex items-center justify-center">
                "{sentence}..."
            </div>

            {options.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {options.map((opt) => (
                        <button 
                            key={opt.word}
                            onClick={() => handleSelect(opt.word)}
                            className="relative overflow-hidden group bg-brand-bg rounded-lg shadow-neumorphic-out hover:shadow-neumorphic-in transition-all p-4 text-left"
                        >
                            <div className="flex justify-between items-center relative z-10">
                                <span className="font-bold text-brand-text group-hover:translate-x-1 transition-transform">{opt.word}</span>
                                <span className="text-xs font-mono text-brand-text-light">{opt.prob}%</span>
                            </div>
                            {/* Probability Bar Background */}
                            <div 
                                className={`absolute bottom-0 left-0 h-1 ${opt.color} transition-all duration-1000`} 
                                style={{ width: `${opt.prob}%` }}
                            ></div>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="text-center animate-fade-in">
                    <p className="text-pale-green font-bold mb-4">Sentence Complete!</p>
                    <button onClick={handleReset} className="px-6 py-2 rounded-lg shadow-neumorphic-out hover:shadow-neumorphic-in text-sm font-semibold">Start Over</button>
                </div>
            )}
        </div>
    );
};

export default ProbabilitySelector;
