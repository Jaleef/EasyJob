import axios from 'axios';
import React, { useState, useEffect } from 'react';

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface record {
  employer: string;
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
      await axios.get(`${import.meta.env.VITE_SERVER_URL}/apply/employee`, {
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

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-11/12 lg:w-2/3">
        {/* 模态框内容 */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">我的面试信息</h2>
          {records.map((record, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold">职位: {record.title}</h3>
              <div className="text-gray-600">hr: {record.user_name}(账号:{record.employer})</div>
              <div className='text-gray-600'>面试进度:{ProgressMap[record.progress]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
