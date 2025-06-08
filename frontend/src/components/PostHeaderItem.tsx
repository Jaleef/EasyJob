import React from "react";
import type { PostHeader } from "../types";

interface PostItemProps {
  post: PostHeader;
  className?: string;
}

const PostItem: React.FC<PostItemProps> = ({ post, className = "" }) => {
  return (
    <div className={`bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
        <a href={`/post/${post.post_id}`}>{post.title}</a>
      </h3>
      <div className="flex justify-between mt-2 text-sm text-gray-500">
        <span>作者: {post.user_name}</span>
        <span>发布时间: {new Date(post.post_time).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default PostItem;
