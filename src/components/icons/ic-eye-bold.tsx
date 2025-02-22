import { SVGProps } from 'react';

export function IcEyeBold({
  color = '#212B36',
  size = 24,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} {...props} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M6.49967 7.99935C6.49967 7.60152 6.65771 7.21999 6.93901 6.93869C7.22032 6.65738 7.60185 6.49935 7.99967 6.49935C8.3975 6.49935 8.77903 6.65738 9.06033 6.93869C9.34164 7.21999 9.49967 7.60152 9.49967 7.99935C9.49967 8.39717 9.34164 8.7787 9.06033 9.06001C8.77903 9.34131 8.3975 9.49935 7.99967 9.49935C7.60185 9.49935 7.22032 9.34131 6.93901 9.06001C6.65771 8.7787 6.49967 8.39717 6.49967 7.99935Z'
        fill={color}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M1.33301 7.99935C1.33301 9.09268 1.61634 9.46002 2.18301 10.1967C3.31434 11.666 5.21167 13.3327 7.99967 13.3327C10.7877 13.3327 12.685 11.666 13.8163 10.1967C14.383 9.46068 14.6663 9.09202 14.6663 7.99935C14.6663 6.90602 14.383 6.53868 13.8163 5.80202C12.685 4.33268 10.7877 2.66602 7.99967 2.66602C5.21167 2.66602 3.31434 4.33268 2.18301 5.80202C1.61634 6.53935 1.33301 6.90668 1.33301 7.99935ZM7.99967 5.49935C7.33663 5.49935 6.70075 5.76274 6.23191 6.23158C5.76307 6.70042 5.49967 7.33631 5.49967 7.99935C5.49967 8.66239 5.76307 9.29827 6.23191 9.76712C6.70075 10.236 7.33663 10.4993 7.99967 10.4993C8.66272 10.4993 9.2986 10.236 9.76744 9.76712C10.2363 9.29827 10.4997 8.66239 10.4997 7.99935C10.4997 7.33631 10.2363 6.70042 9.76744 6.23158C9.2986 5.76274 8.66272 5.49935 7.99967 5.49935Z'
        fill={color}
      />
    </svg>
  );
}
