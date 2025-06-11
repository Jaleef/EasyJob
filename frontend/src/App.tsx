import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import { Pdf } from './components/Pdf'; // 引入 Pdf 组件

function RootRedirect() {
  const navigate = useNavigate();

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
      {/* 添加一个路由来使用 Pdf 组件，使用一个在线 PDF URL 进行测试 */}
      <Route path="/pdf" element={<Pdf url="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" />} />
    </Routes>
  );
}

export default App;