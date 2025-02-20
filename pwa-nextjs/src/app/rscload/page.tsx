import Component2 from '@/components/app/rsc/Component2';
import ClientComponent from '@/components/app/rscload/ClientComponent';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <div className='mx-4'>
      <div className='text-3xl color-red my-4'>Data: 1111</div>

      <ClientComponent />

      <Suspense fallback={<div>Loading Component 2...</div>}>
        <Component2 />
      </Suspense>
    </div>
  );
}
