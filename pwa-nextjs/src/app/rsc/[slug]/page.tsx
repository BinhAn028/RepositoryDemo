// import Component1 from '@/components/app/rscload/ClientComponentGetData';
// import Component2 from '@/components/app/rsc/Component2';
import nextDynamic from 'next/dynamic';
// import { Suspense } from 'react';

const LinkComponent = nextDynamic(
  () => import('@/components/app/rsc/LinkComponent'),
);

export const revalidate = 60;
// export const dynamicParams = false;
// export const dynamic = 'auto'; // Default
// export const dynamic = 'force-dynamic';
// export const dynamic = 'force-static';

// PPR = true: Pre-rendering Partial
export const experimental_ppr = true;

type Params = {
  slug: string;
};

export async function generateStaticParams(): Promise<Params[]> {
  // Trả về mảng các tham số động
  return [1, 2, 3, 4, 5].map((i) => {
    return {
      slug: `page-${i}`,
    };
  });
}

// export type PageProps = Promise<{ slug?: string }>;

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const serverTime = process.env.BUILD_TIME; // 🔥 Chỉ gọi 1 lần trên server
  const { slug } = await params;
  const textFetchNew: any = await new Promise((resolve) => {
    setTimeout(() => {
      resolve('Text Fetch New');
    }, 1000);
  });

  return (
    <div className='mx-4'>
      <div className='text-3xl color-red my-4'>Data: {slug}</div>
      <div className='text-3xl color-red my-4'>
        TextFetchNew: {textFetchNew}
      </div>
      <div className='text-3xl color-red my-4'>Date: {serverTime}</div>
      <LinkComponent data={serverTime} random={1}></LinkComponent>
      {/* <Suspense fallback={<div>Loading Component 1...</div>}>
        <Component1 />
      </Suspense>

      <Suspense fallback={<div>Loading Component 2...</div>}>
        <Component2 />
      </Suspense> */}
    </div>
  );
}
