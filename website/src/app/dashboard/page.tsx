"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/firebase/firebaseInit';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';


const Dashboard = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log('Fetched user data:', userData);
            setUserName(userData.displayName);
          } else {
            setError("User data not found");
          }
        } catch (err) {
          setError("Failed to fetch user data. Please check your internet connection.");
          console.error("Error fetching user data:", err);
        }
      } else {
        router.push('/');
      }
    });
  }, [router]);


  const handleCardClick = (title: string) => {
    const noteId = title.replace(/\s+/g, '-').toLowerCase();
    router.push(`/dashboard/${noteId}`);
  }

  return (
    <div className="p-4">
      <div className="flex justify-right">
        <h2 className="text-xl font-bold">Welcome, {userName || 'User'}!</h2>
      </div>
      <button className="fixed bottom-4 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600">
        <i className="fas fa-microphone"></i>
      </button>
    </div>
  );
}
export default Dashboard;