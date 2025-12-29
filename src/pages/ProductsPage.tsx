import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

const allProducts = [
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
    category: "camera",
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
    category: "cham-cong",
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
    category: "kiem-soat",
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
    category: "camera",
  },
  {
    id: 5,
    name: "Camera Wifi Ezviz C6N 2MP",
    price: "890.000",
    originalPrice: "1.100.000",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 203,
    badge: "Bán chạy",
    badgeColor: "bg-red-500",
    category: "camera",
  },
  {
    id: 6,
    name: "Bộ Đàm Motorola GP328",
    price: "4.500.000",
    originalPrice: "5.200.000",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 45,
    badge: null,
    badgeColor: "",
    category: "bo-dam",
  },
  {
    id: 7,
    name: "Máy Chấm Công Khuôn Mặt ZKTeco MB20",
    price: "5.800.000",
    originalPrice: "6.500.000",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 67,
    badge: "Mới",
    badgeColor: "bg-primary",
    category: "cham-cong",
  },
  {
    id: 8,
    name: "Hệ Thống Báo Cháy Hochiki",
    price: "8.900.000",
    originalPrice: "10.500.000",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 32,
    badge: null,
    badgeColor: "",
    category: "bao-dong",
  },
];

const categories = [
  { id: "all", name: "Tất cả sản phẩm" },
  { id: "camera", name: "Camera giám sát" },
  { id: "cham-cong", name: "Máy chấm công" },
  { id: "kiem-soat", name: "Kiểm soát ra vào" },
  { id: "bo-dam", name: "Bộ đàm - Định vị" },
  { id: "bao-dong", name: "Báo động - PCCC" },
];

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = selectedCategory === "all" 
    ? allProducts 
    : allProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
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
            <div className="flex flex-wrap gap-3 mb-10">
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

            {/* Products count */}
            <p className="text-muted-foreground mb-6">
              Hiển thị <span className="font-semibold text-foreground">{filteredProducts.length}</span> sản phẩm
            </p>

            {/* Products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-border"
                >
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
                  </Link>

                  <div className="p-5">

                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors h-12">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-xl font-bold text-primary">{product.price}₫</span>
                      <span className="text-sm text-muted-foreground line-through">{product.originalPrice}₫</span>
                    </div>

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
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;
