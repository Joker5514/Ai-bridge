import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('⚠️ VITE_GEMINI_API_KEY not found in environment');
}

const genAI = new GoogleGenerativeAI(API_KEY || 'demo-key');

export interface VitoResponse {
  text: string;
  success: boolean;
  error?: string;
}

const UNCLE_VITO_SYSTEM_PROMPT = `You are Uncle Vito, a tough but caring Italian-American gambling coach from Brooklyn. You help people learn casino games like blackjack and roulette.

PERSONALITY:
- Street-smart, direct, no-nonsense
- Uses Italian-American slang occasionally ("capisce?", "fuhgeddaboudit", "badda bing")
- Tough love approach but genuinely wants to help
- Experienced gambler who's seen it all
- Protective of beginners, harsh on cocky players
- Uses gambling metaphors and wisdom

TEACHING STYLE:
- Break down complex concepts simply
- Use real casino examples
- Emphasize bankroll management
- Warn about common mistakes
- Give practical, actionable advice

TONE:
- Conversational, like talking to a friend at a bar
- Mix of tough and encouraging
- Authentic Brooklyn accent in writing style
- Never condescending, always respecting the student

Remember: You're teaching, not encouraging gambling addiction. Always promote responsible play.`;

export async function generateVitoResponse(
  userMessage: string,
  gameContext?: {
    gameType?: 'blackjack' | 'roulette' | 'general';
    playerCards?: string[];
    dealerCard?: string;
    currentBet?: number;
    bankroll?: number;
  }
): Promise<VitoResponse> {
  try {
    if (!API_KEY || API_KEY === 'demo-key') {
      return {
        text: "Hey there, kiddo. Looks like we got a little technical issue - the API key ain't set up right. Go tell your developer to add VITE_GEMINI_API_KEY to the .env file, capisce?",
        success: false,
        error: 'API key not configured'
      };
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-pro',
      generationConfig: {
        temperature: 0.9,
        topP: 0.95,
        maxOutputTokens: 500,
      }
    });

    let contextualPrompt = UNCLE_VITO_SYSTEM_PROMPT + '\n\n';
    
    if (gameContext) {
      contextualPrompt += 'CURRENT GAME STATE:\n';
      if (gameContext.gameType) {
        contextualPrompt += `Game: ${gameContext.gameType}\n`;
      }
      if (gameContext.playerCards) {
        contextualPrompt += `Player's cards: ${gameContext.playerCards.join(', ')}\n`;
      }
      if (gameContext.dealerCard) {
        contextualPrompt += `Dealer's up card: ${gameContext.dealerCard}\n`;
      }
      if (gameContext.currentBet) {
        contextualPrompt += `Current bet: $${gameContext.currentBet}\n`;
      }
      if (gameContext.bankroll) {
        contextualPrompt += `Bankroll: $${gameContext.bankroll}\n`;
      }
      contextualPrompt += '\n';
    }

    contextualPrompt += `USER: ${userMessage}\n\nUNCLE VITO:`;

    const result = await model.generateContent(contextualPrompt);
    const response = await result.response;
    const text = response.text();

    return {
      text,
      success: true
    };

  } catch (error) {
    console.error('Gemini API error:', error);
    
    // Fallback responses
    const fallbacks = [
      "Whoa, hold up there. I'm havin' some technical difficulties on my end. Give it another shot in a minute, yeah?",
      "Eh, the system's actin' up. Happens sometimes. Try again, will ya?",
      "Look, I'd love to help but somethin' ain't workin' right with the tech. Refresh and we'll try again."
    ];
    
    return {
      text: fallbacks[Math.floor(Math.random() * fallbacks.length)],
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function generateVitoGreeting(): Promise<VitoResponse> {
  return generateVitoResponse(
    "I just arrived and want to learn about casino games."
  );
}

export async function generateVitoGameIntro(
  gameType: 'blackjack' | 'roulette'
): Promise<VitoResponse> {
  const prompts = {
    blackjack: "I want to learn how to play blackjack. What should I know?",
    roulette: "I want to learn how to play roulette. Can you teach me?"
  };
  
  return generateVitoResponse(prompts[gameType], { gameType });
}

export async function getBlackjackAdvice(
  playerCards: string[],
  dealerCard: string,
  bankroll: number
): Promise<VitoResponse> {
  const message = `I've got ${playerCards.join(' and ')}. The dealer is showing ${dealerCard}. What should I do?`;
  
  return generateVitoResponse(message, {
    gameType: 'blackjack',
    playerCards,
    dealerCard,
    bankroll
  });
}

export async function getRouletteAdvice(
  betType: string,
  bankroll: number
): Promise<VitoResponse> {
  const message = `I'm thinking about placing a ${betType} bet. Is that smart with my current bankroll?`;
  
  return generateVitoResponse(message, {
    gameType: 'roulette',
    currentBet: 10,
    bankroll
  });
}
