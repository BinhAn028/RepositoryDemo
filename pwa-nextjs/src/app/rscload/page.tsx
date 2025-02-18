import Component1 from '@/components/app/rsc/Component1';
import Component2 from '@/components/app/rsc/Component2';
import { Suspense } from 'react';

type Params = {
  slug: string;
};

// export const dynamicParams = false;

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
  const { slug } = await params;
  return (
    <div className='mx-4'>
      <div className='text-3xl color-red my-4'>Data: {slug}</div>
      <Suspense fallback={<div>Loading Component 1...</div>}>
        <Component1 />
      </Suspense>

      <Suspense fallback={<div>Loading Component 2...</div>}>
        <Component2 />
      </Suspense>
    </div>
  );
}
