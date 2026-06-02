import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CookieConsent } from "@/components/CookieConsent";
import { SkipLink } from "@/components/SkipLink";
import type { RouteRecord } from "vite-react-ssg";

const queryClient = new QueryClient();

// Root layout: holds the app-wide providers and renders the matched route
// via <Outlet />. This runs on both the prerender (server) pass and in the
// browser after hydration.
function Layout() {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SkipLink />
          <ScrollToTop />
          <Toaster />
          <Sonner />
          <Outlet />
          <CookieConsent />
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
      { index: true, lazy: async () => ({ Component: (await import("./pages/Index")).default }) },
      { path: "about", lazy: async () => ({ Component: (await import("./pages/About")).default }) },
      { path: "insights", lazy: async () => ({ Component: (await import("./pages/Insights")).default }) },
      { path: "faq", lazy: async () => ({ Component: (await import("./pages/FAQ")).default }) },
      { path: "insights/why-enterprise-ai-pilots-fail", lazy: async () => ({ Component: (await import("./pages/articles/WhyAIPilotsFail")).default }) },
      { path: "insights/ai-governance-middle-east", lazy: async () => ({ Component: (await import("./pages/articles/AIGovernanceMiddleEast")).default }) },
      { path: "insights/ai-operating-model", lazy: async () => ({ Component: (await import("./pages/articles/AIOperatingModel")).default }) },
      { path: "insights/ciso-cio-ai-collaboration", lazy: async () => ({ Component: (await import("./pages/articles/CIOCISOCollaboration")).default }) },
      { path: "insights/ai-use-case-prioritisation", lazy: async () => ({ Component: (await import("./pages/articles/AIUseCasePrioritisation")).default }) },
      { path: "insights/measuring-ai-roi", lazy: async () => ({ Component: (await import("./pages/articles/MeasuringAIROI")).default }) },
      { path: "ai-advisory-uae", lazy: async () => ({ Component: (await import("./pages/UAE")).default }) },
      { path: "ai-readiness-assessment", lazy: async () => ({ Component: (await import("./pages/AIReadinessAssessment")).default }) },
      { path: "guides/ai-pilots-fail", lazy: async () => ({ Component: (await import("./pages/GuideDownload")).default }) },
      { path: "services", lazy: async () => ({ Component: (await import("./pages/services/ServicesIndex")).default }) },
      { path: "services/ai-strategy", lazy: async () => ({ Component: (await import("./pages/services/AIStrategy")).default }) },
      { path: "services/ai-governance", lazy: async () => ({ Component: (await import("./pages/services/AIGovernance")).default }) },
      { path: "services/ai-operating-model", lazy: async () => ({ Component: (await import("./pages/services/AIOperatingModel")).default }) },
      { path: "services/ai-use-case-prioritisation", lazy: async () => ({ Component: (await import("./pages/services/AIUseCasePrioritisation")).default }) },
      { path: "services/leadership-enablement", lazy: async () => ({ Component: (await import("./pages/services/LeadershipEnablement")).default }) },
      { path: "services/ai-delivery-assurance", lazy: async () => ({ Component: (await import("./pages/services/AIDeliveryAssurance")).default }) },
      { path: "case-studies", lazy: async () => ({ Component: (await import("./pages/CaseStudies")).default }) },
      { path: "privacy", lazy: async () => ({ Component: (await import("./pages/Privacy")).default }) },
      { path: "terms", lazy: async () => ({ Component: (await import("./pages/Terms")).default }) },
      { path: "*", lazy: async () => ({ Component: (await import("./pages/NotFound")).default }) },
    ],
  },
];
