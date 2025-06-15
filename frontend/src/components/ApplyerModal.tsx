import axios from 'axios';
import React, { useState, useEffect } from 'react';

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface record {
  id: number;
  employee: string;
  progress: number;
  title: string;
  user_name: string;
}


export default function JobModal({
  isOpen,
  onClose,
}: JobModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState<record[]>([]);
  const ProgressMap: Record<number, string> = {
    1: "简历筛选",
    2: "笔试",
    3: "初试",
    4: "复试",
    5: "hr面试",
    6: "offer发放",
  };

  useEffect(() => {
    if (!localStorage.getItem('account')) {
      alert("请先登录");
      onClose();
      return;
    }
    const handleCheckRecruitment = async () => {
      setIsLoading(true);
      await axios.get(`${import.meta.env.VITE_SERVER_URL}/apply/employer`, {
        params: {
          account: localStorage.getItem('account')
        }
      }).then((response) => {
        if (response.status === 200 && response.data.records) {
          const records = response.data.records;
          if (records.length >= 0) {
            setRecords(records);
            setIsLoading(false);
          }
        }
      })
    }
    handleCheckRecruitment();
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">加载中...</h2>
        </div>
      </div>
    );
  }

  const updateProgress = async (id: number, progress: number) => {
    if (progress > 6) {
      alert("已是最后一步");
      return;
    }
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/apply/update`, {
        params: {
          id: id,
          progress: progress
        }
      });
      if (response.status === 200) {
        alert("更新成功");
        onClose();
      } else {
        alert("更新失败，请重试");
      }
    } catch (error) {
      console.error('更新进度失败:', error);
      alert("更新进度失败，请稍后再试");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-11/12 lg:w-2/3">
        {/* 模态框内容 */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">面试者的信息</h2>
          {records.map((record, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold">职位: {record.title}</h3>
              <div className="text-gray-600">面试者账号:{record.employee}</div>
              <div className='text-gray-600'>面试进度:{ProgressMap[record.progress]}</div>
              <div className='flex-row gap-2 mt-4'>

              <button 
                className='mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
              onClick={() => {updateProgress(record.id, record.progress + 1)}}>
                通过
              </button>
              <button 
                className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
              onClick={() => {updateProgress(record.id, 1)}}>
                拒绝
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
