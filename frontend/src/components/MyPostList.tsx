// src/components/MyPostList.tsx
import React, { useEffect, useState } from 'react';
import PostHeaderItem from './PostItem';
import type { PostItemType, PostType} from '../types';
import axios from 'axios';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';

interface MyPostListProps {
  posts: PostItemType[];
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
  emptyMessage = '暂无帖子',
}) => {

  useEffect(() => {
    if (!localStorage.getItem('account')) {
      alert("请先登录");
    }
  }, []);

  const [selectedPost, setSelectedPost] = useState(null);
  const [editingPost, setEditingPost] = useState(false);
  const [post_id, setPostId] = useState<string>('');


  const navigate = useNavigate();

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const handleOpenModal = async (post_id: string) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/home/posts`, {
        params: {
          post_id,
        },
      });
      if (!response.status || !response.data.data) {
        throw new Error("获取帖子详情失败");
      }
      setSelectedPost(response.data.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          alert("请先登录");
        } else {
          alert(err.response?.data?.message || err.message);
        }
      } else {
        alert(err instanceof Error ? err.message : "未知错误");
      }
    }
  }
  if (loading) {
    return <div className="text-center py-8">加载中...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">加载失败: {error}</div>;
  }

  if (!posts || posts.length === 0) {
    return <div className="text-center py-8">{emptyMessage}</div>;
  }

  
  const handleSave = async (post: PostType) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/myposts/change`, {
        account: localStorage.getItem('account'),
        post_id,
        title: post.title,
        content: post.content,
      });
      if (response.status === 200) {
        alert("帖子已更新");
        setEditingPost(false);
        setSelectedPost(null);
        navigate(0); // 刷新当前页面
      } else {
        throw new Error("更新失败");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          alert("请先登录");
        } else {
          alert(err.response?.data?.message || err.message);
        }
      } else {
        alert(err instanceof Error ? err.message : "未知错误");
      }
    }
  };
  const onEdit = (post_id: string) => {
    setEditingPost(true);
    setPostId(post_id);
    handleOpenModal(post_id);
  }

  const onDelete = (post_id: string) => {
    try {
      if (window.confirm("确定要删除这个帖子吗？")) {
        axios.get(`${import.meta.env.VITE_SERVER_URL}/myposts/delete`, {
          params: {
            account: localStorage.getItem('account'),
            post_id
          },
        }).then((response) => {
          if (response.status === 200) {
            alert("帖子已删除");
            // 这里可以添加删除后的状态更新逻辑
            setSelectedPost(null);
            // 重新获取帖子列表
            navigate(0); // 刷新当前页面
          } else {
            throw new Error("删除失败");
          }
        }).catch((err) => {
          alert(err.response?.data?.message || err.message);
        });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          alert("请先登录");
        } else {
          alert(err.response?.data?.message || err.message);
        }
      } else {
        alert(err instanceof Error ? err.message : "未知错误");
      }
    }
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.post_id}
          className="flex items-start gap-4"
        >
          <div className="flex-1">
            <div
              onClick={() => { handleOpenModal(post.post_id) }}
            >
              <PostHeaderItem post={post} />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
              <button
                onClick={() => onEdit(post.post_id)}
                className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors whitespace-nowrap"
              >
                修改
              </button>
              <button
                onClick={() => onDelete(post.post_id)}
                className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors whitespace-nowrap"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      ))}
      {selectedPost && (
        <Modal
          isOpen={!!selectedPost}
          onClose={handleCloseModal}
          post={selectedPost}
          isEdit={editingPost}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default MyPostList;
