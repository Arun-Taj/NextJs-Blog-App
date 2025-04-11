'use client'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function BlogDetails() {
  const { id } = useParams()
  const router = useRouter()
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    // Retrieve all blogs from localStorage
    const storedBlogs = localStorage.getItem('blogs')
    if (storedBlogs) {
      const blogs = JSON.parse(storedBlogs)
      
      const foundBlog = blogs.find(item => item.id === Number(id))
      if (foundBlog) {
        setBlog(foundBlog)
      } else {
       
        router.push('/blogs')
      }
    }
  }, [id, router])

  
  if (!blog) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <img 
        src={blog.image || '/default-blog.jpg'} 
        alt={blog.title} 
        className="w-full h-64 object-cover mb-6 rounded-lg shadow-md"
      />
      <p className="text-lg text-gray-700 mb-6">{blog.description}</p>
      <p className="text-sm text-gray-500">
        Published on: {new Date(blog.createdAt).toLocaleDateString()}
      </p>
    </div>
  )
}
