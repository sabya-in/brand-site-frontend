import React, { useState, useMemo } from 'react';

// --- SVG Icons (as components) ---
// Using inline SVGs is best practice in React as it avoids extra network requests.

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.263-12a1.125 1.125 0 011.119-1.007h10.519a1.125 1.125 0 011.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

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

// --- Static Data ---
// In a real app, this array would come from your backend API.
// We'd use `useState` and `useEffect` to fetch it.
const products = [
  {
    id: 1,
    name: "EON Buds",
    description: "Active noise-cancelling wireless earbuds. 30-hour battery life.",
    price: 149.00,
    imageUrl: "https://placehold.co/400x400/f3f4f6/111827?text=EON+Buds"
  },
  {
    id: 2,
    name: "EON Watch",
    description: "The smart-watch that keeps up with you. GPS and heart-rate tracking.",
    price: 299.00,
    imageUrl: "https://placehold.co/400x400/374151/e5e7eb?text=EON+Watch"
  },
  {
    id: 3,
    name: "EON Speaker",
    description: "360° room-filling sound in a compact, portable design.",
    price: 199.00,
    imageUrl: "https://placehold.co/400x400/e0e7ff/3b82f6?text=EON+Speaker"
  }
];

// --- Reusable Components ---
// Breaking the UI into components makes it manageable and reusable.

const Header = ({ onOpenCart, cartCount }) => (
  <header className="sticky top-0 bg-white/90 backdrop-blur-sm shadow-sm z-40">
    <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
      <a href="#" className="text-2xl font-bold text-gray-900 tracking-tighter">
        EON
      </a>
      <div className="hidden md:flex space-x-6">
        <a href="#home" className="text-gray-600 hover:text-gray-900">Home</a>
        <a href="#shop" className="text-gray-600 hover:text-gray-900">Shop</a>
        <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
        <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
      </div>
      <button onClick={onOpenCart} className="relative text-gray-600 hover:text-gray-900">
        <CartIcon />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>
    </nav>
  </header>
);

const Hero = () => (
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

const ProductCard = ({ product, onAddToCart, onBuyNow }) => (
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
          onClick={onBuyNow}
          className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all"
        >
          Buy Now
        </button>
      </div>
    </div>
  </div>
);

const Shop = ({ onAddToCart, onBuyNow }) => (
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

const Features = () => (
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

const Footer = () => (
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
            <li><a href="#" className="hover:text-white">Accessories</a></li>
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

const CartSidebar = ({ isOpen, onClose, cart, onRemoveFromCart, subtotal }) => (
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

const BuyNowModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Purchase Confirmed!</h2>
        <p className="text-gray-600 mb-6">Thank you for your order. We're getting it ready for you now.</p>
        <button 
          onClick={onClose}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};


// --- Main App Component ---
// This is the root component that ties everything together.

export default function App() {
  // --- State ---
  // `useState` is a React Hook to hold component's state.
  const [cart, setCart] = useState([]); // Array of { ...product, quantity: n }
  const [isCartOpen, setIsCartOpen] = new useState(false);
  const [isModalOpen, setIsModalOpen] = new useState(false);

  // --- Computed State (Memoized for performance) ---
  // `useMemo` recalculates a value only when its dependencies (the array) change.
  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  // --- Event Handlers ---
  
  const handleAddToCart = (productToAdd) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productToAdd.id);
      
      if (existingItem) {
        // Increment quantity if item already exists
        return prevCart.map(item => 
          item.id === productToAdd.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Add new item to cart
        return [...prevCart, { ...productToAdd, quantity: 1 }];
      }
    });
    setIsCartOpen(true); // Open cart on add
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const handleBuyNow = () => {
    setIsModalOpen(true);
  };

  // --- Render ---
  // This is the JSX that defines the HTML structure of your app.
  return (
    <div className="bg-gray-50 text-gray-800">
      <Header onOpenCart={() => setIsCartOpen(true)} cartCount={cartCount} />
      
      <main>
        <Hero />
        <Shop onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />
        <Features />
      </main>
      
      <Footer />
      
      {/* Modals and Sidebars */}
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        subtotal={cartSubtotal}
      />
      
      <BuyNowModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}