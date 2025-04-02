interface RadioOption {
  value: string;
  label: string;
}

interface RadioSelectProps {
  name: string;
  options: RadioOption[];
  required?: boolean;
}

const RadioSelect = ({ name, options, required = false }: RadioSelectProps) => {
  return (
    <div className="space-y-5">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center p-4 bg-gray-200 hover:bg-gray-300 rounded-lg cursor-pointertransition-colors"
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            required={required}
            className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-600"
          />
          <span className="ml-5 text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioSelect; 