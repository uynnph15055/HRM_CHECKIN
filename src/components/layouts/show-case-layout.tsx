import { ReactNode } from '@tanstack/react-router';

import { Footer } from './common/footer';
import { CongDanHeader } from './cong-dan/cong-dan-header';

export function ShowCaseLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main
        id='content'
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0  h-full `}
      >
        <div className='bg-[#F2F5F8]  '>
          <CongDanHeader />
          <div className='xl:px-36 md:px-20 sm:px-10 m-auto pt-10 min-h-[calc(100vh-var(--header-height)-1px-48px)] bg-[#F2F5F8]'>
            {children}
          </div>
          <Footer />
        </div>
      </main>
    </>
  );
}
