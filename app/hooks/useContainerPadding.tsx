import { useEffect, useState } from "react";

export function useContainerPadding() {
  const [padding, setPadding] = useState<number>(0);

  useEffect(() => {
    const calculate = () => {
      const container = document.querySelector(".container") as HTMLElement | null;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      setPadding(rect.left + 15);
    };

    calculate();
    window.addEventListener("resize", calculate);

    return () => window.removeEventListener("resize", calculate);
  }, []);

  return padding;
}
