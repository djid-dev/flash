import type { SVGProps } from "react";
export default function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_6_499)">
        <path
          d="M17 3.36166C9.19419 3.36166 2.86169 9.69416 2.86169 17.5C2.86169 25.3058 9.19419 31.6383 17 31.6383C24.8059 31.6383 31.1384 25.3058 31.1384 17.5C31.1384 9.69416 24.8059 3.36166 17 3.36166ZM16.2634 25.83V19.965H12.495C11.9709 19.965 11.6167 19.3983 11.8717 18.9308L17.085 8.77333C17.4109 8.1075 18.4167 8.34833 18.4167 9.09916V15.035H22.015C22.5392 15.035 22.8792 15.5875 22.6525 16.055L17.6092 26.1417C17.2692 26.8217 16.2634 26.5808 16.2634 25.83Z"
          fill="#E42020"
        />
      </g>
      <defs>
        <clipPath id="clip0_6_499">
          <rect
            width="34"
            height="34"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
