"use client";

import React, { useState, useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "./firebaseInit";
import { createUserDocument } from "./storeUserData";

interface LoginWithGoogleProps {
  buttonText?: string;
}

const LoginWithGoogle: React.FC<LoginWithGoogleProps> = ({ buttonText = "Login" }) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = async () => {
    if (!auth) {
      console.error("Firebase Auth is not initialized.");
      return;
    }

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user: User = result.user;

      console.log("Logged in user:", user);

      await createUserDocument(user);
      console.log("User document created successfully");

      router.push("/dashboard"); // Navigate to the dashboard
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  if (!isClient) return <div>Loading...</div>;

  return (
    <button
      onClick={handleLogin}
      className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
    >
      {buttonText}
    </button>
  );
};

export default LoginWithGoogle;
