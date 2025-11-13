import React from 'react';
import { auth, db, googleProvider, facebookProvider } from './firebase.js';
import { signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Social media icons
const GoogleIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 48 48">
    <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l8.65 6.71C13.01 13.72 18.00 9.5 24 9.5z"></path>
    <path fill="#34A853" d="M46.86 24.88c0-1.67-.15-3.26-.42-4.8H24v9.02h12.94c-.58 2.96-2.26 5.48-4.84 7.21l8.1 6.29c4.73-4.35 7.5-10.82 7.5-17.72z"></path>
    <path fill="#FBBC05" d="M11.21 28.14c-.46-1.38-.72-2.86-.72-4.41s.26-3.03.72-4.41L2.56 13.22C.91 16.63 0 20.21 0 24s.91 7.37 2.56 10.78l8.65-6.64z"></path>
    <path fill="#EA4335" d="M24 48c6.47 0 11.94-2.13 15.93-5.78l-8.1-6.29c-2.14 1.43-4.86 2.3-8.13 2.3-6 0-11-4.22-12.79-9.93L2.56 34.78C6.51 42.62 14.62 48 24 48z"></path>
    <path fill="none" d="M0 0h48v48H0z"></path>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#1877F2">
    {/* This is the corrected path */}
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.688.235 2.688.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
  </svg>
);


export const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  if (!isOpen) return null;

  const handleSocialLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Now, check if this user is new or returning
      const userProfileRef = doc(db, 'users', user.uid);
      const profileSnap = await getDoc(userProfileRef);

      if (!profileSnap.exists()) {
        // NEW USER!
        // 1. Create a partial profile in Firestore so we know they exist
        await setDoc(userProfileRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          hasProfile: false // <-- This is the important flag!
        });
      }
      
      // User (new or old) is logged in.
      // Let the app know the login was successful.
      onLoginSuccess();

    } catch (error) {
      console.error("Error during sign-in:", error);
      // Don't close the modal, let them try again.
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Login or Sign Up</h2>
        
        <button
          onClick={() => handleSocialLogin(googleProvider)}
          className="w-full flex items-center justify-center gap-4 p-3 border border-gray-300 rounded-lg mb-4 hover:bg-gray-50"
        >
          <GoogleIcon />
          <span className="text-md font-medium">Continue with Google</span>
        </button>
        
        <button
          onClick={() => handleSocialLogin(facebookProvider)}
          className="w-full flex items-center justify-center gap-4 p-3 border border-gray-300 rounded-lg mb-4 hover:bg-gray-50"
        >
          <FacebookIcon />
          <span className="text-md font-medium">Continue with Facebook</span>
        </button>
        
        <div className="text-center mt-6">
          <button onClick={onClose} className="text-gray-500 hover:underline">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};