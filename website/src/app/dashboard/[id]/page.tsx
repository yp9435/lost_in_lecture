import React from 'react'

const notes = () => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Default Notes</h1>
      <p className="text-gray-700">This is the default content for the notes page.</p>
      <ul className="list-disc pl-5 mt-4">
        <li className="mb-1">Note 1: Remember to check your tasks.</li>
        <li className="mb-1">Note 2: Update your progress regularly.</li>
        <li>Note 3: Review your goals weekly.</li>
      </ul>
    </div>
  )
}

export default notes;