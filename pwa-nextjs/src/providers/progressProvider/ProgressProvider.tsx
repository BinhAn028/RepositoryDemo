'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
type Props = { children?: React.ReactNode };

const ProgressProvider = ({ children }: Props) => {
  return (
    <>
      {children}
      <ProgressBar
        height='100px'
        // color='#effff5'
        color='red'
        options={{ showSpinner: true }}
        shallowRouting
        // delay={5000}
        // stopDelay={5000}
      />
    </>
  );
};

export default ProgressProvider;
