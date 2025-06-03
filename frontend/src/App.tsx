import { useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'

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
    </Routes>
  )
}

export default App
