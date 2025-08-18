interface Option {
  value: string | number;
  label: string;
}

interface SelectOptionProps {
  label: string | React.ReactNode;
  name: string;
  defaultValue: string | number;
  options: Option[];
}

export default function SelectOption({
  label,
  name,
  defaultValue,
  options,
}: SelectOptionProps & React.OptionHTMLAttributes<HTMLOptionElement>) {
  return (
    <div className="w-full max-w-fit flex items-center shadow rounded-2xl overflow-hidden bg-neutral-200">
      <label className="shrink-0 text-sm bg-neutral-900 text-white px-3 py-1">
        {label}
      </label>
      <select
        name={name}
        className="text-sm focus:outline-none cursor-pointer px-3 py-1"
        defaultValue={defaultValue}
      >
        {options.map(({ value, label }) => (
          <option key={value + label} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
