import { roboto_flex } from "../fonts";

type ButtonProps = {
  variant: "gradient" | "turquoise" | "transparent" | "gray";
  children: string;
  overlay?: boolean;
  onClick?: () => void;
};

const variants = {
  gradient: "bg-gradient-to-r from-turquoise to-purple text-darkblue ",
  turquoise: "bg-turquoise text-darkblue",
  transparent: "text-white",
  gray: "bg-darkgrey text-white",
};

export default function Button({
  children,
  variant,
  onClick,
  overlay,
}: ButtonProps) {
  return (
    <button
      className={`${roboto_flex.variable}  ${
        variants[variant]
      } h-[36px] cursor-pointer rounded-[5px] px-[0.6rem] py-1 font-sans text-base font-semibold leading-3 
      ${
        overlay
          ? "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
