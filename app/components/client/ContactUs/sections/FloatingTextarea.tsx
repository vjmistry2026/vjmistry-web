import type { UseFormRegisterReturn } from "react-hook-form";

type FloatingTextareaProps = {
  label: string;
  value?: string;
  error?: string;
  registration: UseFormRegisterReturn;
};

function FloatingTextarea({
  label,
  value = "",
  error,
  registration,
}: FloatingTextareaProps) {
  return (
    <div className="relative">
      <textarea
        {...registration}
        rows={3}
        aria-invalid={error ? "true" : "false"}
        className={`peer w-full resize-none border-b bg-transparent py-2 outline-none transition ${
          error
            ? "border-primary focus:border-primary"
            : "border-gray-300 focus:border-red-500"
        }`}
      />

      <label className={`pointer-events-none absolute left-0 transition-all duration-300
        ${
          value
            ? "-top-5 text-sm text-red-500"
            : "top-2 text-lg text-paragraph peer-focus:-top-5 peer-focus:text-sm peer-focus:text-red-500"
        }`}
      >
        {label}
      </label>

      {error ? (
        <p className="pt-2 text-sm font-medium text-primary">{error}</p>
      ) : null}
    </div>
  );
}

export default FloatingTextarea;

 
