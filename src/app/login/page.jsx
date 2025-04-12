'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { authenticateUser } from '../../utils/storage'

export default function Login() {
  const router = useRouter()
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    // Check if the credentials are valid
    const isAuthenticated = authenticateUser(credentials)
    if (isAuthenticated) {
     
      const users = JSON.parse(localStorage.getItem('users')) || []
      const currentUser = users.find((u) => u.email === credentials.email)
      if (currentUser) {
        // Store the current user details (name and email) in localStorage
        localStorage.setItem(
          'currentUser',
          JSON.stringify({ name: currentUser.name, email: currentUser.email })
        )
      }
      
      router.push('/blogs')
    } else {
      setError('Invalid credentials')
    }
  }
  
  const handleRedirect = () => {
    router.push('/signup')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500 p-4">
      <form onSubmit={handleLogin} className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <div className="space-y-6">
          <div>
            <label className="block text-gray-600 font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Your email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105 cursor-pointer"
          >
            Sign In
          </button>
          <p className="text-center text-gray-600">
            Didn&apos;t have an account?{' '}
            <span
              className="font-bold text-blue-600 cursor-pointer hover:underline"
              onClick={handleRedirect}
            >
              Sign Up
            </span>
          </p>
        </div>
      </form>
    </div>
  )
}
