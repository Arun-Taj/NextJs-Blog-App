import Image from  'next/image'

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
import DigitalArt from '../assets/Digital Art.jpeg'
import Fashion from '../assets/Fashion Trend.jpeg'
import Modern from '../assets/Modern Art.jpeg'

export const initializeBlogs = () => {
  const dummyBlogs = [
    {
      id: 1,
      title: 'Urban Lifestyle: The Pulse of Modern Cities',
      description: 'Delve into vibrant urban cultures and discover how modern cities are evolving in style, culture, and infrastructure.',
      image: 'https://i.pinimg.com/736x/58/55/ff/5855ffc62638be8d27e2c65860addc99.jpg',
      createdAt: new Date().toISOString()
    },
   
    {
      id: 2,
      title: 'Digital Art: Creativity Unleashed',
      description: 'Discover the evolution of digital art and its impact on modern creativity in today’s visually-driven world.',
      image: 'https://cdn.pixabay.com/photo/2024/02/17/13/21/candy-town-8579300_1280.jpg',
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      title: 'Modern Architecture: A Fusion of Form and Function',
      description: 'A visual journey through architectural marvels that redefine urban skylines and modern living spaces.',
      image: 'https://i.pinimg.com/736x/91/cb/2b/91cb2b10f10e2ddfe9db0880276e533d.jpg',
      createdAt: new Date().toISOString()
    },
    {
      id: 4,
      title: 'Contemporary Fashion Trends in the Digital Age',
      description: 'Examine how digital innovation is influencing fashion and transforming the way we express our style.',
      image: 'https://i.pinimg.com/736x/6d/15/e6/6d15e6ea17595ec87e492d1635a6172d.jpg',
      createdAt: new Date().toISOString()
    }, 
    {
      id: 5,
      title: 'The Rise of AI in the Modern Era',
      description: 'Explore how artificial intelligence is transforming industries and shaping our future.',
      image: 'https://i.pinimg.com/736x/d1/78/f0/d178f024915543f1e1f0ad30f57646db.jpg',
      createdAt: '2024-01-01T00:00:00Z'
    }
    
  ]
  localStorage.setItem('blogs', JSON.stringify(dummyBlogs))
}