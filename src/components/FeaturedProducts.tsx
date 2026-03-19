import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { usePublicFeaturedProducts } from "@/hooks/usePublicData";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  const { data: featuredProducts = [] } = usePublicFeaturedProducts();

  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              Sản phẩm nổi bật
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Được Khách Hàng <span className="text-gradient">Tin Dùng</span>
            </h2>
          </div>
          <Button variant="outline" asChild>
            <Link to="/san-pham">Xem tất cả sản phẩm</Link>
          </Button>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
