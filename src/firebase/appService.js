import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  enableNetwork,
  disableNetwork 
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "./config";

const APPS_COLLECTION = "apps";

// Cache for apps data to improve performance
let appsCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Check if cache is valid
const isCacheValid = () => {
  return appsCache && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION);
};

// Get all apps with real-time updates and caching
export const subscribeToApps = (callback) => {
  // Return cached data immediately if available
  if (isCacheValid()) {
    callback(appsCache);
  }
  
  const q = query(collection(db, APPS_COLLECTION), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const apps = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Update cache
    appsCache = apps;
    cacheTimestamp = Date.now();
    
    callback(apps);
  }, (error) => {
    console.error("Error in subscribeToApps:", error);
    // Fallback to cached data if available
    if (appsCache) {
      callback(appsCache);
    }
  });
};

// Get all apps (one-time fetch) with caching
export const getAllApps = async () => {
  try {
    // Return cached data if valid
    if (isCacheValid()) {
      return appsCache;
    }
    
    const q = query(collection(db, APPS_COLLECTION), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const apps = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Update cache
    appsCache = apps;
    cacheTimestamp = Date.now();
    
    return apps;
  } catch (error) {
    console.error("Error fetching apps:", error);
    // Return cached data as fallback
    if (appsCache) {
      return appsCache;
    }
    throw error;
  }
};

// Preload apps data for better performance
export const preloadApps = async () => {
  try {
    if (!isCacheValid()) {
      await getAllApps();
    }
  } catch (error) {
    console.error("Error preloading apps:", error);
  }
};

// Clear cache when needed
export const clearAppsCache = () => {
  appsCache = null;
  cacheTimestamp = null;
};

// Network status management
export const enableOfflineMode = async () => {
  try {
    await disableNetwork(db);
  } catch (error) {
    console.error("Error enabling offline mode:", error);
  }
};

export const enableOnlineMode = async () => {
  try {
    await enableNetwork(db);
  } catch (error) {
    console.error("Error enabling online mode:", error);
  }
};

// Upload image to Firebase Storage
export const uploadImage = async (file, path) => {
  try {
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `${path}/${fileName}`);
    
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return {
      url: downloadURL,
      path: snapshot.ref.fullPath
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// Delete image from Firebase Storage
export const deleteImage = async (imagePath) => {
  try {
    const imageRef = ref(storage, imagePath);
    await deleteObject(imageRef);
  } catch (error) {
    console.error("Error deleting image:", error);
    // Don't throw error as the document might still need to be deleted
  }
};

// Add new app
export const addApp = async (appData) => {
  try {
    const docRef = await addDoc(collection(db, APPS_COLLECTION), {
      ...appData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding app:", error);
    throw error;
  }
};

// Update app
export const updateApp = async (appId, appData) => {
  try {
    const appRef = doc(db, APPS_COLLECTION, appId);
    await updateDoc(appRef, {
      ...appData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error updating app:", error);
    throw error;
  }
};

// Delete app
export const deleteApp = async (appId, imagePaths = []) => {
  try {
    // Delete associated images first
    for (const imagePath of imagePaths) {
      if (imagePath) {
        await deleteImage(imagePath);
      }
    }
    
    // Delete the document
    await deleteDoc(doc(db, APPS_COLLECTION, appId));
  } catch (error) {
    console.error("Error deleting app:", error);
    throw error;
  }
};

// Upload multiple screenshots
export const uploadScreenshots = async (files) => {
  try {
    const uploadPromises = files.map(file => uploadImage(file, "screenshots"));
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Error uploading screenshots:", error);
    throw error;
  }
};