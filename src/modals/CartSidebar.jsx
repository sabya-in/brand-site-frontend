import React from 'react';

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const CartSidebar = ({ isOpen, onClose, cart, onRemoveFromCart, subtotal }) => (
  <>
    {/* Cart Panel */}
    <div 
      className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out flex flex-col`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
          <CloseIcon />
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div key={item.id} className="flex gap-4 items-center">
              <img 
                src={item.imageUrl.replace('400x400', '80x80')} 
                alt={item.name} 
                className="w-16 h-16 rounded-md object-cover"
                onError={(e) => { e.target.src = 'https://placehold.co/80x80/f3f4f6/111827?text=Item'; }}
              />
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{item.name}</h4>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                <p className="font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <button 
                onClick={() => onRemoveFromCart(item.id)}
                className="text-red-500 hover:text-red-700 text-lg font-bold"
              >
                &times;
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-6 border-t bg-gray-50">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-900">Subtotal</span>
          <span className="text-xl font-bold text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all">
          Proceed to Checkout
        </button>
      </div>
    </div>
    
    {/* Overlay */}
    <div 
      onClick={onClose}
      className={`fixed inset-0 bg-black/30 z-40 ${isOpen ? 'block' : 'hidden'}`}
    ></div>
  </>
);