import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Star, Phone, Shield, Truck, RotateCcw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { usePublicProductDetail } from "@/hooks/usePublicData";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading } = usePublicProductDetail(id || "");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Không tìm thấy sản phẩm</h1>
            <Link to="/san-pham">
              <Button>Xem sản phẩm</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const discountPercent = Math.round(
    (1 - parseInt(product.price.replace(/\./g, "")) / parseInt(product.originalPrice.replace(/\./g, ""))) * 100
  );

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-muted/50 py-4">
        <div className="container">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <span>/</span>
            <Link to={`/san-pham?category=${product.category}`} className="hover:text-primary transition-colors">{product.categoryLabel}</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Info */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <div className="relative aspect-square bg-card rounded-2xl overflow-hidden border border-border mb-4 group">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 px-4 py-1.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                    {product.badge}
                  </span>
                )}

                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      aria-label="Ảnh trước"
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      aria-label="Ảnh tiếp"
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      aria-label={`Xem ảnh ${index + 1}`}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-primary shadow-glow"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div>
              <div className="mb-4">
                <span className="text-sm text-muted-foreground">{product.brand}</span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} đánh giá)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-3xl font-bold text-primary">{product.price}₫</span>
                <span className="text-xl text-muted-foreground line-through">{product.originalPrice}₫</span>
                <span className="px-2 py-1 bg-destructive/10 text-destructive text-sm font-medium rounded">
                  -{discountPercent}%
                </span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Stock status */}
              <div className="flex items-center gap-2 mb-6">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-green-600 font-medium">Còn hàng</span>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-medium text-foreground">Số lượng:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Giảm số lượng"
                    className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Tăng số lượng"
                    className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" variant="outline" asChild className="flex-1">
                  <a href="tel:0978998811">
                    <Phone className="w-5 h-5" />
                    Gọi đặt hàng
                  </a>
                </Button>
                <Button size="lg" asChild className="flex-1">
                  <Link to="/lien-he">
                    Liên hệ tư vấn
                  </Link>
                </Button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-muted/50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Shield className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Bảo hành</p>
                    <p className="text-muted-foreground text-sm">{product.warranty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Miễn phí ship</p>
                    <p className="text-muted-foreground text-sm">Đơn từ 1 triệu</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Đổi trả</p>
                    <p className="text-muted-foreground text-sm">Trong 7 ngày</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features & Specs */}
      {(product.features.length > 0 || Object.keys(product.specs).length > 0) && (
        <section className="py-12 bg-muted/50">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Features */}
              {product.features.length > 0 && (
                <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Tính năng nổi bật</h2>
                  <ul className="space-y-4">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specifications */}
              {Object.keys(product.specs).length > 0 && (
                <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Thông số kỹ thuật</h2>
                  <div className="space-y-3">
                    {Object.entries(product.specs).map(([key, value], index) => (
                      <div
                        key={key}
                        className={`flex justify-between py-3 ${
                          index !== Object.entries(product.specs).length - 1
                            ? "border-b border-border"
                            : ""
                        }`}
                      >
                        <span className="text-muted-foreground">{key}</span>
                        <span className="font-medium text-foreground text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ProductDetail;
