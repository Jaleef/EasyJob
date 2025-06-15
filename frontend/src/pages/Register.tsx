import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileModal from "../components/ProfileModal";


export default function Register() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("账号: ", account, "密码: ", password)

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
      console.log(account, " ", password)
      if (response.status == 200) {
        alert("注册成功，请登录");
        setShowProfileModal(true);
        // navigate("/login");
      } else {
        setError(response.data.msg || "注册失败，请稍后再试");
      }

    } catch (error) {
      console.error("注册请求失败:", error);
      setError("服务器请求失败");
    }
  }

  const handleProfileSubmit = (profileData: { user_name: string; email: string }) => {
    console.log("Profile Data: ", profileData);
    axios.post(`${import.meta.env.VITE_SERVER_URL}/profile/submit`, {
      account,
      ...profileData
    })
    .then(response => {
      if (response.status) {
        alert("个人信息更新成功");
        setShowProfileModal(false);
        navigate('/login');
      } else {
        setError(response.data.msg || "更新失败，请稍后再试");
      }
    })
    .catch(error => {
      console.error("更新个人信息请求失败:", error);
      setError("服务器请求失败");
    });
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6">注册</h2>
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
            className="flex-1 py-2 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-600 transition"
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

    <ProfileModal
        isOpen={showProfileModal}
        onClose={() => {
          setShowProfileModal(false);
          navigate('/login');
        }}
        onSubmit={handleProfileSubmit}
      />
  </div>
);}
