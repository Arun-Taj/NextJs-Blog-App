export const createUser = (userData) => {
  const users = JSON.parse(localStorage.getItem('users')) || []
  users.push(userData)
  localStorage.setItem('users', JSON.stringify(users))
}

export const authenticateUser = ({ email, password }) => {
  const users = JSON.parse(localStorage.getItem('users')) || []
  const user = users.find(u => u.email === email && u.password === password)
  if (user) {
    localStorage.setItem('auth', JSON.stringify({ isLoggedIn: true }))
    return true
  }
  return false
}

export const checkAuth = () => {
  const auth = JSON.parse(localStorage.getItem('auth'))
  return auth?.isLoggedIn
}

export const logoutUser = () => {
  localStorage.removeItem('auth')
}

// Blog-related functions
export const getBlogs = () => {
  return JSON.parse(localStorage.getItem('blogs')) || []
}

export const createBlog = (blog) => {
  const blogs = getBlogs()
  localStorage.setItem('blogs', JSON.stringify([blog, ...blogs]))
}

export const updateBlog = (id, updatedData) => {
  const blogs = getBlogs()
  const updatedBlogs = blogs.map(blog => 
    blog.id === id ? { ...blog, ...updatedData } : blog
  )
  localStorage.setItem('blogs', JSON.stringify(updatedBlogs))
}

export const deleteBlog = (id) => {
  const blogs = getBlogs().filter(blog => blog.id !== id)
  localStorage.setItem('blogs', JSON.stringify(blogs))
}

export const initializeBlogs = () => {
  const dummyBlogs = [
    {
      id: 1,
      title: 'Getting Started with Next.js',
      description: 'Learn the basics of Next.js development',
      image: '/nextjs-logo.png',
      createdAt: '2024-01-01T00:00:00Z'
    },
    // Add 4 more dummy blogs here
  ]
  localStorage.setItem('blogs', JSON.stringify(dummyBlogs))
}