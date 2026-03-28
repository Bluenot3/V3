
import React, { useState } from 'react';
import type { InteractiveComponentProps } from '../../types';
import { useAuth } from '../../hooks/useAuth';

const NeuralNetworkPlayground: React.FC<InteractiveComponentProps> = ({ interactiveId }) => {
    const { user, addPoints, updateProgress } = useAuth();
    const [inputs, setInputs] = useState({ hasFur: false, barks: false, hasWheels: false });
    const hasCompleted = user?.progress.completedInteractives.includes(interactiveId);

    // Simple weights logic (simulated)
    // Dog = Fur + Barks
    const score = (inputs.hasFur ? 0.5 : 0) + (inputs.barks ? 0.5 : 0) + (inputs.hasWheels ? -0.5 : 0);
    const isDog = score > 0.6;

    const toggleInput = (key: keyof typeof inputs) => {
        setInputs(prev => ({ ...prev, [key]: !prev[key] }));
        if (!hasCompleted) {
            addPoints(5);
            updateProgress(interactiveId, 'interactive');
        }
    };

    return (
        <div className="my-8 p-6 bg-brand-bg rounded-2xl shadow-neumorphic-out">
            <h4 className="font-bold text-lg text-brand-text mb-2 text-center">Neural Network Simulator</h4>
            <p className="text-center text-brand-text-light mb-6 text-sm">
                Activate the input neurons to trigger the output. <br/>
                Notice how different inputs carry different "weights" (importance).
            </p>

            <div className="flex justify-between items-center max-w-lg mx-auto relative">
                
                {/* Inputs */}
                <div className="flex flex-col gap-4 z-10">
                    <button 
                        onClick={() => toggleInput('hasFur')}
                        className={`px-4 py-2 rounded-full border-2 transition-all duration-300 font-bold text-sm ${inputs.hasFur ? 'bg-brand-primary border-brand-primary text-white shadow-glowing' : 'bg-white border-slate-300 text-slate-400'}`}
                    >
                        Has Fur
                    </button>
                    <button 
                        onClick={() => toggleInput('barks')}
                        className={`px-4 py-2 rounded-full border-2 transition-all duration-300 font-bold text-sm ${inputs.barks ? 'bg-brand-primary border-brand-primary text-white shadow-glowing' : 'bg-white border-slate-300 text-slate-400'}`}
                    >
                        Barks
                    </button>
                    <button 
                        onClick={() => toggleInput('hasWheels')}
                        className={`px-4 py-2 rounded-full border-2 transition-all duration-300 font-bold text-sm ${inputs.hasWheels ? 'bg-red-500 border-red-500 text-white shadow-lg' : 'bg-white border-slate-300 text-slate-400'}`}
                    >
                        Has Wheels
                    </button>
                </div>

                {/* SVG Connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    {/* Lines to Output */}
                    <line x1="20%" y1="16%" x2="80%" y2="50%" stroke={inputs.hasFur ? '#7C3AED' : '#E2E8F0'} strokeWidth={inputs.hasFur ? 3 : 1} strokeDasharray={inputs.hasFur ? '' : '4'} />
                    <line x1="20%" y1="50%" x2="80%" y2="50%" stroke={inputs.barks ? '#7C3AED' : '#E2E8F0'} strokeWidth={inputs.barks ? 3 : 1} strokeDasharray={inputs.barks ? '' : '4'} />
                    <line x1="20%" y1="84%" x2="80%" y2="50%" stroke={inputs.hasWheels ? '#EF4444' : '#E2E8F0'} strokeWidth={inputs.hasWheels ? 3 : 1} strokeDasharray={inputs.hasWheels ? '' : '4'} />
                </svg>

                {/* Output */}
                <div className="z-10 flex flex-col items-center">
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${isDog ? 'bg-green-500 border-green-400 shadow-glowing text-white scale-110' : 'bg-white border-slate-200 text-slate-300'}`}>
                        {isDog ? <span className="text-3xl">🐶</span> : <span className="text-3xl">❓</span>}
                    </div>
                    <span className={`mt-2 font-bold text-sm transition-colors ${isDog ? 'text-green-600' : 'text-slate-300'}`}>
                        {isDog ? 'IS DOG' : 'NOT DETECTED'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default NeuralNetworkPlayground;
