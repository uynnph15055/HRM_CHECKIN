import { ReactNode } from '@tanstack/react-router';

import { Footer } from './common/footer';
import { Header } from './common/header';

export function LookUpLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header style={{ background: '#badcf6' }} />
      <div className='min-h-[calc(100vh-var(--header-height)-var(--footer-height))]'>{children}</div>
      <Footer style={{ position: 'inherit' }} />
    </>
  );
}
