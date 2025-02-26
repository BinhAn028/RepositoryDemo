'use client'; // Bắt buộc để dùng useEffect

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const ClientComponent = dynamic(() => import('@/components/app/rscload/ClientComponent'), { ssr: false });

export default function ClientComponentAll() {
  useEffect(() => {
    console.log('Component mounted');
  }, []);

  return <ClientComponent />;
}
