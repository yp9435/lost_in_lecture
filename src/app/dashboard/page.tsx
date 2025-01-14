"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/firebase/firebaseInit';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const notes = [
  { title: "Note 1", description: "This is a brief description of the first saved note." },
  { title: "Note 2", description: "This is a brief description of the second saved note." },
];

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

  // Function to handle card click
  const handleCardClick = (title: string) => {
    const noteId = title.replace(/\s+/g, '-').toLowerCase();
    router.push(`/dashboard/${noteId}`);
  }

  return (
    <div className="p-4">
      <div className="flex justify-right">
        <h2 className="text-xl font-bold">Welcome, {userName || 'User'}!</h2>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {notes.map((note, index) => (
          <div key={index} className="p-4 border rounded shadow cursor-pointer" onClick={() => handleCardClick(note.title)}>
            <h3 className="font-semibold">{note.title}</h3>
            <p>{note.description}</p>
          </div>
        ))}
      </div>
      <button className="fixed bottom-4 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600">
        <i className="fas fa-microphone"></i>
      </button>
    </div>
  );
}

export default Dashboard;