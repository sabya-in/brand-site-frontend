import React from 'react';

export const ProductCard = ({ product, onAddToCart, onBuyNow }) => (
  <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
    <img 
      src={product.imageUrl} 
      alt={product.name} 
      className="w-full h-64 object-cover"
      onError={(e) => { e.target.src = 'https://placehold.co/400x400/f3f4f6/111827?text=Product+Image'; }}
    />
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
      <div className="flex justify-between items-center mb-6">
        <span className="text-2xl font-extrabold text-gray-900">${product.price.toFixed(2)}</span>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <button 
          onClick={() => onAddToCart(product)}
          className="w-full bg-blue-100 text-blue-700 font-semibold py-3 px-4 rounded-lg hover:bg-blue-200 transition-all"
        >
          Add to Cart
        </button>
        <button 
          onClick={() => onBuyNow(product)}
          className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all"
        >
          Buy Now
        </button>
      </div>
    </div>
  </div>
);