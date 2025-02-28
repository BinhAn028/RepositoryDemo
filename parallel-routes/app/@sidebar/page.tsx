import Link from "next/link";

export default async function Sidebar() {
  return <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
    <Link href='/sidebar-child'>Sidebar</Link>
    <Link href={`/about`}>About</Link>
  </div>;
}
