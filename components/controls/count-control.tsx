"use client";

type Props = {
  count?: number;
  onIncrement: (count: number) => Promise<void>;
  onDecrement: (count: number) => Promise<void>;
};

export default function CountControl({
  count = 0,
  onDecrement,
  onIncrement,
}: Props) {
  return (
    <div className="flex items-center gap-4 py-2 text-white px-4 bg-secondary-foreground/90 rounded-lg w-fit">
      <p
        className="transition-all ease-in duration-150 select-none active:scale-95 hover:text-yellow-500 cursor-pointer"
        onClick={async () => await onDecrement(count - 1)}
      >
        -
      </p>
      <p className="text-sm">{count}</p>
      <p
        className="transition-all ease-in duration-150 select-none active:scale-95 hover:text-yellow-500 cursor-pointer"
        onClick={async () => await onIncrement(count + 1)}
      >
        +
      </p>
    </div>
  );
}
