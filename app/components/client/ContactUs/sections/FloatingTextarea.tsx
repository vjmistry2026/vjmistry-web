function FloatingTextarea({ label, name, value, onChange }: any) {
  return (
    <div className="relative">
      <textarea
        rows={3}
        name={name}
        value={value}
        onChange={onChange}
        className="peer w-full bg-transparent border-b border-gray-300 
                   focus:border-red-500 outline-none py-2 resize-none"
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
}

export default FloatingTextarea;

 
