import Component1 from "@/components/app/rsc/Component1";
import Component2 from "@/components/app/rsc/Component2";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="mx-4">
      <Suspense fallback={<div>Loading Component 1...</div>}>
        <Component1 />
      </Suspense>

      <Suspense fallback={<div>Loading Component 2...</div>}>
        <Component2 />
      </Suspense>
    </div>
  );
};