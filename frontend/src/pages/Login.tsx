import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // console.log(import.meta.env.VITE_SERVER_URL)

  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("账号: ", account, "密码: ", password);

    if (account === '' || password === '') {
      setError("账号和密码不能为空");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/login`, {
        account,
        password
      });
      if (response.status !== 200) {
        setError("服务器响应异常");
        return;
      }
      localStorage.setItem('account', account);
      setError('');
      alert("登陆成功");
      navigate("/home")
    } catch (err) {
      setError(err + "服务器请求失败")
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">账号</label>
            <input
              type="text"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">密码</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>
          <div className="flex justify-between space-x-4 pt-2">
            <button
              type="submit"
              className="flex-1 py-2 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-600 transition"
              >登录</button>

            <button
              type="button"
              onClick={() => navigate('/register')}
              className="flex-1 py-2 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-600 transition"
            >
              注册
            </button>
          </div>
        </form>

        {/* {错误信息} */}
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      </div>
    </div>
  );
}
