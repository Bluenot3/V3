
import React, { useState } from 'react';

// Data points for "Past Students"
const pastData = [
    { x: 1, y: 20 }, { x: 1.5, y: 30 },
    { x: 2, y: 25 }, { x: 3, y: 45 },
    { x: 4, y: 40 }, { x: 5, y: 60 },
    { x: 6, y: 55 }, { x: 7, y: 75 },
    { x: 8, y: 80 }, { x: 9, y: 85 },
];

const SimplePredictiveModel: React.FC = () => {
    const [hours, setHours] = useState(5);
    // Linear model: y = 8x + 15
    const predictedScore = Math.min(100, Math.round(8 * hours + 15));

    // Chart dimensions
    const width = 300;
    const height = 200;
    const padding = 20;
    
    // Scale functions
    const xScale = (h: number) => padding + (h / 10) * (width - 2 * padding);
    const yScale = (s: number) => height - padding - (s / 100) * (height - 2 * padding);

    return (
        <div className="my-8 p-6 bg-brand-bg rounded-2xl shadow-neumorphic-out">
            <h4 className="font-bold text-lg text-brand-text mb-2 text-center">Prediction Engine: Student Success</h4>
            <p className="text-center text-sm text-brand-text-light mb-6">
                The <span className="text-brand-blue font-bold">Blue Dots</span> are real students from the past. <br/>
                The <span className="text-brand-primary font-bold">Purple Line</span> is the pattern the AI learned. <br/>
                Slide the <span className="text-orange-500 font-bold">Orange Dot</span> (New Student) to see the prediction!
            </p>

            <div className="flex flex-col items-center gap-6">
                <div className="relative bg-white rounded-lg shadow-inner-sm p-4">
                    <svg width={width} height={height} className="overflow-visible">
                        {/* Axes */}
                        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#cbd5e1" strokeWidth="2" />
                        <line x1={padding} y1={height - padding} x2={padding} y2={padding} stroke="#cbd5e1" strokeWidth="2" />
                        
                        {/* Labels */}
                        <text x={width / 2} y={height + 15} textAnchor="middle" fontSize="12" fill="#64748b">Hours Studied</text>
                        <text x={0} y={height / 2} textAnchor="middle" fontSize="12" fill="#64748b" transform={`rotate(-90, 10, ${height/2})`}>Test Score</text>

                        {/* Past Data Points */}
                        {pastData.map((d, i) => (
                            <circle key={i} cx={xScale(d.x)} cy={yScale(d.y)} r="4" fill="#3B82F6" opacity="0.6" />
                        ))}

                        {/* The Model (Line of Best Fit) */}
                        <line 
                            x1={xScale(0)} 
                            y1={yScale(15)} 
                            x2={xScale(10)} 
                            y2={yScale(95)} 
                            stroke="#7C3AED" 
                            strokeWidth="3" 
                            strokeDasharray="5,5"
                        />

                        {/* The Prediction (User Controlled) */}
                        <line x1={xScale(hours)} y1={height - padding} x2={xScale(hours)} y2={yScale(predictedScore)} stroke="#F97316" strokeWidth="2" strokeDasharray="2,2" opacity="0.5" />
                        <line x1={padding} y1={yScale(predictedScore)} x2={xScale(hours)} y2={yScale(predictedScore)} stroke="#F97316" strokeWidth="2" strokeDasharray="2,2" opacity="0.5" />
                        
                        <circle cx={xScale(hours)} cy={yScale(predictedScore)} r="8" fill="#F97316" stroke="white" strokeWidth="2" className="drop-shadow-md" />
                    </svg>
                </div>

                <div className="w-full max-w-sm bg-brand-bg p-4 rounded-xl shadow-neumorphic-in flex flex-col items-center">
                    <label htmlFor="study-hours" className="block text-center font-semibold text-brand-text mb-2">
                        If a new student studies <span className="text-orange-500 text-xl">{hours}</span> hours...
                    </label>
                    <input
                        id="study-hours"
                        type="range"
                        min="0"
                        max="10"
                        step="0.5"
                        value={hours}
                        onChange={(e) => setHours(parseFloat(e.target.value))}
                        className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500 hover:accent-orange-600 transition-all"
                    />
                    <div className="mt-4 text-center">
                        <p className="text-brand-text-light text-sm">The AI predicts a score of:</p>
                        <p className="font-extrabold text-5xl text-brand-primary animate-float">{predictedScore}%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SimplePredictiveModel;
