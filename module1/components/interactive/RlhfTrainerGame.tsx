import React, { useState } from 'react';
import type { InteractiveComponentProps } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { getAiClient } from '../../services/aiService';

const prompts = [
    "Explain black holes to a 5-year-old.",
    "Write a tagline for a new brand of coffee.",
    "What are three fun things to do in Paris?",
];

const RlhfTrainerGame: React.FC<InteractiveComponentProps> = ({ interactiveId }) => {
    const { user, addPoints, updateProgress } = useAuth();
    const [prompt, setPrompt] = useState(prompts[0]);
    const [responseA, setResponseA] = useState('');
    const [responseB, setResponseB] = useState('');
    const [loading, setLoading] = useState(false);
    const [score, setScore] = useState(0);
    const [rounds, setRounds] = useState(0);

    const hasCompleted = user?.progress.completedInteractives.includes(interactiveId);

    const getNewPair = async () => {
        setLoading(true);
        setResponseA('');
        setResponseB('');
        const currentPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        setPrompt(currentPrompt);
        
        try {
            const ai = await getAiClient();
            const [resA, resB] = await Promise.all([
                ai.models.generateContent({ model: 'gemini-2.5-flash', contents: `Respond to the following prompt. Be concise and friendly.\n${currentPrompt}`, config: { temperature: 0.9 } }),
                ai.models.generateContent({ model: 'gemini-2.5-flash', contents: `Respond to the following prompt. Be detailed and formal.\n${currentPrompt}`, config: { temperature: 0.5 } })
            ]);
            setResponseA(resA.text);
            setResponseB(resB.text);
        } catch (e) {
            console.error(e);
            setResponseA("Error generating response.");
            setResponseB("Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useState(() => { getNewPair(); });

    const handleChoice = (choice: 'A' | 'B') => {
        if (loading) return;
        setScore(prev => prev + (choice === 'A' ? -1 : 1)); // Arbitrary scoring for demo
        setRounds(prev => prev + 1);
        if (rounds + 1 >= 5 && !hasCompleted) {
             addPoints(25);
             updateProgress(interactiveId, 'interactive');
        }
        getNewPair();
    };

    return (
        <div className="my-8 p-6 bg-brand-bg rounded-2xl shadow-neumorphic-out">
            <h4 className="font-bold text-lg text-brand-text mb-2 text-center">Human-Feedback Trainer Game</h4>
            <p className="text-center text-brand-text-light mb-4 text-sm">Help align our AI! Choose the better response to the prompt. (Complete 5 rounds to finish)</p>

            <div className="p-4 bg-brand-bg rounded-lg shadow-neumorphic-in text-center mb-4">
                <p className="text-brand-text-light text-sm">Prompt:</p>
                <p className="font-semibold text-brand-text">{prompt}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div onClick={() => handleChoice('A')} className="p-4 bg-brand-bg rounded-lg shadow-neumorphic-out hover:shadow-neumorphic-in cursor-pointer min-h-[150px]">
                     {loading ? <p className="animate-pulse">...</p> : <p className="text-brand-text-light">{responseA}</p>}
                </div>
                <div onClick={() => handleChoice('B')} className="p-4 bg-brand-bg rounded-lg shadow-neumorphic-out hover:shadow-neumorphic-in cursor-pointer min-h-[150px]">
                     {loading ? <p className="animate-pulse">...</p> : <p className="text-brand-text-light">{responseB}</p>}
                </div>
            </div>

            <div className="mt-4 text-center font-semibold text-brand-text">
                <p>Round: {rounds} / 5</p>
                <p>Your Preference Score: {score}</p>
                {rounds >= 5 && <p className="text-pale-green">Training Complete! Thanks for your feedback.</p>}
            </div>
        </div>
    );
};

export default RlhfTrainerGame;