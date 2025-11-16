import React from 'react';

// Footer Component
const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-black/40 backdrop-blur-md py-8 mt-20">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <p className="mb-2">© 2024 Uncle Vito's Casino Guide. For entertainment purposes only.</p>
        <p className="text-sm">Please gamble responsibly. Must be 21+ to play.</p>
      </div>
    </footer>
  );
};

export default Footer;
