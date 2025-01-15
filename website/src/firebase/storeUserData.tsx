// storeUserData.ts
import { User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebaseInit';

export const createUserDocument = async (user: User) => {
  if (!user) return;

  const userRef = doc(db, 'users', user.uid);
  const userData = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    lastLogin: new Date().toISOString(),
  };

  try {
    await setDoc(userRef, userData, { merge: true });
    console.log('User document created:', userData);
    return userData;
  } catch (error) {
    console.error('Error creating user document:', error);
    throw error;
  }
};
