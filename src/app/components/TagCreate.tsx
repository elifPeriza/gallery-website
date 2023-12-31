export default function TagCreate({
  name,
  tagIndex,
  onTagClose,
}: {
  name: string;
  tagIndex: number;
  onTagClose: (tagIndex: number) => void;
}) {
  return (
    <div className="relative">
      <div
        className={` rounded-lg border-2 border-purple px-4 py-1 font-sans font-medium text-white`}
      >
        {name}
      </div>

      <button
        onClick={() => onTagClose?.(tagIndex)}
        aria-label="Delete Tag"
        className={`absolute -right-2 -top-2 flex h-[24px] w-[24px] cursor-pointer 
        items-center justify-center rounded-full bg-red text-sm font-semibold`}
      >
        x
      </button>
    </div>
  );
}
