import React from 'react';

export const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 py-16">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold text-white mb-4">EON</h3>
          <p className="text-sm">The future of sound, sight, and touch.</p>
        </div>
        <div>
          <h4 className="text-md font-semibold text-white mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Earbuds</a></li>
            <li><a href="#" className="hover:text-white">Watches</a></li>
            <li><a href="#" className="hover:text-white">Speakers</a></li>
            <li><a href="#" className_ ="hover:text-white">Accessories</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-md font-semibold text-white mb-4">About</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Our Story</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
            <li><a href="#" className="hover:text-white">Press</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-md font-semibold text-white mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">Twitter</a>
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">Facebook</a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm">
        <p>&copy; 2025 EON. All rights reserved.</p>
      </div>
    </div>
  </footer>
);