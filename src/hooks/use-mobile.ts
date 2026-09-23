import { useSyncExternalStore } from "react";

import { MOBILE_QUERY } from "@/types-and-consts/breakpoints";

/** Subscribes a store listener to the configured mobile media query. */
const subscribe = (onChange: () => void) => {
  const query = window.matchMedia(MOBILE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
/** Reads the current mobile media-query match state. */
const getSnapshot = () => window.matchMedia(MOBILE_QUERY).matches;
/** Supplies the stable server-rendered snapshot for hydration. */
const getServerSnapshot = () => false;

/**
 * Returns whether the viewport currently matches the mobile breakpoint.
 *
 * @returns `true` while the mobile media query matches.
 * @example
 * ```tsx
 * const isMobile = useIsMobile();
 * return isMobile ? <MobileNav /> : <DesktopNav />;
 * ```
 */
export const useIsMobile = () => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
