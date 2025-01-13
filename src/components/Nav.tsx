'use client'

import React from 'react'
import Link from 'next/link'

const Nav = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-lg border-b border-gray-300">
      <Link href="/">
        <div className="text-2xl font-bold text-black">Lost in Lecture</div>
      </Link>
      <div className="flex space-x-4">
        <Link href="/dashboard">
          <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">Dashboard</button>
        </Link>
        <Link href="/login">
          <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">Login</button>
        </Link>
      </div>
    </nav>
  )
}

export default Nav;