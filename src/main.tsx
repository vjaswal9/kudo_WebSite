import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./App";
import "./index.css";

// ViteReactSSG wires up the router for us. The same entry is used for the
// build-time prerender pass and for client-side hydration in the browser,
// so there is no separate createRoot()/hydrateRoot() call to maintain.
export const createRoot = ViteReactSSG({ routes });
