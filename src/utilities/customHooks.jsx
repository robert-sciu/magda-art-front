import { useEffect } from "react";

export function useScrollLock(scrollDisabled) {
  return useEffect(() => {
    if (!scrollDisabled) return;

    const preventScroll = (e) => e.preventDefault();

    document.addEventListener("wheel", preventScroll, { passive: false });
    document.addEventListener("touchmove", preventScroll, { passive: false });
    document.addEventListener("keydown", (e) => {
      if (["ArrowUp", "ArrowDown", "Space"].includes(e.code)) {
        e.preventDefault();
      }
    });

    return () => {
      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("touchmove", preventScroll);
      document.removeEventListener("keydown", preventScroll);
    };
  }, [scrollDisabled]);
}
