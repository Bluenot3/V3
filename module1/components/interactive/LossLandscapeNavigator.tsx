
import React, { useState, useEffect, useRef } from 'react';
import type { InteractiveComponentProps } from '../../types';
import { useAuth } from '../../hooks/useAuth';

const LossLandscapeNavigator: React.FC<InteractiveComponentProps> = ({ interactiveId }) => {
    const { user, addPoints, updateProgress } = useAuth();
    const [robotX, setRobotX] = useState(10); // 0 to 100
    const [isAuto, setIsAuto] = useState(false);
    const [message, setMessage] = useState("Help the robot find the bottom of the valley (0 Error)!");
    
    // Simple valley function: y = (x - 50)^2 / 25
    // Global minimum at x=50.
    const getError = (x: number) => Math.round(Math.pow(x - 50, 2) / 25);
    const getSlope = (x: number) => (2 * (x - 50)) / 25; // Derivative

    const hasCompleted = user?.progress.completedInteractives.includes(interactiveId);

    const step = () => {
        setRobotX(prev => {
            const slope = getSlope(prev);
            const learningRate = 5; // Fixed step size for simplicity
            
            // If slope is negative, we need to go right (add). If positive, go left (subtract).
            // Basic Gradient Descent: x_new = x_old - (learning_rate * slope)
            let nextX = prev - (learningRate * (slope > 0 ? 1 : -1)); 
            
            // Add some "momentum" or noise to make it feel organic, but clamp to 0-100
            nextX = Math.max(0, Math.min(100, nextX));
            
            if (Math.abs(nextX - 50) < 2) {
                setIsAuto(false);
                setMessage("🎉 Perfect! Zero Error achieved.");
                if (!hasCompleted) {
                    addPoints(25);
                    updateProgress(interactiveId, 'interactive');
                }
                return 50; // Snap to center
            }
            return nextX;
        });
    };

    useEffect(() => {
        let interval: any;
        if (isAuto) {
            interval = setInterval(step, 200);
        }
        return () => clearInterval(interval);
    }, [isAuto, hasCompleted, interactiveId, addPoints, updateProgress]);

    const handleReset = () => {
        setIsAuto(false);
        setRobotX(Math.random() < 0.5 ? 10 : 90); // Random side start
        setMessage("Robot reset. Try again!");
    };

    const currentError = getError(robotX);

    return (
        <div className="my-8 p-6 bg-brand-bg rounded-2xl shadow-neumorphic-out">
            <h4 className="font-bold text-lg text-brand-text mb-2 text-center">Training: The "Blind Hiker" Game</h4>
            <p className="text-center text-sm text-brand-text-light mb-6">
                The robot wants to get the <strong>Error to 0</strong> (the bottom of the valley). <br/>
                It can't see the curve, it only feels the slope under its feet.
            </p>

            <div className="relative w-full h-48 bg-gradient-to-b from-sky-100 to-white rounded-xl overflow-hidden shadow-inner-sm border border-slate-200">
                {/* The Landscape Curve */}
                <svg className="absolute bottom-0 left-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <path 
                        d="M0,0 L0,100 L100,100 L100,0 Q50,150 0,0" 
                        fill="#e2e8f0" 
                        stroke="#94a3b8" 
                        strokeWidth="0.5"
                    />
                    {/* Visualizing the curve itself roughly matching the math y = (x-50)^2/25 scaled */}
                    <path d="M0,0 Q50,180 100,0" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4,4"/>
                </svg>

                {/* The Robot */}
                <div 
                    className="absolute bottom-0 transition-all duration-300 ease-linear flex flex-col items-center"
                    style={{ 
                        left: `${robotX}%`, 
                        transform: `translateX(-50%) translateY(-${100 - (currentError / 100 * 80 + 10)}%)` // Rough visual mapping
                    }}
                >
                    <div className="bg-white px-2 py-1 rounded-full shadow-md text-xs font-bold text-red-500 mb-1 whitespace-nowrap">
                        Error: {currentError}
                    </div>
                    <div className="text-4xl filter drop-shadow-lg">🤖</div>
                </div>
            </div>

            <div className="mt-6 flex flex-col items-center gap-4">
                <div className="flex gap-4">
                    <button 
                        onClick={step} 
                        disabled={isAuto || currentError === 0}
                        className="px-6 py-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all font-semibold text-brand-text disabled:opacity-50"
                    >
                        🦶 Take 1 Step
                    </button>
                    <button 
                        onClick={() => setIsAuto(!isAuto)} 
                        disabled={currentError === 0}
                        className={`px-6 py-3 rounded-xl shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all font-bold text-white
                            ${isAuto ? 'bg-orange-400' : 'bg-brand-primary'}
                        `}
                    >
                        {isAuto ? '⏸ Pause' : '⚡ Auto-Train'}
                    </button>
                </div>
                
                <button onClick={handleReset} className="text-sm text-brand-text-light hover:text-brand-primary underline">
                    Reset Robot
                </button>

                <div className="p-4 bg-brand-primary/5 rounded-lg border border-brand-primary/10 text-center max-w-md">
                    <p className="text-brand-text font-medium">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default LossLandscapeNavigator;
