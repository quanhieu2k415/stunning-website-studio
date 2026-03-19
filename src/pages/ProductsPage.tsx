import Layout from "@/components/Layout";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { usePublicProducts, usePublicCategories, usePublicBrands } from "@/hooks/usePublicData";
import ProductCard from "@/components/ProductCard";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const searchQuery = searchParams.get("q") || "";
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || "all");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const { data: allProducts = [] } = usePublicProducts();
  const { data: categories = [] } = usePublicCategories();
  const { data: allBrands = [] } = usePublicBrands();

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  // Get brands available for selected category
  const availableBrands = selectedCategory === "all"
    ? allBrands
    : [...new Set(allProducts.filter(p => p.category === selectedCategory).map(p => p.brand))].sort();

  // Toggle brand selection
  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  // Clear brand filters when category changes
  useEffect(() => {
    setSelectedBrands([]);
  }, [selectedCategory]);

  // Filter by category first
  const categoryFiltered = selectedCategory === "all"
    ? allProducts
    : allProducts.filter(p => p.category === selectedCategory);

  // Then filter by brand
  const brandFiltered = selectedBrands.length > 0
    ? categoryFiltered.filter(p => selectedBrands.includes(p.brand))
    : categoryFiltered;

  // Then filter by search query
  const filteredProducts = searchQuery
    ? brandFiltered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : brandFiltered;

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-primary py-16">
        <div className="container text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Sản Phẩm Của Chúng Tôi
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Đa dạng thiết bị camera, máy chấm công, kiểm soát ra vào từ các thương hiệu hàng đầu
          </p>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-12">
        <div className="container">
          {/* Category filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "bg-muted text-foreground hover:bg-primary/10"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Brand filters */}
          {availableBrands.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-foreground mb-3">Thương hiệu:</h3>
              <div className="flex flex-wrap gap-2">
                {availableBrands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => toggleBrand(brand)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                      selectedBrands.includes(brand)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border hover:border-primary/50"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
                {selectedBrands.length > 0 && (
                  <button
                    onClick={() => setSelectedBrands([])}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Xóa bộ lọc
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Products count */}
          <p className="text-muted-foreground mb-6">
            Hiển thị <span className="font-semibold text-foreground">{filteredProducts.length}</span> sản phẩm
            {selectedBrands.length > 0 && (
              <span className="ml-2">
                (Lọc theo: {selectedBrands.join(", ")})
              </span>
            )}
          </p>

          {/* Products grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductsPage;
