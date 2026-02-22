import React, { useState } from 'react';
import { BANNERS } from '../constants';

// Rotating Banner Component
const RotatingBanner: React.FC<{ affiliateLink: string }> = ({ affiliateLink }) => {
  const [currentBanner, setCurrentBanner] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center mt-12">
      <div className="relative w-full max-w-4xl" style={{ aspectRatio: '970 / 90' }}>
        {BANNERS.map((bannerUrl, index) => (
          <a
            key={index}
            href={affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentBanner ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={bannerUrl}
              alt="Promotional Banner"
              className="rounded-lg shadow-lg w-full h-full object-cover"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default RotatingBanner;
