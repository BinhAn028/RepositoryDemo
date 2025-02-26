"use client"; // Bắt buộc để dùng useEffect

import { useEffect } from 'react';

export default function ClientComponent() {

  useEffect(() => {
    console.log('Component mounted');
  }, []);

  return <p>Hello from Client Component</p>;
}
