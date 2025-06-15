import React, { useState } from 'react';
// ProfileModal.tsx
interface ProfileData {
  user_name: string;
  email: string;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProfileData) => void;
}

export default function ProfileModal({ 
  isOpen, 
  onClose, 
  onSubmit 
}: ProfileModalProps) {
  const [profileData, setProfileData] = useState<ProfileData>({
    user_name: '',
    email: ''
  });

  if (!isOpen) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profileData);
  };

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">完善个人信息</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">用户名</label>
            <input
              type="text"
              value={profileData.user_name}
              onChange={(e) => setProfileData({...profileData, user_name: e.target.value})}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">邮箱</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-gray-700 font-medium border border-gray-300 hover:bg-gray-100 transition"
            >
              返回
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-600 transition"
            >
              提交
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
