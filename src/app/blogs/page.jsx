'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import BlogList from '@/components/BlogList'
import Navbar from '@/components/Navbar'
import { 
  checkAuth, 
  getBlogs, 
  createBlog, 
  updateBlog, 
  deleteBlog,
  initializeBlogs
} from '@/utils/storage'

export default function BlogsPage() {
  const router = useRouter()
  const [blogs, setBlogs] = useState([])
  const [editingBlog, setEditingBlog] = useState(null)
  const [formData, setFormData] = useState({ title: '', description: '', image: '' })

  useEffect(() => {
    if (!checkAuth()) router.push('/login')
    const loadedBlogs = getBlogs()
    if (loadedBlogs.length === 0) initializeBlogs()
    setBlogs(loadedBlogs)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newBlog = {
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }

    if (editingBlog) {
      updateBlog(editingBlog.id, formData)
    } else {
      createBlog(newBlog)
    }
    
    setBlogs(getBlogs())
    setFormData({ title: '', description: '', image: '' })
    setEditingBlog(null)
  }

  const handleCancel = () => {
    // Reset the editing state and clear the form
    setEditingBlog(null)
    setFormData({ title: '', description: '', image: '' })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar />
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">
          {editingBlog ? 'Edit Blog' : 'Create New Blog'}
        </h2>
        <div className="space-y-4">
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
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer"
            >
              {editingBlog ? 'Update' : 'Create'}
            </button>
            {editingBlog && (
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      <BlogList 
        blogs={blogs}
        onEdit={(blog) => {
          setFormData(blog)
          setEditingBlog(blog)
        }}
        onDelete={(id) => {
          deleteBlog(id)
          setBlogs(getBlogs())
        }}
      />
    </div>
  )
}
