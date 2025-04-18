import { IconProps } from "@/types/global";

const HowToUseIcon = ({ height, width, color }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 40 41"
      fill="none"
    >
      <path
        d="M19.9997 37.1667C29.2044 37.1667 36.6663 29.7048 36.6663 20.5C36.6663 11.2953 29.2044 3.83337 19.9997 3.83337C10.7949 3.83337 3.33301 11.2953 3.33301 20.5C3.33301 29.7048 10.7949 37.1667 19.9997 37.1667Z"
        stroke={color}
        strokeWidth="3"
      />
      <path
        d="M16.666 14.6401C17.4993 12.9901 18.3327 12.1667 19.9993 12.1667C22.076 12.1667 23.3327 13.8151 23.3327 15.4634C23.3327 17.1117 22.4993 17.9351 19.9993 19.5851V22.1667M19.9993 28.0001V28.8334"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};
export default HowToUseIcon;
