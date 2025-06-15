// src/components/PostList.tsx
import React from "react";
import { useState } from "react";
import PostItem from "./PostItem";
import type { PostItemType, PostType } from "../types";
import Modal from "./Modal";
import axios from "axios";

interface HomePostListProps {
  posts: PostItemType[];
  loading: boolean;
  error: string | null;
  itemClassName?: string;
  emptyMessage?: string;
}

const PostList: React.FC<HomePostListProps> = ({
  posts,
  loading,
  error,
  itemClassName = "",
  emptyMessage = "暂无帖子",
}) => {
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);
  const [post_id, setPostId] = useState<string | null>(null);

  const handleCloseModal = () => {
    setSelectedPost(null);
    setPostId(null);
  }
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
      setPostId(post_id);
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

  return (
    <>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.post_id} onClick={() => handleOpenModal(post.post_id)} className="cursor-pointer">
            <PostItem key={post.post_id} post={post} className={itemClassName} />
          </div>
        ))}
      </div>

      {selectedPost && (
        <Modal
          isOpen={!!selectedPost}
          onClose={handleCloseModal}
          post={selectedPost}
          post_id={post_id!}
        />
      )}
    </>
  );
};

export default PostList;
