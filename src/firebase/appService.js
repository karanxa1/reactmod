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
  serverTimestamp 
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "./config";

const APPS_COLLECTION = "apps";

// Get all apps with real-time updates
export const subscribeToApps = (callback) => {
  const q = query(collection(db, APPS_COLLECTION), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const apps = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(apps);
  });
};

// Get all apps (one-time fetch)
export const getAllApps = async () => {
  try {
    const q = query(collection(db, APPS_COLLECTION), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching apps:", error);
    throw error;
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