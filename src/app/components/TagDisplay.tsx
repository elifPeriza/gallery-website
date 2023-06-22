import Link from "next/link";

export default function TagDisplay({
  name,
  href,
  onClick,
}: {
  name: string;
  href: string;
  onClick?: () => void;
}) {
  return (
    <Link href={href}>
      <button
        onClick={onClick}
        className=" cursor-pointer rounded-lg border-2 border-purple px-4 py-1 font-sans font-medium text-white"
      >
        {name}
      </button>
    </Link>
  );
}
