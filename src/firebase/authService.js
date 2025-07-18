import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { auth } from "./config";

// Admin email (you can change this to your admin email)
const ADMIN_EMAIL = "admin@modzy.com";

// Sign in admin
export const signInAdmin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Check if user is admin
    if (userCredential.user.email !== ADMIN_EMAIL) {
      await signOut(auth);
      throw new Error("Unauthorized: Admin access only");
    }
    
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

// Create admin account (use this once to create your admin account)
export const createAdminAccount = async (email, password) => {
  try {
    if (email !== ADMIN_EMAIL) {
      throw new Error("Only admin email can be used to create admin account");
    }
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error creating admin account:", error);
    throw error;
  }
};

// Sign out
export const signOutAdmin = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Subscribe to auth state changes
export const subscribeToAuthState = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    // Only call callback with user if they're admin
    if (user && user.email === ADMIN_EMAIL) {
      callback(user);
    } else {
      callback(null);
    }
  });
};

// Check if current user is admin
export const isAdmin = () => {
  const user = auth.currentUser;
  return user && user.email === ADMIN_EMAIL;
}; 