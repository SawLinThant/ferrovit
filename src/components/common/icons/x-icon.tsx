import { IconProps } from "@/types/global";

const XIcon = ({ height, width, color }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
    >
      <mask
        id="mask0_91_836"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="25"
        height="24"
      >
        <path d="M0.669922 0H24.6699V24H0.669922V0Z" fill="white" />
      </mask>
      <g mask="url(#mask0_91_836)">
        <path
          d="M19.5699 1.12457H23.2505L15.2105 10.3371L24.6699 22.8754H17.2642L11.4596 15.2726L4.82535 22.8754H1.14135L9.74021 13.0183L0.669922 1.12629H8.26421L13.5031 8.07429L19.5699 1.12457ZM18.2756 20.6674H20.3156L7.14992 3.21772H4.96249L18.2756 20.6674Z"
          fill={color}
        />
      </g>
    </svg>
  );
};
export default XIcon;
