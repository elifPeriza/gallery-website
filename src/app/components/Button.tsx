import { roboto_flex } from "../fonts";

type ButtonProps = {
  variant: "gradient" | "turquoise" | "transparent";
  children: string;
};

const variants = {
  gradient: "bg-gradient-to-r from-turquoise to-purple text-darkblue ",
  turquoise: "bg-turquoise text-darkblue",
  transparent: "text-white",
};

export default function Button({ children, variant }: ButtonProps) {
  return (
    <button
      className={`${roboto_flex.variable}  ${variants[variant]} h-[36px] cursor-pointer rounded-[5px] px-[0.6rem] py-1 font-sans text-base font-semibold leading-3`}
    >
      {children}
    </button>
  );
}
