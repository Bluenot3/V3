let aiInstance: any | undefined;
let initializationPromise: Promise<any> | null = null;

/**
 * Lazily initializes and returns a promise that resolves with the GoogleGenAI client.
 * This singleton pattern uses a dynamic import to defer loading the @google/genai module
 * until it's first needed, which is the most robust way to avoid startup race conditions.
 */
export function getAiClient(): Promise<any> {
    // If the instance already exists, return it immediately.
    if (aiInstance) {
        return Promise.resolve(aiInstance);
    }

    // If initialization is already in progress, return the existing promise.
    if (initializationPromise) {
        return initializationPromise;
    }

    // Start the initialization process using an async IIFE (Immediately Invoked Function Expression).
    initializationPromise = (async () => {
        try {
            // Dynamically import the module to prevent it from blocking app startup.
            const { GoogleGenAI } = await import('@google/genai');
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            aiInstance = ai;
            return ai;
        } catch (e) {
            console.error("Failed to initialize GoogleGenAI:", e);
            const message = e instanceof Error ? e.message : "An unknown error occurred.";
            // Important: Reset the promise on failure to allow for retry attempts.
            initializationPromise = null;
            throw new Error(`The AI service could not be started: ${message}`);
        }
    })();

    return initializationPromise;
}
