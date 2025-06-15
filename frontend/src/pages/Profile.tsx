import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import JobModal from '../components/JobModal';
import ApplyerModal from '../components/ApplyerModal';

interface UserProfile {
  account: string;
  user_name: string;
  email: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isModalSelect, setIsModalSelect] = useState(false);
  const [isApplySelect, setIsApplySelect] = useState(false);


  useEffect(() => {
    if (!localStorage.getItem('account')) {
      setError('缺少用户账号信息');
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/profile`, {
          params: { account: localStorage.getItem('account') }
        });
        
        if (response.status === 200 && response.data) {
          setProfile(response.data.data);
        } else {
          setError(response.data.msg || '用户信息获取失败');
        }
      } catch (err) {
        console.error('获取用户信息失败:', err);
        setError('服务器请求失败');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">加载中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-red-500 mb-4">错误</h2>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            返回
          </button>
        </div>
      </div>
    );
  }
  const onClose = () => {
    setIsModalSelect(false);
    setIsApplySelect(false);
  }
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">用户不存在</h2>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            返回
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <NavBar />
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden mt-18">
        <div className="bg-blue-500 p-6 text-white">
          <h1 className="text-2xl font-bold">个人资料</h1>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700">账号</h2>
            <p className="mt-1 text-gray-900">{profile.account}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700">用户名</h2>
            <p className="mt-1 text-gray-900">{profile.user_name}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700">邮箱</h2>
            <p className="mt-1 text-gray-900">{profile.email}</p>
          </div>
          <div 
            className="mb-6 flex items-center justify-between bg-gray-100 p-4 rounded-lg cursor-pointer hover:bg-gray-200 transition"
            onClick={() => setIsModalSelect(true)}
          >
            <h2 className="text-lg font-semibold text-gray-700">查看我的应聘进程</h2>
          </div>

          <div
            className="mb-6 flex items-center justify-between bg-gray-100 p-4 rounded-lg cursor-pointer hover:bg-gray-200 transition"
            onClick={() => setIsApplySelect(true)}
          >
            <h2 className="text-lg font-semibold text-gray-700">查看所有应聘者</h2>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            返回
          </button>
        </div>
      </div>

      <JobModal
        isOpen={isModalSelect}
        onClose={onClose}
      />

      <ApplyerModal
        isOpen={isApplySelect}
        onClose={onClose}
      />
    </div>
  );
}
