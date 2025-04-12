'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { checkAuth } from '../utils/storage'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    if (checkAuth()) {
      router.push('/blogs')
    }
  }, [router])

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2016/11/29/12/41/desk-1869579_960_720.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white animate-fade-in-down">
          Welcome to Blogify
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
          Craft your stories, share your passions, and connect with a community of avid readers.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => router.push('/signup')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg 
                     transform transition-all duration-300 hover:scale-105 shadow-lg
                     flex items-center justify-center gap-2"
          >
            <span className="text-lg font-semibold">Start Writing Now</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button
            onClick={() => router.push('/login')}
            className="bg-transparent border-2 border-white/80 hover:border-white text-white 
                     px-8 py-3 rounded-lg transform transition-all duration-300 hover:scale-105
                     flex items-center justify-center gap-2"
          >
            <span className="text-lg font-semibold">Continue Journey</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        
      </div>
    </div>
  )
}