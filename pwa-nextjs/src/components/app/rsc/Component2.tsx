import { headers } from "next/headers";
import LinkComponent from "./LinkComponent";
import { randomInt } from "node:crypto";

export default async function Component2() {
  const currentHeaders = await headers();
  const searchParams = currentHeaders?.get('x-search-param');
  const jsonData = JSON.parse(searchParams || '{}');
  const request = jsonData?.data || '';
  const data: any = await fetchData2(request); // Giả sử mất 10s
  const random = randomInt(100);
  return <LinkComponent data={data} random={random}/>;
}

const fetchData2 = async (request = '') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data 2: " + request);
    }, 2000);
  });
}