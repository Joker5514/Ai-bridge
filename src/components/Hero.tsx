import React from 'react';
import RotatingBanner from './RotatingBanner';

// Hero Component
const Hero: React.FC<{ affiliateLink: string; onLaunchVito: () => void }> = ({ affiliateLink, onLaunchVito }) => {
  return (
    <section className="text-center py-16">
      <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: '#d4af37' }}>
        Master Your Game with Uncle Vito
      </h2>
      <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
        Learn blackjack and roulette strategies from a seasoned pro. Practice risk-free, get personalized advice, and play smarter.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onLaunchVito}
          className="px-8 py-4 rounded-lg font-bold text-black text-lg transition-all duration-300 hover:scale-105"
          style={{ background: 'linear-gradient(45deg, #ffd700, #d4af37)', boxShadow: '0 0 24px rgba(212, 175, 55, 0.65)' }}
        >
          Talk to Uncle Vito
        </button>
        <a
          href={affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 bg-white/10 rounded-lg font-bold text-white text-lg border-2 border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          Play at Stake.us
        </a>
      </div>
      <RotatingBanner affiliateLink={affiliateLink} />
    </section>
  );
};

export default Hero;
