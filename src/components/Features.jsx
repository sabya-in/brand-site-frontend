import React from 'react';

// (Define FeatureIcon1, FeatureIcon2, FeatureIcon3 SVGs here or import them)
const FeatureIcon1 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12h2.25m.386-6.364l1.591 1.591M12 6.75a4.5 4.5 0 110 9 4.5 4.5 0 010-9z" />
  </svg>
);
const FeatureIcon2 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5h10.5M15 18.75a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);
const FeatureIcon3 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

export const Features = () => (
  <section id="features" className="py-24 bg-gray-50">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
            <FeatureIcon1 />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Quality</h3>
          <p className="text-gray-600">Crafted from the highest quality materials for durability and performance.</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
            <FeatureIcon2 />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Fast, Free Shipping</h3>
          <p className="text-gray-600">Get your order delivered to your door in as little as 2 days, for free.</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
            <FeatureIcon3 />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">30-Day Guarantee</h3>
          <p className="text-gray-600">Not in love? Send it back on us. No questions asked.</p>
        </div>
      </div>
    </div>
  </section>
);