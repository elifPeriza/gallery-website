import Link from "next/link";
import { roboto_flex } from "../fonts";

type ButtonProps = {
  variant: "gradient" | "turquoise" | "transparent" | "gray" | "disabled";
  children: string;
  overlay?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
  target?: "_blank" | "_self";
};

const variants = {
  gradient: "bg-gradient-to-r from-turquoise to-purple text-darkblue ",
  turquoise: "bg-turquoise text-darkblue",
  transparent: "text-white",
  gray: "bg-darkgrey text-white",
  disabled: "bg-green-500",
};

export default function Button({
  children,
  variant,
  onClick,
  overlay,
  disabled,
  target,
  href,
}: ButtonProps) {
  const buttonElement = (
    <button
      className={`${roboto_flex.variable}  ${
        disabled ? variants["disabled"] : variants[variant]
      } h-[36px] cursor-pointer rounded-[5px] px-[0.6rem] py-1 font-sans text-base font-semibold leading-3 
${
  overlay ? "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" : ""
}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );

  return href ? (
    <Link href={href} target={target}>
      {buttonElement}
    </Link>
  ) : (
    buttonElement
  );
}
