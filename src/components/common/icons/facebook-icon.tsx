import { IconProps } from "@/types/global";

const FacebookIcon = ({ height, width, color }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 12 24"
      fill="none"
    >
      <path
        d="M2.98022 24V12.7385H0.00244141V8.68382H2.98022V5.2206C2.98022 2.49917 4.7392 0 8.79227 0C10.4333 0 11.6468 0.15732 11.6468 0.15732L11.5511 3.9437C11.5511 3.9437 10.3136 3.93166 8.96315 3.93166C7.50155 3.93166 7.26739 4.60522 7.26739 5.72316V8.68382H11.6673L11.4759 12.7385H7.26739V24H2.98022Z"
        fill={color}
      />
    </svg>
  );
};
export default FacebookIcon;
