import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ValuePropositions from './components/ValuePropositions';
import Footer from './components/Footer';
import UncleVitoWidget from './components/UncleVitoWidget';
import TutorMode from './components/TutorMode';
import { VitoMessage, GameType } from './types';
import { AFFILIATE_LINK } from './constants';

// Main App Component
const App: React.FC = () => {
  const [isVitoVisible, setIsVitoVisible] = useState(false);
  const [vitoMessage, setVitoMessage] = useState<VitoMessage | null>(null);
  const [tutorMode, setTutorMode] = useState<GameType | null>(null);

  const handleLaunchVito = useCallback(() => {
    setIsVitoVisible(true);
    setVitoMessage({
      text: "Alright, let's see what you got. I'm here to help you practice, but don't get any funny ideas. I've seen it all.",
      type: 'intro',
    });
  }, []);

  const handleCloseVito = useCallback(() => {
    setIsVitoVisible(false);
  }, []);

  const handleLaunchTutor = useCallback((game: GameType) => {
    setTutorMode(game);
  }, []);

  const handleCloseTutor = useCallback(() => {
    setTutorMode(null);
  }, []);

  const handleSetVitoMessage = useCallback((msg: VitoMessage) => {
    setVitoMessage(msg);
    setIsVitoVisible(true);
  }, []);

  return (
    <div className="min-h-screen" style={{
      backgroundImage: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
      fontFamily: "'Inter', sans-serif"
    }}>
      <Header affiliateLink={AFFILIATE_LINK} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Hero affiliateLink={AFFILIATE_LINK} onLaunchVito={handleLaunchVito} />
        <ValuePropositions />
      </main>
      <Footer />
      <UncleVitoWidget
        isVisible={isVitoVisible}
        message={vitoMessage}
        onClose={handleCloseVito}
        onLaunchTutor={handleLaunchTutor}
      />
      {tutorMode && (
        <TutorMode
          gameType={tutorMode}
          onClose={handleCloseTutor}
          setVitoMessage={handleSetVitoMessage}
        />
      )}
    </div>
  );
};

export default App;
