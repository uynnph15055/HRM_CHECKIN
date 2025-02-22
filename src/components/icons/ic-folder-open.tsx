import { SVGProps } from 'react';

export function IcFolderOpen({
  color = '#637381',
  size = 24,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} {...props} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M1.33301 7.64065V10.974C1.33301 12.5006 2.56634 13.734 4.09301 13.734H11.8997C13.4263 13.734 14.6663 12.494 14.6663 10.9673V7.64065C14.6663 7.19398 14.3063 6.83398 13.8597 6.83398H2.13967C1.69301 6.83398 1.33301 7.19398 1.33301 7.64065ZM5.33301 11.5007H3.99967C3.72634 11.5007 3.49967 11.274 3.49967 11.0007C3.49967 10.7273 3.72634 10.5007 3.99967 10.5007H5.33301C5.60634 10.5007 5.83301 10.7273 5.83301 11.0007C5.83301 11.274 5.60634 11.5007 5.33301 11.5007ZM9.66634 11.5007H6.99967C6.72634 11.5007 6.49967 11.274 6.49967 11.0007C6.49967 10.7273 6.72634 10.5007 6.99967 10.5007H9.66634C9.93967 10.5007 10.1663 10.7273 10.1663 11.0007C10.1663 11.274 9.93967 11.5007 9.66634 11.5007Z'
        fill={color}
      />
      <path
        d='M8.99967 3.07424V5.02758C8.99967 5.47424 8.63967 5.83424 8.19301 5.83424H2.13967C1.68634 5.83424 1.33301 5.46091 1.33301 5.01424C1.33967 4.26091 1.63967 3.57424 2.13967 3.07424C2.63967 2.57424 3.33301 2.26758 4.09301 2.26758H8.19301C8.63967 2.26758 8.99967 2.62758 8.99967 3.07424Z'
        fill={color}
      />
      <path
        d='M13.3133 1.33398H11.3533C10.5067 1.33398 10 1.84065 10 2.68732V4.64732C10 5.49398 10.5067 6.00065 11.3533 6.00065H13.3133C14.16 6.00065 14.6667 5.49398 14.6667 4.64732V2.68732C14.6667 1.84065 14.16 1.33398 13.3133 1.33398ZM13.7533 2.96732L12.1733 4.81398C12.1133 4.88732 12.02 4.93398 11.9267 4.93398C11.92 4.93398 11.92 4.93398 11.9133 4.93398C11.82 4.93398 11.7333 4.90065 11.6667 4.83398L10.9333 4.11398C10.8 3.98065 10.8 3.76065 10.9333 3.62732C11.0667 3.49398 11.2867 3.48732 11.42 3.62732L11.8867 4.08732L13.22 2.52732C13.3467 2.38065 13.56 2.36732 13.7067 2.48732C13.86 2.60732 13.8733 2.82732 13.7533 2.96732Z'
        fill={color}
      />
    </svg>
  );
}
