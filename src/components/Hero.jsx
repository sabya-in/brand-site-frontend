import React from 'react';

export const Hero = () => (
  <section id="home" className="container mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center gap-12">
    <div className="w-full md:w-1/2">
      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
        New Launch
      </span>
      <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tighter leading-tight mb-6">
        The Future of Sound.
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-lg">
        Experience crystal-clear audio and deep, rich bass with the all-new EON wireless earbuds. Designed for life, ready for anything.
      </p>
      <a href="#shop" className="inline-block bg-blue-600 text-white text-lg font-semibold px-8 py-4 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300">
        Shop The Collection
      </a>
    </div>
    <div className="w-full md:w-1/2">
      <img 
        src="https://placehold.co/600x600/e0e7ff/3b82f6?text=EON+Earbuds" 
        alt="New EON earbuds" 
        className="w-full h-auto rounded-2xl shadow-xl object-cover"
        onError={(e) => { e.target.src = 'https://placehold.co/600x600/e0e7ff/3b82f6?text=Product+Image'; }}
      />
    </div>
  </section>
);