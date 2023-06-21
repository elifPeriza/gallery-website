import { roboto_flex } from "../fonts";

export default function TagDisplay({ name }: { name: string }) {
  return (
    <div className="relative">
      <div
        className={`${roboto_flex.variable} rounded-lg border-2 border-purple px-4 py-1 font-sans font-medium text-white`}
      >
        {name}
      </div>
    </div>
  );
}
