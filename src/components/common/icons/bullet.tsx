import { IconProps } from "@/types/global";

const BulletIcon = ({ height, width, color }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 22 22"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 11C22 17.075 17.075 22 11 22C4.925 22 0 17.075 0 11C0 4.925 4.925 0 11 0C17.075 0 22 4.925 22 11ZM6 12L7.5 10.5L9.5 12.5L14.5 7.5L16 9L9.5 15.5L6 12Z"
        fill={color}
      />
    </svg>
  );
};
export default BulletIcon;
