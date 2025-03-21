import { IconProps } from "@/types/global";

const IndicationIcon = ({ height, width, color }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 38 37"
      fill="none"
    >
      <path
        d="M18.9997 35.1667C28.2044 35.1667 35.6663 27.7048 35.6663 18.5C35.6663 9.29529 28.2044 1.83337 18.9997 1.83337C9.79493 1.83337 2.33301 9.29529 2.33301 18.5C2.33301 27.7048 9.79493 35.1667 18.9997 35.1667Z"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.833 14.3334L20.6663 20.1667M25.6663 11.8334L17.333 20.1667"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default IndicationIcon;
