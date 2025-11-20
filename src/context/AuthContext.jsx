import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  auth, 
  db, 
  doc, 
  getDoc, 
  collection, 
  query, 
  getDocs, 
  signOut as firebaseSignOut 
} from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // This function fetches all data for a logged-in user
  const fetchUserData = useCallback(async (authUser) => {
    try {
      // 1. Get the main user document
      const userDocRef = doc(db, 'users', authUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // This is a new user who just signed up but hasn't had
        // their user document created yet.
        // The LoginModal will handle creating this.
        // For now, just set the basic auth user.
        setCurrentUser({
          uid: authUser.uid,
          email: authUser.email,
          displayName: authUser.displayName,
          addresses: [], // <-- Critically, they have no addresses
        });
        return;
      }

      const userData = userDocSnap.data();

      // 2. Get the 'addresses' sub-collection
      const addressesRef = collection(db, 'users', authUser.uid, 'addresses');
      const addressesQuery = query(addressesRef);
      const addressesSnap = await getDocs(addressesQuery);
      
      const addresses = addressesSnap.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data()
      }));

      // 3. Combine all data into our user object
      setCurrentUser({
        ...authUser,    // from auth (uid, email, etc.)
        ...userData,    // from /users/{uid} (phone, defaultAddressId)
        addresses: addresses // from /users/{uid}/addresses
      });

    } catch (error) {
      console.error("Error fetching user data:", error);
      setCurrentUser(null); // Log out on error
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setLoading(true);
        await fetchUserData(authUser);
        setLoading(false);
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [fetchUserData]);

  const logout = () => {
    firebaseSignOut(auth);
  };
  
  // This allows any component to manually trigger a data refresh
  // (e.g., after adding a new address)
  const refreshUserData = () => {
    if (auth.currentUser) {
      fetchUserData(auth.currentUser);
    }
  };

  const value = {
    currentUser,
    loading,
    logout,
    refreshUserData // <-- Expose the refresh function
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};