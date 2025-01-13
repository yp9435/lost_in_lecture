import React from 'react'

const page = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-black">Lost in Lecture</h1>
        <p className="mt-4 text-xl text-gray-700">A platform to help you navigate your lectures and notes.</p>
        <button className="mt-6 px-6 py-3 bg-black text-white rounded hover:bg-gray-800">
          Login
        </button>
      </div>
    </div>
  )
}

export default page