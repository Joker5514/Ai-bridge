import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI: GoogleGenerativeAI | null = null;
if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
}

export const getVitoMessage = async (context: string, outcome: 'win' | 'loss' | 'neutral'): Promise<string> => {
  if (!genAI) {
    console.warn("Gemini API Key not found. Using fallback messages.");
    return getFallbackMessage(outcome);
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `You are Uncle Vito, a wise, tough but caring old-school gambling coach.
    The player just had a ${outcome} in ${context}.
    Give a short, punchy piece of advice or reaction (max 2 sentences).
    Don't be too mean, be encouraging but realistic. Speak like a mobster uncle.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating AI message:", error);
    return getFallbackMessage(outcome);
  }
};

const getFallbackMessage = (outcome: 'win' | 'loss' | 'neutral'): string => {
  const messages = {
    win: [
      "Attaboy! That's how you do it.",
      "Nice hit, kid. Keep your head in the game.",
      "The house pays today. Don't get cocky."
    ],
    loss: [
      "Tough break. Walk it off.",
      "Hey, you win some, you lose some. Focus.",
      "Don't chase your losses, capiche?"
    ],
    neutral: [
      "Alright, let's see the next hand.",
      "Stay sharp.",
      "Keep your eyes on the prize."
    ]
  };

  const options = messages[outcome];
  return options[Math.floor(Math.random() * options.length)];
};
