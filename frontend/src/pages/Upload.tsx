import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

interface UploadFormData {
  title: string;
  content: string;
}

const Upload: React.FC = () => {
  const [formData, setFormData] = useState<UploadFormData>({
    title: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  // 从 localStorage 获取账户信息
  useEffect(() => {
    if (localStorage.getItem('account') === null) {
      setErrorMessage("请先登录");
      return;
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    // 表单验证
    if (!formData.title.trim()) {
      setErrorMessage('标题不能为空');
      setIsSubmitting(false);
      return;
    }

    if (!formData.content.trim()) {
      setErrorMessage('内容不能为空');
      setIsSubmitting(false);
      return;
    }

    if (!localStorage.getItem('account')) {
      setErrorMessage('未找到账户信息，请重新登录');
      setIsSubmitting(false);
      return;
    }

    try {
      // 准备请求数据
      const postData = {
        account: localStorage.getItem('account') || '',
        title: formData.title,
        content: formData.content
      };

      // 发送 POST 请求
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/home/upload`,
        postData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.status === 200) {
        setSuccessMessage('内容发布成功！');
        // 清空表单
        setFormData({
          title: '',
          content: ''
        });
      } else {
        setErrorMessage('发布失败，请重试');
      }
    } catch (error) {
      console.error('发布错误:', error);
      let errorMsg = '发布失败';
      if (axios.isAxiosError(error)) {
        errorMsg += `: ${error.response?.data?.message || error.message}`;
      } else if (error instanceof Error) {
        errorMsg += `: ${error.message}`;
      }
      setErrorMessage(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <NavBar />
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 container mx-auto max-w-2xl mt-18">
      <h2 className="text-xl font-bold text-gray-800 mb-4">发布新内容</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            标题 <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="输入标题"
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="content">
            内容 <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="输入内容"
            disabled={isSubmitting}
          ></textarea>
        </div>

        {/* 状态消息 */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            {successMessage}
          </div>
        )}

        <div className="flex justify-between space-x-4">
          <button
            type="button"
            onClick={() => {
              navigate('/home');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
          >
            返回首页
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
          >
            {isSubmitting ? (
              <>
                <span className="mr-2">发布中</span>
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
              </>
            ) : (
              '发布内容'
            )}
          </button>
        </div>
      </form>

    </div>
    </>
  );
};

export default Upload;
