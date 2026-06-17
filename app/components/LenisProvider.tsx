// "use client";

// import Lenis from "lenis";
// import { ReactNode, useEffect, useRef } from "react";
// import { usePathname } from "next/navigation";

// const LenisProvider = ({ children }: { children: ReactNode }) => {
//   const lenisRef = useRef<Lenis | null>(null);
//   const pathname = usePathname();

//   // Create Lenis once on mount
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.5,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       autoRaf: true,
//     });

//     lenisRef.current = lenis;

//     return () => {
//       lenis.destroy();
//       lenisRef.current = null;
//     };
//   }, []);

//   // Scroll to top via Lenis on every route change
//   useEffect(() => {
//     lenisRef.current?.scrollTo(0, { immediate: true });
//   }, [pathname]);

//   return <>{children}</>;
// };

// export default LenisProvider;

"use client";

import Lenis from "lenis";
import { ReactNode, useEffect, useRef, createContext, useContext } from "react";
import { usePathname } from "next/navigation";

interface LenisContextType {
  lenis: Lenis | null;
  scrollTo: (target: number | string | HTMLElement, options?: Parameters<Lenis["scrollTo"]>[1]) => void;
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  scrollTo: () => {},
});

export const useLenis = () => useContext(LenisContext);

const LenisProvider = ({ children }: { children: ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      autoRaf: true,
    });

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) lenisRef.current?.scrollTo(el as HTMLElement, { duration: 1.2, offset: -100 });
      }, 600);
      return () => clearTimeout(timer);
    } else {
      lenisRef.current?.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  const scrollTo: LenisContextType["scrollTo"] = (target, options) => {
    lenisRef.current?.scrollTo(target as never, options);
  };

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
};

export default LenisProvider;