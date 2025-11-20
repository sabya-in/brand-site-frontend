import React, { useState, useMemo } from 'react';
import { useAuth } from './context/AuthContext.jsx';

// Import all modular components
import { Header } from './components/Header.jsx';
import { Hero } from './components/Hero.jsx';
import { Shop } from './components/Shop.jsx';
import { Features } from './components/Features.jsx';
import { Footer } from './components/Footer.jsx';
import { LoginModal } from './modals/LoginModal.jsx';
import { ProfileModal } from './modals/ProfileModal.jsx';
import { AddressModal } from './modals/AddressModal.jsx';
import { CartSidebar } from './modals/CartSidebar.jsx';
import { BuyNowModal } from './modals/BuyNowModal.jsx';

// --- (Static Data) ---
const initialProducts = [
  { id: 1, name: "EON Buds", description: "Active noise-cancelling wireless earbuds.", price: 149.00, imageUrl: "https://placehold.co/400x400/f3f4f6/111827?text=EON+Buds" },
  { id: 2, name: "EON Watch", description: "The smart-watch that keeps up with you.", price: 299.00, imageUrl: "https://placehold.co/400x400/374151/e5e7eb?text=EON+Watch" },
  { id: 3, name: "EON Speaker", description: "360° room-filling sound.", price: 199.00, imageUrl: "https://placehold.co/400x400/e0e7ff/3b82f6?text=EON+Speaker" }
];

export default function App() {
  const { currentUser } = useAuth(); // Get user from our context
  
  const [products] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  
  // State for all modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isBuyNowModalOpen, setIsBuyNowModalOpen] = useState(false);
  
  // State for the item being acted upon
  const [pendingProduct, setPendingProduct] = useState(null);
  const [pendingAction, setPendingAction] = useState(null); // 'cart' or 'buy'
  const [selectedAddress, setSelectedAddress] = useState(null);

  // --- Computed Cart State ---
  const cartCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);
  const cartSubtotal = useMemo(() => cart.reduce((total, item) => total + (item.price * item.quantity), 0), [cart]);

  // --- "COMPLETE" ACTIONS (The final step) ---
  const completeAddToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
    // Reset pending state
    setPendingProduct(null);
    setPendingAction(null);
  };
  
  const completeBuyNow = (product, address) => {
    setPendingProduct(product); // This becomes the buyNowItem
    setSelectedAddress(address);
    setIsBuyNowModalOpen(true);
    // Reset pending state
    setPendingAction(null);
  };

  // --- "HANDLE" ACTIONS (The Interceptors) ---
  // This is the new logic flow
  const runPurchaseFlow = (product, actionType) => {
    // 1. Check if logged in
    if (!currentUser) {
      setPendingProduct(product);
      setPendingAction(actionType);
      setIsLoginModalOpen(true);
      return;
    }
    
    // 2. Check if user has phone number AND at least one address
    const hasProfile = currentUser.phone && currentUser.addresses?.length > 0;
    if (!hasProfile) {
      setPendingProduct(product);
      setPendingAction(actionType);
      setIsProfileModalOpen(true);
      return;
    }
    
    // 3. Check if user has multiple addresses and no default
    const hasMultipleAddresses = currentUser.addresses.length > 1;
    const hasDefault = currentUser.defaultAddressId;
    
    if (hasMultipleAddresses && !hasDefault) {
      // Force them to choose an address
      setPendingProduct(product);
      setPendingAction(actionType);
      setIsAddressModalOpen(true);
      return;
    }
    
    // 4. User is logged in AND has a valid address
    const addressToUse = hasDefault 
      ? currentUser.addresses.find(a => a.id === hasDefault)
      : currentUser.addresses[0]; // Use the only address they have
    
    if (actionType === 'cart') {
      completeAddToCart(product);
    } else if (actionType === 'buy') {
      completeBuyNow(product, addressToUse);
    }
  };
  
  // --- Button Click Handlers ---
  const handleAddToCart = (product) => {
    runPurchaseFlow(product, 'cart');
  };
  
  const handleBuyNow = (product) => {
    runPurchaseFlow(product, 'buy');
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };
  
  // --- Modal "Success" Handlers ---
  
  // Called after Login or Profile modals are successful
  const onFlowSuccess = () => {
    setIsLoginModalOpen(false);
    setIsProfileModalOpen(false);
    
    // AuthContext has refreshed `currentUser`. Let's re-run the flow.
    // `currentUser` is now updated, so the flow will pass the first checks.
    if (pendingProduct && pendingAction) {
      runPurchaseFlow(pendingProduct, pendingAction);
    }
  };
  
  // Called after Address modal is successful
  const onAddressSelect = (address) => {
    setIsAddressModalOpen(false);
    
    // We have the product, action, and now the address. Proceed.
    if (pendingProduct && pendingAction) {
      if (pendingAction === 'cart') {
        completeAddToCart(pendingProduct);
      } else if (pendingAction === 'buy') {
        completeBuyNow(pendingProduct, address);
      }
    }
  };
  
  // --- Modal "Cancel" Handlers ---
  const cancelFlow = () => {
    setIsLoginModalOpen(false);
    setIsProfileModalOpen(false);
    setIsAddressModalOpen(false);
    setPendingProduct(null);
    setPendingAction(null);
  };
  
  return (
    <div className="bg-gray-50 text-gray-800">
      <Header 
        onOpenCart={() => setIsCartOpen(true)} 
        cartCount={cartCount}
        onOpenLogin={() => setIsLoginModalOpen(true)}
      />
      
      <main>
        <Hero />
        <Shop 
          products={products}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
        <Features />
      </main>
      
      <Footer />
      
      {/* --- Modals --- */}
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
        product={pendingProduct}
        selectedAddress={selectedAddress}
      />
      
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={cancelFlow}
        onLoginSuccess={onFlowSuccess}
      />
      
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={cancelFlow}
        onProfileComplete={onFlowSuccess}
      />
      
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={cancelFlow}
        onAddressSelect={onAddressSelect}
      />
    </div>
  );
}