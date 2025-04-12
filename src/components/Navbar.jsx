'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { logoutUser, checkAuth } from '../utils/storage'

export default function Navbar() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)

  // On mount, check if the user is authenticated and then get user details from localStorage.
  useEffect(() => {
    if (checkAuth()) {
      // Assumes you store the logged in user details in 'currentUser'
      const storedUser = localStorage.getItem('currentUser')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    }
  }, [])

  const handleLogout = () => {
    logoutUser()
    router.push('/login')
  }

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev)
  }

  return (
    <nav className="bg-white shadow-sm mb-8 p-4 rounded-lg flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">My Blog</h1>
      {user ? (
        <div className="relative">
          {/* Profile icon showing the first letter of the user's name */}
          <button
            onClick={toggleDropdown}
            className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white uppercase"
          >
            {user.name[0]}
          </button>
          {/* Dropdown menu with the user's email and logout option */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
              <p className="px-4 py-2 text-gray-800">{user.email}</p>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        // If no user is logged in, you can display a login button or any other element
        <button
          onClick={() => router.push('/login')}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Login
        </button>
      )}
    </nav>
  )
}
