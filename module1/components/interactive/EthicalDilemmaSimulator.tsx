
import React, { useState } from 'react';
import type { InteractiveComponentProps } from '../../types';
import { useAuth } from '../../hooks/useAuth';

type Framework = 'Utilitarian' | 'Rule-Based';

const outcomes = {
    A: {
        title: 'Switched Lanes',
        result: 'The car swerved. 1 person was hit.',
        Utilitarian: 'This fits Utilitarian logic: "Maximize the good." You sacrificed 1 to save 5. It feels cold, but mathematically minimizes loss.',
        'Rule-Based': 'This violates the rule "Do No Harm." By swerving, you actively caused an accident that wouldn\'t have happened otherwise.',
    },
    B: {
        title: 'Stayed in Lane',
        result: 'The car kept going. 5 people were hit.',
        Utilitarian: 'This fails Utilitarian logic. The net loss of life (5) is greater than the alternative (1).',
        'Rule-Based': 'This might follow a "Non-Interference" rule. You didn\'t take an action to kill anyone; nature took its course. You are not "responsible" for the failure.',
    }
};

const EthicalDilemmaSimulator: React.FC<InteractiveComponentProps> = ({ interactiveId }) => {
    const { user, addPoints, updateProgress } = useAuth();
    const [choice, setChoice] = useState<'A' | 'B' | null>(null);
    const [animating, setAnimating] = useState(false);
    const [carLane, setCarLane] = useState<'middle' | 'top' | 'bottom'>('middle');

    const hasCompleted = user?.progress.completedInteractives.includes(interactiveId);

    const handleChoice = (madeChoice: 'A' | 'B') => {
        if(animating || choice) return;
        setAnimating(true);
        
        // Animation logic
        setTimeout(() => {
            setCarLane(madeChoice === 'A' ? 'bottom' : 'top');
        }, 500);

        setTimeout(() => {
            setAnimating(false);
            setChoice(madeChoice);
            if (!hasCompleted) {
                addPoints(25);
                updateProgress(interactiveId, 'interactive');
            }
        }, 2000);
    };
    
    const handleReset = () => {
        setChoice(null);
        setCarLane('middle');
    }

    return (
        <div className="my-8 p-6 bg-brand-bg rounded-2xl shadow-neumorphic-out">
            <h4 className="font-bold text-lg text-brand-text mb-2 text-center">Simulation: The Autonomous Car</h4>
            <p className="text-center text-brand-text-light mb-6 text-sm">
                The brakes failed. The car is moving fast. 
                <br/><strong>Top Lane:</strong> 5 People. <strong>Bottom Lane:</strong> 1 Person.
                <br/>You are the programmer. Click a lane to decide where the car goes.
            </p>

            <div className="relative w-full h-48 bg-slate-200 rounded-xl overflow-hidden border border-slate-300 mb-6">
                {/* Road Lines */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-white border-t border-dashed border-slate-400"></div>
                
                {/* Obstacles */}
                <div className="absolute top-[20%] right-[10%] text-2xl" title="5 People">🚶🚶🚶🚶🚶</div>
                <div className="absolute bottom-[20%] right-[10%] text-2xl" title="1 Person">🚶</div>

                {/* Car */}
                <div 
                    className={`absolute left-0 text-4xl transition-all duration-[1500ms] ease-in-out
                        ${carLane === 'middle' ? 'top-[40%]' : ''}
                        ${carLane === 'top' ? 'top-[15%] left-[80%]' : ''}
                        ${carLane === 'bottom' ? 'bottom-[15%] left-[80%]' : ''}
                    `}
                >
                    🚗
                </div>
            </div>

            {!choice && !animating && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button onClick={() => handleChoice('B')} className="p-4 bg-red-100 border border-red-200 rounded-lg hover:shadow-md transition-all text-center group">
                        <h5 className="font-bold text-red-800">Do Nothing (Stay Top)</h5>
                        <p className="text-xs text-red-600 mt-1 opacity-70 group-hover:opacity-100">Hit the group of 5.</p>
                    </button>
                    <button onClick={() => handleChoice('A')} className="p-4 bg-blue-100 border border-blue-200 rounded-lg hover:shadow-md transition-all text-center group">
                        <h5 className="font-bold text-blue-800">Swerve (Go Bottom)</h5>
                        <p className="text-xs text-blue-600 mt-1 opacity-70 group-hover:opacity-100">Hit the single person.</p>
                    </button>
                </div>
            )}

            {choice && (
                <div className="animate-slide-in-up">
                    <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-brand-primary">
                        <h5 className="font-bold text-xl text-brand-text mb-1">{outcomes[choice].title}</h5>
                        <p className="font-mono text-xs text-red-500 mb-4">{outcomes[choice].result}</p>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-brand-bg p-3 rounded-lg">
                                <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">Utilitarian View</span>
                                <p className="text-sm mt-1 text-brand-text-light">{outcomes[choice].Utilitarian}</p>
                            </div>
                            <div className="bg-brand-bg p-3 rounded-lg">
                                <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">Rule-Based View</span>
                                <p className="text-sm mt-1 text-brand-text-light">{outcomes[choice]['Rule-Based']}</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleReset} className="mt-4 text-xs text-brand-text-light underline hover:text-brand-primary block mx-auto">Replay Simulation</button>
                </div>
            )}
        </div>
    );
};

export default EthicalDilemmaSimulator;
