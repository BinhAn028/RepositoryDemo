import dayjs from 'dayjs';
import nextDynamic from 'next/dynamic';

const LinkComponent = nextDynamic(
  () => import('@/components/app/rsc/LinkComponent'),
);

type Params = {
  slug: string;
};

// export const revalidate = 60;
export const dynamicParams = false;
export const dynamic = 'force-static';

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
      <div className='text-3xl color-red my-4'>
        Date: {dayjs().toDate().toISOString()}
      </div>
      <LinkComponent
        data={dayjs().toDate().toISOString()}
        random={1}
      ></LinkComponent>
    </div>
  );
}
