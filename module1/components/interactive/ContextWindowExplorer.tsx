
import React, { useState, useMemo, useCallback } from 'react';
import { getAiClient } from '../../services/aiService';
import type { InteractiveComponentProps } from '../../types';
import { useAuth } from '../../hooks/useAuth';

const placeholderText = `Artificial intelligence (AI) is intelligence demonstrated by machines, as opposed to the natural intelligence displayed by humans. AI research has been defined as the field of study of intelligent agents, which refers to any system that perceives its environment and takes actions that maximize its chance of successfully achieving its goals. The term "artificial intelligence" had previously been used to describe machines that mimic and display "human" cognitive skills.`;

const ContextWindowExplorer: React.FC<InteractiveComponentProps> = ({ interactiveId }) => {
    const { user, addPoints, updateProgress } = useAuth();
    const [documentText, setDocumentText] = useState(placeholderText);
    const [windowSize, setWindowSize] = useState(25); // Percentage
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const hasCompleted = user?.progress.completedInteractives.includes(interactiveId);

    // Calculate indices for "sliding window"
    // For simplicity, we just take the first X% as the context window
    const totalChars = documentText.length;
    const windowChars = Math.round(totalChars * (windowSize / 100));
    const startIndex = 0;
    const endIndex = windowChars;

    const highlightedText = useMemo(() => {
        const inside = documentText.substring(startIndex, endIndex);
        const outside = documentText.substring(endIndex);
        return (
            <>
                <mark className="bg-brand-primary/20 text-brand-text font-medium rounded px-1 transition-all duration-300">{inside}</mark>
                <span className="opacity-30 transition-opacity duration-300">{outside}</span>
            </>
        );
    }, [documentText, startIndex, endIndex]);

    // Debounce function
    const debounce = <F extends (...args: any[]) => any>(func: F, delay: number) => {
        let timeoutId: ReturnType<typeof setTimeout>;
        return (...args: Parameters<F>): void => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    };

    const getSummary = async (text: string) => {
        if (!text.trim()) return;
        setLoading(true);
        setError(null);
        const prompt = `Concisely summarize the key points from the following text excerpt (ignore cut-off sentences):\n\n"${text}"`;
        try {
            const ai = await getAiClient();
            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            setSummary(response.text);
            if (!hasCompleted) {
                addPoints(25);
                updateProgress(interactiveId, 'interactive');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to generate summary.');
        } finally {
            setLoading(false);
        }
    };
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedGetSummary = useCallback(debounce(getSummary, 700), [hasCompleted]);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = parseInt(e.target.value, 10);
        setWindowSize(newSize);
        const textToSummarize = documentText.substring(0, Math.round(documentText.length * (newSize / 100)));
        debouncedGetSummary(textToSummarize);
    };

    return (
        <div className="my-8 p-6 bg-brand-bg rounded-2xl shadow-neumorphic-out">
            <h4 className="font-bold text-lg text-brand-text mb-2 text-center">The Sliding Window</h4>
            <p className="text-center text-brand-text-light mb-6 text-sm">
                AI memory is like a backpack with limited space. It can only "carry" (process) the highlighted text. 
                <br/>The rest falls outside its "Context Window".
            </p>
            
            <div className="flex flex-col gap-4">
                {/* Visual Capacity Bar */}
                <div className="w-full bg-slate-200 h-6 rounded-full overflow-hidden shadow-inner relative">
                    <div 
                        className={`h-full transition-all duration-300 ${windowSize > 90 ? 'bg-red-400' : 'bg-brand-primary'}`}
                        style={{ width: `${windowSize}%` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-600">
                        Memory Usage: {windowSize}%
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <h5 className="font-semibold text-brand-text mb-2 text-xs uppercase tracking-wider">Document (The World)</h5>
                        <div className="flex-grow h-64 p-4 bg-white rounded-lg shadow-inner-sm overflow-y-auto text-brand-text leading-relaxed text-sm border border-slate-100">
                            {highlightedText}
                        </div>
                    </div>
                     <div className="flex flex-col">
                        <h5 className="font-semibold text-brand-text mb-2 text-xs uppercase tracking-wider">What the AI Understands</h5>
                        <div className="flex-grow h-64 p-4 bg-brand-bg rounded-lg shadow-neumorphic-in flex items-center justify-center text-center">
                            {loading && <p className="text-brand-text-light animate-pulse">Reading...</p>}
                            {error && <p className="text-red-500">{error}</p>}
                            {!loading && !error && summary && <p className="text-brand-text text-sm italic">"{summary}"</p>}
                            {!loading && !error && !summary && <p className="text-brand-text-light opacity-50 text-sm">Drag slider to fill memory.</p>}
                        </div>
                    </div>
                </div>

                <div className="mt-2">
                    <input
                        id="context-slider"
                        type="range"
                        min="5"
                        max="100"
                        value={windowSize}
                        onChange={handleSliderChange}
                        className="w-full h-3 bg-brand-bg rounded-lg appearance-none cursor-pointer shadow-neumorphic-in accent-brand-primary"
                    />
                    <div className="flex justify-between text-xs text-brand-text-light mt-1">
                        <span>Small Context (Short Memory)</span>
                        <span>Large Context (Long Memory)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContextWindowExplorer;
