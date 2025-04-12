'use client'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getBlogs, updateBlog } from '../../../../utils/storage'

export default function EditBlogPage() {
  const router = useRouter()
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [formData, setFormData] = useState({ title: '', description: '', image: '' })

  useEffect(() => {
    const blogs = getBlogs()
    const currentBlog = blogs.find(b => String(b.id) === id)
    if (currentBlog) {
      setBlog(currentBlog)
      setFormData({
        title: currentBlog.title,
        description: currentBlog.description,
        image: currentBlog.image,
      })
    }
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    updateBlog(Number(id), formData)
    router.push('/blogs')
  }

  if (!blog) return <p>Loading blog...</p>

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <input
          type="text"
          placeholder="Title"
          required
          className="w-full p-2 border rounded"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          required
          className="w-full p-2 border rounded h-32"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="w-full p-2 border rounded"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => router.push('/blogs')}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
