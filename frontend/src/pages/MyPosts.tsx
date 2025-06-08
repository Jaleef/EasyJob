import React from 'react'
import NavBar from '../components/NavBar'
import { useEffect, useState } from 'react';
import type { PostHeader } from '../types';
import MyPostList from '../components/MyPostList';
import axios from 'axios';

function MyPosts() {
  const [posts, setPosts] = useState<PostHeader[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostHeaders = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/myposts`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });

        if (response.status === 200 && response.data.status && response.data.data) {
          setPosts(response.data.data.posts);
        } else {
          throw new Error("无效的相应格式")
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            setError("请先登录");
          } else {
            setError(err.response?.data?.message || err.message);
          }
        } else {
          setError(err instanceof Error ? err.message : "未知错误");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchPostHeaders();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-gray-50">
        <main>
          <MyPostList posts={posts} loading={loading} error={error} />
        </main>
      </div>
    </div>
  )
}

export default MyPosts

