'use client'
import { useRouter } from 'next/navigation'

export default function BlogList({ blogs, onEdit, onDelete }) {
  const router = useRouter()

  const handleCardClick = (id) => {
    // Navigate to the blog details page for the selected blog
    router.push(`/blogs/${id}`)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogs
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((blog) => (
          <div
            key={blog.id}
            onClick={() => handleCardClick(blog.id)}
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer transition transform hover:scale-105 flex flex-col"
          >
            <img
              src={blog.image || '/default-blog.jpg'}
              alt={blog.title}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
            
            <div className="mb-4 flex-1">
              <p className="text-gray-600 max-h-32 overflow-y-auto">
                {blog.description}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  // Prevent card onClick event from firing
                  e.stopPropagation()
                  router.push(`/blogs/${blog.id}/edit`)
                }}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  // Prevent card onClick event from firing
                  e.stopPropagation()
                  onDelete(blog.id)
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  )
}
