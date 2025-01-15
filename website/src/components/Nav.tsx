'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { auth } from '../firebase/firebaseInit'
import { onAuthStateChanged, signOut } from 'firebase/auth'

const Nav = () => {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user)
    })

    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-lg border-b border-gray-300">
      <Link href="/">
        <div className="text-2xl font-bold text-black">Lost in Lecture</div>
      </Link>
      <div className="flex space-x-4">
        {isAuthenticated && (
          <Link href="/dashboard">
            <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">Dashboard</button>
          </Link>
        )}
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <Link href="/login">
            <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">Sign up</button>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Nav