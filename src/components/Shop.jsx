import React from 'react';
import { ProductCard } from './ProductCard.jsx';

export const Shop = ({ products, onAddToCart, onBuyNow }) => (
  <section id="shop" className="py-24 bg-white">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Our New Collection</h2>
      <p className="text-lg text-center text-gray-600 mb-12">
        Premium products designed to elevate your everyday.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart}
            onBuyNow={onBuyNow}
          />
        ))}
      </div>
    </div>
  </section>
);