import React from 'react'
import NavBar from '../components/NavBar'
import { useEffect, useState } from 'react';
import type { PostItemType } from '../types';
import HomePostList from '../components/HomePostList';
import axios from 'axios';

function Home() {
  const [posts, setPosts] = useState<PostItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!localStorage.getItem('account')) {
      setError("请先登录");
      setLoading(false);
      return;
    }
  
    const fetchPostHeaders = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/home`);

        if (response.status === 200 && response.data && response.data.data) {
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
      <div className="min-h-screen bg-gray-50 container mx-auto px-20 pt-18">
        <main>
          <HomePostList posts={posts} loading={loading} error={error} />
        </main>
      </div>
    </div>
  )
}

export default Home

