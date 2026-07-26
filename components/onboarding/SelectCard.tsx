import { LucideIcon, Check } from "lucide-react";

type SelectCardProps = {
  title: string;
  description?: string;
  icon: LucideIcon;
  selected: boolean;
  onClick: () => void;
};

export default function SelectCard({
  title,
  description,
  icon: Icon,
  selected,
  onClick,
}: SelectCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex w-full flex-col rounded-2xl border p-5 text-left transition-all duration-200 ${
        selected
          ? "border-black bg-black text-white shadow-lg"
          : "border-gray-200 bg-white hover:border-black hover:shadow-md"
      }`}
    >
      {selected && (
        <div className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">
          <Check size={16} />
        </div>
      )}

      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
          selected
            ? "bg-white text-black"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        <Icon size={22} />
      </div>

      <h3 className="text-base font-semibold">
        {title}
      </h3>

      {description && (
        <p
          className={`mt-2 text-sm leading-6 ${
            selected
              ? "text-gray-200"
              : "text-gray-500"
          }`}
        >
          {description}
        </p>
      )}
    </button>
  );
}