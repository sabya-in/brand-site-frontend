import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { 
  db, 
  doc, 
  setDoc, 
  addDoc, 
  collection 
} from '../firebase.js';

export const ProfileModal = ({ isOpen, onClose, onProfileComplete }) => {
  const { currentUser, refreshUserData } = useAuth();
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone || !street || !city || !country) {
      setError('Please fill out all fields.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');

    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      const addressColRef = collection(db, 'users', currentUser.uid, 'addresses');

      // 1. Add the new address to the sub-collection
      const newAddressData = { street, city, country };
      const newAddressDoc = await addDoc(addressColRef, newAddressData);
      
      // 2. Update the main user document with phone and default address
      await setDoc(userDocRef, {
        phone: phone,
        defaultAddressId: newAddressDoc.id // Set this new address as default
      }, { merge: true }); // 'merge: true' updates fields without overwriting

      // 3. Refresh the global user state
      await refreshUserData();
      
      // 4. Close the modal and proceed
      onProfileComplete();

    } catch (err) {
      console.error("Error updating profile:", err);
      setError('Failed to save profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Complete Your Profile</h2>
        <p className="text-center text-gray-600 mb-6">
          We need your phone and at least one address to continue.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          
          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Billing Address</h3>
          
          <div className="mb-4">
            <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street</label>
            <input
              type="text"
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isSubmitting ? 'Saving...' : 'Save and Continue'}
          </button>
          
          <button 
            type="button" 
            onClick={onClose}
            className="w-full text-center text-gray-500 hover:text-gray-900 mt-4"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};