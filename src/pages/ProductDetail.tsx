import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Phone, Shield, Truck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/Layout";
import { usePublicProductDetail } from "@/hooks/usePublicData";

// Sanitize HTML: strip dangerous tags/attributes, keep formatting tags
function sanitizeHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const dangerous = doc.querySelectorAll("script,iframe,object,embed,form,input,link,style,meta");
  dangerous.forEach((el) => el.remove());
  doc.querySelectorAll("*").forEach((el) => {
    for (const attr of Array.from(el.attributes)) {
      if (attr.name.startsWith("on") || attr.name === "srcdoc") {
        el.removeAttribute(attr.name);
      }
      if (attr.name === "href" && attr.value.trim().toLowerCase().startsWith("javascript:")) {
        el.removeAttribute(attr.name);
      }
    }
  });
  return doc.body.innerHTML;
}

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading } = usePublicProductDetail(id || "");
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);

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

  const hasSpecs = Object.keys(product.specs).length > 0;
  const hasDescription = product.description && product.description.trim().length > 0;

  const variants = product.variants || [];
  const hasVariants = variants.length > 0;
  const selectedVariant =
    variants.find((v) => v.id === selectedVariantId) || variants[0] || null;

  const displayPrice = selectedVariant?.price || product.price;
  const displayOriginalPrice = selectedVariant
    ? selectedVariant.originalPrice
    : product.originalPrice;

  const contactParams = new URLSearchParams({ product: product.name });
  if (hasVariants && selectedVariant) {
    contactParams.set("variant", selectedVariant.label);
    contactParams.set("price", selectedVariant.price);
  }
  const contactHref = `/lien-he?${contactParams}`;

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-muted/50 py-3 border-b">
        <div className="container">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <span>/</span>
            <Link to={`/san-pham?category=${product.category}`} className="hover:text-primary transition-colors">
              {product.categoryLabel}
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Info */}
      <section className="py-8">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery — thumbnails bên trái, ảnh chính bên phải */}
            <div className="flex gap-3">
              {/* Thumbnails dọc */}
              {product.images.length > 1 && (
                <div className="hidden sm:flex flex-col gap-2 w-16 flex-shrink-0">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      aria-label={`Xem ảnh ${index + 1}`}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                        selectedImage === index
                          ? "border-primary shadow-md"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Ảnh chính */}
              <div className="relative flex-1 aspect-square bg-white rounded-xl overflow-hidden border group">
                <img
                  src={product.images[selectedImage] || product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                />
                {product.badge && (
                  <span className={`absolute top-3 left-3 px-3 py-1 ${product.badgeColor || "bg-red-500"} text-white text-sm font-semibold rounded`}>
                    {product.badge}
                  </span>
                )}

                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      aria-label="Ảnh trước"
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      aria-label="Ảnh tiếp"
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Giá */}
              <div className="flex items-baseline gap-3 mb-5 pb-5 border-b">
                <span className="text-2xl font-bold text-red-600">{displayPrice}₫</span>
                {displayOriginalPrice && displayOriginalPrice !== displayPrice && (
                  <span className="text-base text-muted-foreground line-through">{displayOriginalPrice}₫</span>
                )}
              </div>

              {hasVariants && (
                <div className="mb-5 pb-5 border-b">
                  <p className="text-sm font-semibold text-foreground mb-3">
                    Chọn phiên bản:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((v) => {
                      const active = selectedVariant?.id === v.id;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setSelectedVariantId(v.id)}
                          className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                            active
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          {v.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Features bullet points */}
              {product.features.length > 0 && (
                <div className="mb-6">
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="text-muted-foreground mt-0.5">–</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button size="lg" className="flex-1 bg-red-600 hover:bg-red-700 text-white" asChild>
                  <a href="tel:0978998811">
                    <Phone className="w-4 h-4 mr-2" />
                    Hỗ trợ tư vấn
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="flex-1">
                  <Link to={contactHref}>
                    Liên hệ đặt hàng
                  </Link>
                </Button>
              </div>

              {/* Metadata: SKU, Danh mục, Thương hiệu */}
              <div className="space-y-2 py-4 border-t text-sm">
                {product.sku && (
                  <div className="flex gap-2">
                    <span className="text-muted-foreground font-medium">SKU:</span>
                    <span className="text-foreground">{product.sku}</span>
                  </div>
                )}
                {product.categoryLabel && (
                  <div className="flex gap-2">
                    <span className="text-muted-foreground font-medium">Danh mục:</span>
                    <Link
                      to={`/san-pham?category=${product.category}`}
                      className="text-primary hover:underline"
                    >
                      {product.categoryLabel}
                    </Link>
                  </div>
                )}
                {product.brand && (
                  <div className="flex gap-2">
                    <span className="text-muted-foreground font-medium">Thương hiệu:</span>
                    <span className="text-foreground">{product.brand}</span>
                  </div>
                )}
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-3 gap-3 mt-4 p-4 bg-muted/50 rounded-xl">
                <div className="flex flex-col items-center text-center gap-1">
                  <Shield className="w-6 h-6 text-primary" />
                  <p className="text-xs font-medium">Bảo hành</p>
                  <p className="text-xs text-muted-foreground">{product.warranty}</p>
                </div>
                <div className="flex flex-col items-center text-center gap-1">
                  <Truck className="w-6 h-6 text-primary" />
                  <p className="text-xs font-medium">Miễn phí ship</p>
                  <p className="text-xs text-muted-foreground">Đơn từ 1 triệu</p>
                </div>
                <div className="flex flex-col items-center text-center gap-1">
                  <RotateCcw className="w-6 h-6 text-primary" />
                  <p className="text-xs font-medium">Đổi trả</p>
                  <p className="text-xs text-muted-foreground">Trong 7 ngày</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs: MÔ TẢ | THÔNG SỐ KỸ THUẬT */}
      {(hasDescription || hasSpecs) && (
        <section className="py-8 bg-muted/30">
          <div className="container">
            <Tabs defaultValue={hasDescription ? "description" : "specs"} className="w-full">
              <TabsList className="bg-white border mb-6">
                {hasDescription && (
                  <TabsTrigger value="description" className="font-semibold data-[state=active]:bg-primary data-[state=active]:text-white">
                    MÔ TẢ
                  </TabsTrigger>
                )}
                {hasSpecs && (
                  <TabsTrigger value="specs" className="font-semibold data-[state=active]:bg-primary data-[state=active]:text-white">
                    THÔNG SỐ KỸ THUẬT
                  </TabsTrigger>
                )}
              </TabsList>

              {hasDescription && (
                <TabsContent value="description">
                  <div className="py-6">
                    <div
                      className="prose prose-sm md:prose-base max-w-none prose-headings:text-foreground prose-headings:font-bold prose-h2:text-xl prose-h3:text-lg prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-li:text-muted-foreground prose-ul:space-y-1 prose-a:text-primary"
                      dangerouslySetInnerHTML={{ __html: sanitizeHtml(product.description) }}
                    />
                  </div>
                </TabsContent>
              )}

              {hasSpecs && (
                <TabsContent value="specs">
                  <div className="py-6">
                    <table className="w-full">
                      <tbody>
                        {Object.entries(product.specs).map(([key, value], index) => (
                          <tr
                            key={key}
                            className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                          >
                            <td className="px-4 py-3 font-medium text-sm text-foreground w-1/3">
                              {key}
                            </td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">
                              {value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ProductDetail;
