import { IconProps } from "@/types/global";

const ChevronRightIcon = ({ height, width, color }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 10 18"
      fill="none"
    >
      <path
        d="M0.833374 17.3333V0.666626L9.16671 8.99996L0.833374 17.3333Z"
        fill={color}
      />
    </svg>
  );
};
export default ChevronRightIcon;
