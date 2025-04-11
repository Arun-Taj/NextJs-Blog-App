'use client'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function EditBlog() {
  const { id } = useParams()
  const router = useRouter()
  const [blog, setBlog] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    // Retrieve all blogs from localStorage
    const storedBlogs = localStorage.getItem('blogs')
    if (storedBlogs) {
      const blogs = JSON.parse(storedBlogs)
      const foundBlog = blogs.find((b) => b.id === Number(id))
      if (foundBlog) {
        setBlog(foundBlog)
        setTitle(foundBlog.title)
        setDescription(foundBlog.description)
      } else {
        
        router.push('/blogs')
      }
    }
  }, [id, router])

  const handleUpdate = (e) => {
    e.preventDefault()
    const storedBlogs = localStorage.getItem('blogs')
    if (storedBlogs) {
      let blogs = JSON.parse(storedBlogs)
      
      const updatedBlogs = blogs.map((b) => {
        if (b.id === Number(id)) {
          return { ...b, title, description }
        }
        return b
      })
     
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs))
      
      router.push(`/blogs/${id}`)
    }
  }

  if (!blog) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Edit Blog Post</h1>
      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter the new title"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter the updated blog content"
            rows="8"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition transform hover:scale-105"
        >
          Update Blog Post
        </button>
      </form>
    </div>
  )
}
