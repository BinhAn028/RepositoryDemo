import Link from 'next/link'
 
export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <nav>
        <Link href="/login">Open modal</Link>
      </nav>
      <div>{children}</div>
    </>
  )
}