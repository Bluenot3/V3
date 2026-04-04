import React, { useState } from 'react';
import type { InteractiveComponentProps } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { getAiClient } from '../../services/aiService';
import { SparklesIcon } from '../icons/SparklesIcon';

const EthicalBiasMirror: React.FC<InteractiveComponentProps> = ({ interactiveId }) => {
    const { user, addPoints, updateProgress } = useAuth();
    const [text, setText] = useState('The doctor helped the nurse with her patient.');
    const [language, setLanguage] = useState('Spanish');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const hasCompleted = user?.progress.completedInteractives.includes(interactiveId);

    const handleTranslate = async () => {
        if (!text.trim()) {
            setError('Please enter some text.');
            return;
        }
        setLoading(true);
        setError('');
        setResult('');

        const prompt = `Translate the following English phrase to ${language}, and then immediately translate it back to English. Provide only the final back-translated English phrase, with no extra explanation.

Original Phrase: "${text}"`;

        try {
            const ai = await getAiClient();
            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            setResult(response.text);

            if (!hasCompleted) {
                addPoints(25);
                updateProgress(interactiveId, 'interactive');
            }
        } catch (e) {
            console.error(e);
            setError('Failed to perform translation.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="my-8 p-6 bg-brand-bg rounded-2xl shadow-neumorphic-out">
            <h4 className="font-bold text-lg text-brand-text mb-2 text-center">Ethical Bias Mirror</h4>
            <p className="text-center text-brand-text-light mb-4 text-sm">See how meaning and potential biases can shift through round-trip translation.</p>
            
            <div className="space-y-4">
                <div>
                    <label className="font-semibold text-sm text-brand-text">Original English Phrase</label>
                    <input type="text" value={text} onChange={e => setText(e.target.value)} className="w-full mt-1 p-2 bg-brand-bg rounded-lg shadow-neumorphic-in"/>
                </div>
                 <div>
                    <label className="font-semibold text-sm text-brand-text">Translate via</label>
                    <select value={language} onChange={e => setLanguage(e.target.value)} className="w-full mt-1 p-2 bg-brand-bg rounded-lg shadow-neumorphic-in">
                        <option>Spanish</option>
                        <option>Japanese</option>
                        <option>German</option>
                        <option>A language with gender-neutral pronouns</option>
                    </select>
                </div>
            </div>
            
            <div className="text-center mt-4">
                 <button onClick={handleTranslate} disabled={loading} className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white font-bold py-3 px-6 rounded-full shadow-neumorphic-out hover:shadow-neumorphic-in disabled:opacity-50">
                    <SparklesIcon />
                    {loading ? 'Translating...' : 'Run Round-Trip Translation'}
                </button>
            </div>
            
            {error && <p className="text-center text-red-500 mt-4">{error}</p>}

            {(loading || result) && (
                <div className="mt-6 p-4 bg-brand-bg rounded-lg shadow-neumorphic-in">
                    <h5 className="font-semibold text-brand-text mb-2">Back-Translated Result:</h5>
                     {loading && <p className="animate-pulse">...</p>}
                     {result && <p className="text-lg text-brand-text-light font-semibold italic">"{result}"</p>}
                </div>
            )}
        </div>
    );
};

export default EthicalBiasMirror;
