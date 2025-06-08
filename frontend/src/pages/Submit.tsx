import React, { useState, useRef } from 'react';
import type { ChangeEvent, FormEvent} from 'react';
import axios from 'axios';

interface ProfileFormProps {
  initialData: {
    user_name: string;
    email: string;
  };
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const ProfileEditForm: React.FC<ProfileFormProps> = ({ initialData, onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    user_name: initialData.user_name,
    email: initialData.email,
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      
      // 创建预览图
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('未找到认证令牌');
      }

      // 创建FormData对象
      const formDataToSend = new FormData();
      
      // 添加Query参数
      const queryParams = new URLSearchParams();
      queryParams.append('user_name', formData.user_name);
      queryParams.append('email', formData.email);
      
      // 添加Body文件
      if (avatarFile) {
        formDataToSend.append('image', avatarFile);
      }
      if (resumeFile) {
        formDataToSend.append('resume', resumeFile);
      }

      // 发送请求
      const response = await axios.post(`/api/profile?${queryParams.toString()}`, formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status) {
        onSuccess?.();
      } else {
        throw new Error(response.data.message || '更新失败');
      }
    } catch (err) {
      console.error('提交失败:', err);
      const errorMessage = axios.isAxiosError(err) 
        ? err.response?.data?.message || err.message 
        : err instanceof Error 
          ? err.message 
          : '未知错误';
      onError?.(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4">编辑个人信息</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 头像上传 */}
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="头像预览"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-400">
                  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 hover:bg-blue-600"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <input
              type="file"
              ref={avatarInputRef}
              onChange={handleAvatarChange}
              accept="image/png, image/jpeg"
              className="hidden"
            />
          </div>
          <p className="text-sm text-gray-500">支持 JPG/PNG 格式</p>
        </div>

        {/* 用户名 */}
        <div>
          <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 mb-1">
            用户名
          </label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            value={formData.user_name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* 邮箱 */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            邮箱
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* 简历上传 */}
        <div>
          <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
            上传简历 (PDF)
          </label>
          <div className="flex items-center">
            <input
              type="file"
              ref={resumeInputRef}
              onChange={handleResumeChange}
              accept=".pdf"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => resumeInputRef.current?.click()}
              className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              选择文件
            </button>
            <span className="ml-2 text-sm text-gray-500">
              {resumeFile ? resumeFile.name : '未选择文件'}
            </span>
          </div>
        </div>

        {/* 提交按钮 */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? '提交中...' : '提交更新'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditForm;
