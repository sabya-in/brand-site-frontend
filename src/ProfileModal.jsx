import React, { useState } from 'react';
import { useAuth } from './AuthContext.jsx';
import { db } from './firebase.js';
import { doc, setDoc } from 'firebase/firestore';

export const ProfileModal = ({ isOpen, onClose, onProfileComplete }) => {
  const { currentUser } = useAuth();
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone || !address) {
      setError('Please fill out all fields.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');

    try {
      const userProfileRef = doc(db, 'users', currentUser.uid);
      
      // Update their document with the new info
      await setDoc(userProfileRef, {
        phone: phone,
        billingAddress: address,
        hasProfile: true // <-- Flip the flag to true!
      }, { merge: true }); // 'merge: true' ensures we don't overwrite email, etc.

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
          We need a few more details to continue with your purchase.
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
          
          <div className="mb-6">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Billing Address</label>
            <textarea
              id="address"
              rows="3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            ></textarea>
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