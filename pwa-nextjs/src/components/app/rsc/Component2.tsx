import { headers } from "next/headers";
import Link from "next/link";
import { randomInt } from "node:crypto";

export default async function Component2() {
  const currentHeaders = await headers();
  const searchParams = currentHeaders?.get('x-search-param');
  const jsonData = JSON.parse(searchParams || '{}');
  const request = jsonData?.data || '';
  const data: any = await fetchData2(request); // Giả sử mất 10s
  return <Link href={`/rsc?data=${randomInt(100)}`} prefetch={false}>Component 2: {data}</Link>;
}

const fetchData2 = async (request = '') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data 2: " + request);
    }, 5000);
  });
}