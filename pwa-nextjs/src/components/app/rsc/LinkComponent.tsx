'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { randomInt } from "node:crypto";

const ClientComponent = dynamic(
  () => import('@/components/app/rsc/ClientComponent'),
  // { ssr: false },
);


export default function LinkComponent({
  data,
  random,
}: {
  data: any;
  random: number;
}) {
  const router = useRouter();
  return (
    <>
      <Link
        href={`/rsc?data=${random}`}
        prefetch={undefined}
        // prefetch={false}
        onClick={(e) => {
          e.preventDefault();
          router.push(`/rsc?data=${random}`);
        }}
      >
        LinkComponent: {data} , {random}
      </Link>
      <ClientComponent />
    </>
  );
}
