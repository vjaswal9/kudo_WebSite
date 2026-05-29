import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import type { RouteRecord } from "vite-react-ssg";
import Index from "./pages/Index";
import About from "./pages/About";
import Insights from "./pages/Insights";
import FAQ from "./pages/FAQ";
import WhyAIPilotsFail from "./pages/articles/WhyAIPilotsFail";
import AIGovernanceMiddleEast from "./pages/articles/AIGovernanceMiddleEast";
import AIOperatingModel from "./pages/articles/AIOperatingModel";
import CIOCISOCollaboration from "./pages/articles/CIOCISOCollaboration";
import AIUseCasePrioritisation from "./pages/articles/AIUseCasePrioritisation";
import MeasuringAIROI from "./pages/articles/MeasuringAIROI";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Root layout: holds the app-wide providers and renders the matched route
// via <Outlet />. This runs on both the prerender (server) pass and in the
// browser after hydration.
function Layout() {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Outlet />
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  );
}

// vite-react-ssg crawls this tree at build time and prerenders one static
// HTML file per concrete path. The catch-all "*" route is intentionally not
// prerendered (it has no fixed URL); it is served via the 404.html fallback.
export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Index /> },
      { path: "about", element: <About /> },
      { path: "insights", element: <Insights /> },
      { path: "faq", element: <FAQ /> },
      { path: "insights/why-enterprise-ai-pilots-fail", element: <WhyAIPilotsFail /> },
      { path: "insights/ai-governance-middle-east", element: <AIGovernanceMiddleEast /> },
      { path: "insights/ai-operating-model", element: <AIOperatingModel /> },
      { path: "insights/ciso-cio-ai-collaboration", element: <CIOCISOCollaboration /> },
      { path: "insights/ai-use-case-prioritisation", element: <AIUseCasePrioritisation /> },
      { path: "insights/measuring-ai-roi", element: <MeasuringAIROI /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];
