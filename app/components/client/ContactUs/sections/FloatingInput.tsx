import type { UseFormRegisterReturn } from "react-hook-form";

type FloatingInputProps = {
  label: string;
  type?: string;
  value?: string;
  error?: string;
  registration: UseFormRegisterReturn;
};

const FloatingInput = ({
  label,
  type = "text",
  value = "",
  error,
  registration,
}: FloatingInputProps) => {
  return (
    <div className="relative">
      <input
        {...registration}
        type={type}
        aria-invalid={error ? "true" : "false"}
        className={`peer w-full border-b bg-transparent py-2 font-nexa text-20 font-bold text-black outline-none transition ${
          error
            ? "border-primary focus:border-primary"
            : "border-gray-300 focus:border-red-500"
        }`}
      />

      <label className={`pointer-events-none absolute left-0 transition-all duration-300
        ${
          value
            ? "-top-5 text-sm text-red-500"
            : "top-2 text-20 font-nexa font-bold text-paragraph peer-focus:-top-5 peer-focus:text-sm peer-focus:text-red-500"
        }`}
      >
        {label}
      </label>

      {error ? (
        <p className="pt-2 text-sm font-medium text-primary">{error}</p>
      ) : null}
    </div>
  );
};

export default FloatingInput;
