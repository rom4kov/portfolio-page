import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

const scrollPositions = new Map<string, number>();

const useScrollRestoration = (fromRoute: RegExp, toRoute: string) => {
  const { pathname } = useLocation();
  const previousPathname = useRef<string | null>(null);

  useEffect(() => {
    if (previousPathname.current) {
      scrollPositions.set(previousPathname.current, window.scrollY);
    }

    if (
      previousPathname.current?.match(toRoute) &&
      previousPathname.current !== "/projects" &&
      pathname === toRoute
    ) {
      const savedPosition = scrollPositions.get(pathname) || 0;
      setTimeout(() => {
        window.scrollTo(0, savedPosition);
      }, 300);
    }

    previousPathname.current = pathname;
  }, [pathname, fromRoute, toRoute]);

  useEffect(() => {
    const handleScroll = () => {
      scrollPositions.set(pathname, window.scrollY);
      console.log(scrollPositions);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);
};

export default useScrollRestoration;
