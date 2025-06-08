import { useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Profile from "./pages/Profile"
import MyPosts from "./pages/MyPosts"
import Submit from "./pages/Submit"

function RootRedirect() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/login');
  }, [navigate]);

  return null;
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home /> } />
      <Route path="/myposts" element={<MyPosts />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/submit" element={<Submit />} />
    </Routes>
  )
}

export default App
