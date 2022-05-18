import { useEffect, useState } from "react";

import { useWindowSize } from "./use-window-size";

export const useBreakpoint = () => {
  const { width } = useWindowSize();
  const [screen, setScreen] = useState({
    sm: true,
    md: true,
    lg: true,
    xl: true,
    "2xl": true,
  });

  useEffect(() => {
    if (!width) return;
    setScreen({
      sm: width >= 640,
      md: width >= 768,
      lg: width >= 1024,
      xl: width >= 1280,
      "2xl": width >= 1536,
    });
  }, [width, setScreen]);

  return screen;
};
