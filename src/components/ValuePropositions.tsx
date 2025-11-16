import React from 'react';
import { VALUE_PROPS } from '../constants';

// Value Propositions Component
const ValuePropositions: React.FC = () => {
  return (
    <section className="py-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 tracking-wider text-center" style={{ color: '#d4af37' }}>
        Why Play With Us?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {VALUE_PROPS.map((prop) => (
          <div
            key={prop.title}
            className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/10 transform transition duration-300 hover:-translate-y-2 hover:border-amber-400/50"
          >
            <div className="mb-4">
              <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                <span className="font-bold text-xl" style={{ color: '#d4af37' }}>★</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{prop.title}</h3>
            <p className="text-gray-400">{prop.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValuePropositions;
