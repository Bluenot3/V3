
import React, { useState } from 'react';
import type { InteractiveComponentProps } from '../../types';
import { useAuth } from '../../hooks/useAuth';

type DatasetType = 'clean' | 'noisy' | 'biased';

const DataVisualizer: React.FC<InteractiveComponentProps> = ({ interactiveId }) => {
    const { user, addPoints, updateProgress } = useAuth();
    const [dataset, setDataset] = useState<DatasetType>('clean');

    const hasCompleted = user?.progress.completedInteractives.includes(interactiveId);

    const handleSetDataset = (type: DatasetType) => {
        setDataset(type);
        if (!hasCompleted) {
            addPoints(10);
            updateProgress(interactiveId, 'interactive');
        }
    };

    // Generate data points based on type
    const points = Array.from({ length: 20 }, (_, i) => {
        const x = i * 5 + 5; // 5 to 100
        let y = x; // Perfect line y=x

        if (dataset === 'noisy') {
            // Random scatter everywhere
            y = x + (Math.random() - 0.5) * 60; 
        } else if (dataset === 'biased') {
            // Skewed: Low values are accurate, high values are suppressed/flat
            if (x > 50) y = 50 + (Math.random() - 0.5) * 10;
            else y = x + (Math.random() - 0.5) * 10;
        } else {
            // Clean: very slight natural variance
            y = x + (Math.random() - 0.5) * 5;
        }
        
        return { x, y: Math.max(5, Math.min(95, y)) }; // Clamp 5-95
    });

    const descriptions = {
        clean: "This is 'Clean Data'. Notice the clear line going up? An AI trained on this will learn perfectly: 'As X goes up, Y goes up.'",
        noisy: "This is 'Noisy Data'. See how messy it is? The AI will be confused. It might learn a rule that doesn't really exist, or fail to learn anything at all.",
        biased: "This is 'Biased Data'. Look at the right side—it flattens out incorrectly. An AI trained on this will learn a false limit, thinking values can never go above 50."
    };

    return (
        <div className="my-8 p-6 bg-brand-bg rounded-2xl shadow-neumorphic-out">
            <h4 className="font-bold text-lg text-brand-text mb-2 text-center">Data Quality Lab</h4>
            <p className="text-center text-brand-text-light mb-6 text-sm">
                Feed the AI different "ingredients" to see how it changes the pattern it learns.
            </p>

            <div className="flex justify-center gap-2 mb-6">
                <button 
                    onClick={() => handleSetDataset('clean')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${dataset === 'clean' ? 'bg-green-100 text-green-700 shadow-neumorphic-in' : 'bg-brand-bg shadow-neumorphic-out'}`}
                >
                    ✅ Clean Data
                </button>
                <button 
                    onClick={() => handleSetDataset('noisy')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${dataset === 'noisy' ? 'bg-orange-100 text-orange-700 shadow-neumorphic-in' : 'bg-brand-bg shadow-neumorphic-out'}`}
                >
                    ⚠️ Noisy Data
                </button>
                <button 
                    onClick={() => handleSetDataset('biased')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${dataset === 'biased' ? 'bg-red-100 text-red-700 shadow-neumorphic-in' : 'bg-brand-bg shadow-neumorphic-out'}`}
                >
                    🚫 Biased Data
                </button>
            </div>

            <div className="relative w-full h-64 bg-white rounded-xl shadow-inner-sm border border-slate-200 overflow-hidden mb-4">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Grid Lines */}
                    <line x1="0" y1="50" x2="100" y2="50" stroke="#e2e8f0" strokeWidth="0.5" />
                    <line x1="50" y1="0" x2="50" y2="100" stroke="#e2e8f0" strokeWidth="0.5" />
                    
                    {/* Points */}
                    {points.map((p, i) => (
                        <circle 
                            key={i} 
                            cx={p.x} 
                            cy={100 - p.y} 
                            r="2" 
                            className="fill-brand-primary transition-all duration-500 ease-out"
                        />
                    ))}
                    
                    {/* Trend Line (Approximation Visual) */}
                    {dataset === 'clean' && <line x1="5" y1="95" x2="95" y2="5" stroke="#10b981" strokeWidth="1" opacity="0.5" strokeDasharray="4" />}
                    {dataset === 'biased' && <path d="M5 95 L50 50 L95 50" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.5" strokeDasharray="4" />}
                </svg>
                <div className="absolute bottom-2 right-2 text-xs text-slate-400 font-mono">X-Axis: Input / Y-Axis: Output</div>
            </div>

            <div className="p-4 bg-brand-primary/5 rounded-lg border border-brand-primary/10">
                <p className="text-brand-text text-sm font-medium text-center animate-fade-in">
                    {descriptions[dataset]}
                </p>
            </div>
        </div>
    );
};

export default DataVisualizer;
