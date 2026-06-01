// src/components/ScrollToTop.tsx
// Scrolls to the top of the page on route (pathname) change.
// Respects in-page anchor links: if the URL has a hash, we let the browser
// handle scrolling to that element instead.
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return; // anchor navigation handles its own scroll
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}
