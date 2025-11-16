import React from 'react';

// Header Component
const Header: React.FC<{ affiliateLink: string }> = ({ affiliateLink }) => {
  return (
    <header className="border-b border-white/10 bg-black/40 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold" style={{ color: '#d4af37' }}>Uncle Vito's Casino Guide</h1>
        <a
          href={affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 rounded-lg font-bold text-black transition-all duration-300 hover:scale-105"
          style={{ background: 'linear-gradient(45deg, #ffd700, #d4af37)' }}
        >
          Join Stake.us
        </a>
      </div>
    </header>
  );
};

export default Header;
