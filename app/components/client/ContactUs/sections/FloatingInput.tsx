type FloatingInputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

const FloatingInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
}: FloatingInputProps) => {
  return (
    <div className="relative">
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className="peer w-full bg-transparent border-b border-gray-300 
                   focus:border-red-500 outline-none py-2 transition"
      />

      <label
        className={`absolute left-0 transition-all duration-300
        ${
          value
            ? "-top-5 text-sm text-red-500"
            : "top-2 text-lg text-gray-500 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-red-500"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingInput;