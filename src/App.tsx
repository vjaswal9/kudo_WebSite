import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CookieConsent } from "@/components/CookieConsent";
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
import UAE from "./pages/UAE";
import AIReadinessAssessment from "./pages/AIReadinessAssessment";
import GuideDownload from "./pages/GuideDownload";
import ServicesIndex from "./pages/services/ServicesIndex";
import AIStrategyPage from "./pages/services/AIStrategy";
import AIGovernancePage from "./pages/services/AIGovernance";
import AIOperatingModelPage from "./pages/services/AIOperatingModel";
import AIUseCasePrioritisationPage from "./pages/services/AIUseCasePrioritisation";
import LeadershipEnablementPage from "./pages/services/LeadershipEnablement";
import AIDeliveryAssurancePage from "./pages/services/AIDeliveryAssurance";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
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
      { path: "ai-advisory-uae", element: <UAE /> },
      { path: "ai-readiness-assessment", element: <AIReadinessAssessment /> },
      { path: "guides/ai-pilots-fail", element: <GuideDownload /> },
      { path: "services", element: <ServicesIndex /> },
      { path: "services/ai-strategy", element: <AIStrategyPage /> },
      { path: "services/ai-governance", element: <AIGovernancePage /> },
      { path: "services/ai-operating-model", element: <AIOperatingModelPage /> },
      { path: "services/ai-use-case-prioritisation", element: <AIUseCasePrioritisationPage /> },
      { path: "services/leadership-enablement", element: <LeadershipEnablementPage /> },
      { path: "services/ai-delivery-assurance", element: <AIDeliveryAssurancePage /> },
      { path: "privacy", element: <Privacy /> },
      { path: "terms", element: <Terms /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];
