interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  label: string;
  name: string;
  options: Option[];
  required?: boolean;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown = ({
  label,
  name,
  options,
  required = false,
  placeholder = "Choose",
  className = "",
  value,
  onChange
}: DropdownProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-3">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent bg-white ${className}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option,index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown; 