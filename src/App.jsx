import React, { useState, useMemo, useEffect } from 'react'; // <-- FIX: Added 'useEffect'
import { useAuth } from './AuthContext.jsx'; // <-- Import our auth hook
import { LoginModal } from './LoginModal.jsx'; // <-- Import our new modals
import { ProfileModal } from './ProfileModal.jsx';

// --- (All your SVG Icons) ---
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

// --- (All your Static Data) ---
const initialProducts = [
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

// --- (All your Reusable Components: ProductCard, Features, Footer, etc.) ---

// --- Header ---
// We need to update Header to show the user's state
const Header = ({ onOpenCart, cartCount }) => {
  const { currentUser, logout } = useAuth(); // Get user and logout

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
          {currentUser && (
            <a href="#" className="text-gray-600 hover:text-gray-900">My Account</a>
          )}
        </div>
        <div className="flex items-center gap-4">
          {currentUser ? (
            <button onClick={logout} className="text-sm text-gray-500 hover:text-gray-900">Logout</button>
          ) : (
            <span className="text-sm text-gray-500">Logged Out</span>
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

// --- Hero ---
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

// --- ProductCard ---
// We must update this to pass the full `product` object
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
          onClick={() => onAddToCart(product)} // Pass the product
          className="w-full bg-blue-100 text-blue-700 font-semibold py-3 px-4 rounded-lg hover:bg-blue-200 transition-all"
        >
          Add to Cart
        </button>
        <button 
          onClick={() => onBuyNow(product)} // Pass the product
          className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all"
        >
          Buy Now
        </button>
      </div>
    </div>
  </div>
);

// --- Shop ---
const Shop = ({ products, onAddToCart, onBuyNow }) => (
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

// --- Features ---
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

// --- Footer ---
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

// --- CartSidebar ---
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

// --- BuyNowModal ---
// This is the updated component that shows the single item
const BuyNowModal = ({ isOpen, onClose, product }) => {
  const [isSuccess, setIsSuccess] = useState(false);

  // We need to reset the success state when the modal is closed
  // or when a new product is passed in.
  useEffect(() => { // <-- This is the line that caused the error
    if (isOpen) {
      setIsSuccess(false);
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const handlePay = () => {
    // In a real app, this would process the payment
    console.log("Processing payment for:", product.name);
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Buy Now</h2>
            <div className="flex gap-4 items-center mb-6">
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


// --- Main App Component ---
export default function App() {
  const { currentUser } = useAuth(); // Get the user from our context
  
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [isBuyNowModalOpen, setIsBuyNowModalOpen] = useState(false);
  const [buyNowItem, setBuyNowItem] = useState(null);

  // --- NEW STATE FOR OUR LOGIN FLOW ---
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  
  // This is the magic! We store the action the user *wanted* to do.
  const [pendingAction, setPendingAction] = useState(null); 
  // e.g., setPendingAction(() => completeBuyNow(product))
  
  // --- Computed Cart State ---
  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);


  // --- "COMPLETE" ACTIONS ---
  // These are the *actual* functions that do the work
  // *after* we know the user is logged in and has a profile.

  const completeAddToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Increment quantity
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Add new item
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    setIsCartOpen(true);
  };
  
  const completeBuyNow = (product) => {
    setBuyNowItem(product);
    setIsBuyNowModalOpen(true);
  };
  
  // --- "HANDLE" ACTIONS (INTERCEPTORS) ---
  // These are the new functions your buttons will call.
  // They check for auth before running the "complete" action.
  
  const handleAddToCart = (product) => {
    // 1. Check if logged in
    if (!currentUser) {
      // Not logged in. Store the action, open the login modal.
      setPendingAction(() => () => completeAddToCart(product));
      setIsLoginModalOpen(true);
      return; // Stop here
    }
    
    // 2. Check if profile is complete
    if (!currentUser.hasProfile) {
      // Logged in, but no profile. Store the action, open profile modal.
      setPendingAction(() => () => completeAddToCart(product));
      setIsProfileModalOpen(true);
      return; // Stop here
    }
    
    // 3. User is logged in AND has a profile.
    completeAddToCart(product);
  };
  
  const handleBuyNow = (product) => {
    // 1. Check if logged in
    if (!currentUser) {
      setPendingAction(() => () => completeBuyNow(product));
      setIsLoginModalOpen(true);
      return;
    }
    
    // 2. Check if profile is complete
    if (!currentUser.hasProfile) {
      setPendingAction(() => () => completeBuyNow(product));
      setIsProfileModalOpen(true);
      return;
    }
    
    // 3. User is logged in AND has a profile.
    completeBuyNow(product);
  };
  
  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };
  
  // --- This is the new "success" handler ---
  // It's called after EITHER login or profile modal is done.
  const onFlowSuccess = () => {
    // First, close all modals
    setIsLoginModalOpen(false);
    setIsProfileModalOpen(false);
    
    // Now, check if the user *still* needs a profile
    // (they might have just logged in)
    // We must check `currentUser` *again* as it might have been updated by the AuthContext
    if (currentUser && !currentUser.hasProfile) {
      setIsProfileModalOpen(true); // Need to open profile modal
      return; // Stop here
    }

    // If we're here, the user is logged in AND has a profile.
    // Run the action they were trying to do!
    if (pendingAction) {
      pendingAction();
      setPendingAction(null); // Clear the action
    }
  };

  
  return (
    <div className="bg-gray-50 text-gray-800">
      <Header onOpenCart={() => setIsCartOpen(true)} cartCount={cartCount} />
      
      <main>
        <Hero />
        <Shop 
          products={products}
          onAddToCart={handleAddToCart} // <-- Use the new handler
          onBuyNow={handleBuyNow}       // <-- Use the new handler
        />
        <Features />
      </main>
      
      <Footer />
      
      {/* --- ALL YOUR MODALS --- */}
      
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        subtotal={cartSubtotal}
      />
      
      <BuyNowModal 
        isOpen={isBuyNowModalOpen}
        onClose={() => setIsBuyNowModalOpen(false)}
        product={buyNowItem}
      />
      
      {/* --- OUR NEW MODALS --- */}
      
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => {
          setIsLoginModalOpen(false);
          setPendingAction(null); // Clear action if they cancel
        }}
        onLoginSuccess={onFlowSuccess}
      />
      
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => {
          setIsProfileModalOpen(false);
          setPendingAction(null); // Clear action if they cancel
        }}
        onProfileComplete={onFlowSuccess}
      />
    </div>
  );
}