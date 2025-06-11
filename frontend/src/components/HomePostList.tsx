// src/components/PostList.tsx
import React from "react";
import PostItem from "./PostItem";
import type { PostItemType } from "../types";

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
        <PostItem key={post.post_id} post={post} className={itemClassName} />
      ))}
    </div>
  );
};

export default PostList;
