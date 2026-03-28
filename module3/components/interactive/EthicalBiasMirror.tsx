import React, { useState } from 'react';
import type { InteractiveComponentProps } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { getAiClient } from '../../services/aiService';
import { SparklesIcon } from '../icons/SparklesIcon';

const EthicalBiasMirror: React.FC<InteractiveComponentProps> = ({ interactiveId }) => {
    const { user, addPoints, updateProgress } = useAuth();
    const [prompt, setPrompt] = useState('Describe a successful leader.');
    const [englishResponse, setEnglishResponse] = useState('');
    const [japaneseResponse, setJapaneseResponse] = useState('');
    const [analysis, setAnalysis] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const hasCompleted = user?.progress.completedInteractives.includes(interactiveId);

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError('Please enter a prompt.');
            return;
        }
        setLoading(true);
        setError('');
        setEnglishResponse('');
        setJapaneseResponse('');
        setAnalysis('');

        try {
            const ai = await getAiClient();
            
            // Generate English response
            const englishResult = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            const engRes = englishResult.text;
            setEnglishResponse(engRes);

            // Generate Japanese response
            const japaneseResult = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: `${prompt} (in Japanese)` });
            const jpnRes = japaneseResult.text;
            setJapaneseResponse(jpnRes);

            // Generate analysis
            const analysisPrompt = `Analyze and compare the following two AI-generated responses to the same prompt ("${prompt}"). The first is in English, the second in Japanese. Focus on differences in tone, emphasis, and potential cultural biases. For example, does one focus more on individual achievement vs. group harmony?

English Response: "${engRes}"
Japanese Response: "${jpnRes}"

Provide a brief analysis.`;
            const analysisResult = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: analysisPrompt });
            setAnalysis(analysisResult.text);

            if (!hasCompleted) {
                addPoints(25);
                updateProgress(interactiveId, 'interactive');
            }

        } catch (e) {
            console.error(e);
            setError('Failed to generate responses. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="my-8 p-6 bg-brand-bg rounded-2xl shadow-neumorphic-out">
            <h4 className="font-bold text-lg text-brand-text mb-2 text-center">Ethical Bias Mirror</h4>
            <p className="text-center text-brand-text-light mb-4 text-sm">See how the same prompt can generate different responses across languages, revealing potential cultural biases.</p>
            
            <div className="space-y-4">
                <div>
                    <label htmlFor="bias-prompt" className="font-semibold text-brand-text mb-2 block">Shared Prompt</label>
                    <input
                        id="bias-prompt"
                        type="text"
                        value={prompt}
                        onChange={e => setPrompt(e.target.value)}
                        className="w-full p-3 bg-brand-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text shadow-neumorphic-in"
                    />
                </div>

                <div className="text-center">
                     <button onClick={handleGenerate} disabled={loading} className="inline-flex items-center gap-2 bg-brand-primary text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-neumorphic-out hover:shadow-neumorphic-in transform hover:scale-95 disabled:opacity-50">
                        <SparklesIcon />
                        {loading ? 'Generating...' : 'Run Comparison'}
                    </button>
                </div>
                
                {error && <p className="text-center text-red-500">{error}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="p-4 bg-brand-bg rounded-lg shadow-neumorphic-in min-h-[150px]">
                        <h5 className="font-semibold text-brand-text mb-2">English Output</h5>
                        {loading && !englishResponse && <p className="animate-pulse text-brand-text-light">...</p>}
                        <p className="text-brand-text-light text-sm">{englishResponse}</p>
                    </div>
                     <div className="p-4 bg-brand-bg rounded-lg shadow-neumorphic-in min-h-[150px]">
                        <h5 className="font-semibold text-brand-text mb-2">Japanese Output</h5>
                        {loading && !japaneseResponse && <p className="animate-pulse text-brand-text-light">...</p>}
                        <p className="text-brand-text-light text-sm">{japaneseResponse}</p>
                    </div>
                </div>

                {(analysis || (loading && englishResponse)) && (
                    <div className="mt-4 p-4 bg-brand-bg rounded-lg shadow-neumorphic-in">
                        <h5 className="font-semibold text-brand-text mb-2">Bias Analysis</h5>
                        {loading && !analysis && <p className="animate-pulse text-brand-text-light">...</p>}
                        <p className="text-brand-text-light text-sm">{analysis}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EthicalBiasMirror;