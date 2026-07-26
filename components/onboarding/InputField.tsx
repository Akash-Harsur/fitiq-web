import { InputHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon: LucideIcon;
};

export default function InputField({
  label,
  icon: Icon,
  ...props
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="flex items-center rounded-xl border border-gray-300 bg-white px-4 py-3 transition focus-within:border-black">
        <Icon
          size={20}
          className="mr-3 text-gray-400"
        />

        <input
          {...props}
          className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
        />
      </div>
    </div>
  );
}