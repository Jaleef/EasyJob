import React from "react";
import { Link } from "react-router-dom"; // 如果你使用 react-router

const Navbar = () => {
  const userAvatar = "https://example.com/avatar.jpg"; // 替换为实际头像 URL

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* 左侧可以放置logo或其他内容 */}
          <div className="flex items-center">
            {/* 左侧内容，可以留空或放logo */}
          </div>

          {/* 中间导航链接 */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/home"
              className="text-gray-700 hover:text-blue-600 px-8 py-2 rounded-md text-sm font-medium transition-colors"
            >
              主页
            </Link>
            <Link
              to="/myposts"
              className="text-gray-700 hover:text-blue-600 px-8 py-2 rounded-md text-sm font-medium transition-colors"
            >
              我的帖子
            </Link>
          </div>

          {/* 右侧头像 */}
          <div className="flex items-center">
            <Link to="/profile" className="flex items-center">
              <img
                className="h-8 w-8 rounded-full object-cover border-2 border-gray-200 hover:border-blue-500 transition-colors"
                src={userAvatar}
                alt="用户头像"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* 移动端菜单 (可选) */}
      <div className="md:hidden flex justify-center py-2">
        <Link
          to="/"
          className="text-gray-700 hover:text-blue-600 px-3 py-1 rounded-md text-sm font-medium"
        >
          主页
        </Link>
        <Link
          to="/my-posts"
          className="text-gray-700 hover:text-blue-600 px-3 py-1 rounded-md text-sm font-medium"
        >
          我的帖子
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
