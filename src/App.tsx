import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FloatingButtons from "./components/FloatingButtons";
import ProtectedRoute from "./components/admin/ProtectedRoute";

// Public pages
const Index = lazy(() => import("./pages/Index"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const BuildPCPage = lazy(() => import("./pages/BuildPCPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin pages (lazy-loaded - no impact on public bundle)
const AdminLoginPage = lazy(() => import("./pages/admin/LoginPage"));
const AdminRoutes = lazy(() => import("./pages/admin/AdminRoutes"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminRoutes />
                </ProtectedRoute>
              }
            />

            {/* Public routes */}
            <Route
              path="/*"
              element={
                <>
                  <FloatingButtons />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/san-pham" element={<ProductsPage />} />
                    <Route path="/build-pc" element={<BuildPCPage />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/dich-vu" element={<ServicesPage />} />
                    <Route path="/gioi-thieu" element={<AboutPage />} />
                    <Route path="/lien-he" element={<ContactPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
