import React, { useState, useEffect } from 'react';

export const BuyNowModal = ({ isOpen, onClose, product, selectedAddress }) => {
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const handlePay = () => {
    console.log("Processing payment for:", product.name);
    console.log("Shipping to:", selectedAddress);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
        {isSuccess ? (
          // Success View
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Purchase Confirmed!</h2>
            <p className="text-gray-600 mb-6">Thank you for your order of the {product.name}.</p>
            <button 
              onClick={onClose}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          // Checkout View
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Confirm Your Order</h2>
            
            {/* Product Info */}
            <div className="flex gap-4 items-center mb-4">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-24 h-24 rounded-lg object-cover"
                onError={(e) => { e.target.src = 'https://placehold.co/100x100'; }}
              />
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
              </div>
            </div>
            
            {/* Address Info */}
            <div className="mb-6 p-4 bg-gray-100 rounded-lg text-sm">
              <h4 className="font-semibold text-gray-800 mb-1">Shipping to:</h4>
              <p className="text-gray-600">{selectedAddress.street}</p>
              <p className="text-gray-600">{selectedAddress.city}, {selectedAddress.country}</p>
            </div>

            {/* A real payment form (e.g., Stripe) would go here */}
            <div className="space-y-4">
              <button 
                onClick={handlePay}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all"
              >
                Pay ${product.price.toFixed(2)}
              </button>
              <button 
                onClick={onClose}
                className="w-full text-center text-gray-500 hover:text-gray-900"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};