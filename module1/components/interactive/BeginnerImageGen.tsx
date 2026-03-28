
import React, { useState } from 'react';
import type { InteractiveComponentProps } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { getAiClient } from '../../services/aiService';
import { SparklesIcon } from '../icons/SparklesIcon';
import { Modality } from '@google/genai';

const prompts = [
    "A cute robot painting a canvas in a sunny park",
    "A futuristic city floating in the clouds, golden hour",
    "A cat wearing a spacesuit on Mars, digital art",
    "A magical library with flying books, fantasy style"
];

const BeginnerImageGen: React.FC<InteractiveComponentProps> = ({ interactiveId }) => {
    const { user, addPoints, updateProgress } = useAuth();
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const hasCompleted = user?.progress.completedInteractives.includes(interactiveId);

    const handleSurprise = () => {
        const random = prompts[Math.floor(Math.random() * prompts.length)];
        setPrompt(random);
    };

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError('Please enter a description first.');
            return;
        }
        setLoading(true);
        setError('');
        setImageUrl('');

        try {
            const ai = await getAiClient();
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: [{ text: prompt }] },
                config: {
                    responseModalities: [Modality.IMAGE],
                },
            });

            let foundImage = false;
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    setImageUrl(`data:image/png;base64,${part.inlineData.data}`);
                    foundImage = true;
                    if (!hasCompleted) {
                        addPoints(25);
                        updateProgress(interactiveId, 'interactive');
                    }
                    break;
                }
            }
            if (!foundImage) {
                setError('The AI is shy today and didn\'t return an image. Please try again.');
            }
        } catch (e) {
            console.error(e);
            setError('Something went wrong generating the image. Try a different prompt.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="my-8 p-6 bg-brand-bg rounded-2xl shadow-neumorphic-out">
            <h4 className="font-bold text-lg text-brand-text mb-2 text-center">Instant Image Creator</h4>
            <p className="text-center text-brand-text-light mb-6 text-sm">Type anything you can imagine, or click "Surprise Me" for an idea.</p>
            
            <div className="flex flex-col gap-4 max-w-xl mx-auto">
                <div className="relative">
                    <input 
                        type="text" 
                        value={prompt} 
                        onChange={e => setPrompt(e.target.value)} 
                        placeholder="e.g. A neon hamster running a marathon"
                        className="w-full pl-4 pr-32 py-3 bg-brand-bg rounded-full shadow-neumorphic-in focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                    <button 
                        onClick={handleSurprise}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-brand-primary hover:text-brand-primary-light px-3 py-1 bg-white/50 rounded-full transition-colors"
                    >
                        Surprise Me
                    </button>
                </div>

                <button 
                    onClick={handleGenerate} 
                    disabled={loading} 
                    className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-3 px-6 rounded-full shadow-neumorphic-out hover:shadow-neumorphic-in disabled:opacity-50 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
                >
                    <SparklesIcon />
                    {loading ? 'Dreaming...' : 'Generate Image'}
                </button>
            </div>
            
            {error && <p className="text-center text-red-500 mt-4">{error}</p>}
            
            <div className="mt-8 flex justify-center">
                {loading ? (
                    <div className="w-full max-w-md aspect-square bg-brand-bg rounded-2xl shadow-neumorphic-in flex flex-col items-center justify-center animate-pulse">
                        <SparklesIcon />
                        <p className="text-brand-text-light mt-2 text-sm">Creating pixel by pixel...</p>
                    </div>
                ) : imageUrl ? (
                    <div className="relative group w-full max-w-md">
                        <img src={imageUrl} alt={prompt} className="w-full h-auto rounded-2xl shadow-soft-xl animate-fade-in" />
                        <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md">Generated by Gemini</span>
                        </div>
                    </div>
                ) : (
                    <div className="w-full max-w-md aspect-video bg-brand-bg/50 border-2 border-dashed border-brand-shadow-dark rounded-2xl flex items-center justify-center text-brand-text-light/50">
                        Image Preview Area
                    </div>
                )}
            </div>
        </div>
    );
};

export default BeginnerImageGen;
