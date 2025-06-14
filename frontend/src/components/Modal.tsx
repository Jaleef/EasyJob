// components/Modal.jsx
import React from 'react';
import type { PostType } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: PostType;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, post }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* 模态框头部 */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">{post.title}</h2>
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
          <p className="text-gray-700 mb-4 whitespace-pre-line">{post.content}</p>
          <div className="text-sm text-gray-500">
            作者: {post.user_name} | 发布时间: {post.post_time}
          </div>
        </div>
        
        {/* 模态框底部 */}
        <div className="p-4 border-t flex justify-end">
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
