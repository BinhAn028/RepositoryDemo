// components/ClientWrapper.tsx
"use client"; // ✅ Đây là Client Component

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}