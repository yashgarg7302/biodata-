// A simple translation service using a public endpoint
// Note: This is a best-effort translation for demonstration.
// For production, a paid API like Google Cloud Translation is recommended.

export async function translateText(text, targetLang) {
    if (!text || text.trim() === "" || targetLang === 'en') return text;

    try {
        // Using a free/public translation endpoint
        // This is a common unofficial endpoint for light usage
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

        const response = await fetch(url);
        if (!response.ok) return text;

        const data = await response.json();
        // The structure is [[["translatedText", "originalText", ...]]]
        if (data && data[0] && data[0][0] && data[0][0][0]) {
            return data[0][0][0];
        }

        return text;
    } catch (error) {
        console.error("Translation error:", error);
        return text;
    }
}
