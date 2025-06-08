// src/components/MyPostList.tsx
import React from 'react';
import PostHeaderItem from './PostHeaderItem';
import type { PostHeader } from '../types';

interface MyPostListProps {
  posts: PostHeader[];
  loading: boolean;
  error: string | null;
  onEdit?: (postId: string) => void;
  onDelete?: (postId: string) => void;
  emptyMessage?: string;
}

const MyPostList: React.FC<MyPostListProps> = ({
  posts,
  loading,
  error,
  onEdit,
  onDelete,
  emptyMessage = '暂无帖子',
}) => {
  if (loading) {
    return <div className="text-center py-8">加载中...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">加载失败: {error}</div>;
  }

  if (!posts || posts.length === 0) {
    return <div className="text-center py-8">{emptyMessage}</div>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div 
          key={post.post_id} 
          className="flex items-start gap-4"
        >
          <div className="flex-1">
            <PostHeaderItem post={post} />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
            {onEdit && (
              <button
                onClick={() => onEdit(post.post_id)}
                className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors whitespace-nowrap"
              >
                修改
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(post.post_id)}
                className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors whitespace-nowrap"
              >
                删除
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyPostList;
