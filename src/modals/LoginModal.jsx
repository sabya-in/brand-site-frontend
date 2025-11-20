import React, { useState } from 'react';
import { 
  auth, 
  db, 
  googleProvider, 
  facebookProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  doc,
  setDoc,
  getDoc
} from '../firebase.js';

// (Define GoogleIcon and FacebookIcon SVGs here)
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
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.688.235 2.688.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
  </svg>
);


export const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // This function creates the user doc in Firestore
  // It's called after any successful *new* registration
  const createUserDocument = async (authUser, additionalData = {}) => {
    const userDocRef = doc(db, 'users', authUser.uid);
    const userDocSnap = await getDoc(userDocRef);
    
    if (!userDocSnap.exists()) {
      const { email, displayName, phoneNumber } = authUser;
      try {
        await setDoc(userDocRef, {
          uid: authUser.uid,
          email,
          displayName,
          phone: phoneNumber || '',
          ...additionalData
        });
      } catch (error) {
        console.error("Error creating user document:", error);
      }
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      setError('');
      const result = await signInWithPopup(auth, provider);
      // Check if user doc exists, if not, create it
      await createUserDocument(result.user);
      onLoginSuccess();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLoginView) {
        // Sign in existing user
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Create new user
        const authResult = await createUserWithEmailAndPassword(auth, email, password);
        // Create their user document in Firestore
        await createUserDocument(authResult.user);
      }
      onLoginSuccess();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLoginView ? 'Login' : 'Sign Up'}
        </h2>
        
        {/* Email/Pass Form */}
        <form onSubmit={handleEmailSubmit}>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email Address" 
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            required
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            required
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg mb-4 hover:bg-blue-700"
          >
            {isLoginView ? 'Login' : 'Create Account'}
          </button>
        </form>
        
        {/* View Toggler */}
        <button 
          onClick={() => setIsLoginView(!isLoginView)}
          className="w-full text-sm text-blue-600 hover:underline mb-4"
        >
          {isLoginView ? 'Need an account? Sign Up' : 'Already have an account? Login'}
        </button>
        
        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Social Logins */}
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