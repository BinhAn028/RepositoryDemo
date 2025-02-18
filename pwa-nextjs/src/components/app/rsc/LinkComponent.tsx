'use client';
import Link from "next/link";
import { useRouter } from 'next/navigation';
// import { randomInt } from "node:crypto";

export default function LinkComponent({ data, random }: { data: any, random: number }) {
  const router = useRouter();
  return <Link href={`/rsc?data=${random}`} prefetch={false}
    onClick={(e) => {
      e.preventDefault();
      router.push(`/rsc?data=${random}`);
    }

    }>Component 2: {data} , {random}</Link>;
}