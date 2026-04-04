
import React, { useState } from 'react';
import type { InteractiveComponentProps } from '../../types';
import { useAuth } from '../../hooks/useAuth';

const AdversarialAttackSimulator: React.FC<InteractiveComponentProps> = ({ interactiveId }) => {
    const { user, addPoints, updateProgress } = useAuth();
    const [isHacked, setIsHacked] = useState(false);
    
    const hasCompleted = user?.progress.completedInteractives.includes(interactiveId);

    const handleHack = () => {
        setIsHacked(true);
        if (!hasCompleted) {
            addPoints(25);
            updateProgress(interactiveId, 'interactive');
        }
    };
    
    const handleReset = () => {
        setIsHacked(false);
    }

    return (
        <div className="my-8 p-6 bg-brand-bg rounded-2xl shadow-neumorphic-out border border-white/50">
            <h4 className="font-bold text-lg text-brand-text mb-2 text-center">AI Vision Hack: The Stop Sign Trick</h4>
            <p className="text-center text-brand-text-light mb-6 text-sm">
                A Self-Driving Car relies on its cameras to read road signs. <br/>
                See what happens when you add "Adversarial Stickers" to the sign.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                
                {/* The Real World View */}
                <div className="relative group perspective-500">
                    <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Real World View</p>
                    <div className="w-48 h-48 bg-sky-100 rounded-xl shadow-inner-sm flex items-center justify-center overflow-hidden border-2 border-slate-200 relative transform transition-transform duration-500 hover:rotate-y-12">
                        {/* Road */}
                        <div className="absolute bottom-0 w-full h-1/3 bg-slate-300"></div>
                        
                        {/* Pole */}
                        <div className="absolute bottom-0 w-2 h-24 bg-slate-500"></div>
                        
                        {/* Stop Sign */}
                        <div className="w-24 h-24 bg-red-600 flex items-center justify-center text-white font-bold border-4 border-white shadow-lg z-10 transition-transform hover:scale-105" style={{clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'}}>
                            STOP
                        </div>

                        {/* Adversarial Stickers (Visible only when hacked) */}
                        {isHacked && (
                            <>
                                <div className="absolute top-[35%] left-[38%] w-3 h-3 bg-black/80 rotate-45 z-20 animate-fade-in"></div>
                                <div className="absolute top-[55%] left-[58%] w-4 h-2 bg-white/90 rotate-12 z-20 animate-fade-in"></div>
                                <div className="absolute top-[45%] left-[42%] w-2 h-4 bg-yellow-400/80 -rotate-12 z-20 animate-fade-in"></div>
                            </>
                        )}
                    </div>
                </div>

                {/* AI Brain Arrow */}
                <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Car Camera</span>
                    <div className="w-24 h-1 bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full bg-brand-primary transition-all duration-1000 ${isHacked ? 'w-full ml-0' : 'w-0 ml-0'}`}></div>
                    </div>
                    <span className="text-2xl text-slate-300">➜</span>
                </div>

                {/* Car Dashboard HUD */}
                <div className={`w-64 p-4 rounded-xl shadow-neumorphic-in flex flex-col items-center transition-colors duration-500 border-2 ${isHacked ? 'bg-green-950 border-green-500' : 'bg-red-950 border-red-500'}`}>
                    <div className="flex justify-between w-full items-center mb-2">
                        <p className="text-white/70 text-xs font-bold uppercase font-mono">AI DASHBOARD v2.0</p>
                        <div className={`w-2 h-2 rounded-full animate-pulse ${isHacked ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    </div>
                    
                    <div className="w-full bg-black/50 p-2 rounded mb-2 font-mono text-xs text-green-400 border border-white/10">
                        {">"}  SCANNING OBJECT...<br/>
                        {">"}  OBJECT_ID: #492A<br/>
                        {isHacked ? (
                            <span className="text-green-400 font-bold glitch-text" data-text="> CLASS: SPEED LIMIT 45">{">"}  CLASS: SPEED LIMIT 45</span>
                        ) : (
                            <span className="text-red-500 font-bold">{">"}  CLASS: STOP SIGN</span>
                        )}
                    </div>

                    <div className="mt-2 text-center">
                        <p className="text-white/50 text-[10px] uppercase tracking-widest mb-1">Action</p>
                        {isHacked ? (
                            <h4 className="font-black text-2xl text-green-500 animate-pulse glitch-text" data-text="ACCELERATE">ACCELERATE</h4>
                        ) : (
                            <h4 className="font-black text-2xl text-red-500">BRAKE APPLIED</h4>
                        )}
                    </div>
                </div>

            </div>

            <div className="text-center mt-8">
                {!isHacked ? (
                    <button
                        onClick={handleHack}
                        className="bg-brand-primary text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-neumorphic-out hover:shadow-neumorphic-in hover:-translate-y-1 active:translate-y-0"
                    >
                        Apply Adversarial Stickers
                    </button>
                ) : (
                     <button
                        onClick={handleReset}
                        className="px-6 py-2 text-sm font-semibold text-brand-text-light hover:text-brand-primary border border-transparent hover:border-brand-primary/20 rounded-full transition-all"
                    >
                        Reset Simulation
                    </button>
                )}
            </div>
            
            {isHacked && (
                <div className="mt-6 p-4 bg-brand-primary/5 rounded-lg border border-brand-primary/10 animate-slide-in-up">
                    <p className="text-sm text-brand-text text-center">
                        <strong>Why did this happen?</strong> To a human, a sticker is just "noise". But to the AI's neural network, those specific pixels disrupt the pattern it uses to recognize a hexagon. It forces the math to calculate "Square Sign" (Speed Limit) instead of "Hexagon Sign" (Stop), causing a potentially fatal error.
                    </p>
                </div>
            )}
        </div>
    );
};

export default AdversarialAttackSimulator;
