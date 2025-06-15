// components/Modal.jsx
import React, { useState } from 'react';
import type { PostType } from '../types';
import axios from 'axios';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: PostType;
  post_id: string;
  isEdit?: boolean; // 新增编辑模式控制
  onSave?: (updatedPost: PostType) => void; // 新增保存回调
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  post: initialPost,
  post_id,
  isEdit = false,
  onSave
}) => {
  const [editablePost, setEditablePost] = useState<PostType>(initialPost);
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditablePost(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!onSave) return;
    setIsSaving(true);
    try {
      await onSave(editablePost);
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignIn = () => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/apply`, {
      params: {
        account: localStorage.getItem('account'),
        post_id: post_id,
        job: editablePost.title,
      }
    }).then((response) => {
      if (response.status === 200) {
        alert("申请提交成功");
      } else {
        alert("申请提交失败");
      }
    }).catch((error) => {
      alert("发生错误: " + error.message);
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* 模态框头部 */}
        <div className="flex justify-between items-center p-4 border-b">
          {isEdit ? (
            <input
              type="text"
              name="title"
              value={editablePost.title}
              onChange={handleInputChange}
              className="text-xl font-bold w-full border rounded px-2 py-1"
            />
          ) : (
            <h2 className="text-xl font-bold">{editablePost.title}</h2>
          )}
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        
        {/* 帖子内容 */}
        <div className="p-4">
          {isEdit ? (
            <textarea
              name="content"
              value={editablePost.content}
              onChange={handleInputChange}
              className="text-gray-700 mb-4 w-full h-40 border rounded px-2 py-1"
            />
          ) : (
            <p className="text-gray-700 mb-4 whitespace-pre-line">{editablePost.content}</p>
          )}
          <div className="text-sm text-gray-500">
            作者: {editablePost.user_name} | 发布时间: {editablePost.post_time}
          </div>
        </div>

        <div className="p-4 border-t text-sm text-gray-500">
          <button
            onClick={() => {
              handleSignIn();
            }}
            className="text-gray-700 hover:text-blue-600"
          >
            提交简历
          </button>
        </div>

        {/* 模态框底部 */}
        <div className="p-4 border-t flex justify-end space-x-2">
          {isEdit && (
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isSaving ? '保存中...' : '保存'}
            </button>
          )}
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
