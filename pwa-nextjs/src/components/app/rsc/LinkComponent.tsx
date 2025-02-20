'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
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
  return (
    <>
      <Link href={`/rscload?data=${data}`} prefetch={undefined}>
        LinkComponent: {data} , {random}
      </Link>
      <ClientComponent />
    </>
  );
}
