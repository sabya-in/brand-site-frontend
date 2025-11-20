import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.263-12a1.125 1.125 0 011.119-1.007h10.519a1.125 1.125 0 011.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

export const Header = ({ onOpenCart, cartCount, onOpenLogin }) => {
  const { currentUser, logout } = useAuth();

  return (
    <header className="sticky top-0 bg-white/90 backdrop-blur-sm shadow-sm z-40">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-gray-900 tracking-tighter">
          EON
        </a>
        <div className="hidden md:flex space-x-6">
          <a href="#home" className="text-gray-600 hover:text-gray-900">Home</a>
          <a href="#shop" className="text-gray-600 hover:text-gray-900">Shop</a>
          <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
        </div>
        <div className="flex items-center gap-4">
          {currentUser ? (
            <>
              <span className="text-sm text-gray-700 hidden sm:block">
                Hi, {currentUser.displayName || currentUser.email}
              </span>
              <button onClick={logout} className="text-sm text-gray-500 hover:text-gray-900">Logout</button>
            </>
          ) : (
            <button onClick={onOpenLogin} className="text-sm font-medium text-blue-600 hover:text-blue-800">
              Login
            </button>
          )}
          <button onClick={onOpenCart} className="relative text-gray-600 hover:text-gray-900">
            <CartIcon />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};