import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Camera IP Hikvision DS-2CD1027G0-L",
    price: "1.650.000",
    originalPrice: "1.890.000",
    image: "https://images.unsplash.com/photo-1580981454274-cb8be8ba3b86?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 124,
    badge: "Bán chạy",
    badgeColor: "bg-red-500",
  },
  {
    id: 2,
    name: "Máy Chấm Công Vân Tay RONALD JACK X628-C",
    price: "2.850.000",
    originalPrice: "3.200.000",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 89,
    badge: "Mới",
    badgeColor: "bg-primary",
  },
  {
    id: 3,
    name: "Khóa Cửa Thông Minh SAMSUNG SHP-DP609",
    price: "12.500.000",
    originalPrice: "14.900.000",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    rating: 5.0,
    reviews: 56,
    badge: "Hot",
    badgeColor: "bg-orange-500",
  },
  {
    id: 4,
    name: "Đầu Ghi Hình 8 Kênh Hikvision DS-7108NI",
    price: "3.200.000",
    originalPrice: "3.800.000",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 78,
    badge: null,
    badgeColor: "",
  },
];

const FeaturedProducts = () => {
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
          <Button variant="outline">
            Xem tất cả sản phẩm
          </Button>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-border"
            >
              {/* Image */}
              <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.badge && (
                  <span className={`absolute top-3 left-3 px-3 py-1 ${product.badgeColor} text-primary-foreground text-xs font-semibold rounded-full`}>
                    {product.badge}
                  </span>
                )}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
              </Link>

              {/* Content */}
              <div className="p-5">

                {/* Name */}
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors h-12">
                    {product.name}
                  </h3>
                </Link>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-xl font-bold text-primary">{product.price}₫</span>
                  <span className="text-sm text-muted-foreground line-through">{product.originalPrice}₫</span>
                </div>

                {/* Button */}
                <Button className="w-full" size="sm">
                  <ShoppingCart className="w-4 h-4" />
                  Thêm vào giỏ
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
