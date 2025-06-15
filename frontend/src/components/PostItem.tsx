import React from "react";
import type { PostItemType } from "../types";

interface PostItemProps {
  post: PostItemType;
  className?: string;
}

const PostItem: React.FC<PostItemProps> = ({ post, className = "" }) => {
  return (
    <div className={`bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
        {post.title}
      </h3>
      <div className="flex justify-between mt-2 text-sm text-gray-500">
        <span>作者: {post.user_name}</span>
        <span>发布时间: {new Date(post.post_time).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default PostItem;
