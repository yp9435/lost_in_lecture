import React from 'react';
import PencilAnimation from '../components/PencilAnimation';
import NotebookBackground from '../components/NotebookBackground';
import LoginWithGoogle from '../firebase/LoginWithGoogle';

const Page = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-white">
      <NotebookBackground />
      <div className="text-center z-10">
        <h1 className="text-6xl font-bold text-black">Lost in Lecture</h1>
        <p className="mt-4 text-xl text-gray-700">A platform to help you navigate your lectures and notes.</p>
        <div className="mt-16"> 
          <LoginWithGoogle buttonText="Login with Google" />
        </div>
      </div>
      <div className="mt-8 z-10">
        <PencilAnimation />
      </div>
    </div>
  );
};

export default Page;