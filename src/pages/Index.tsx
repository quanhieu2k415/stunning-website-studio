import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import ProductCategories from "@/components/ProductCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ProductCategories />
      <FeaturedProducts />
      <ServicesSection />
      <ContactSection />
    </Layout>
  );
};

export default Index;
