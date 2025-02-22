import { SVGProps } from 'react';

export function IcBarIcon({
  color = '#000',
  size = 24,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number; color?: string }) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} {...props} viewBox='0 0 24 24' fill='none'>
      <rect width='18' height='3' y='4' rx='1.5' fill={color}></rect>
      <rect width='18' height='3' y='10.5' rx='1.5' fill={color}></rect>
      <rect width='18' height='3' y='17' rx='1.5' fill={color}></rect>
    </svg>
  );
}
