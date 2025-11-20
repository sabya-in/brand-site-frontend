import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export const AddressModal = ({ isOpen, onClose, onAddressSelect }) => {
  const { currentUser } = useAuth();
  const [selectedAddressId, setSelectedAddressId] = useState(currentUser?.defaultAddressId);

  if (!isOpen) return null;

  const handleSubmit = () => {
    const selectedAddress = currentUser.addresses.find(a => a.id === selectedAddressId);
    onAddressSelect(selectedAddress);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Select Shipping Address</h2>
        
        <div className="space-y-4 mb-6">
          {currentUser.addresses.map(address => (
            <label 
              key={address.id} 
              className={`block p-4 border rounded-lg cursor-pointer ${selectedAddressId === address.id ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}
            >
              <input 
                type="radio" 
                name="address"
                value={address.id}
                checked={selectedAddressId === address.id}
                onChange={() => setSelectedAddressId(address.id)}
                className="mr-2"
              />
              <strong>{address.street}</strong><br />
              <span className="text-gray-600">{address.city}, {address.country}</span>
            </label>
          ))}
        </div>

        {/* In a real app, you'd add a button to open the ProfileModal to add a *new* address */}
        
        <button
          onClick={handleSubmit}
          disabled={!selectedAddressId}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
        >
          Use This Address
        </button>
        <button 
          type="button" 
          onClick={onClose}
          className="w-full text-center text-gray-500 hover:text-gray-900 mt-4"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};