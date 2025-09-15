import type { SVGProps } from 'react';

export function TeddyBear(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15.5 13.5c0 2-1.5 3.5-3.5 3.5s-3.5-1.5-3.5-3.5" />
      <path d="M18 10.5a2.5 2.5 0 0 0-5 0" />
      <path d="M11 10.5a2.5 2.5 0 0 0-5 0" />
      <path d="M14.5 17.5a1.5 1.5 0 0 1-1.2.8C12.5 18.7 12 19 12 19s-.5-.3-.8-.7a1.5 1.5 0 0 1-1.2-.8" />
      <path d="M5 18.5c-2.5-2.5-2.5-6.5 0-9C7.5 7 12 5 12 5s4.5 2 7 4.5c2.5 2.5 2.5 6.5 0 9" />
      <path d="M16 9.5c.5-.5 1-1.5 1-2.5" />
      <path d="M8 9.5c-.5-.5-1-1.5-1-2.5" />
    </svg>
  );
}
