import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

// Create the context
const AuthContext = createContext();

// Create a "provider" component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This listener fires when the user logs in or out
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          // User is logged in! Now, check if we have their *profile* data
          const userProfileRef = doc(db, 'users', user.uid);
          const profileSnap = await getDoc(userProfileRef);

          if (profileSnap.exists()) {
            // They have a profile. Combine auth data and profile data
            setCurrentUser({
              ...user, // from auth (uid, email, etc.)
              ...profileSnap.data() // from firestore (phone, address, hasProfile)
            });
          } else {
            // New user! They only have auth data for now.
            // The `hasProfile` field will be missing, which we can check for.
            setCurrentUser(user);
          }
        } else {
          // User is logged out
          setCurrentUser(null);
        }
      } catch (error) {
        // If Firestore rules or anything else fails, log it
        console.error("Error in AuthContext:", error);
        // Set user to null to be safe
        setCurrentUser(null);
      } finally {
        //
        // ❗️ THIS IS THE FIX ❗️
        // This guarantees the app will not be a blank page.
        // It will always stop loading, no matter what.
        //
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
    firebaseSignOut(auth);
  };

  const value = {
    currentUser,
    loading,
    logout
  };

  // Don't render the app until we know if a user is logged in or not
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to easily use the context
export const useAuth = () => {
  return useContext(AuthContext);
};