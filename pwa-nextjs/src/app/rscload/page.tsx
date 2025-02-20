import Component1 from '@/components/app/rscload/ClientComponentGetData';
import Component2 from '@/components/app/rsc/Component2';
import { Suspense } from 'react';
import Link from 'next/link';

export default async function Page() {
  return (
    <div className='mx-4'>
      <div className='text-3xl color-red my-4'>Data: 1111</div>
      <Link href={`/rscload?data=1`} prefetch={true}>
        LinkComponent: 2222 , 3333
      </Link>
      <Link href={`/rscload?data=1`} prefetch={undefined}>
        LinkComponent: 2222 , 3333
      </Link>
      <Suspense fallback={<div>Loading Component 1...</div>}>
        <Component1 />
      </Suspense>

      <Suspense fallback={<div>Loading Component 2...</div>}>
        <Component2 />
      </Suspense>
    </div>
  );
}
