// src/pages/Profile.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import type { ProfileResponse, UserProfile } from '../types';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');

        const response = await axios.get<ProfileResponse>(`${import.meta.env.VITE_API_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.status) {
          setProfile(response.data.data);
        } else {
          throw new Error('获取个人信息失败');
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            setError('请先登录');
          } else {
            setError(err.response?.data?.message || err.message);
          }
        } else {
          setError(err instanceof Error ? err.message : '未知错误');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">加载中...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        加载失败: {error}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        未找到个人信息
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* 头像和背景区域 */}
          <div className="bg-gray-100 h-32 relative">
            <div className="absolute -bottom-16 left-6">
              <img
                className="h-32 w-32 rounded-full border-4 border-white object-cover"
                src={profile.user_img}
                alt="用户头像"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://random_url';
                }}
              />
            </div>
          </div>
          
          {/* 个人信息区域 */}
          <div className="pt-20 px-6 pb-6">
            <h1 className="text-2xl font-bold text-gray-900">{profile.user_name}</h1>
            <p className="text-gray-600 mt-1">@{profile.account}</p>
            
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h2 className="text-lg font-medium text-gray-900">基本信息</h2>
                <dl className="mt-2 space-y-3">
                  <div className="flex items-center">
                    <dt className="w-24 text-gray-500">账号</dt>
                    <dd className="text-gray-900">{profile.account}</dd>
                  </div>
                  <div className="flex items-center">
                    <dt className="w-24 text-gray-500">用户名</dt>
                    <dd className="text-gray-900">{profile.user_name}</dd>
                  </div>
                  <div className="flex items-center">
                    <dt className="w-24 text-gray-500">邮箱</dt>
                    <dd className="text-gray-900">{profile.email}</dd>
                  </div>
                </dl>
              </div>
              
              {/* 可以在这里添加更多信息区块 */}
              <div>
                <h2 className="text-lg font-medium text-gray-900">其他信息</h2>
                <div className="mt-2 text-gray-500">
                  <p>这里可以添加更多用户信息</p>
                </div>
              </div>
            </div>
            
            {/* 操作按钮 */}
            <div className="mt-8 flex space-x-3">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                编辑资料
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                更改密码
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
