import Component2 from '@/components/app/rsc/Component2';
// import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Suspense } from 'react';
import ClientComponentAll from '@/components/app/rscload/ClientComponentAll';

// const ClientComponentAll = dynamic(() => import('@/components/app/rscload/ClientComponentAll'));

export default async function Page() {
  return (
    <div className='flex flex-col mx-4'>
      <div className='text-3xl color-red my-4'>Data: 1111</div>

      <ClientComponentAll />

      <Suspense fallback={<div>Loading Component 2...</div>}>
        <Component2 />
      </Suspense>
      <Link href="/">Home</Link> 
    </div>
  );
}
