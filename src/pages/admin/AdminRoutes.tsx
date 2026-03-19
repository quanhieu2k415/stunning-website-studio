import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const DashboardPage = lazy(() => import("./DashboardPage"));
const ProductListPage = lazy(() => import("./products/ProductListPage"));
const ProductEditPage = lazy(() => import("./products/ProductEditPage"));
const CategoryListPage = lazy(() => import("./categories/CategoryListPage"));
const CategoryEditPage = lazy(() => import("./categories/CategoryEditPage"));
const BrandListPage = lazy(() => import("./brands/BrandListPage"));
const PCComponentsPage = lazy(() => import("./build-pc/PCComponentsPage"));
const PrebuiltConfigsPage = lazy(() => import("./build-pc/PrebuiltConfigsPage"));
const ServiceListPage = lazy(() => import("./services/ServiceListPage"));
const ServiceEditPage = lazy(() => import("./services/ServiceEditPage"));
const ProcessStepsPage = lazy(() => import("./services/ProcessStepsPage"));
const HeroSettingsPage = lazy(() => import("./content/HeroSettingsPage"));
const ContactSettingsPage = lazy(() => import("./content/ContactSettingsPage"));
const FooterSettingsPage = lazy(() => import("./content/FooterSettingsPage"));
const AboutSettingsPage = lazy(() => import("./content/AboutSettingsPage"));
const NavigationPage = lazy(() => import("./content/NavigationPage"));
const SEOSettingsPage = lazy(() => import("./content/SEOSettingsPage"));

const AdminLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

const AdminRoutes = () => {
  return (
    <Suspense fallback={<AdminLoader />}>
      <Routes>
        <Route path="/" element={<DashboardPage />} />

        {/* Products */}
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/new" element={<ProductEditPage />} />
        <Route path="/products/:id" element={<ProductEditPage />} />

        {/* Categories */}
        <Route path="/categories" element={<CategoryListPage />} />
        <Route path="/categories/new" element={<CategoryEditPage />} />
        <Route path="/categories/:id" element={<CategoryEditPage />} />

        {/* Brands */}
        <Route path="/brands" element={<BrandListPage />} />

        {/* Build PC */}
        <Route path="/pc-components" element={<PCComponentsPage />} />
        <Route path="/prebuilt-configs" element={<PrebuiltConfigsPage />} />

        {/* Services */}
        <Route path="/services" element={<ServiceListPage />} />
        <Route path="/services/new" element={<ServiceEditPage />} />
        <Route path="/services/:id" element={<ServiceEditPage />} />
        <Route path="/process-steps" element={<ProcessStepsPage />} />

        {/* Content */}
        <Route path="/hero" element={<HeroSettingsPage />} />
        <Route path="/contact" element={<ContactSettingsPage />} />
        <Route path="/footer" element={<FooterSettingsPage />} />
        <Route path="/about" element={<AboutSettingsPage />} />
        <Route path="/navigation" element={<NavigationPage />} />
        <Route path="/seo" element={<SEOSettingsPage />} />
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
