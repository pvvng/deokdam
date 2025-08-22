"use client";

interface CapsuleOption {
  label: string;
  value: string;
}

interface CapsuleSelectorProps {
  label: string;
  options: CapsuleOption[];
  value?: string | null;
  onChange?: (value: string) => void;
  renderSelector?: React.ReactNode;
  errors?: string[];
}

export default function CapsuleSelector({
  label,
  options,
  value,
  onChange,
  renderSelector,
  errors = [],
}: CapsuleSelectorProps) {
  const handleClick = (value: string) => {
    onChange?.(value);
  };

  return (
    <div className="space-y-3">
      <p className="font-medium">{label}</p>
      <div className="flex gap-2 items-center flex-wrap">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => handleClick(opt.value)}
            className={`text-sm px-4 py-1 rounded-full transition shadow cursor-pointer
            ${
              value && value === opt.value
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800"
            }
          `}
          >
            {opt.label}
          </button>
        ))}
        {/* option 이외의 커스텀 셀렉터 렌더 */}
        {renderSelector}
      </div>
      {errors.map((error, index) => (
        <p key={index} className="text-red-600 text-sm">
          {error}
        </p>
      ))}
    </div>
  );
}
