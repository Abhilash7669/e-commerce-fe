import { cn } from "@/lib/utils";
import { TColorPicker } from "@/types/color-picker/color-picker.types";

type Props = TColorPicker & { isActive?: boolean; onClick?: () => void };

export default function ColorPicker({
  color = "#000000",
  colorName = "Black",
  isActive = false,
  onClick = undefined,
}: Props) {
  return (
    <li
      onClick={onClick}
      className="flex flex-col items-center gap-2 cursor-pointer group"
    >
      <div className="relative flex items-center justify-center">
        {/* Color circle */}
        <div
          className={cn(
            "h-4 w-4 rounded-full transition-all duration-300",
            isActive ? "scale-105" : "group-hover:scale-105",
          )}
          style={{
            background: color,
            boxShadow: isActive
              ? `0 0 0 2px white, 0 0 0 4.5px ${color}, 0 4px 12px ${color}60`
              : "0 2px 8px rgba(0,0,0,0.15)",
          }}
        />

        {/* Active checkmark */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-200",
            isActive ? "opacity-100 scale-100" : "opacity-0 scale-50",
          )}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6l3 3 5-5"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <p
        className={cn(
          "text-center text-[11px] tracking-wide transition-all duration-200",
          isActive
            ? "text-gray-900 font-semibold"
            : "text-gray-400 group-hover:text-gray-600 font-normal",
        )}
      >
        {colorName}
      </p>
    </li>
  );
}
