import { LucideIcon } from "lucide-react";

type Option = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  label: string;
  icon: LucideIcon;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: Option[];
};

export default function SelectField({
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  options,
}: SelectFieldProps) {
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

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-sm outline-none"
        >
          <option value="">
            {placeholder}
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}