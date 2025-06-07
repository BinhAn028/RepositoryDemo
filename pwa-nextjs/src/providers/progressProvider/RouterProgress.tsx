'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import NProgress from './nprogress'

export default function RouterProgress() {
  const router = useRouter()

  useEffect(() => {
    // const handleStart = () => NProgress.start()
    // const handleStop = () => NProgress.done()

    // Không có router events trong useRouter App Router
    // Cần tự start/stop ở các vị trí chuyển trang custom
    return () => {
      NProgress.done()
    }
  }, [router])

  return null
}