import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [lockTime, setLockTime] = useState(0);
  const [tryCount, setTryCount] = useState(0);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
      let timer: NodeJS.Timeout;
      if (isLocked && lockTime > 0) {
        timer = setInterval(() => {
          setLockTime((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              setIsLocked(false);
              setTryCount(0);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
      return () => clearInterval(timer);
    }, [isLocked, lockTime])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isLocked) {
      setError(`请等待${lockTime} 秒后再尝试注册`);
      return;
    }
    if (password != confirmPassword) {
      setError("两次输入的密码不一致");
      return;
    }
    if (account === '' || password === '') {
      setError("账号和密码不能为空");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/register`, {
        account,
        password
      });
      const data = response.data;
      if (data.status) {
        alert("注册成功，请登录");
        navigate("/login");
      } else {
        setTryCount(data.try_count);
        setError(data.msg);
        if (tryCount >= 5) {
          setIsLocked(true);
          setLockTime(30);
          setError("注册失败, 因错误次数过多, 注册锁定30s")
        }
      }

    } catch (error) {
      console.error("注册请求失败:", error);
      setError("服务器请求失败");
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
        <div>
          <label className="block text-gray-700 font-medium mb-1">确认密码</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-between space-x-4 pt-2">
          <button
            type="submit"
            disabled={isLocked}
            className={`flex-1 py-2 rounded-lg text-white font-semibold transition ${
              isLocked ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >注册</button>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="flex-1 py-2 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-600 transition"
          >
            登陆
          </button>
        </div>
      </form>

      {/* {错误信息} */}
      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
    </div>
  </div>
);}
