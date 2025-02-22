import { ReactNode } from '@tanstack/react-router';

import { Footer } from '../common/footer';
import { Header } from '../common/header';

export function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header className='absolute top-0' />
      <div className='min-h-[calc(100vh-var(--header-height)-var(--footer-height))]'>{children}</div>
      <Footer />
    </>
  );
}
