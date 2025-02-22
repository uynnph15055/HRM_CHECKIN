import { SVGProps } from 'react';

export function IcSend({
  color = '#FFFFFF',
  size = 24,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number; color?: string }) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' {...props} width={size} height={size} viewBox='0 0 24 24' fill='none'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M3.40221 6.66217C3.14221 4.32817 5.54521 2.61417 7.66821 3.62017L19.6122 9.27817C21.9002 10.3612 21.9002 13.6172 19.6122 14.7002L7.66821 20.3592C5.54521 21.3652 3.14321 19.6512 3.40221 17.3172L3.88221 12.9892H12.0002C12.2654 12.9892 12.5198 12.8838 12.7073 12.6963C12.8949 12.5087 13.0002 12.2544 13.0002 11.9892C13.0002 11.724 12.8949 11.4696 12.7073 11.2821C12.5198 11.0945 12.2654 10.9892 12.0002 10.9892H3.88321L3.40321 6.66217H3.40221Z'
        fill={color}
      />
    </svg>
  );
}
