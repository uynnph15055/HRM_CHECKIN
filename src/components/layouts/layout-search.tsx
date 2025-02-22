import { Header } from '@radix-ui/react-accordion';
import { ReactNode } from '@tanstack/react-router';
import { Footer } from 'react-day-picker';

export function LayoutSearch({ children }: { children: ReactNode }) {
  return (
    <>
      <Header className='absolute top-0' />
      <div className='min-h-[calc(100vh-var(--header-height)-var(--footer-height))]'>{children}</div>
      <Footer />
    </>
  );
}
